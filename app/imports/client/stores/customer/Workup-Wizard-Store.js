// ----node-packages----------------
import { observable, action, computed, reaction, toJS, runInAction
} 															from  'mobx'
import { toast } 								from  'react-toastify'
import { _ as __ }         			from  'lodash'
import randomstring            	from  'randomstring'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
import { Workup_Sources } 			from  '/imports/enums/workup-sources.js'
import { Workup_Page_Types } 		from  '/imports/enums/workup-page-types.js'
import { Workup_Groups } 				from  '/imports/enums/workup-groups.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
import { get_retouching_agreement_with_services 
}																from  '/imports/collections/Retouching-Agreements/helpers.js'
import { get_printing_agreement_with_options 
} 															from  '/imports/collections/Printing-Agreements/helpers.js'
import { get_downloading_agreement_with_options 
} 															from  '/imports/collections/Downloading-Agreements/helpers.js'
import { get_paid_retouch_for_pose_from_proofs_list, get_pose_details_from_proofs_list
}																from  '/imports/collections/Sittings/helpers.js'
import { get_url_for_image_id } from  '/imports/collections/Images/helpers.js'
// ----collections------------------
import { Workups }							from  '/imports/collections/Workups/collection.js'
import { Sittings } 						from  '/imports/collections/Sittings/collection.js'
import { Images }               from  '/imports/collections/Images/collection.js'
import { Vendors }              from  '/imports/collections/Vendors/collection.js'
import { Schools }              from  '/imports/collections/Schools/collection.js'
// ----components-------------------

// ========================================================================
class Workup_Wizard_Store {
	
	constructor(rootStore) {
		this.rootStore = rootStore 
	}

	// observables ------
	@observable  record = {
		order: {},
		state: undefined,
		source: undefined,
		customer_code: undefined,
		studio_code: undefined,
		school_code: undefined,
		sitting_code: undefined,
		pose_code: undefined,

		downloading_agreement_code: undefined,
		retouching_agreement_code: undefined,
		printing_agreement_code: undefined,

		parent_workup_id: undefined,
		starting_image: {
			image_id: undefined,
		},
		final_image: {
			delivery_state: undefined,
			delivery_transaction_id: undefined,
			image_id: undefined
		},
		downloadable_image: {
			delivery_state: undefined,
			delivery_transaction_id: undefined,
			image_id: undefined,
		},
		prints_list:[], 	 // mobx will watch membership in each element and length but not object content property
		retouches_list:[], // mobx will watch membership in each element and length but not object content property
		downloads_list:[], // mobx will watch membership in each element and length but not object content property
		crop: {
			wanted: false
		}
	}
	@observable  id = undefined
	@observable  pageKey = undefined
	//@observable  sitting = undefined
	@observable  store_is_updating_Wizard_UI = true // set to false when dealing with store from the list of wups in the cart or other list not activating the Wizard UI
	@observable  record_is_dirty = false
	@observable  eyeMode_is_active = false
	@observable  progressBar_is_visible = false
	@observable  index_for_activeRetouch = undefined
	@observable  index_for_activePrint = undefined // current printItem in this.record.prints_list array
	@observable  index_for_activeDownload = undefined // current downloadItem in this.record.prints_list array

	// RE-ACTIONS
	// ====================================================================
	monitor_pageKey = reaction(
    () => this.pageKey,
		() => {
			//console.log('pageKey', this.pageKey, 'this.__rawStore', this.__rawStore)
			this.store_is_updating_Wizard_UI
				? this.pageKey
					? this.rootStore.router.goTo(
							app_routes[this._activePage.mobx_router.key],
							this._activePage.mobx_router.parms,
							this.rootStore
						)
					: null // initialize() sets this to undefined which we ignore
				: null // store is in virtual (non-UI mode)
		}
	)

	monitor_record = reaction(
		() => toJS(this.record), 
		() => {
			console.log('record was changed')
			//this._set_to_dirty()
		}
	)

	// ACTIONS
	// ====================================================================
	
	@action
	_set_pageKey = (new_key) => {
		this.pageKey = new_key
	}

	@action
	_set_store_to_nonWizard_mode = () => {
		this.store_is_updating_Wizard_UI = false
	}

	@action
	_set_store_to_Wizard_mode = () => {
		this.store_is_updating_Wizard_UI = true
	}

	@action
	_toggle_visible_for_progressBar = ()=> {
		this.progressBar_is_visible = !this.progressBar_is_visible
	}

	@action
	_toggle_eyeMode = () => {
		this.eyeMode_is_active = !this.eyeMode_is_active
	}

	@action
	_set_to_dirty = () => {
		this.record_is_dirty = true
	}

	@action
	_set_to_clean = () => {
		this.record_is_dirty = false
	}

	@action
	_set_keyValue_for_record = (fieldname, value) => {
		this.record[fieldname] = value
	}

