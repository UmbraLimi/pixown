import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import { observable, action, computed, reaction, toJS
} 															from  'mobx'
import { toast } 								from  'react-toastify'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
import { Delivery_States } 			from  '/imports/enums/delivery-states.js'
import { Cart_States } 					from  '/imports/enums/cart-states.js'
// ----helpers----------------------
import { Workup_Wizard_Store } 	from  './Workup-Wizard-Store.js'
//import { app_routes }						from  '/imports/client/routes/app-routes.js'
// ----collections------------------
import { Workups }							from  '/imports/collections/Workups/collection.js'
// ----components-------------------

// ========================================================================
class CartStore {
	
	constructor(rootStore) {
		this.rootStore = rootStore 
		this.hst_percent = 13
		this.stripe_status = 'not started'
	}

	// observables ------
	@observable  wup_stores = []
	@observable  workup_index = undefined // current workup being looked at
	@observable  insurance_is_wanted = false
	@observable  cart_state = Cart_States.START.name
	@observable  hasErrors = false // not to include insurance
	@observable  isDirty = false // not to include insurance
	//@observable  notifications = []
	//@observable  discounts = []
	//@observable  postage_handling = []


	// internal vars

	// actions ----------
	/*@action
	reset__notifications = () => {
		this.notifications = []
	}

	@action
	add__notification = (notification) => {
		this.notifications.push(notification)
	}
	*/

	@action
	set__isDirty = () => {
		this.isDirty = true
	}

	@action
	unset__isDirty = () => {
		this.isDirty = false
	}

	@action
	set__hasErrors = () => {
		this.hasErrors = true
	}

	@action
	unset__hasErrors = () => {
		this.hasErrors = false
	}

	@action
	_toggle_insuranceIsWanted = () => {
		this.insurance_is_wanted = !this.insurance_is_wanted
	}

	@action
	set__workup_index = (index) => {
		this.workup_index = index
	}

	@action
	set__workup_index_using_id = (_id) => {
		this.workup_index = __.findIndex(this.wup_stores, (wup_store) => { return wup_store.record._id === _id })
	}

	@action  
	set__workup_stores = (wup_records) => { // we ignore the ui stuff
		this.wup_stores = [] // start fresh in case there are fewer or none after subscription update
		__.map(wup_records, (wup_record, index) => {
			const wup_store = new Workup_Wizard_Store(this.rootStore)
			wup_store._initialize_from_dbRecord(wup_record)
			this.wup_stores.push(wup_store)
		})
	}

	// =========================================
	// internal functions
	initialize = () => {
	}

	// =========================================
	_update_workup = async (mongo_id, record) => {
		try {
			//const result = await Meteor.callPromise('DB.update', "WORKUPS", mongo_id, record, {})
			const result = await Meteor.callPromise('DB.replace', "WORKUPS", mongo_id, record)
			console.log('Workup updated to state: ORDERED!', mongo_id)
			//this.props.set_workup_as_saved()
		} catch(error) {
			console.log('*** ERROR cart-page Workups _update_workup()','--', error)
		}
	}

