// ----node-packages----------------
import React 										from 	'react'
import { Route } 								from 	'mobx-router'
import { _ as __ }         			from  'lodash'
import { toast } 								from  'react-toastify'
import { autorun, toJS }				from  'mobx'
// ----helpers----------------------
import { _only_logged_in } 			from  './app-routes.js'
// ----enums------------------------
import { Systems } 							from  '/imports/enums/systems.js'
// ----collections------------------
// ----components-------------------
import { 
	Homebase_Page as Admin_Homebase_Page, 
	Profile_Page as Admin_Profile_Page
}																from	'./admin-pages.js'
// ========================================================================
const admin_routes = {
	// -----------------------------------------------------------
	admin_homebase: new Route({							
		path: '/adminhomebase',
		component: <Admin_Homebase_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.ADMIN.name
			return _only_logged_in(system, 'admin_homebase', store, route)
		}
	}),

	// -----------------------------------------------------------
	admin_profile: new Route({							
		path: '/adminprofile',
		component: <Admin_Profile_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.ADMIN.name
			return _only_logged_in(system, 'admin_profile', store, route)
		}
	}),

}
// ========================================================================

export { admin_routes }