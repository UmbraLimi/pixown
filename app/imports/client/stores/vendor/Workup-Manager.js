// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
import { Delivery_States as ds_ } from  '/imports/enums/delivery-states.js'
// ----helpers----------------------
import { find_ONE_record_on_client, find_ALL_records_on_client
} 					from '/imports/client/db/collection-helpers.js'
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
//import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
import { get_retouching_agreement_with_services 
}						from  '/imports/collections/Retouching-Agreements/helpers.js'
import { get_printing_agreement_with_options 
} 					from  '/imports/collections/Printing-Agreements/helpers.js'
import { get_downloading_agreement_with_options 
} 					from  '/imports/collections/Downloading-Agreements/helpers.js'
import { get_paid_retouch_for_pose_from_proofs_list, get_pose_details_from_proofs_list
}						from  '/imports/collections/Sittings/helpers.js'
// ----collections------------------
import { Workups }							from  '/imports/collections/Workups/collection.js'
// ----components-------------------
//import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
//import { Workup_Form }         	from  '/imports/client/ui/components/vendor/Workups/workup-form/index.jsx'

// ========================================================================
class Workup_Manager {

	constructor(store, {source, content, Form_Content, notifyStore}) {
		this.__name = 'Workup_Manager'
		this.store = store 

		this.source=source  // object 
		this.spec = {
			type: 'single',
			colleXion: 'WORKUPS',
			name: 'WORKUPS.composite.one-mongo-id',
			args: {_id: source.parms.mongo_id },
			options: null
		}
		this.content = content
		this.Form_Content = Form_Content

		this.notifyStore = notifyStore ? notifyStore : false
		this.colleXion = Workups 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]
		
		this.theme_name = 'blue-madison'
		this.button_theme_name = 'blue-bold'
		this.button_hover_theme_name = 'blue-oleo'

	}

	// observables ------
	@observable  record = {}

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_workupManagerList()
	//)

	// internal vars (defaults and/or starting values)

	// actions ----------
	@action
	_set_record = (record) => {
		this.record = record
	}

	// =========================================
	// internal functions
	run_disposers = () => {
		//this.monitor_record_disposer()
	}