	// =========================================
	_finalize_order = async (record) => {
		let step = 'start'
		try {
			step = 'order.insert'
			const order_id = await Meteor.callPromise('DB.insert', 'ORDERS', record)
			//TODO: the transaction below must be rolled back if the other DB inserts/updates fail
			//			do it in the error trapping by showing a code for what area in try/catch broke
			console.log('New Order saved!', order_id)

			step = 'transaction.insert'
			const transaction_id = await Meteor.callPromise('TRANSACTIONS.log_successful_order', ({
				order_id:  order_id,
				customer_code: record.customer_code
			}))
			console.log('New transaction saved!', transaction_id)

			// update workups involved
			__.forEach(this.wup_stores, async (wup_store) => {
				wup_store._set_store_to_nonWizard_mode()
				const wup = __.cloneDeep(wup_store.record)
				let was_updated = false

				// retouching
				let raw_retouching_total_cost = 0
				let retouching_total_discount = 0
				const retouches_list = __.cloneDeep(wup_store._wantedRetouches)
				if (retouches_list.length === 0) {
					wup.retouches_list = []
					wup.final_image = {
						//delivery_state: undefined,
						//delivery_transaction_id: undefined,
						//image_id: undefined
					}
				} else {
					wup.retouches_list = __.map(retouches_list, (retouch, rindex) => {
						wup_store._set_activeRetouch_to_index(rindex)
						wup_store._set_pageKey(retouch.service_code)
						const sold_price = wup_store._finalPixownPrice_for_activeRetouch
						const default_price = wup_store._defaultPixownPrice_for_activeRetouch
						raw_retouching_total_cost += default_price
						retouching_total_discount += sold_price - default_price
						retouch.sold_price = sold_price
						return retouch
					})
					// will need new LORES for gallery picture in this order
					wup.final_image = {
						delivery_state: Delivery_States.READY_to_SEND_to_VENDOR.name,
						delivery_transaction_id: transaction_id,
						//image_id: undefined // this will not be written to mongo
						//file_request_string: `${order_id}-Retouch`
					}
					step = 'sittings.update'
					was_updated = await Meteor.callPromise('SITTINGS.update_paid_retouching', wup) // should I wait for entire wup record to be updated?
				}
						
				// prints
				let raw_prints_total_cost = 0
				const prints_list = __.cloneDeep(wup_store._wantedPrints)
				if (prints_list.length === 0) {
					wup.prints_list = []
				} else {
					wup.prints_list = __.map(prints_list, (printt, pindex) => {
						printt.delivery_state = Delivery_States.READY_to_SEND_to_VENDOR.name
						printt.delivery_transaction_id = transaction_id
						//wup_store._set_activePrint_to_index(pindex)
						wup_store._set_pageKey('prints')
						const sold_price = wup_store._defaultPrices_for_prints[pindex]
						printt.sold_price = sold_price
						raw_prints_total_cost += sold_price
						return printt
					})
				}

				// downloads
				let raw_downloads_total_cost = 0
				const downloads_list = __.cloneDeep(wup_store._wantedDownloads)
				if (downloads_list.length === 0) {
					wup.downloads_list = []
				} else {
					wup.downloads_list = __.map(downloads_list, (download, dindex) => {
						download.delivery_state = Delivery_States.READY_to_SEND_to_VENDOR.name
						download.delivery_transaction_id = transaction_id
						//wup_store._set_activeDownload_to_index(dindex)
						wup_store._set_pageKey('download')
						const sold_price = wup_store._defaultPrices_for_downloads[dindex]
						download.sold_price = sold_price
						raw_downloads_total_cost += sold_price
						return download
					})
					wup.downloadable_image = {
						delivery_state: Delivery_States.READY_to_SEND_to_VENDOR.name,
						delivery_transaction_id: transaction_id,
						//image_id: undefined,
						//file_request_string: `${order_id}-Download`
					}
				}

				wup.state = Workup_States.ORDERED.name
				wup.order = {
					order_id: order_id,
					raw_prints_total_cost: raw_prints_total_cost,
					raw_downloads_total_cost: raw_downloads_total_cost,
					raw_retouching_total_cost: raw_retouching_total_cost,
					retouching_total_discount: retouching_total_discount
				}
				step = 'workups.update'
				await this._update_workup(wup._id, wup)
			})

		} catch(error) {
			switch (step) {
				case 'start':
					// shouldn't stop here
					console.log('*** unexpected ERROR: cart-store start','--', error)
					break
				case 'order.insert':
					// nothing needs to be rolled back as this is the first
					console.log('*** ERROR cart-page Orders order.insert','--', error)
					break
				case 'transaction.insert':
					// roll back order
					console.log('*** ERROR cart-page Orders transaction.insert','--', error)
					break
				case 'workups.update':
					// roll back transaction and order
					console.log('*** ERROR cart-page Orders workups.update','--', error)
					break
				case 'sittings.update':
					// roll back workups, transaction and order
					console.log('*** ERROR cart-page Orders sittings.update','--', error)
					break
				default:
					// unexpected error
					console.log('*** ERROR cart-page Orders _finalize_order()','--', error)
					break
			}
			throw error // to process it in UI
		}
	}

	// =========================================
	//_pre_finalize_order = async (record) => {
	//}

	// =========================================
	// from router
	handleOnEnterCartPage = (params, queryParams) => {
		this.initialize()
	}

