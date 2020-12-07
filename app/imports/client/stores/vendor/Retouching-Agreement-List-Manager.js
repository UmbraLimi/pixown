// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Retouching_Agreements } from  '/imports/collections/Retouching-Agreements/collection.js'
// ----components-------------------
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Retouching_Agreement_Form } from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreement-form/index.jsx'

// ========================================================================
class Retouching_Agreement_List_Manager {
	
	constructor(store, {source, spec, content}) {
		this.__name = 'Retouching_Agreement_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'RETOUCHING_AGREEMENTS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Retouching_Agreements 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable raManagerList = []

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_raManagerList()
	//)

	// internal vars

	// actions ----------
	@action
	populate_raManagerList = (ra_records) => { // order_records is passed in
		this.raManagerList = __.isEmpty(ra_records)
		? []
		: __.map(ra_records, (ra_record) => {
			const raManager = new this.store.factories.retouchingAgreementFactory(this.store, {
				source: {
					obj: this,
					name: 'Retouching_Agreement_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: ra_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Form_Wrapper,
				Form_Content: Retouching_Agreement_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
			})
			raManager._set_record(ra_record)
			return raManager
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
	ra_count() {
		return this.raManagerList.length || 0
	}

	@computed get
	summary() {
		return this.ra_count===1 ? '1 record' : `${this.ra_count} records`
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

	export { Retouching_Agreement_List_Manager }