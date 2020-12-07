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
	Homebase_Page, 
	Image_Gallery_Page, 
	Workup_Wizard_Page,
	Profile_Page, 
	Cart_Page 
}																from	'./customer-pages.js'
// ========================================================================
const customer_routes = {
	// -----------------------------------------------------------
	workup_wizard: new Route({				
		path: '/workup-wizard/:page',
		component: <Workup_Wizard_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.CUSTOMER.name
			// params seems to be missing on beforeEnter but appears on onEnter - bug?
			const ok_to_use = _only_logged_in(system, 'workup_wizard', store, route)
			if (!ok_to_use) {return false}
			if (store.workupWizardStore.record.state) {return true}
			console.warn(`----- attempt to enter wizard but not from the image gallery (${route.path})`)
			store.router.goTo(app_routes.image_gallery, {}, store)
			return false
		},
		onEnter: (route, params, store, queryParams) => {
			store.workupWizardStore._handle_onEnter_from_WorkupWizardPage(params, queryParams)
		}
	}),

	// -----------------------------------------------------------
	cart: new Route({									
		path: '/cart',
		component: <Cart_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.CUSTOMER.name
			return _only_logged_in(system, 'cart', store, route)
		},
		onEnter: (route, params, store, queryParams) => {
			//console.log(`entering image-gallery with params`, params)
			store.cartStore.handleOnEnterCartPage(params, queryParams)
		}
	}),

	// -----------------------------------------------------------
	homebase: new Route({							
		path: '/homebase',
		component: <Homebase_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.CUSTOMER.name
			return _only_logged_in(system, 'homebase', store, route)
		}
	}),

	// -----------------------------------------------------------
	profile: new Route({							
		path: '/profile',
		component: <Profile_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.CUSTOMER.name
			return _only_logged_in(system, 'profile', store, route)
		}
	}),

	// -----------------------------------------------------------
	image_gallery: new Route({				
		path: '/image-gallery',
		component: <Image_Gallery_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.CUSTOMER.name
			return _only_logged_in(system, 'image_gallery', store, route)
		},
		onEnter: (route, params, store, queryParams) => {
			//console.log(`entering image-gallery with params`, params)
			store.imageGalleryStore.handleOnEnterImageGalleryPage(params, queryParams)
		}
	}),

}
// ========================================================================

export { customer_routes }