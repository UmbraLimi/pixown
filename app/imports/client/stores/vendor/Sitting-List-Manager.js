// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
//import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Sittings }							from  '/imports/collections/Sittings/collection.js'
// ----components-------------------
import { Sitting_Form }         from  '/imports/client/ui/components/vendor/Sittings/sitting-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'

// ========================================================================
class Sitting_List_Manager {
	
	constructor(store, {source, spec, content}) {
		this.__name = 'Sitting_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'SITTINGS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Sittings 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable sittingManagerList = []

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_raManagerList()
	//)

	// internal vars

	// actions ----------
	@action
	populate_sittingManagerList = (sitting_records) => {
		this.sittingManagerList = __.isEmpty(sitting_records)
		? []
		: __.map(sitting_records, (sitting_record) => {
			const sittingManager = new this.store.factories.sittingFactory(this.store, {
				source: {
					obj: this,
					name: 'Sitting_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: sitting_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Form_Wrapper,
				Form_Content: Sitting_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
			})
			sittingManager._set_record(sitting_record)
			return sittingManager
		})
	}

	// =========================================
	// internal functions
	run_disposers = () => {
		//this.monitor_record_disposer()
	}

	// =========================================
	// computeds --------
	@computed get
	vendor_code() {
		return this.rootStore.app.user_record.vendor_code
	}

	@computed get
	sitting_count() {
		return this.sittingManagerList.length || 0
	}

	@computed get
	summary() {
		return this.sitting_count===1 ? '1 record' : `${this.sitting_count} records`
	}

	@computed  get  
	theme_colour() {
		const theme_colour = get_theme_from_name(this.theme_name)
		return theme_colour ? theme_colour : {base:'orange', font: 'black'}
	}
	@computed  get  
	button_theme_colour() {
		const theme_colour = get_theme_from_name(this.button_theme_name)
		return theme_colour ? theme_colour : {base:'orange', font: 'black'}
	}
	@computed  get  
	button_hover_theme_colour() {
		const theme_colour = get_theme_from_name(this.button_hover_theme_name)
		return theme_colour ? theme_colour : {base:'orange', font: 'black'}
	}
}
// ========================================================================

	export { Sitting_List_Manager }