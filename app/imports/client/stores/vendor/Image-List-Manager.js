// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
//import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
// ----collections------------------
import { Images }								from  '/imports/collections/Images/collection.js'
// ----components-------------------
import { Image_Form }         	from  '/imports/client/ui/components/vendor/Images/image-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'

// ========================================================================
class Image_List_Manager {
	
	constructor(store, {source, spec, content}) {
		this.__name = 'Image_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'IMAGES',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Images 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable imageManagerList = []

	// internal vars

	// actions ----------
	@action
	populate_imageManagerList = (image_records) => {
		this.imageManagerList = __.isEmpty(image_records)
		? []
		: __.map(image_records, (image_record) => {
			const imageManager = new this.store.factories.imageFactory(this.store, {
				source: {
					obj: this,
					name: 'Image_List_Manager',
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
	image_count() {
		return this.imageManagerList.length || 0
	}

	@computed get
	summary() {
		return this.image_count===1 ? '1 record' : `${this.image_count} records`
	}

	@computed get  
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

	export { Image_List_Manager }