// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
//import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
//import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
import { Workups }							from  '/imports/collections/Workups/collection.js'
// ----components-------------------
import { Workup_Form }         	from  '/imports/client/ui/components/vendor/Workups/workup-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'

// ========================================================================
class Workup_List_Manager {

	constructor(store, {source, spec, content}) {
		this.__name = 'Workup_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'WORKUPS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Workups 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable workupManagerList = []

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_workupManagerList()
	//)


	// internal vars

	// actions ----------
	@action
	populate_workupManagerList = (workup_records) => {
		this.workupManagerList = __.isEmpty(workup_records)
		? []
		: __.map(workup_records, (workup_record) => {
			const workupManager = new this.store.factories.workupFactory(this.store, {
				source: {
					obj: this,
					name: 'Workup_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: workup_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Form_Wrapper,
				Form_Content: Workup_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
			})
			workupManager._set_record(workup_record)
			return workupManager
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
		return this.store.app.user_record.vendor_code
	}

	@computed get
	uorkup_count() {
		return this.workupManagerList.length || 0
	}

	@computed get
	summary() {
		return this.uorkup_count===1 ? '1 record' : `${this.uorkup_count} records`
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

	export { Workup_List_Manager }