// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
//import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Images } 							from  '/imports/collections/Images/collection.js'
// ----components-------------------

// ========================================================================
class Image_Manager {
	
	constructor(store, {source, content, Form_Content, notifyStore}) {
		this.__name = 'Image_Manager'
		this.store = store 

		this.source=source  // object 
		this.spec = {
			type: 'single',
			colleXion: 'IMAGES',
			name: 'IMAGES.composite.one-mongo-id',
			args: {_id: source.parms.mongo_id },
			options: null
		}
		this.content = content
		this.Form_Content = Form_Content

		this.notifyStore = notifyStore ? notifyStore : false
		this.colleXion = Images 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'blue-madison'
		this.button_theme_name = 'blue-bold'
		this.button_hover_theme_name = 'blue-oleo'

		// =========================================
	}

	// observables ------
	@observable  record = {}

	// RE-ACTIONS
	// ====================================================================
	//monitor_record_disposer = reaction(
  //  () => this.record,
	//	() => this.populate_proofImageManagerList()
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
	_image_record__given__image_id = (image_id) => {
		return Images.findOne({ _id: image_id})
	}

	image_url__given__image_id = (args) => {
		const { image_id } = args
		const record = this._image_record__given__image_id(image_id)
		return record.url
	}

	image_filename__given__image_id = (args) => {
		const { image_id } = args
		const record = this._image_record__given__image_id(image_id)
		return record.filename
	}

	// computeds --------
	@computed get
	hasProofImages() {
		const proofs = this.record.proofs_list
		return proofs && proofs.length >=0
	}

	@computed get
	first_image_url() {
		const proofImages = this.record.proofs_list
		return this.hasProofImages
			? this.image_url__given__image_id({image_id: proofImages[0].image_id})
			: undefined
	}
	@computed get
	_vendorsRecord_for_studioCode() {
		const vendor_code = this.record.studio_code
		return vendor_code
			? Vendors.findOne({vendor_code: vendor_code})
			: {}
	}

	@computed get
	_downloadingAgreementsRecord () {
		const agreement_code = this.record.downloading_agreement_code 
		return agreement_code 
			? Downloading_Agreements.findOne({agreement_code: agreement_code})
			: {}
	}
	
	@computed get
	_retouchingAgreementsRecord () {
		const agreement_code = this.record.retouching_agreement_code 
		return agreement_code 
			? Retouching_Agreements.findOne({agreement_code: agreement_code})
			: {}
	}
	
	@computed get
	_printingAgreementsRecord () {
		const agreement_code = this.record.printing_agreement_code 
		return agreement_code 
			? Printing_Agreements.findOne({agreement_code: agreement_code})
			: {}
	}
	
	@computed get 
	_vendorsRecord_for_Downloading_AgreementCode() {
		const vendor_code = this._downloadingAgreementsRecord.vendor_code 
		return vendor_code
			? Vendors.findOne({vendor_code: vendor_code})
			: {}
	}

	@computed get 
	_vendorsRecord_for_Printing_AgreementCode() {
		const vendor_code = this._printingAgreementsRecord.vendor_code 
		return vendor_code
			? Vendors.findOne({vendor_code: vendor_code})
			: {}
	}

	@computed get 
	_vendorsRecord_for_Retouching_AgreementCode() {
		const vendor_code = this._retouchingAgreementsRecord.vendor_code 
		return vendor_code
			? Vendors.findOne({vendor_code: vendor_code})
			: {}
	}

	@computed get
	_schoolsRecord() {
		const school_code = this.record.school_code
		return Schools.findOne({school_code: school_code})
	}

	@computed get
	downloading_agreement__vendor_name() {
		return this._vendorsRecord_for_Downloading_AgreementCode.name
	}

	@computed get
	printing_agreement__vendor_name() {
		return this._vendorsRecord_for_Printing_AgreementCode.name
	}

	@computed get
	retouching_agreement__vendor_name() {
		return this._vendorsRecord_for_Retouching_AgreementCode.name
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

	export { Image_Manager }