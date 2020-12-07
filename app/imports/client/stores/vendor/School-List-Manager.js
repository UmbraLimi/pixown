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
import { Schools }							from  '/imports/collections/Schools/collection.js'
// ----components-------------------
import { School_Form }         	from  '/imports/client/ui/components/vendor/Schools/school-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'

// ========================================================================
class School_List_Manager {
	
	constructor(store, {source, spec, content}) {
		this.__name = 'School_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'SCHOOLS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Schools 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable schoolManagerList = []

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_raManagerList()
	//)

	// internal vars

	// actions ----------
	@action
	populate_schoolManagerList = (school_records) => { // order_records is passed in
		this.schoolManagerList = __.isEmpty(school_records)
		? []
		: __.map(school_records, (school_record) => {
			const schoolManager = new this.store.factories.schoolFactory(this.store, {
				source: {
					obj: this,
					name: 'School_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: school_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Form_Wrapper,
				Form_Content: School_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
			})
			schoolManager._set_record(school_record)
			return schoolManager
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
	school_count() {
		return this.schoolManagerList.length || 0
	}

	@computed get
	summary() {
		return this.school_count===1 ? '1 record' : `${this.school_count} records`
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

	export { School_List_Manager }