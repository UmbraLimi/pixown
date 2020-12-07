// ----node-packages----------------
import { observable, action, computed, reaction, toJS 
} 															from  'mobx'
import { _ as __ }         			from  'lodash'
import { toast } 								from  'react-toastify'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----helpers----------------------
import { app_routes, find_route_key_given_url 
}						from  '/imports/client/routes/app-routes.js'
import { subscribe, subscription_is_ready 
}																from '/imports/client/db/collection-helpers.js'
import { 
	customerStoresLoader,
	vendorStoresLoader,
	adminStoresLoader 
} 															from  '/imports/client/stores/system-stores-loaders.js'
// ----collections------------------
// ----components-------------------

// ========================================================================
class AppStore {
	
	constructor(rootStore) {
		this.rootStore = rootStore 
		//this.params = toJS(rootStore.router.params)
		//this.intended_route = toJS(rootStore.router.currentPath) // undefined  // app_routes[intended_route] 
		//debugger
	}

	// observables ------
	// user/session
	@observable  current_url = undefined  
	@observable  user_record = undefined
	@observable  login_attempts = 0
	@observable  is_attempting_login = false
	@observable  isChecking = false

	// internal vars
	max_login_attempts = 3
	//intended_url = undefined 
	intended_route = undefined // route that user wanted when they typed in 
	//														manually or linked to from bookmark, but weren't 
	//														currently logged in and were forced to login first
	bad_route = undefined

	// RE-ACTIONS
	// ====================================================================
	monitor_user_record = reaction(
		() => toJS(this.user_record), 
		() => {
			console.log('app.user_record was changed')
		}
	)


	// actions ----------
	@action  
	update__user_record = (record) => {
		// go through each property of record and if changed, update memory/app version
		__.map(__.toPairs(record), ([key, value]) => {
			const current = toJS(this.user_record[key])
			const newValue = toJS(value)
			//console.log(key, current, newValue)
			if (!__.isEqual(current,newValue)) {
				//console.log('  ** updated')
				this.user_record[key] = newValue
			}
		})
	}

	@action  
	set__user_record = (user_record) => {
		this.user_record = user_record
	}
	@action  
	unset__user_record = () => {
		this.user_record = undefined
	}

	@action  
	increment_login_attempts = () => {
		this.login_attempts++
	}

	@action
	startChecking = () => {
		this.isChecking = true
	}
	@action
	stopChecking = () => {
		this.isChecking = false
	}
	// =========================================
	// internal functions
	initialize = async () => {
		if (Meteor.userId()) {
			// user is still logged in to Meteor even though app is just starting
			// get the user_record (will arrive async and routes will still have to check Meteor.userId())
			console.info('... detected Hot Reload/Refresh/manual url in browser ... loading Homebase')
			await this.do_side_effects_of_successful_login({was_logged_in: true})
		}
	}

	// =========================================
	attempt_to_login = async ({email, password}) => {
		this.startChecking()
		this.is_attempting_login = true
		await Meteor.loginWithPassword(email, password, (error) => {
			if (error) {
				// failure
				console.warn("Meteor.loginWithPassword() error", error)
				toast.warn(error.reason)
				this.increment_login_attempts()
				this.stopChecking()
				if (this.login_attempts >= this.max_login_attempts) {
					toast.error("Maximum login attempts exceeded")
					this.reset__login_state()
					this.unset__intended_route()
					
					this.rootStore.router.goTo(app_routes.home, {}, this.rootStore)
				}
			} else {
				// success
				this.do_side_effects_of_successful_login({was_logged_in: false}) // needs async/await
				this.stopChecking()
			}
		})
	}