// =========================================
	// RELATED DIRECT RECORDS
	@computed get
	_retouchingAgreementsRecord () {
		return find_ONE_record_on_client("RETOUCHING_AGREEMENTS", {
			args: {agreement_code: this.record.agreement_code}
		})
	}
	@computed get
	_downloadingAgreementsRecord () {
		return find_ONE_record_on_client("DOWNLOADING_AGREEMENTS", {
			args: {agreement_code: this.record.agreement_code}
		})
	}
	@computed get
	_printingAgreementsRecord () {
		return find_ONE_record_on_client("PRINTING_AGREEMENTS", {
			args: {agreement_code: this.record.agreement_code}
		})
	}
	@computed get
	_schoolsRecord() {
		return find_ONE_record_on_client("SCHOOLS", {
			args: {school_code: this.record.school_code}
		})
	}
	@computed get  // TODO: refactor - used in WorkupWizard
	_vendorsRecord_for_studioCode() {
		const {studio_codes} = this.record
		return studio_codes
			? find_ONE_record_on_client("VENDORS", {
					args: {vendor_code: studio_codes}
				})
			: {} // TODO: refactor to send back undefined
	}
	@computed get
	_ordersRecord() {
		const { order } = this.record
		return order && order.order_id
		? find_ONE_record_on_client("ORDERS", {
				args: {_id: order.order_id}
			})
		: undefined
	}
	@computed get
	_imagesRecord_for_startingImage() {
		const { starting_image } = this.record
		return starting_image && starting_image.image_id
		? find_ONE_record_on_client("IMAGES", {
				args: {_id: starting_image.image_id}
			})
		: undefined
	}

	@computed get
	_imagesRecord_for_finalImage() {
		const { final_image } = this.record
		return final_image && final_image.image_id
		? find_ONE_record_on_client("IMAGES", {
				args: {_id: final_image.image_id}
			})
		: undefined
	}
	@computed get
	_imagesRecord_for_downloadableImage() {
		const { downloadable_image } = this.record
		return downloadable_image && final_image.image_id
		? find_ONE_record_on_client("IMAGES", {
				args: {_id: downloadable_image.image_id}
			})
		: undefined
	}
	/* ------------------------- */
	@computed get
	_workupRecords() {
		const id_list = this.record.workups
		return find_ALL_records_on_client("WORKUPS", {
			args: {	_id: {"$in": id_list}}
		})
	}
	
	// =========================================
	// INDIRECT RECORDS
	@computed get
	_vendorsRecord_for_Downloading_AgreementCode () {
		const DAR = this._downloadingAgreementsRecord
		return DAR
		?	find_ONE_record_on_client("VENDORS", {
				args: {vendor_code: DAR.vendor_code}
			})
		: undefined
	}
	@computed get
	_vendorsRecord_for_Printing_AgreementCode () {
		const PAR = this._printingAgreementsRecord
		return PAR
		?	find_ONE_record_on_client("VENDORS", {
				args: {vendor_code: PAR.vendor_code}
			})
		: undefined
	}
	@computed get
	_vendorsRecord_for_Retouching_AgreementCode () {
		const RAR = this._retouchingAgreementsRecord
		return RAR
		?	find_ONE_record_on_client("VENDORS", {
				args: {vendor_code: RAR.vendor_code}
			})
		: undefined
	}
	// =========================================


	// =========================================
	_imagesRecord = (args) => {
		return find_ONE_record_on_client("IMAGES", {
			args: { _id: args.image_id }
		})
	}

	

	// =========================================
	// =========================================
	// =========================================


	
	@computed get
	overall_retouches_status() {
		const list = toJS(this.record.retouches_list)
		if (__.isEmpty(list) || list.length===0) {return 'N/A'}
		const states = __.map(list, (retouch, i) => {
			return retouch.delivery_state || 'unknown'
		})
		const uniques = __.uniq(states)
		return uniques.length === 1
			? uniques[0]
			: 'mixed'
	}

	@computed get
	overall_downloads_status() {
		const list = toJS(this.record.downloads_list)
		if (__.isEmpty(list) || list.length===0) {return 'N/A'}
		const states = __.map(list, (download, i) => {
			return download.delivery_state || 'unknown'
		})
		const uniques = __.uniq(states)
		if (uniques.length !==1) {debugger}
		return uniques.length === 1
			? uniques[0]
			: 'mixed'
	}

	@computed get
	overall_prints_status() {
		const list = toJS(this.record.prints_list)
		if (__.isEmpty(list) || list.length===0) {return 'N/A'}
		const states = __.map(list, (print, i) => {
			return print.delivery_state || 'unknown'
		})
		const uniques = __.uniq(states)
		return uniques.length === 1
			? uniques[0]
			: 'mixed'
	}

	@computed get
	_wantedPrintsCount() {
		return this._wantedPrints.length
	}

	@computed get
	_wantedDownloadsCount() {
		return this._wantedDownloads.length
	}

	// FIXME:
	@computed get 
	_closestImageURL_for_pose() {  // large background image used in wizard and in cart?
		const paid_retouch = get_paid_retouch_for_pose_from_proofs_list(
			toJS(this.sitting.proofs_list), this.record.pose_code, this._activePage
		)
		// paid_retouch will return an array with 0 or 1 item in it
		if (__.isEmpty(paid_retouch)) {
			return this._imagesRecord_for_startingImage.url
		} else {
			const retouch = paid_retouch[0]
			const ok_states = [ds_.READY_to_SEND_to_VENDOR.name, ds_.REQUESTED_from_VENDOR.name]
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
				//return get_url_for_image_id(retouch.image_id)
				return this._imagesRecord({image_id: retouch.image_id}).url
			}
		}
	}

	@computed get
	_detail_for_pose() {
		return get_pose_details_from_proofs_list(toJS(this.sitting.proofs_list), this.record.pose_code)
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
	_uniqueSizeOptionsInAgreement() { // needed?
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
	// =========================================
	// =========================================


	// computeds --------
	/* ------------------------- */
	@computed get
	_latestImageURL () {
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
		const image_record = this._imagesRecord({image_id: image_id})
		image_url = image_record.url
		if (use_overlay) {
			// need to splice (for cloudinary) the overlay into the URL and match the width/height of image
			const temp = image_url.split('/')
			temp[temp.length-2] = `l_${overlay},w_${image_record.width},h_${image_record.height}/${temp[temp.length-2]}`
			image_url = temp.join('/')
		}
		return image_url
	}
	/* ------------------------- */
	@computed get
	num_workups() {
		return this.record.workups.length
	}
	/* ------------------------- */
	@computed get
	summary() {
		return this.source.parms.mode ==='NEW'
			? 'NEW'
			: this.record
				? this.record._id
				: 'missing _id'
	}

	/* ------------------------- */
	@computed  get  
	theme_colour() {
		const theme_colour = get_theme_from_name(this.theme_name)
		return theme_colour ? theme_colour : {base:'orange', font: 'black'}
	}
	/* ------------------------- */
	@computed  get  
	button_theme_colour() {
		const theme_colour = get_theme_from_name(this.button_theme_name)
		return theme_colour ? theme_colour : {base:'orange', font: 'black'}
	}
	/* ------------------------- */
	@computed  get  
	button_hover_theme_colour() {
		const theme_colour = get_theme_from_name(this.button_hover_theme_name)
		return theme_colour ? theme_colour : {base:'orange', font: 'black'}
	}
	/* ------------------------- */

	// computeds from WorkupWixard -------------------
	@computed get
	_totalPrice_for_workup() {
		return this._totalPrice_for_retouches + this._totalPrice_for_prints + this._totalPrice_for_downloads
	}
	/* ------------------------- */
	@computed get 
	_totalPrice_for_retouches() {
		const total = __.reduce(this._defaultPrices_for_retouches, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}
	/* ------------------------- */
	@computed get 
	_totalPrice_for_retouches_final() {
		const total = __.reduce(this._finalPrices_for_retouches, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}
	/* ------------------------- */
	@computed get 
	_totalPrice_for_downloads() {
		const total = __.reduce(this._defaultPrices_for_downloads, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}
	/* ------------------------- */
	@computed get 
	_totalPrice_for_prints() {
		const total = __.reduce(this._defaultPrices_for_prints, (sum, price) => {
			return __.isNumber(price) 
				? sum + price 
				: sum
		}, 0)
		return total
	}
	/* ------------------------- */
	@computed get
	_totalPriceForPrints_is_ok() {
		const num_problems = __.reduce(this._defaultPrices_for_prints, (count, price) => {
			return __.isNumber(price) || price === 'excluded'
				? count 
				: count + 1
		}, 0)
		return num_problems === 0
	}
	/* ------------------------- */
	@computed get 
	_totalPriceForRetouches_is_ok() {
		const num_problems = __.reduce(this._defaultPrices_for_retouches, (count, price) => {
			return __.isNumber(price) 
				? count 
				: count + 1
		}, 0)
		return num_problems === 0
	}
	/* ------------------------- */
	@computed get
	_totalPriceForDownloads_is_ok() {
		const num_problems = __.reduce(this._defaultPrices_for_downloads, (count, price) => {
			return __.isNumber(price) || price === 'excluded'
				? count 
				: count + 1
		}, 0)
		return num_problems === 0
	}

	@computed get
	_defaultPrices_for_downloads() {
		if (!this._downloadAgreementRecordWithOptions) {return []}
		const agreement_options = this._downloadAgreementRecordWithOptions._options
		const downloads_list = this.record.downloads_list 
		return __.map(downloads_list, (PI, index) => {
			if (!PI.wanted) { return 'excluded' }
			const lookup_price_option_code = `${PI.size}=${PI.colour}`
			if (lookup_price_option_code.indexOf('undefined') !== -1) { return 'incomplete' }
			const option_index = __.findIndex(agreement_options, {option_code: lookup_price_option_code})
			if (option_index === -1 ) { return 'not found' }	
			return agreement_options[option_index].pixown_price || 'not priced yet' 
		})
	}

	@computed get
	_defaultPrices_for_prints() {
		if (!this._printAgreementRecordWithOptions) {return []}
		const agreement_options = this._printAgreementRecordWithOptions._options
		const prints_list = this.record.prints_list 
		return __.map(prints_list, (PI, index) => {
			if (!PI.wanted) { return 'excluded' }
			const lookup_price_option_code = `${PI.size}=${PI.qty}=${PI.colour}=${PI.finish}`
			if (lookup_price_option_code.indexOf('undefined') !== -1) { return 'incomplete' }
			const option_index = __.findIndex(agreement_options, {option_code: lookup_price_option_code})
			if (option_index === -1 ) { return 'not found' }	
			return agreement_options[option_index].pixown_price || 'not priced yet' 
		})
	}

	@computed get
	_defaultPrices_for_retouches() {
		if (!this._retouchAgreementRecordWithServiceDetails) {return []}
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
		if (!this._retouchAgreementRecordWithServiceDetails) {return []}
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
	/* ------------------------- */
	@computed get
	_wantedRetouches() {
		return _.filter(this.record.retouches_list, (item) => {return item.wanted === true})
	}
	/* ------------------------- */
	@computed get
	_wantedPrints() {
		return _.filter(this.record.prints_list, (item) => {return item.wanted === true})
	}
	/* ------------------------- */
	@computed get
	_wantedDownloads() {
		return _.filter(this.record.downloads_list, (item) => {return item.wanted === true})
	}
	/* ------------------------- */
}

// ========================================================================

	export { Workup_Manager }