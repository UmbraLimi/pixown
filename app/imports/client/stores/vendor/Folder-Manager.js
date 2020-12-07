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
import { Folders }							from  '/imports/collections/Folders/collection.js'
// ----components-------------------

// ========================================================================
class Folder_Manager {
	
	constructor(store, {source, content, Form_Content, notifyStore}) {
		this.__name = 'Folder_Manager'
		this.store = store 
		
		this.source=source  // object 
		this.spec = {
			type: 'single',
			colleXion: 'FOLDERS',
			name: 'FOLDERS.one-mongo-id', 
			args: {_id: source.parms.mongo_id }, 
			options: null
		}
		this.content = content
 		this.Form_Content = Form_Content

		this.notifyStore = notifyStore ? notifyStore : false
		this.colleXion = Folders 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'blue-madison'
		this.button_theme_name = 'blue-bold'
		this.button_hover_theme_name = 'blue-oleo'

		// =========================================
	}

	// observables ------
	@observable record = {}

	// RE-ACTIONS
	// ====================================================================
	/*monitor_record_disposer = reaction(
    () => this.record,
		() => this.populate_workupManagerList()
	)*/

	// observables ------

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

	extension_list = (extension, prop) => {
		const list = []
		__.map( this.record.files, (file) => {
			const dotteds = file.name.split('.')
			if (dotteds.length > 0 && dotteds[dotteds.length-1].toUpperCase()===extension.toUpperCase()) {
				list.push(file)
			}
		})
		return list
	}

	search_for = (search_for) => {
		// search foldername case insensitive
		return this.record.foldername.toUpperCase().indexOf(search_for.toUpperCase()) === -1 
			? false 
			: true
	}
	// =========================================
	// RELATED DIRECT RECORDS
	@computed get
	_studiosRecords() {
		if (!this.hasVendors) { return undefined }
		/* -> -> -> */
		const vendors_list = toJS(this.record.vendor_code_list)
		return find_ALL_records_on_client("VENDORS", {
			args: {	vendor_code: {"$in": vendors_list}}
		})
	}

	// =========================================
	@computed get
	image_urls() {
		const files = this.image_list
		return __.map(files, (file, index) => {
			return `${file.url}?raw=1` 
		})
	}

	@computed get
	up_to_3_image_urls() {
		const count = this.images_count
		const urls = this.image_urls
		if (count===0) return []
		if (count<=3) return urls
		return urls.slice(0,3)
	}

	@computed get
	image_list() {
		return this.extension_list('jpg')
	}

	@computed get
	images_count() {
		return this.image_list.length
	}

	@computed get
	csv_list() {
		return this.extension_list('csv')
	}

	@computed get
	csv_count() {
		return this.csv_list.length
	}

	@computed get
	csv_names() {
		const files = this.csv_list
		return __.map(files, (file, index) => {
			return file.name
		})
	}

	@computed get
	xls_list() {
		return this.extension_list('xls')
	}

	@computed get
	xls_count() {
		return this.csv_list.length
	}

	@computed get
	xls_names() {
		const files = this.xls_list
		return __.map(files, (file, index) => {
			return file.name
		})
	}

	@computed get
	folders_count() {
		return this.record.subfolders && this.record.subfolders.length
	}

	@computed get
	folder_names() {
		const folders = this.record.subfolders
		return __.map(folders, (folder, index) => {
			return folder
		})
	}

	// computeds --------
	@computed get
	summary() {
		return this.record
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

	export { Folder_Manager }