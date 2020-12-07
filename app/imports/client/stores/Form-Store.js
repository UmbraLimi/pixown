// ----node_modules-----------------
import { observable, action } 	from  'mobx'
import { computed, reaction }		from  'mobx'
import { toJS, runInAction, isObservable } 		from  'mobx'
import { _ as __ } 							from  'lodash'
import { toast } 								from  'react-toastify'
// ----helpers----------------------
import { validate_field, validate_record 
}																from  '/imports/common/3rd-party/yup/helpers.js'
import { getNestedValue, deleteNestedValue, setNestedValue 
} 															from '/imports/client/misc/nesteds.js'
// ----collections------------------
// ----components-------------------

// ========================================================================
class FormStore {
	constructor(rootStore) {
		this.rootStore = rootStore 
	}

	// observables ------
	@observable  errors = {}
	@observable  ops = {}
	@observable  values = {}
	@observable  blurred = {}
	@observable  touched = {}

	// internal vars
	starting_record = undefined
	mode = undefined // {} ???
	schema = {} //allows for schemas in collections and without collections
	colleXion = undefined
	last_error_count = 0 // to keep number of reaction redraws to minimum
// ====================================================================
	@action  
	initialize = ({	starting_record, mode, schema, colleXion, notifyStore, }) => {
		this.values = {}
		this.errors = {}
		this.touched = {}
		this.blurred = {}
		this.ops = {}

		this.starting_record = isObservable(starting_record) 
			? __.cloneDeep(toJS(starting_record)) // clonedeep creats an array with 1000 items if used on an Observable object
			: __.cloneDeep(starting_record)
		this.mode = mode
		this.schema = schema 
		this.colleXion = colleXion
		this.notifyStore = notifyStore
	}
	// ====================================================================
	monitor_number_of_errors = reaction(
		() => toJS(this.errors), // sense any change to this.errors
		() => {
			const N = __.keys(this.errors).length
			console.log("error reaction", N)
			this.last_error_count === N
			? null // console.log('do nothing') // 
			: this.notifyStore
				? N===0
					? this.notifyStore.unset__hasErrors()
					: this.notifyStore.set__hasErrors()
				: null
			this.last_error_count = N
		}
	)
	// ====================================================================
	monitor_isDirty = reaction(
		() => toJS(this.ops), // sense any change to this.ops
		() => {
			const N = __.keys(this.ops).length
			console.log("isDirty reaction", N)
			this.notifyStore
			? N===0
				? this.notifyStore.unset__isDirty()
				: this.notifyStore.set__isDirty()
			: null
		}
	)
	// ====================================================================
	@action
	make_record_existing = () => {
		// happens after a record is successfully saved (INSERT or UPDATE)
		// allows form to continue being used for more changes
		this.starting_record = __.cloneDeep(this.current_record)
		this.mode = 'EXISTING'
		this.values = {}
		this.errors = {}
		this.touched = {}
		this.blurred = {}
		this.ops = {}
	}
	// ====================================================================
	/*@computed  
	get  ____current_record() { // will be in same shape as starting_record
		const record = __.cloneDeep(this.starting_record)
		//	*** somehow assemble nested fields ...
		const [set__record, unset__record] = this.set_unset__for_saving
		debugger
		// update the values using set__record
		const setts = __.toPairs(set__record)
		__.forEach(setts, (value, key) => {
			//debugger
		})
		// remove fields in unset__record
		return record
	}*/
	// ====================================================================
	/*@action
	ValidateCurrentRecord = async () => {
		try {
			await validate_record(this.schema, this.current_record)
			return true
		} catch (error) {
			debugger
			this._notify_user_and_distribute_error_messages('VALIDATE RECORD', error, false)
		}
	}*/
	// ====================================================================
	@action  
	validateStartingRecord = async () => {
		try {
			await validate_record(this.schema, this.starting_record)
		} catch (error) {
			this._notify_user_and_distribute_error_messages('VALIDATE FIELD', error, false)
		}
	}
	// ====================================================================
	@computed
	get  set_unset__for_saving() {
		const set__record = __.cloneDeep(this.current_record)
		const unset__record = {}
		return [set__record, unset__record]
	}
	// ====================================================================
	@computed
	get  current_record() {
		let record = __.cloneDeep(this.starting_record) // it will get replaced)
		const op_list = __.toPairs(this.ops)
		__.map(op_list, (op) => {
			const [fieldname, act] = op
			if (act === 'SET' ) {
				record = setNestedValue(fieldname, record, this.values[fieldname])
			}
			if (act === 'UNSET') {
				record = deleteNestedValue(fieldname, record)
			}
		})
		return record
	}
	// ====================================================================
	SaveCurrentRecord = () => {
		const result = this.mode === 'EXISTING'
			? this._replace_record()
			: this._insert_record()
		return result // will be ignore in the case of _update_record
	}
	// ====================================================================
	_replace_record = async () => {
		const [set__record, unset__record] = this.set_unset__for_saving
		try {
			const mongo_id = this.starting_record._id
			const record = await Meteor.callPromise('DB.replace', this.colleXion.collection_name, mongo_id, set__record)
			// result will be true
			toast.success("Record " + mongo_id + " was REPLACED", 'success')
			this.make_record_existing() // the saved record continues to be existing but update starting record
		} catch (error) {
			this._notify_user_and_distribute_error_messages('UPDATE', error)
		}
	}
	// ====================================================================
	_insert_record = async () => {
		const [set__record, unset__record] = this.set_unset__for_saving
		try {
			debugger
			const mongo_id = await Meteor.callPromise('DB.insert', this.colleXion.collection_name, set__record)
			toast.success("New Record " + mongo_id + " was INSERTED", 'success')
			// mode changes from NEW before INSERT to EXISTING post-save
			this.make_record_existing() // now the record is EXISTING so update starting record
			// stuff in the _id returned from the INSERT
			this.handle_value_change('_id', mongo_id, false)
			return mongo_id
		} catch (error) {
			this._notify_user_and_distribute_error_messages('INSERT', error)
			return undefined
		}
	}
	// ====================================================================
	_notify_user_and_distribute_error_messages = (typex, err, show_toasts=true) => {
		// one or more errors. Send them to their proper places
		// err.error is an array of fieldname: messages
		const { error, reason, details } = err
		if (err.error === 500) {
			// internal server error or new Meteor.Error thrown
			console.error('Internal server error - check log', err)
			show_toasts ? toast.error("Cannot " + typex + ". There was a server error. Try again.", 'danger') : null

		} else if (err.error === 400) {
			// Match/Check error thrown by during Meteor.Method
			console.error('Match/Check error in Meteor.Method - check log', err)
			show_toasts ? toast.error("Cannot " + typex + ". There was a server error. Try again.", 'danger') : null

		} else if (err.error === 'mongo error') {
			// Mongo threw an error during UPDATE/INSERT/DELETE operation
			show_toasts ? toast.error("Cannot " + typex + ". There was a server error. Try again.", 'danger') : null

		} else if (err.error === 'validation error') {
			// Yup error for field or record-level validation
			// Field level validation error(s) thrown by Yup and re-thrown by me via Meter.Error
			// err.details has an array of field error onjects in the form
			// {fieldname: error.path, message: message}
			show_toasts ? toast.error("Cannot " + typex + ". You have (" + err.details.length + ") errors in your entries.", 'danger') : null
			
			__.map(err.details, (combo) => { // combo obj has fieldname, tested value and messages properties
				const error = {
					fieldname: combo.fieldname,
					messages:  combo.messages
				}
				const value = combo.value
				this._updateFieldError(error, value)
			})

		} else if (err.error === 'record not found') {
			// Mongo ID was not found
			show_toasts ? toast.error("Cannot " + typex + ". There was a server error. Try again.", 'danger') : null

		} else {
			// unexpected err
			console.error('Unexpected error from server - check log', err)
			show_toasts ? toast.error("Cannot " + typex + ". There was a server error. Try again.", 'danger') : null
		}
	}
	// ====================================================================
	@action  
	_updateFieldError = (error, value) => {
		const { fieldname, messages } = error
		const clone = toJS(this.errors)
		clone[fieldname] = {
			messages: messages,
			value: value
		}
		this.errors = clone
	}
	// ====================================================================
	@action  
	_removeFieldError = (fieldname) => {
		if (this.errors[fieldname]) {
			const clone = toJS(this.errors)
			delete clone[fieldname]
			this.errors = clone
		}
	}
	// ====================================================================
	@action 
	_updateFieldOp = (fieldname, op) => {
		const clone = toJS(this.ops)
		clone[fieldname] = op
		this.ops = clone
	}
	// ====================================================================
	@action 
	_removeFieldOp = (fieldname) => {
		if (this.ops[fieldname]) {
			const clone = toJS(this.ops)
			delete clone[fieldname]
			this.ops = clone
		}
	}
	// ====================================================================
	@action
	_updateFieldValue = (fieldname, value) => {
		const clone = toJS(this.values)
		clone[fieldname] = value
		this.values = clone
	}
	// ====================================================================
	@action 
	_removeFieldValue = (fieldname) => {
			const x = __.cloneDeep(this.values)
		if (this.values[fieldname]) {
			const clone = toJS(this.values)
			delete clone[fieldname]
			this.values = clone
		}
	}
	// ====================================================================
	@computed  
	get  isDirty() {
		const num_ops = __.keys(this.ops).length
		return num_ops > 0
	}
	// ====================================================================
	@computed
	get wasTouchedSomewhere() {
		const num_touches = __.keys(this.touched).length
		return num_touches > 0
	}
	// ====================================================================
	@computed
	get  hasErrorsSomewhere() {
		const num_errs = __.keys(this.errors).length
		return num_errs > 0
	}
	// ====================================================================
	getStartingValue = (fieldname) => {
		if (!__.isEmpty(this.starting_record)) {
			return getNestedValue(fieldname, this.starting_record) 
		} else {
			return undefined
		}
	}
	// ====================================================================
	getCurrentErrors = (fieldname) => {
		// return false: if no error (or no error should be shown)
		// in NEW mode the Save button will show if there are no errors
		// and that will happen only if they visit a textbox and make an error.
		// It will NOT check for missing required fields - this is to prevent the
		// user from seeing a bunch of required errors that they haven't had a 
		// chance to fix yet. Once the user attempts to save, all errors are assessed
		// and shown in the fields
		const error = this.errors[fieldname]
		return error && error.messages
			? error.messages 
			: false
	}
	// ====================================================================
	getCurrentValue = (fieldname) => {
		return this.values[fieldname]
	}
	// ====================================================================
	getCurrentValueForTextbox = (fieldname) => {
		const errors = this.errors[fieldname]
		const latest_value = this.values[fieldname]
		const starting_value = this.getStartingValue(fieldname)
		return errors
			? errors.value
			: latest_value !== undefined
				? latest_value
				: starting_value !== undefined
					? starting_value
					: '' 
	}
	// ====================================================================
	getCurrentSourceForTextbox = (fieldname) => {
		const errors = this.errors[fieldname]
		const latest_value = this.values[fieldname]
		const starting_value = this.getStartingValue(fieldname)
		return errors
			? 'errors.value'
			: latest_value !== undefined
				? 'latest_value'
				: starting_value !== undefined
					? 'starting_value'
					: 'empty string' 
	}
	// ====================================================================
	@action  
	onChange = (event) => {
		const elem = event.target
		const fieldname = elem.id
		const newvalue = elem.value
		//this.handleBlur(fieldname)
		this.handleValueChange(fieldname, newvalue, true)
	}
	// ====================================================================
	@action  
	onBlur = (event) => {
		//const elem = event.target
		//const fieldname = elem.id
		//const newvalue = elem.value
		//this.handleTouch(fieldname)
		//this.handleBlur(fieldname)
		//this.handleValueChange(fieldname, newvalue, true)
	}
	// ====================================================================
	@action  
	onFocus = (event) => {
		const elem = event.target
		const fieldname = elem.id
		const newvalue = elem.value
		this.handleTouch(fieldname)
	}
	// ====================================================================
	@action  
	handleTouch = (fieldname) => {
		const clone = toJS(this.touched)
		clone[fieldname] = true
		this.touched = clone
	}
	// ====================================================================
	@action 
	handleBlur = (fieldname) => {
		const clone = toJS(this.blurred)
		clone[fieldname] = true
		this.blurred = clone
	}
	// ====================================================================
	@action 
	handleValueChange = async (fieldname, newvalue, do_validation) => {
		try {
			const result = do_validation
				? await validate_field(this.schema, fieldname, newvalue)
				: 'no need to validate this field'
			// no errors .. result is a message that all is well
			this._removeFieldError(fieldname) // only if fieldname exists
			const starting_value = this.getStartingValue(fieldname)
			const op = newvalue === ''
				? !starting_value || starting_value === '' // 1 nothing in the textbox or textarea
					? 'NO-OP' // 1-1 no change to missing or MT starting value
					: 'UNSET' // 1-2 they removed the non-MT starting value ... UNSET
				: !starting_value || starting_value === '' //2
					? 'SET'   // 2-1 they added a new value to an MT starting value .. SET
					: starting_value === newvalue
						? 'NO-OP'  // no change was made to non-MT starting value
						: 'SET'    // they changed a non-MT starting value to another non-MT value .. SET
			// set__unset will always have one of NO-OP, SET or UNSET
			if (op === 'NO-OP') {
				// remove any value from values for this fieldname (will be there if starting value was changed at some point and is now back to the original)
				runInAction(() => {
					this._removeFieldValue(fieldname)
					this._removeFieldOp(fieldname) 
				})
			} else {
				runInAction(() => { 
					this._updateFieldValue(fieldname, newvalue)
					this._updateFieldOp(fieldname, op) 
				})
			}
		} catch (error) {
			// there were errors
			const err = error.details ? error.details[0] : error
			//runInAction(() => { 
				this._updateFieldError(err, newvalue)
			//})
		}
	}
	// ====================================================================






	// ======== UNTESTED ============ 

	// async computed
	/*is_saveable = promisedComputed(("checking"), async () => {
		const set__record = this.set__record()
		try {
			const valid = await validate_record(this.schema, set__record)
			console.log('is_saveable', true)
			return true
		} catch (error) {
			console.log('is_saveable', false)
			return false
		}
	})*/
	// ====================================================================
	// ====================================================================
	/*_assemble_set__unset__records_for_validating = () => {
		// will use error values (if available) instead of field values
		const set__record = __.cloneDeep(this.starting_record)
		const unset__record = {}
		const op_list = __.toPairs(this.ops)
		__.map(op_list, (op) => {
			const [fieldname, act] = op
			debugger
			//const act = op[1]
			//const fieldname = op[0]
			act === 'SET' ? (
				set__record[fieldname] = this.errors[fieldname]
					? this.errors[fieldname].value
					: this.values[fieldname]
			)	: null		
			act === 'UNSET' ? (
				unset__record[fieldname] = '', // just need the fieldname really
				delete set__record[fieldname]  // if it's there
			) : null
		})
		return [set__record, unset__record]
	}*/
}
// ========================================================================

export { FormStore }