	//@action - not needed as I call the actions and make no direct assignments/changes to observables
	_save_workup_to_db = async () => {
		const state = this.record.state
		const isNew = state === Workup_States.NEW.name
		const isSaved = state === Workup_States.SAVED.name
		const isInCart = state === Workup_States.IN_CART.name
		if (this.record_is_dirty) {
			if (isNew || isSaved || isInCart) {
				// save-able
				if (isNew) {
					await runInAction(() => {
						this._set_keyValue_for_record('state', Workup_States.SAVED.name)
					})
					const mongo_id = await this._insert_workup_to_db() // SAVED
					runInAction(() => {
						this._set_keyValue_for_record('_id', mongo_id)
					})
					this._set_to_clean()

				} else if (isSaved) {
					await this._update_workup_to_db(Workup_States.SAVED.name)
					this._set_to_clean()

				} else if (isInCart) {
					if (this._workup_is_cartable) {
						// can remain in the cart
						await this._update_workup_to_db(Workup_States.IN_CART.name)
						this._set_to_clean()

					} else {
						// not cartable any more !
						toast.warn("This workup no longer qualifies for the cart")
						toast.info("You'll need to add it back when you are done")
						await runInAction(() => {
							this._set_keyValue_for_record('state', Workup_States.SAVED.name) //not in CART any more
						})
						await this._update_workup_to_db(Workup_States.SAVED.name)
						this._set_to_clean()
					}
				}
			} else {
				console.error("ERROR", '_save_workup_to_db()', 'Current workup is state', state, 'and is not saveable')
			}
		}
	} 

	//@action
	async _insert_workup_to_db() {
		const record_clone = toJS(this.record) 
		try {
			const mongo_id = await Meteor.callPromise('DB.insert', 'WORKUPS', record_clone)
			return mongo_id
		} catch (error) {
			console.error('*** unexpected error', '_insert_workup_to_db()', error)
			throw error // pass the error along
		}
	}

	//@action
	async _update_workup_to_db(new_state) {
		const record_clone = toJS(this.record)
		record_clone.state = new_state //Workup_States.IN_CART.name
		const mongo_id = record_clone._id
		try {
			const result = await Meteor.callPromise('DB.update', 'Workups', mongo_id, record_clone, {})
			// result will be true. Also nothing to return
		} catch (error) {
			console.error('*** unexpected error', '_update_workup_to_db()', error)
			throw error // pass the error along
		}
	}

	//@action
	_add_workup_to_cart = async () => {
		const starting_state = this.record.state
		const is_SAVED = starting_state === Workup_States.SAVED.name
		const { router } = this.rootStore
		// they can't get here as state=NEW, as they have to make a choice for download or prints and those make the state=SAVED
		if (is_SAVED) {
			try {
				await this._update_workup_to_db(Workup_States.IN_CART.name) 
				toast.success("Workup was transferred to CART!")
				// go to cart
				router.goTo(app_routes.cart, {}, this.rootStore)
			} catch (error){
				toast.error("Unexpected error while transferring to CART!")
				console.log('*** unexpected error', '_add_workup_to_cart()', error)
			}
		} else {
			console.error('Unexpected state while adding workup to CART', '_add_workup_to_cart()', starting_state)
		}
	} 

	//@action
	//_set_sitting_to = (sitting) => {
	//	this.sitting = sitting
	//}

	@action
	_initialize = () => {
		this.id = randomstring.generate(4)
		this.record = {
			order: {},
			state: undefined,
			source: undefined,
			customer_code: undefined,
			studio_code: undefined,
			school_code: undefined,
			sitting_code: undefined,
			pose_code: undefined,

			downloading_agreement_code: undefined,
			retouching_agreement_code: undefined,
			printing_agreement_code: undefined,

			parent_workup_id: undefined,
			starting_image: {
				image_id: undefined,
			},
			final_image: {
				delivery_state: undefined,
				delivery_transaction_id: undefined,
				image_id: undefined
			},
			downloadable_image: {
				delivery_state: undefined,
				delivery_transaction_id: undefined,
				image_id: undefined,
			},
			prints_list:[],
			retouches_list:[],
			downloads_list:[],
			crop: {
				wanted: false
			}
		}
		this.pageKey = undefined
		//this.sitting = undefined
		this.record_is_dirty = false
		this.eyeMode_is_active = false
		this.progressBar_is_visible = false
		this.index_for_activeRetouch = undefined // current printItem in this.record.prints_list array
		this.index_for_activePrint = undefined // current printItem in this.record.prints_list array
		this.index_for_activeDownload = undefined // current downloadItem in this.record.prints_list array
	}

	@action
	_initialize_from_dbRecord = (wup_record) => {
		this._initialize()  // to get everything to same starting place
		this.record = toJS(wup_record)
		this._set_to_clean()
	}

	@action
	_initialize_from_proof = (sitting, proof, retouching_agreement) => {
		this._initialize()  // to get everything to same starting place
		const pose_proof = _.findWhere(sitting.proofs_list, { pose_code: proof.pose_code })
		this.record.state = Workup_States.NEW.name
		this.record.source = Workup_Sources.from_SITTING.name
		this.record.customer_code = sitting.customer_code
		this.record.studio_code = sitting.studio_code
		this.record.school_code = sitting.school_code
		this.record.sitting_code = sitting.sitting_code
		this.record.pose_code = proof.pose_code

		this.record.downloading_agreement_code = sitting.downloading_agreement_code
		this.record.retouching_agreement_code = sitting.retouching_agreement_code
		this.record.printing_agreement_code = sitting.printing_agreement_code

		this.record.starting_image = {
			image_id: pose_proof.image_id
		}
		// you get all of the potential services added with value=false
		this.record.retouches_list = __.map(retouching_agreement.services_list, (service) => {
			return {
				service_code: service.service_code,
				wanted: false
			}
		})
	}

