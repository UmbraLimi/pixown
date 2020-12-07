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
import { Retouching_Agreements } from '/imports/collections/Retouching-Agreements/collection'
// ----components-------------------

// ========================================================================
class Retouching_Agreement_Manager {
	
	constructor(store, {source, content, Form_Content, notifyStore}) {
		this.__name = 'Retouching_Agreement_Manager'
		this.store = store 
		
		this.source=source  // object 
		this.spec = {
			type: 'single',
			colleXion: 'RETOUCHING_AGREEMENTS',
			name: 'RETOUCHING_AGREEMENTS.composite.one-mongo-id',
			args: {_id: source.parms.mongo_id },
			options: null
		}
		this.content = content
 		this.Form_Content = Form_Content

		//this.raManagerList = []  // one for each of record.workups

		this.notifyStore = notifyStore ? notifyStore : false
		this.colleXion = Retouching_Agreements 
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
	/*monitor_record_disposer = reaction(
    () => this.record,
		() => this.populate_raManagerList()
	)*/


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

	export { Retouching_Agreement_Manager }