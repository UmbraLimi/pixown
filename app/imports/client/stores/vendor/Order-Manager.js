// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { find_ONE_record_on_client, find_ALL_records_on_client
} 					from '/imports/client/db/collection-helpers.js'
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Vendors }							from  '/imports/collections/Vendors/collection.js'
import { Orders }								from  '/imports/collections/Orders/collection.js'
import { PUsers }								from  '/imports/collections/PUsers/collection.js'
import { Workups }							from  '/imports/collections/Workups/collection.js'
// ----components-------------------
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Workup_Form }         	from  '/imports/client/ui/components/vendor/Workups/workup-form/index.jsx'

// ========================================================================
class Order_Manager {

	constructor(store, {source, content, Form_Content, notifyStore}) {
		this.__name = 'Order_Manager'
		this.store = store 
		
		this.source=source  // object 
		/*
			obj: 	 this, // whatever created the Mgr
			name: 'Order_Page',  // the obj's textual name
			parms: object // whatever select criteria are needed to populate the Mgr .record
		*/
		this.spec = {
			type: 'single',
			colleXion: 'ORDERS',
			name: 'ORDERS.composite.one-mongo-id',
			args: {_id: source.parms.mongo_id },
			options: null
		}
		this.content = content
 		this.Form_Content = Form_Content

		this.workupManagerList = []  // one for each of record.workups

		this.notifyStore = notifyStore ? notifyStore : false
		this.colleXion = Orders 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'blue-madison'
		this.button_theme_name = 'blue-bold'
		this.button_hover_theme_name = 'blue-oleo'

		// =========================================
		this.populate_workupManagerList = () => { // reacts to this.record changes
			const workup_records = this._workupRecords || [] // need to get the records that match the ids first
			this.workupManagerList = __.isEmpty(workup_records)
				? []
				: __.map(workup_records, (workup_record) => {
					const workupManager = new store.factories.workupFactory(store, {
						source: {
							obj: this,
							name: 'Order_Manager',
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
	}

	// observables ------
	@observable  record = {}

	// RE-ACTIONS
	// ====================================================================
	monitor_record_disposer = reaction(
    () => this.record,
		() => this.populate_workupManagerList()
	)

	// internal vars (defaults and/or starting values)

	// actions ----------
	@action
	_set_record = (record) => {
		this.record = record
	}

	// =========================================
	// internal functions
	run_disposers = () => {
		this.monitor_record_disposer()
	}

	// =========================================
	// RELATED DIRECT RECORDS
	@computed get
	_customersRecord () {
		return find_ONE_record_on_client("PUSERS", {
			args: {meteor_username: this.record.customer_code}
		})
	}
	@computed get
	_studiosRecord () {
		return find_ONE_record_on_client("VENDORS", {
			args: { vendor_code: this.record.studio_codes }
		})
	}

	// =========================================
	// computeds --------
	@computed get
	summary() {
		return this.source.parms.mode ==='NEW'
			? 'NEW'
			: this.record
				? this.record._id
				: 'missing _id'
	}
	
	@computed get
	_workupRecords() {
		const id_list = toJS(this.record.workups) || []
		return Workups.find({
			_id: {"$in": id_list}
		}).fetch()
	}

	@computed get
	num_workups() {
		return this.workupManagerList.length
	}

	@computed get
	_ordersRecord_for_studioCode() {
		const vendor_code = this.record.studio_codes
		return vendor_code
			? Vendors.findOne({
					vendor_code: vendor_code
				})
			: {}
	}

	@computed get
	_vendorsRecord_for_studioCode() {
		const vendor_code = this.record.studio_codes
		return vendor_code
			? Vendors.findOne({
					vendor_code: vendor_code
				})
			: {}
	}
	// --------------------------------------------------
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

	export { Order_Manager }