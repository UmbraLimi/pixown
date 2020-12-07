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
import { Printing_Agreements }	from  '/imports/collections/Printing-Agreements/collection.js'
import { Retouching_Agreements }	from  '/imports/collections/Retouching-Agreements/collection.js'
import { Downloading_Agreements }	from  '/imports/collections/Downloading-Agreements/collection.js'
import { Vendors }							from  '/imports/collections/Vendors/collection.js'
import { Schools }							from  '/imports/collections/Schools/collection.js'
import { Sittings }							from  '/imports/collections/Sittings/collection.js'
import { Images } 							from  '/imports/collections/Images/collection.js'
// ----components-------------------
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Image_Form }         	from  '/imports/client/ui/components/vendor/Images/image-form/index.jsx'

// ========================================================================
class Sitting_Manager {
	
	constructor(store, {source, content, Form_Content, notifyStore}) {
		this.__name = 'Sitting_Manager'
		this.store = store 

		this.source=source  // object 
		this.spec = {
			type: 'single',
			colleXion: 'SITTINGS',
			name: 'SITTINGS.composite.one-mongo-id',
			args: {_id: source.parms.mongo_id },
			options: null
		}
		this.content = content
		this.Form_Content = Form_Content

		this.notifyStore = notifyStore ? notifyStore : false
		this.colleXion = Sittings 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'blue-madison'
		this.button_theme_name = 'blue-bold'
		this.button_hover_theme_name = 'blue-oleo'

		// =========================================
		// FIXME: finish this 
		this.populate_proofImageManagerList = () => { // reacts to this.record changes
			const image_records = this._proofImageRecords || []

			this.proofImageManagerList = __.isEmpty(image_records)
				? []
				: __.map(image_records, (image_record) => {
					const imageManager = new store.factories.imageFactory(store, {
						source: {
							obj: this,
							name: 'Sitting_Manager',
							parms: {
								mode: 'EXISTING',
								mongo_id: image_record._id,
								vendor_code: this.source.parms.vendor_code
							}
						},
						content: Form_Wrapper,
						Form_Content: Image_Form  //Form_Content is capitalized so I can use it destructured as <Form_Content />
					})
					imageManager._set_record(image_record)
					return imageManager
				})
			
		}
	}

	// observables ------
	@observable  record = {}

	// RE-ACTIONS
	// ====================================================================
	monitor_record_disposer = reaction(
    () => this.record,
		() => this.populate_proofImageManagerList()
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
	_proofImageRecords() {
		if (!this.hasProofImages) { return undefined }
		/* -> -> -> */
		const proofs_list = toJS(this.record.proofs_list)
		const id_list = __.map(proofs_list, 'image_id')
		return find_ALL_records_on_client("IMAGES", {
			args: {	_id: {"$in": id_list}}
		})
	}


	// =========================================
	@computed get
	first_image_url() {
		const proofImages = this.record.proofs_list
		return this.hasProofImages
			? this._proofImageRecords[0].url
			: undefined
	}

	@computed get
	hasProofImages() {
		const proofs = this.record.proofs_list
		return proofs && proofs.length >=0
	}

	@computed get
	summary() {
		return this.source.parms.mode ==='NEW'
			? 'NEW'
			: this.record
				? this.record._id
				: 'missing _id'
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

	export { Sitting_Manager }