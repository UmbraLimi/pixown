// ----node-packages----------------
import { computed, action } 		from  'mobx'
import { observable, reaction } from  'mobx'
//import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
// ----helpers----------------------
import { get_theme_from_name }  from  '/imports/client/colours/colours.js'
//import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
import { Folders }							from  '/imports/collections/Folders/collection.js'
// ----components-------------------
import { Folder_Listing }     	from  '/imports/client/ui/components/vendor/Folders/folder-listing/index.jsx'

// ========================================================================
class Folder_List_Manager {
	
	constructor(store, {source, spec, content}) {
		this.__name = 'Folder_List_Manager'
		this.store = store 

		this.source=source
		this.spec = {
			type: 'list',
			colleXion: 'FOLDERS',
			name: spec.name,
			args: spec.args,
			options: spec.options
		}
		this.content = content

		this.colleXion = Folders 
		this.subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		this.reactionDisposers =[]

		this.theme_name = 'red' 
		this.button_theme_name = 'red-thunderbird'
		this.button_hover_theme_name = 'reverse-red-thunderbird'

		// =========================================
	}

	// observables ------
	@observable folderManagerList = []
  @observable jpg = true
  @observable csv = true
	@observable xls = true
	@observable search_term = undefined

	// RE-ACTIONS
	// ====================================================================
	//monitor_record = reaction(
  //  () => this.record,
	//	() => this.populate_raManagerList()
	//)

	// internal vars

	// actions ----------
	@action
	populate_folderManagerList = (folder_records) => { // order_records is passed in
		this.folderManagerList = __.isEmpty(folder_records)
		? []
		: __.map(folder_records, (folder_record) => {
			const folderManager = new this.store.factories.folderFactory(this.store, {
				source: {
					obj: this,
					name: 'Folder_List_Manager',
					parms: {
						mode: 'EXISTING',
						mongo_id: folder_record._id,
						vendor_code: this.source.parms.vendor_code
					}
				},
				content: Folder_Listing
			})
			folderManager._set_record(folder_record)
			return folderManager
		})
	}

  @action
  set_search_term = (search_term) => {
    this.search_term = search_term
  }
  @action
  toggle_csv = () => {
    this.csv = !this.csv
  }
  @action
  toggle_xls = () => {
    this.xls = !this.xls
  }
  @action
  toggle_jpg = () => {
    this.jpg = !this.jpg
  }

	// =========================================
	// internal functions
	run_disposers = () => {
		//this.monitor_record_disposer()
	}

  @computed get
  activeList() {
    //this needs to be in Manager??
    return __.map(this.folderManagerList, (folderManager, index) => {
      let is_active = false
      if (this.jpg && folderManager.images_count) {is_active = true}
      if (this.csv && folderManager.csv_count) {is_active = true}
			if (this.xls && folderManager.xls_count) {is_active = true}
			if (!this.search_term || !is_active) { return is_active }
			// there is a search term and this folder is in filter
			// i.e. only search through filtered results
			return folderManager.search_for(this.search_term)
				? true
				: false
    })
  }

	// =========================================
	// computeds --------
	@computed get
	vendor_code() {
		return this.rootStore.app.user_record.vendor_code
	}

	@computed get
	firstScanTime() {
		return this.folder_count === 0
			? ''
			: this.folderManagerList[0].record.createdOn
	}

	@computed get
	lastScanTime() {
		return this.folder_count === 0
			? ''
			: this.folderManagerList[this.folder_count-1].record.createdOn
	}

	@computed get
	folder_count() {
		return this.folderManagerList.length || 0
	}

	@computed get
	summary() {
		return this.folder_count===1 ? '1 record' : `${this.folder_count} records`
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

	export { Folder_List_Manager }