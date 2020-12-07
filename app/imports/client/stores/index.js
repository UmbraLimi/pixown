// ----node-packages----------------
import { RouterStore } 					from  'mobx-router'
// ----helpers----------------------
import { AppStore } 						from  './App-Store.js'
import { FormStore } 						from  './Form-Store.js'
import { PUser_Manager }				from  './PUser-Manager.js'
// ----collections------------------
// ----components-------------------
// ----devtools---------------------

// ========================================================================
class RootStore {
	constructor () { // only load common stores for all systems here. 
		//Defer rest to load dynamically after login determines the system
		this.router 	 				= new RouterStore() 
		this.app  						= new AppStore(this)
		this.loginFormStore 	= new FormStore(this)
		this.factories 				= {
			formFactory: FormStore,
			puserFactory: PUser_Manager
		}
		this.vendor						= {} // all of the vendor stores will be below this
	}
}
// ========================================================================

export { RootStore }