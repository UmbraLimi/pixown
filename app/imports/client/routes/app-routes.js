// ----node-packages----------------
import React 										from 	'react'
import { Route } 								from 	'mobx-router'
import { _ as __ }         			from  'lodash'
import { toast } 								from  'react-toastify'
import { autorun, toJS }				from  'mobx'
// ----helpers----------------------
import { customer_routes } 			from  './customer-routes.js'
import { vendor_routes } 				from  './vendor-routes.js'
import { admin_routes } 				from  './admin-routes.js'
// ----enums------------------------
import { Systems } 							from  '/imports/enums/systems.js'
// ----collections------------------
// ----components-------------------
import { Not_Found_Page }     	from  '/imports/client/ui/pages/not-found-page.jsx'
import { Login_Page }						from  '/imports/client/ui/pages/Login-Page/index.jsx'
import { Home_Page }						from  '/imports/client/ui/pages/Home-Page/index.jsx'

// ========================================================================
const app_routes = {
	...vendor_routes, 
	...customer_routes, 
	...admin_routes,
	// -----------------------------------------------------------
	home: new Route({									
		path: '/',
		// replace url with www.pixown.com in production
		component:  <Home_Page />
	}),
	// -----------------------------------------------------------
	login: new Route({ 								
		path: '/login',
		component: <Login_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			if (store.app.user_record) { 
				//return false // don't allow - user is already logged in!
			} 
		}
	}),
	// -----------------------------------------------------------
	notfound: new Route({							
		path: '/notfound', 
		component: <Not_Found_Page />,
		onEnter: (route, params, store, queryParams) => {
			debugger
			__.isEmpty(params)
				? null
				: store.app.set__bad_route(params.bad_route)
		},
		onExit: (route, params, store, queryParams) => {
			store.app.unset__bad_route() // clean up
		},
	})
}
// ========================================================================
const find_route_key_given_url = (url) => {
	return __.findKey(app_routes, ['path', url])
}
// ========================================================================
const find_route_given_url = (url) => {
	const list = __.filter(app_routes, {
		path: url
	})
	return list[0]
}
// ========================================================================
const _only_logged_in = (intended_system, route_name, store, route) => {
	// return false if not logged in or non-system route, otherwise return true
	const loggedIn = !!Meteor.userId()
	if (loggedIn) {
		if (store.app.user_record) {
			if (store.app.user_record.role === intended_system) {
				return true // ok to go to this page
			}
			// trying to go to page in different system
			_redirect_to_system_homebase(store)
			return false
		}
		// looks like hot-reload - now get the user_record
		console.info("app-routes", 'Meteor.userId() is set but app.user_record is not', "on way to", route_name)
		return true // they were logged in
	}
	//_redirect_to_login(route_name, store)
	store.app.set__intended_route(route_name)
	toast.warn('You must log in first')
	store.router.goTo(app_routes.login, {}, store)
return false
}
// ========================================================================
const _redirect_to_system_homebase = (store) => {
	const system = store.app.user_record.role
	toast.warn('You are not authorized for that')
	const route = system===Systems.VENDOR.name
		? 'vendor_homebase'
		: system===Systems.CUSTOMER.name
			? 'homebase'
			: system===Systems.ADMIN.name
				? 'admin_homebase'
				: 'home'
	store.app.set__intended_route(route)
	store.router.goTo(app_routes[route], {}, store)
}
// ========================================================================
const _redirect_to_login = (route_name, store, route) => {
	/* KLUDGE - even though the app has been initialied, 
	** it is async and will not have finished assigning user_record before routes fire
	** so this allows a check to see that the user is logged in even though the store hasn't recorded it
	*/
	//const loggedIn = !!Meteor.userId()
	//if (loggedIn) {
	//} else {
		store.app.set__intended_route(route_name)
		toast.warn('You must log in first')
		store.router.goTo(app_routes.login, {}, store)
	//}
}
// ========================================================================

export { app_routes }
export { _only_logged_in }
export { find_route_given_url }
export { find_route_key_given_url }