	// =========================================
	do_side_effects_of_successful_login = async ({was_logged_in}) => {
		const user_record = await Meteor.callPromise('PUSERS.get_logged_in_user_record')
		const { role } = user_record

		if (__.includes(["ADMIN", "CUSTOMER", "VENDOR"], role)) {
			this.set__user_record(user_record)
			// get initial records (even though they are NOT reactive)
			// it's ok that they arrive later - this is just to get them in asap
			if (role === "CUSTOMER") {
				const default_homebase = 'homebase'
				await customerStoresLoader(this.rootStore)

				const _wups_spec = {
					type: 'list',
					colleXion: 'WORKUPS',
					name: 'WORKUPS.composite.one-customer-code-IN_CART',
					args: {
						customer_code: this.rootStore.app.customer_code,
						state: Workup_States.IN_CART.name
					},
					options: null
				}
				const subs_cart_workups = subscribe(_wups_spec)
				subs_cart_workups.readyPromise().then (() => {
					const workup_records_in_cart = subscription_is_ready(_wups_spec)
					this.route_away(was_logged_in, default_homebase)
				})
				// workup_records_in_cart is not used here. Just need them loaded into minimongo

			} else if (role === "ADMIN") {
				const default_homebase = 'admin_homebase'
				await adminStoresLoader(this.rootStore)
				this.route_away(was_logged_in, default_homebase)

			} else if (role === "VENDOR") {
				const default_homebase = 'vendor_homebase'
				await vendorStoresLoader(this.rootStore)

				const _vendor_spec = {
					type: 'single',
					colleXion: 'VENDORS',
					name: 'VENDORS.one-vendor-code',
					args: {
						vendor_code: this.rootStore.app.user_record.vendor_code
					},
					options: null
				}
				const subs_vendor = subscribe(_vendor_spec)
				subs_vendor.readyPromise().then (() => {
					const vendor_record = subscription_is_ready(_vendor_spec)
					this.route_away(was_logged_in, default_homebase)
				})
				// vendor_record is not used here, just need the record to be loaded into minimongo
			} 
		} else {
			toast.error("You are not authorized on Pixown")
			this.log_out()
			this.reset__login_state()
			this.unset__intended_route()  //done in log_out()
			this.rootStore.router.goTo(app_routes.home, {}, this.rootStore)
		}
	}
	// =========================================
	route_away = (was_logged_in, production_route_default) => {
		const current_url = toJS(this.rootStore.router.currentPath)
		const current_route = current_url==='' || current_url==='/login'
			? production_route_default
			: find_route_key_given_url(current_url)
		const intended_route = this.intended_route
			? this.intended_route
			: production_route_default

		if (was_logged_in) {
			this.rootStore.router.goTo(app_routes[current_route], {}, this.rootStore)
		} else {
		// just completed login
			this.reset__login_state()
			this.unset__intended_route()

		
			//if (Meteor.settings.public.production_state==="DEV ELOPMENT") {
			//	console.log('DEVELOPMENT-ONLY - just hangin\` here') // stays on current browser page
			//} else {
				this.rootStore.router.goTo(app_routes[intended_route], {}, this.rootStore)
			//}
		}
	}
	
	//set__intended_url = (url) => {
	//	this.intended_url = url
	//}
	set__bad_route = (route) => {
		this.bad_route = route
	}
	unset__bad_route = () => {
		this.bad_route = undefined
	}

	set__intended_route = (route) => {
		// set in app_routes.js when route requires a login
		this.intended_route = route
	}
	unset__intended_route = () => {
		this.intended_route = undefined
	}

	@action  
	reset__login_state = () => {
		this.is_attempting_login = false
		this.login_attempts = 0
	}

	@action  
	log_out = () => {
		//toast.info("logging out ...")
		Meteor.logout(
  		() => {
				toast.info("Log out success")
				this.unset__user_record()
				this.unset__intended_route() // may have been done already, no problem
				this.rootStore.router.goTo(app_routes.home, {}, this.rootStore)
			}
  	)
	}

	// computeds --------
	@computed get
	is_logged_in() {
		return !!this.user_record
	}
	
	@computed get
	customer_code() {
		const user = this.user_record
		return (user && user.meteor_username) || '--'
	}
	/*@computed get has_exceeded_maximum_login_attempts() {
		return this.login_attempts >= this.max_login_attempts
	}*/
}
// ========================================================================

export { AppStore }