	@action
	_create_download_from_activePrint = () => {
		const option_code = this._activePrint.option_code // use the exact same code for download! 
		// is it already in the download list? will have the same option_code
		const clone = toJS(this.record.downloads_list)
		const download_index = __.findIndex(clone, { option_code: option_code })
		const add_download = download_index === -1
			? true
			: this.record.downloads_list[download_index].size === this._activePrint.size
				? this.record.downloads_list[download_index].colour === this._activePrint.colour
					? false
					: true
				: true

		if (add_download) {
			clone.push({ // not there yet
				option_code:  option_code,
				wanted:  			false, //!important
				colour: 			this._activePrint.colour,
				size:					this._activePrint.size
			})
			this.record.downloads_list = clone
			this._set_to_dirty()
			// will NOT be saved unless saved elsewhere
		}
	}

	@action
	_set_activePrint_given_optionCode = (option_code) => {
		const index = __.findIndex(this.record.prints_list, { option_code: option_code })
		index === -1 ? console.error('Unexpectedly missing print item: option_code:', option_code): null
		this.index_for_activePrint = index === -1 ? undefined : index
	}

	@action // NEW
	_set_activeRetouch_given_serviceCode = (service_code) => {
		const index = __.findIndex(this.record.retouches_list, { service_code: service_code })
		index === -1 ? console.error('Unexpectedly missing retouch item: service_code:', service_code): null
		this.index_for_activeRetouch = index === -1 ? undefined : index
	}

	@action
	_set_activeRetouch_to_index = (index) => {
		this.index_for_activeRetouch = index
	}

	@action
	_set_activePrint_to_index = (index) => {
		this.index_for_activePrint = index
	}

	@action
	_set_activeDownload_to_index = (index) => {
		this.index_for_activeDownload = index
	}

	@action
	_set_activePrint_to_last = () => {
		const index = this.record.prints_list.length-1
		this.index_for_activePrint = index
	}

	@action
	_set_activeDownload_given_optionCode = (option_code) => {
		const index = __.findIndex(this.record.downloads_list, { option_code: option_code })
		index === -1 ? console.error('Unexpectedly missing download item: option_code:', option_code): null
		this.index_for_activeDownload = index === -1 ? undefined : index
	}

	@action
	_set_activeDownload_to_last = () => {
		const index = this.record.downloads_list.length-1
		this.index_for_activeDownload = index
	}

	@action
	_append_blankPrint_to_prints = () => {
		const option_code = randomstring.generate(5)
		this.record.prints_list.push({
			option_code:  option_code, 
			wanted:  			true,
		})
		this._set_to_dirty()
		//this._set_activePrint_given_optionCode(option_code) // so we can be there
		//console.log(toJS(this.record.prints_list))
	}

	@action
	_append_blankDownload_to_downloads = () => {
		const option_code = randomstring.generate(5)
		this.record.downloads_list.push({
			option_code:  option_code, 
			wanted:  			true,
		})
		this._set_to_dirty()
	}

	@action
	_toggle_wanted_for_activePrint = () => {
		const i = this.index_for_activePrint
		// since this.record.prints_list is the extent of the observable record
		// MUST replace array elements, and NOT properties of objects in those array elements
		const clone = toJS(this.record.prints_list)
		clone[i].wanted = !clone[i].wanted
		this.record.prints_list = clone
		this._set_to_dirty()
	}

	@action // NEW
	_toggle_wanted_for_activeRettouch = () => {
		const i = this.index_for_activeRetouch
		// since this.record.prints_list is the extent of the observable record
		// MUST replace array elements, and NOT properties of objects in those array elements
		const clone = toJS(this.record.retouches_list)
		clone[i].wanted = !clone[i].wanted
		this.record.retouches_list = clone
		this._set_to_dirty()
	}

	@action
	_toggle_wanted_for_activeDownload = () => {
		const i = this.index_for_activeDownload
		const clone = toJS(this.record.downloads_list)
		clone[i].wanted = !clone[i].wanted
		this.record.downloads_list = clone
		this._set_to_dirty()
	}

	@action
	_set_keyValue_for_activePrint = (parm, value) => {
		const i = this.index_for_activePrint
		const currentValue = 	this.record.prints_list[i][parm]
		if (currentValue !== value) {
			// since this.record.prints_list is the extent of the observable record
			// MUST replace array elements, and NOT properties of objects in those array elements
			const clone = toJS(this.record.prints_list)
			clone[i][parm] = value
			this.record.prints_list = clone
			this._set_to_dirty()
		}
	}

