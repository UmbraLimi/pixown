// ----node-packages----------------
import { observable, action, computed, reaction 
} 															from  'mobx'
import { toast } 								from  'react-toastify'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----helpers----------------------
import { assemble_proof_wup }		from 	'/imports/collections/Workups/helpers.js'
import { app_routes }						from  '/imports/client/routes/app-routes.js'
// ----collections------------------
import { Workups }							from  '/imports/collections/Workups/collection.js'
import { Sittings } 						from  '/imports/collections/Sittings/collection.js'
import { Images }      					from  '/imports/collections/Images/collection.js'
// ----components-------------------

// ========================================================================
class ImageGalleryStore {
	
	constructor(rootStore) {
		this.rootStore = rootStore 
	}

	// observables ------

	// internal vars

	// actions ----------

	// =========================================
	// internal functions
	initialize = () => {
	}

	// =========================================
	handleOnEnterImageGalleryPage = (params, queryParams) => {
	}
	
	// =========================================
	handlePoseWasSelected = (sitting, proof, retouching_agreement) => {
		this.rootStore.workupWizardStore._initialize_from_proof(sitting, proof, retouching_agreement)
		// start user on first available service in their agreement
		const service_code = retouching_agreement.services_list[0].service_code
		this.rootStore.router.goTo(app_routes.workup_wizard, { page: service_code }, this.rootStore)
	}
		

	// computeds --------
	//@computed  
	//get  cart_count() {
	//	return this.workups.length
	//}
}
// ========================================================================

export { ImageGalleryStore }