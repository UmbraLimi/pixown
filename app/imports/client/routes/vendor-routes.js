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
	Homebase_Page as Vendor_Homebase_Page, 
	Profile_Page as Vendor_Profile_Page,
	Sittings_Page as Vendor_Sittings_Page,
	Sitting_Page as Vendor_Sitting_Page,
	Orders_Page as Vendor_Orders_Page,
	Order_Page as Vendor_Order_Page,
	Workups_Page as Vendor_Workups_Page,
	Workup_Page as Vendor_Workup_Page,
	Schools_Page as Vendor_Schools_Page,
	School_Page as Vendor_School_Page,
	Retouching_Agreement_Page as Vendor_Retouching_Agreement_Page,
	Retouching_Agreements_Page as Vendor_Retouching_Agreements_Page,
	Printing_Agreement_Page as Vendor_Printing_Agreement_Page,
	Printing_Agreements_Page as Vendor_Printing_Agreements_Page,
	Downloading_Agreement_Page as Vendor_Downloading_Agreement_Page,
	Downloading_Agreements_Page as Vendor_Downloading_Agreements_Page,
	Folders_Page as Vendor_Folders_Page,
	Folder_Page as Vendor_Folder_Page,
}																from	'./vendor-pages.js'
// ========================================================================
const vendor_routes = {
	// -----------------------------------------------------------
	vendor_homebase: new Route({							
		path: '/vendorhomebase',
		component: <Vendor_Homebase_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_homebase', store, route)
		}
	}),

	// -----------------------------------------------------------
	vendor_sitting: new Route({							
		path: '/vendorsitting',
		component: <Vendor_Sitting_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_sitting', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}

	}),

	// -----------------------------------------------------------
	vendor_sittings: new Route({							
		path: '/vendorsittings',
		component: <Vendor_Sittings_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_sittings', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_order: new Route({							
		path: '/vendororder',
		component: <Vendor_Order_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_order', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}

	}),

	// -----------------------------------------------------------
	vendor_orders: new Route({							
		path: '/vendororders',
		component: <Vendor_Orders_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_orders', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_order: new Route({							
		path: '/vendororder',
		component: <Vendor_Order_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_order', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}

	}),

	// -----------------------------------------------------------
	vendor_schools: new Route({							
		path: '/vendorschools',
		component: <Vendor_Schools_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_schools', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),
	// -----------------------------------------------------------
	vendor_folder: new Route({							
		path: '/vendorfolder',
		component: <Vendor_Folder_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_folder', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_folders: new Route({							
		path: '/vendorfolders',
		component: <Vendor_Folders_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_folders', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),
	// -----------------------------------------------------------
	vendor_school: new Route({							
		path: '/vendorschool',
		component: <Vendor_School_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_school', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_retouching_agreements: new Route({							
		path: '/vendorretouchingagreements',
		component: <Vendor_Retouching_Agreements_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_retouching_agreements', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),
	// -----------------------------------------------------------
	vendor_retouching_agreement: new Route({							
		path: '/vendorretouchingagreement',
		component: <Vendor_Retouching_Agreement_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_retouching_agreement', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_printing_agreements: new Route({							
		path: '/vendorprintingagreements',
		component: <Vendor_Printing_Agreements_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_printing_agreements', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),
	// -----------------------------------------------------------
	vendor_printing_agreement: new Route({							
		path: '/vendorprintingagreement',
		component: <Vendor_Printing_Agreement_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_printing_agreement', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_downloading_agreements: new Route({							
		path: '/vendordownloadingagreements',
		component: <Vendor_Downloading_Agreements_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_downloading_agreements', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),
	// -----------------------------------------------------------
	vendor_downloading_agreement: new Route({							
		path: '/vendordownloadingagreement',
		component: <Vendor_Downloading_Agreement_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_download_agreement', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_workups: new Route({							
		path: '/vendorworkups',
		component: <Vendor_Workups_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_workups', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	vendor_workup: new Route({							
		path: '/vendorworkup',
		component: <Vendor_Workup_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_workup', store, route)
		},
		//onEnter: (route, params, store, queryParams) => {
		//}
	}),

	// -----------------------------------------------------------
	vendor_profile: new Route({							
		path: '/vendorprofile',
		component: <Vendor_Profile_Page />,
		beforeEnter: (route, params, store, queryParams) => {
			const system = Systems.VENDOR.name
			return _only_logged_in(system, 'vendor_profile', store, route)
		}
	}),

}
// ========================================================================

export { vendor_routes }