	@action  //TODO: where is this used and can I use _set_activeRetouch_given_serviceCode
	_set_keyValue_for_activeRetouch = (parm, value) => {
		this.record.retouches_list[this._index_for_activeRetouch][parm] = value
		this._set_to_dirty()
	}
	/*@action // NEW
	_set_keyValue_for_activeRetouch = (parm, value) => {
		const i = this.index_for_activeRetouch
		const currentValue = 	this.record.retouches_list[i][parm]
		if (currentValue !== value) {
			// since this.record.prints_list is the extent of the observable record
			// MUST replace array elements, and NOT properties of objects in those array elements
			const clone = toJS(this.record.retouches_list)
			clone[i][parm] = value
			this.record.retouches_list = clone
			this._set_to_dirty()
		}
	}*/

	@action
	_set_keyValue_for_activeDownload = (parm, value) => {
		const i = this.index_for_activeDownload
		const currentValue = 	this.record.downloads_list[i][parm]
		if (currentValue !== value) {
			const clone = toJS(this.record.downloads_list)
			clone[i][parm] = value
			this.record.downloads_list = clone
			this._set_to_dirty()
		}
	}

	@action
	_remove_parm_from_activePrint = (parm) => {
		const i = this.index_for_activePrint
		const currentValue = 	this.record.prints_list[i][parm]
		if (currentValue !== undefined) {
			// since this.record.prints_list is the extent of the observable record
			// MUST replace array elements, and NOT properties of objects in those array elements
			const clone = toJS(this.record.prints_list)
			delete clone[i][parm]
			this.record.prints_list = clone
			this._set_to_dirty()
		}
		// does this cause me grief when saving?
		//console.log(toJS(this.record.prints_list))
	}

	@action
	_remove_activePrint = () => {
		const i = this.index_for_activePrint
		const clone = toJS(this.record.prints_list)
		//delete clone[i] -- don't use! removes the object in the array position but doesn't reindex or update its length!!
		clone.splice(i,1) // remove only 1 element at position i
		this.record.prints_list = clone
		this._set_to_dirty()
		// do I need to set the current _activePrint anew? probably not as the prints_list could now be empty
	}

	@action
	_remove_activeDownload = () => {
		const i = this.index_for_activeDownload
		const clone = toJS(this.record.downloads_list)
		clone.splice(i,1) // remove only 1 element at position i
		this.record.downloads_list = clone
		this._set_to_dirty()
		// do I need to set the current _activePrint anew? probably not as the prints_list could now be empty
	}

	// COMPUTEDS
	// ====================================================================
	@computed get
	_dropdownDelim() { return '~'}
	
	@computed get
	_defaultCompositeValueForDropDown() { return 'none'}

	_get_option_code_and_value_from_composite = (option__new_value) => {
		const x = option__new_value.split(this._dropdownDelim)
		const option_code = x[0]
		const new_value = x[1]
		return [option_code, new_value]
	}
	
	_assemble__selectValue = (code, value) => {
		return `${code}${this._dropdownDelim}${value || this._defaultCompositeValueForDropDown}` 
	}


	@computed get
	_workup_is_cartable() {
		return this._totalPriceForPrints_is_ok && this._totalPriceForDownloads_is_ok
			? this._wantedPrintsCount + this._wantedDownloadsCount > 0
				? true
				: false
			: false
	}

	@computed get
	_wantedPrintsCount() {
		return this._wantedPrints.length
	}

	@computed get
	_wantedDownloadsCount() {
		return this._wantedDownloads.length
	}

	@computed get // works
	_closestImageURL_for_pose() {  // large background image used in wizard and in cart?
		const paid_retouch = get_paid_retouch_for_pose_from_proofs_list(
			toJS(this.sitting.proofs_list), this.record.pose_code, this._activePage
		)
		//debugger
		// paid_retouch will return an array with 0 or 1 item in it
		if (__.isEmpty(paid_retouch)) {
			return this._imagesRecord_for_startingImage.url
		} else {
			const retouch = paid_retouch[0]
			const ok_states = [Delivery_States.READY_to_SEND_to_VENDOR.name, Delivery_States.REQUESTED_from_VENDOR.name]
			if (__.includes(ok_states, paid_retouch.delivery_state)) {
				// use an overlay on top of starting_image
				const overlay = 'oreder_waiting_for_retouch_layer_ki19kn'
				// will need the whole image record, not just the url
				const image = this._imagesRecord_for_startingImage
				// need to splice (for cloudinary) the overlay into the URL and match the width/height of image
				const temp = this._imagesRecord_for_startingImage.url.split('/')
				temp[temp.length - 2] = `l_${overlay},w_${image.width},h_${image.height}/${temp[temp.length - 2]}`
				return temp.join('/')
			} else {
				return get_url_for_image_id(retouch.image_id)
			}
		}
	}

	@computed get
	__rawRecord() {
		return toJS(this.record)
	}

	@computed get
	__rawStore() {
		return toJS(this)
	}