	// =========================================
	//_rollback_prefinalize = () => {
	//	debugger
	//}
	// =========================================
	setup_stripe_handler = () => {
		// this is where the "Pay With Card" attempts to charge stripe
		this.stripe_handler = StripeCheckout.configure({
			key:     	Meteor.settings.public.stripe,
			// image must be accessible by stripe apparently for color theme matching in the Checkout form
			image:   	'https://res.cloudinary.com/pixownlive/image/upload/v1527798363/P_xu9hu7.jpg', //'/images/P.jpg',
			locale:  	'auto',
			token: 		async (token) => {
				let step
				// pass token and purchase info to the server here.
				try {
					//--
					//step = 'pre-finalizing order'
					//await this._pre_finalize_order(order)
					step = ''
					const charge = {
						amount:        this.total_cart_cost,
						currency:      'cad',
						source:        token.id,
						description:   'Pixown Order', //cart.order_description,
						receipt_email: token.email
					}
					//--
					step = 'processing Payment'
					this.stripe_status = 'processing payment'
					const response = await Meteor.callPromise('processPayment', charge)
					toast.success( 'Your payment was approved. Thank you!' )
					// now to save this
					const order = {
						customer_code: 			this.rootStore.app.customer_code,
						payment_provider: 	"Stripe",
						payment_datetime: 	new Date(),
						stripe_charge: 			charge,
						workups: 						__.map(this.wup_stores, (wup_store) => wup_store.record._id),
						studio_codes: 			__.uniq(__.map(this.wup_stores, (wup_store) => wup_store.record.studio_code)),
						stripe_response: 		response,
						insurance: {
							wanted: 					this.insurance_is_wanted,
							cost:							this.insurance_cost
						},
						user_record: 				this.rootStore.app.user_record, // snapshot of things there like email and mailing address
						discounts:	{
							retouching: 			this.retouching_discount,
							flash_sale: 			this.flash_sale_discount,
							cost_threshold:  	this.volume_discount,
							total: 						this.totalPrice_for_discounts
						},
						raw_cost_totals: {
							prints: 					this.totalPrice_for_prints,
							downloads: 				this.totalPrice_for_downloads,
							retouching: 			this.totalPrice_for_retouches,
							total: 						this.totalPrice_for_workups
						},
						postage_handling:		this.postage_handling_cost,
						pre_hst_total:			this.totalPrice_pre_hst,
						hst:								this.hst,
						grand_total_cost:		this.total_cart_cost
					}
					//--
					step = 'finalizing order'
					await this._finalize_order(order)
				} catch(error) {
					toast.error( error.reason )
					switch (step) {
						//case 'pre-finalizing order':
						//	// shouldn't stop here
						//	debugger
						//	console.log('*** unexpected ERROR: during pre-finalizing order','--', error)
						//	break
						case 'processing Payment':
							// needs to roll back the records written during prefinalize
							console.log('*** ERROR during Stripe payment processing','--', error)
							debugger
							//await this._rollback_prefinalize()
							break
						case 'finalizing order':
							// shouldn't stop here. Stripe payment accepted
							debugger
							console.log('*** ERROR during finalizing order','--', error)
							break
						default:
							// unexpected error
							debugger
							console.log('*** unexpected ERROR during setup_stripe_handler()','--', error)
							break
					}
					throw error // to process it in UI
				} finally {
					this.stripe_status = 'complete'
				}
			}
		})
	}
	
	// =========================================
	teardown_stripe_handler = () => {
		this.stripe_handler.close()
	}

	// =========================================
	stripe_checkout = () => {
		// cause Stripes UI to appear as configured
		this.stripe_handler.open({
			name:          "Pixown Order", // a generic name used only in stripe UI
			amount:        this.total_cart_cost,
			description:   "prints and/or digital downloads"
		})
		// see setup_stripe_handler() for processing after successful stripe payment
	}

	test_stripe_checkout = () => {
		// for testing only  ***************************************
		try {
			const charge = {
				amount:        this.total_cart_cost,
				currency:      'cad',
				source:        'bogus_testing_token',//cart.token.id,
				description:   'Pixown Order', //cart.order_description,
				receipt_email: 'bogus@me.corm', //cart.token.email
			}
			const order = {
				customer_code: 		this.rootStore.app.customer_code,
				stripe_charge: 		charge,
				payment_provider: "bogus Stripe",
				payment_datetime: new Date(),
				workups: 					_.map(this.workup_stores, (wup_store) => wup_store.record._id),
				stripe_response: 	{ how: 'bogus stripe response object' } 
			}
			this._finalize_order(order)
		} catch(e) {
			throw e // rethrow error
		}
	}
	
	// computeds --------
	// ====================================================================
	@computed get
	user_record() {
		return this.rootStore.app.user_record
	}
	@computed get
	customer_code() {
		return this.user_record.meteor_username // this.rootStore.app.customer_code
	}
	@computed get
	mailing_address() {
		return this.user_record.mailing_address
	}
	@computed get
	billing_address() {
		return this.user_record.billing_address
	}
	@computed get
	email() {
		return this.user_record.email
	}

	@computed get
	is_for_Canada() {
		const country = this.mailing_address.country.toUpperCase()
		return __.includes(['CA', 'CAN', 'CANADA'], country)	? true : false
	}

	@computed get
	workup() {
		return this.wup_stores[this.workup_index]
	}

	@computed get
	num_workups() { // alias
		return this.cart_count
	}

	@computed get  
	cart_count() {
		return this.wup_stores.length
	}

