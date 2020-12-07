// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
//import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Orders }								from  '/imports/collections/Orders/collection.js'
// ----components-------------------
import { Order_Form }         	from  '/imports/client/ui/components/vendor/Orders/order-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'

// ========================================================================
class Order_List_Manager {

	constructor(store, {source, spec, content}) {
		this.__name = 'Order_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'ORDERS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Orders 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable orderManagerList = []

	// RE-ACTIONS
	// ====================================================================
	// internal vars

	// actions ----------
	@action
	populate_orderManagerList = (order_records) => { // order_records is passed in
		this.orderManagerList = __.isEmpty(order_records)
		? []
		: __.map(order_records, (order_record) => {
			const orderManager = new this.store.factories.orderFactory(this.store, {
				source: {
					obj: this,
					name: 'Order_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: order_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Form_Wrapper,
				Form_Content: Order_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
			})
			orderManager._set_record(order_record)
			return orderManager
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
	order_count() {
		return this.orderManagerList.length || 0
	}

	@computed get
	summary() {
		return this.order_count===1 ? '1 record' : `${this.order_count} records`
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

	export { Order_List_Manager }