	@computed get //- as _latestImageURL()
	_latestImageURL_for_workup () {  //used in cart_page/workup-panel
		let image_id, use_overlay, image_url
		const overlay = 'retouching_underway_watermark_ejiv8v'
		if (this.record.final_image && this.record.final_image.image_id) {
			image_id = this.record.final_image.image_id
			use_overlay = false
		} else {
			if (this.record.state === Workup_States.ORDERED.name) {
				use_overlay = true
			} else {
				// NEW or SAVED or IN_CART
				use_overlay = false
			}
			image_id = this.record.starting_image.image_id
		}
		const image_record = this._imagesRecord__given__image_id(image_id)
		image_url = image_record.url
		if (use_overlay) {
			// need to splice (for cloudinary) the overlay into the URL and match the width/height of image
			const temp = image_url.split('/')
			temp[temp.length-2] = `l_${overlay},w_${image_record.width},h_${image_record.height}/${temp[temp.length-2]}`
			image_url = temp.join('/')
		}
		return image_url
	}

	@computed get //-
	_wantedRetouches() {
		return _.filter(this.record.retouches_list, (item) => {return item.wanted === true})
	}

	@computed get //-
	_wantedPrints() {
		return _.filter(this.record.prints_list, (item) => {return item.wanted === true})
	}

	@computed get //-
	_wantedDownloads() {
		return _.filter(this.record.downloads_list, (item) => {return item.wanted === true})
	}

	@computed get
	_activePage_is_summaryPage() {
		return this._activePage.group === Workup_Groups.SUMMARY.name
	}

	@computed get
	_activePage_is_printPage() {
		return this._activePage.group === Workup_Groups.PRINT.name
	}

	@computed get //-
	_totalPriceForPrints_is_ok() {
		const num_problems = __.reduce(this._defaultPrices_for_prints, (count, price) => {
			return __.isNumber(price) || price === 'excluded'
				? count 
				: count + 1
		}, 0)
		return num_problems === 0
	}

	@computed get //-
	_totalPriceForRetouches_is_ok() {
		const num_problems = __.reduce(this._defaultPrices_for_retouches, (count, price) => {
			return __.isNumber(price) 
				? count 
				: count + 1
		}, 0)
		return num_problems === 0
	}

	@computed get //-
	_totalPriceForDownloads_is_ok() {
		const num_problems = __.reduce(this._defaultPrices_for_downloads, (count, price) => {
			return __.isNumber(price) || price === 'excluded'
				? count 
				: count + 1
		}, 0)
		return num_problems === 0
	}