	@computed get
	totalPrice_for_downloads() {
		const total = __.reduce(this.wup_stores, (sum, wup_store) => {
			return sum + wup_store._totalPrice_for_downloads
		}, 0)
		return total
	}
	@computed get
	totalPrice_for_retouches() { //  discounts for paid retouching not used here
		const total = __.reduce(this.wup_stores, (sum, wup_store) => {
			return sum + wup_store._totalPrice_for_retouches
		}, 0)
		return total
	}
	@computed get
	totalPrice_for_retouches_final() { //  discounts for paid retouching not used here
		const total = __.reduce(this.wup_stores, (sum, wup_store) => {
			return sum + wup_store._totalPrice_for_retouches_final
		}, 0)
		return total
	}
	@computed get
	totalPrice_for_prints() {
		const total = __.reduce(this.wup_stores, (sum, wup_store) => {
			return sum + wup_store._totalPrice_for_prints
		}, 0)
		return total
	}
	@computed get
	totalPrice_for_workups() {
		const total = __.reduce(this.wup_stores, (sum, wup_store) => {
			return sum + wup_store._totalPrice_for_workup
		}, 0)
		return total
	}

	@computed get
	volume_discount() {
		// this is already guarded from discounts exceeding products+services
		const tot_wups = this.totalPrice_for_workups
		return tot_wups < 10000 ? 0
			: tot_wups < 15000 ? -1500
			: tot_wups < 20000 ? -2200
			: tot_wups < 25000 ? -3000
			: tot_wups < 30000 ? -4000 : -5000
	}

	@computed get
	totalPrice_for_workups_after_volume_discount() {
		return this.totalPrice_for_workups + this.volume_discount
	}

	@computed get
	retouching_discount() {
		const spsr = this.totalPrice_for_retouches_final - this.totalPrice_for_retouches
		const total = this.totalPrice_for_workups_after_volume_discount
		return total === 0
			? 0
			: spsr + total >= 0
				? spsr
				: -total
	}

	@computed get
	totalPrice_for_workups_after_retouching_discount() {
		return this.totalPrice_for_workups_after_volume_discount + this.retouching_discount
	}

	@computed get
	flash_sale_discount() {
		const flash = 0 // test -2500
		const total = this.totalPrice_for_workups_after_retouching_discount
		return total === 0
			? 0
			: flash + total >= 0
				? flash
				: -total 
	}

	@computed get
	totalPrice_for_workups_after_flash_discount() {
		return this.totalPrice_for_workups_after_retouching_discount + this.flash_sale_discount
	}

	@computed get
	totalPrice_for_discounts() {
		return this.volume_discount 
		+ this.flash_sale_discount
		+ this.retouching_discount
	}

	@computed get
	totalPrice_after_discounts() {
		return this.totalPrice_for_workups + this.totalPrice_for_discounts
	}

	@computed get
	insurance_cost() {
		return this.insurance_is_wanted ? this.insurance_price : 0
	}

	@computed get
	insurance_price() {
		return 1000
	}

	@computed get
	totalPrice_after_insurance() {
		return this.totalPrice_after_discounts + this.insurance_cost
	}

	@computed get
	postage_handling_cost() {
		const total = this.totalPrice_after_insurance
		const has_20x24 = this._has_wanted_print_size_in_order('20x24')
		const has_16x20 = this._has_wanted_print_size_in_order('16x20')
		const has_11x14 = this._has_wanted_print_size_in_order('11x14')
		return total === 0
			? 0
			: !this.is_for_Canada // i.e. for USA
				? 4000
				: has_20x24
					? 1600
					: has_16x20
						? 1400
						: has_11x14
							? 1200
							: 1000
	}

	@computed get
	totalPrice_after_postage_handling() {
		return this.totalPrice_after_insurance + this.postage_handling_cost
	}

	@computed get
	totalPrice_pre_hst() {
		return this.totalPrice_for_workups 
		+ this.totalPrice_for_discounts
		+ this.insurance_cost
		+ this.postage_handling_cost
	}

	@computed get
	hst() {
		return parseInt((this.totalPrice_pre_hst	* this.hst_percent+50)/100)
	}

	@computed get
	total_cart_cost() {
		return this.totalPrice_pre_hst + this.hst 
	}

	// ===============================
	_has_wanted_print_size_in_order = (size) => {
		let count = 0
		__.map(this.wup_stores, (wup_store, ii) => {
			__.map(wup_store.record.prints_list, (print, jj) => {
				if (print.wanted) {
					const this_size = print.option_code.split("=")[0]
					if (this_size === size) { count ++ }
				}
			})
		})
		return count > 0
	}
}
// ========================================================================

	export { CartStore }