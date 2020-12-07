// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Printing_Agreements } from  '/imports/collections/Printing-Agreements/collection.js'
// ----components-------------------
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Printing_Agreement_Form } from  '/imports/client/ui/components/vendor/Printing-Agreements/printing-agreement-form/index.jsx'

// ========================================================================
class Printing_Agreement_List_Manager {
	
	constructor(store, {source, spec, content}) {
		this.__name = 'Printing_Agreement_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'PRINTING_AGREEMENTS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Printing_Agreements 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable paManagerList = []

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_raManagerList()
	//)

	// internal vars

	// actions ----------
	@action
	populate_paManagerList = (pa_records) => { // order_records is passed in
		this.paManagerList = __.isEmpty(pa_records)
		? []
		: __.map(pa_records, (pa_record) => {
			const paManager = new this.store.factories.printingAgreementFactory(this.store, {
				source: {
					obj: this,
					name: 'Printing_Agreement_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: pa_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Form_Wrapper,
				Form_Content: Printing_Agreement_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
			})
			paManager._set_record(pa_record)
			return paManager
		})
	}

	// =========================================
	// internal functions
	run_disposers = () => {
		//this.monitor_record_disposer()
	}

	// =========================================
	// connect helpers
	
	// =========================================
	// computeds --------
	@computed get
	vendor_code() {
		return this.rootStore.app.user_record.vendor_code
	}

	@computed get
	pa_count() {
		return this.paManagerList.length || 0
	}

	@computed get
	summary() {
		return this.pa_count===1 ? '1 record' : `${this.pa_count} records`
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

	export { Printing_Agreement_List_Manager }