	@computed get //-
	_totalPrice_for_prints() {
		const total = __.reduce(this._defaultPrices_for_prints, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}

	@computed get //-
	_totalPrice_for_retouches() {
		const total = __.reduce(this._defaultPrices_for_retouches, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}

	@computed get //-
	_totalPrice_for_retouches_final() {
		const total = __.reduce(this._finalPrices_for_retouches, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}

	@computed get //-
	_totalPrice_for_downloads() {
		const total = __.reduce(this._defaultPrices_for_downloads, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}

	@computed get
	_activePrint() {
		const i = this.index_for_activePrint
		return this.record.prints_list[i]
	}

	@computed get
	_activeDownload() {
		const i = this.index_for_activeDownload
		return this.record.downloads_list[i]
	}

	@computed get //-
	_totalPrice_for_workup() {
		return this._totalPrice_for_retouches + this._totalPrice_for_prints + this._totalPrice_for_downloads
	}

	@computed get
	_defaultPrices_for_prints() {
		const prints_list = this.record.prints_list // use toJS(this.record.prints_list) to debug mobx values as normal values
		const temp = __.map(prints_list, (PI, index) => {
			if (!PI.wanted) { return 'excluded' }
			const lookup_price_option_code = `${PI.size}=${PI.qty}=${PI.colour}=${PI.finish}`
			if (lookup_price_option_code.indexOf('undefined') !== -1) { return 'incomplete' }
			const agreement_options = this._printAgreementRecordWithOptions._options
			const option_index = __.findIndex(agreement_options, {option_code: lookup_price_option_code})
			if (option_index === -1 ) { return 'not found' }	
			return agreement_options[option_index].pixown_price || 'not priced yet' 
		})
		return temp
	}



	@computed get
	_defaultPrices_for_retouches() {
		//debugger
		const agreement_services = this._retouchAgreementRecordWithServiceDetails._services
		return __.map(this.record.retouches_list, (PI, index) => {
		//return this.record.retouches_list.map( (PI, index) => {
			if (!PI.wanted) { return 'excluded' }
			const service_index = __.findIndex(agreement_services, {service_code: PI.service_code})
			if (service_index === -1 ) { return 'not found' }	
			return agreement_services[service_index].pixown_price || 'not priced yet' 
		})
	}

	@computed get
	_finalPrices_for_retouches() {
		const agreement_services = this._retouchAgreementRecordWithServiceDetails._services
		return __.map(this.record.retouches_list, (PI, index) => {
		//return this.record.retouches_list.map( (PI, index) => {
			if (!PI.wanted) { return 'excluded' }
			const service_index = __.findIndex(agreement_services, {service_code: PI.service_code})
			if (service_index === -1 ) { return 'not found' }	
			const paid_matches = __.filter(
				this._detail_for_pose.paid_retouching_list || [], 
				{ service_code: PI.service_code }
			)
			return __.isEmpty(paid_matches)
				? agreement_services[service_index].pixown_price
				: 0 // already-paid-for retouching is free to do again
		})
	}

	@computed get
	______finalPixownPrice_for_activeRetouch() {
		const paid_matches = __.filter(
			this._detail_for_pose.paid_retouching_list || [], 
			{ service_code: this._retouch_for_activePage.service_code }
		)
		return __.isEmpty(paid_matches)
			? this._defaultPixownPrice_for_activeRetouch
			: 0 // already-paid-for retouching is free to do again
	}




	@computed get
	_defaultPrices_for_downloads() {
		return __.map(this.record.downloads_list, (PI, index) => {
			if (!PI.wanted) { return 'excluded' }
			const lookup_price_option_code = `${PI.size}=${PI.colour}`
			if (lookup_price_option_code.indexOf('undefined') !== -1) { return 'incomplete' }
			const agreement_options = this._downloadAgreementRecordWithOptions._options
			const option_index = __.findIndex(agreement_options, {option_code: lookup_price_option_code})
			if (option_index === -1 ) { return 'not found' }	
			return agreement_options[option_index].pixown_price || 'not priced yet' 
		})
	}

	@computed get
	_detail_for_pose() {
		return get_pose_details_from_proofs_list(toJS(this.sitting.proofs_list), this.record.pose_code)
	}

	@computed get
	_activePrint_is_complete() {
		const PI = this._activePrint
		const composite = `${PI.size}|${PI.colour}|${PI.finish}|${PI.qty}`
		return composite.indexOf('undefined') === -1
			? true
			: false
	}

	@computed get
	_activeDownload_is_complete() {
		const PI = this._activeDownload
		const composite = `${PI.size}|${PI.colour}`
		return composite.indexOf('undefined') === -1
			? true
			: false
	}

	@computed get
	_index_for_activePage() {
		return __.findIndex(this._orderedPages_for_wizard, (o) => {
			return o.key === this.pageKey 
		})
	}

	@computed get
	_activePage() {
		return this._orderedPages_for_wizard[this._index_for_activePage]
	}

	@computed get
	_activePage_is_retouchPage() {
		return this._activePage.group === Workup_Groups.RETOUCH.name
	}

	@computed get
	_nextPage_is_retouchPage() {
		return this._nextPage.group === Workup_Groups.RETOUCH.name
	}

	@computed get
	_nextPage_is_CartPage() {
		return this._nextPage.key === 'cart'
	}

	@computed get
	_nextPage_is_AddToCartPage() {
		return this._nextPage.key === 'add-to-cart'
	}

	@computed get
	_prevPage_is_ImageGalleryPage() {
		return this._prevPage.key === 'image-gallery'
	}

	@computed get
	_previousPage_is_retouchPage() {
		return this._prevPage.group === Workup_Groups.RETOUCH.name
	}

	@computed get //record.retouches_list must be in the order of the egreement
	_index_for_activeRetouch() {
		if (!this._activePage_is_retouchPage) {
			return undefined
		} else {
			const index = __.findIndex(this.record.retouches_list, { service_code: this._activePage.service_code })
			return index === -1 ? false : index
		}
	}

	@computed get
	_index_for_nextRetouch() {
		if (!this._nextPage_is_retouchPage) {
			return undefined
		} else {
			const index = __.findIndex(this.record.retouches_list, { service_code: this._nextPage.service_code })
			return index === -1 ? false : index
		}
	}

	@computed get
	_index_for_prevRetouch() {
		if (!this._previousPage_is_retouchPage) {
			return undefined
		} else {
			const index = __.findIndex(this.record.retouches_list, { service_code: this._prevPage.service_code })
			return index === -1 ? false : index
		}
	}

	@computed get
	_retouch_for_activePage() {
		return this._activePage_is_retouchPage
			? this.record.retouches_list[this._index_for_activeRetouch]
			: undefined
	}

	@computed get
	_retouch_for_prevPage() {
		return this._previousPage_is_retouchPage
			? this.record.retouches_list[this._index_for_prevRetouch]
			: undefined
	}

	@computed get
	_retouch_for_nextPage() {
		return this._nextPage_is_retouchPage
			? this.record.retouches_list[this._index_for_nextRetouch]
			: undefined
	}

	@computed get
	_serviceDetails_for_activeRetouch() {
		return this._retouch_for_activePage
			? __.find(this._retouchAgreementRecordWithServiceDetails._services, { service_code: this._activePage.service_code })
			: undefined
	}

	@computed get
	_serviceDetails_for_nextRetouch() {
		return this._retouch_for_nextPage
			? __.find(this._retouchAgreementRecordWithServiceDetails._services, { service_code: this._nextPage.service_code })
			: false
	}

	@computed get
	_serviceDetails_for_prevRetouch() {
		return this._retouch_for_prevPage
			? __.find(this._retouchAgreementRecordWithServiceDetails._services, { service_code: this._prevPage.service_code })
			: false
	}

	@computed get
	_label_for_nextPage() {
		const label = this._nextPage.label
			? this._nextPage.label
			: this._serviceDetails_for_nextRetouch._service_code_details
				? this._serviceDetails_for_nextRetouch._service_code_details.label
				: "oops!"
		if (label === "oops!") { debugger }
		return label
	}

	@computed get
	_label_for_prevPage() {
		const label = this._prevPage.label
			? this._prevPage.label
			: this._serviceDetails_for_prevRetouch._service_code_details
				? this._serviceDetails_for_prevRetouch._service_code_details.label
				: "oops!"
		if (label === "oops!") { debugger }
		return label
	}

	@computed get
	_nextPage() { // no need for guard - see page_order
		return this._orderedPages_for_wizard[this._index_for_activePage + 1]
	}

	@computed get
	_prevPage() { // no need for guard - see page_order
		return this._orderedPages_for_wizard[this._index_for_activePage - 1]
	}

	@computed get
	_wanted_for_activeRetouch() {
		return this.record.retouches_list[this._index_for_activeRetouch]['wanted']
	}

	@computed get
	_defaultPixownPrice_for_activeRetouch() {
		return this._retouch_for_activePage.pixown_price || this._serviceDetails_for_activeRetouch.pixown_price
	}



	@computed get
	_finalPixownPrice_for_activeRetouch() {
		const paid_matches = __.filter(
			this._detail_for_pose.paid_retouching_list || [], 
			{ service_code: this._retouch_for_activePage.service_code }
		)
		return __.isEmpty(paid_matches)
			? this._defaultPixownPrice_for_activeRetouch
			: 0 // already-paid-for retouching is free to do again
	}



	@computed get
	sitting() {
		return Sittings.findOne({ 
			studio_code: this.record.studio_code,
			school_code: this.record.school_code,
			sitting_code: this.record.sitting_code
		})
	}

	@computed get
	_imagesRecord_for_startingImage() {
		return Images.findOne({ _id: this.record.starting_image.image_id })
	}

	@computed get
	_imagesRecord_for_finalImage() {
		return this.record.final_image && this.record.final_image.image_id
			? Images.findOne({ _id: this.record.final_image.image_id })
			: undefined
	}

	@computed get
	_imagesRecord_for_downloadableImage() {
		return this.record.downloadable_image && this.record.downloadable_image.image_id
			? Images.findOne({ _id: this.record.downloadable_image.image_id })
			: undefined
	}

	@computed get
	_orderedPages_for_wizard() { // array
		const page_order_start = [
			{ // this is BEFORE the WIZARD 
				// and MUST always be in the order to allow PREV arrow on the firstst true wizard page
				key: 						'image-gallery',
				mobx_router: {
					key: 					'image_gallery',
					parms: 				{}
				},
				url: 						'/image-gallery',
				group: 					Workup_Groups.NA.name,
				type: 					Workup_Page_Types.NA.name,
				label: 					'GALLERY',
				question: 			null,
				image_filename: null,
				icon_name: 			'fa-table'
			},
		]
		const page_order_end = [
			/*{
				key:            'cropping',
				mobx_router: {
					key: 					'workup_wizard',
					parms: 				{page: 'cropping'}
				},
				url: 						'/cropping',
				group:          Workup_Groups.CROP.name,
				type:           Workup_Page_Types.CUSTOM_PAGE.name,
				title:          'Cropping|Needed',
				label:          'CROP',
				pixown_price:   300,
				vendor_cost:    145,
				note_to_customers:  null,
				question:       'Would you like to adjust your image angle or position?',
				explain:				['You can select a smaller area and rotate it']
				image_filename: '/images/basic-before.jpg',
				icon_name:      'fa-crop'
			},*/
			// -------------------------------------
			{
				key: 						'prints',
				mobx_router: {
					key: 					'workup_wizard',
					parms: 				{page: 'prints'}
				},
				url: 						'workup-wizard/prints',
				group: 					Workup_Groups.PRINT.name,
				type: 					Workup_Page_Types.CUSTOM_PAGE.name,
				title: 					'Prints|Wanted',
				label: 					'PRINTS',
				pixown_price: 	null,
				vendor_cost: 		null,
				note_to_customers: null,
				question: 			'Would you like prints made of this pose?',
				explain:				['You can choose multiple combinations of colour, finish and size'],
				image_filename: '/images/photos.png',
				icon_name: 			'fa-print'
			},
			// -------------------------------------
			{
				key: 						'download',
				mobx_router: {
					key: 					'workup_wizard',
					parms: 				{page: 'download'}
				},
				url: 						'/workup-wizard/download',
				group: 					Workup_Groups.DOWNLOAD.name,
				type:						Workup_Page_Types.CUSTOM_PAGE.name,
				title: 					'Download|Wanted',
				label: 					'DOWNLOAD',
				pixown_price: 	1300,
				vendor_cost: 		0,
				note_to_customers: null,
				question: 			'Would you like to have a digital copy of your image?',
				explain:				['All retouches will be included'],
				image_filename: '/images/download-arrow-th.png',
				icon_name: 			'fa-download'
			},
			// -------------------------------------
			{
				key:           	'summary',
				mobx_router: {
					key: 					'workup_wizard',
					parms: 				{page: 'summary'}
				},
				url: 						'/workup-wizard/summary',
				group:          Workup_Groups.SUMMARY.name,
				type:           Workup_Page_Types.DISPLAY_ONLY.name,
				title:          'Summary of Selections',
				label:          'SUMMARY',
				pixown_price:   null,
				vendor_cost:    null,
				note_to_customers:  null,
				question:       null,
				explain:				[],
				image_filename: null,
				icon_name:      'fa-address-card-o'
			},
			// -------------------------------------
			{
				key: 						'add-to-cart',
				mobx_router: {
					key: 					'workup_wizard',
					parms: 				{page: 'add-to-cart'}
				},
				url: 						'/workup-wizard/add-to-cart',
				group: 					Workup_Groups.ADD2CART.name,
				type: 					Workup_Page_Types.NA.name,
				title: 					'Add Pose Workup|to CART',
				label: 					'ADD TO CART',
				pixown_price: 	null,
				vendor_cost: 		null,
				note_to_customers: null,
				acronym: 				'ADD2CART',
				question: 			'Would you like to add this pose to your CART?',
				explain:				[],
				image_filename: '/images/green-checkmark.png',
				icon_name: 			'fa-cart-plus'
			},
			// -------------------------------------
			{
				// and MUST always be in the order to allow NEXT arrow on the last true wizard page
				key: 						'cart',
				mobx_router: {
					key: 					'cart',
					parms: 				{}
				},
				url: 						'/cart',
				group: 					Workup_Groups.NA.name,
				type:						Workup_Page_Types.NA.name,
				title: 					null,
				label: 					'CART',
				acronym: 				'CART',
				question: 			null,
				explain:				[],
				image_filename: '/images/basic-before.jpg',
				icon_name: 			'fa-shopping-cart'
			}
		]
		const retouch_pages = this._orderedRetouchPages_for_orderedPages
		return retouch_pages
			? __.concat(
				page_order_start,
				retouch_pages,
				page_order_end
			)
			: __.concat( // this is just to complete the coding - retouching agreement and their pages are required
				page_order_start,
				page_order_end
			)
	}

	@computed get 
	_orderedRetouchPages_for_orderedPages() {
		// augment retouching_agreement.services_list to match page_order so it can be inserted into page_order
		if (this._retouchAgreementRecordWithServiceDetails) {
			return __.map(this._retouchAgreementRecordWithServiceDetails.services_list, (service) => {
				service.key = 				service.service_code
				service.group = 			Workup_Groups.RETOUCH.name
				service.mobx_router = {
					key: 								'workup_wizard',
					parms: 							{page: service.service_code}
				},
				service.url = 				`/workup-wizard/${service.service_code}`,
				service.type = 				Workup_Page_Types.YES_NO.name
				return service
			})
		} else {
			console.error("This workup is MISSING the retouching agreement which cannot be allowed.")
			return undefined
		}
	}

	@computed get
	_vendorsRecord_for_studioCode() {
		return Vendors.findOne({
			vendor_code: this.record.studio_code 
		})
	}

	@computed get
	_schoolsRecord() {
		return Schools.findOne({
			school_code: this.record.school_code
		})
	}

	@computed get
	_retouchAgreementRecordWithServiceDetails() {
		return get_retouching_agreement_with_services(this.record.retouching_agreement_code)
	}

	@computed get
	_printAgreementRecordWithOptions() {
		return get_printing_agreement_with_options(this.record.printing_agreement_code)
	}

	@computed get
	_uniqueSizeOptionsInAgreement() {
		return __.uniq(
			__.map(this._printAgreementRecordWithOptions.options_list, (option, index) => {
				return option._option_code_details.size
			})
		)
	}

	@computed get
	_downloadAgreementRecordWithOptions() {
		return get_downloading_agreement_with_options(this.record.downloading_agreement_code)
	}

	// =========================================
	// from router
	_handle_onEnter_from_WorkupWizardPage = (params, queryParams) => {
		this._set_pageKey(params.page)
	}

	// =========================================
	_imagesRecord__given__image_id = (image_id) => {
		return image_id 
			? Images.findOne({_id: image_id})
			: undefined
	}

	_uniqueColourOptionsInAgreement_given_size = (size) => {
		const results = []
		__.map(this._printAgreementRecordWithOptions.options_list, (option, index) => {
			const detail = option._option_code_details
			if (detail.size === size) { results.push(detail.colour) }
		})
		return __.uniq(results)
	}

	// =========================================
	_uniqueFinishOptionsInAgreement_given_sizeAndColour = (size, colour) => {
		const results = []
		__.map(this._printAgreementRecordWithOptions.options_list, (option, index) => {
			const detail = option._option_code_details
			if (detail.size === size && detail.colour === colour) {
				results.push(detail.finish)
			}
		})
		return __.uniq(results)
	}
	
	// =========================================
	_get_page_given_pageKey = (page_order, pageKey) => {
		// returns the page that has the given key
		return _.find(this._orderedPages_for_wizard, (page) => { return page.key === pageKey })
	}
}
// ========================================================================

export { Workup_Wizard_Store }
