// ----node-packages----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
// ----collections------------------
import { Retouching_Agreements } from  '/imports/collections/Retouching-Agreements/collection.js'
import { Retouching_Services } 	from  '/imports/collections/Retouching-Services/collection.js'
// ----components-------------------

// ====================================================================
/*export const find_retouching_pricing = (agreement, service) => {
	const matches = _.where(agreement.services_list, {
		service_code: service.service_code
	})
	//console.log(matches)
	if (matches.length === 0) {
		console.log('No retouching-item matches key: ', service.key)
		return 0
	} // found no matches
	if (matches.length > 1) {
		console.log('Not just a single (', matches.length, ') retouching-item matches key: ', service.key)
		return 0
	} // found more than 1 match
	return matches[0].pixown_price
}*/
// ====================================================================
export const get_retouching_agreement_with_services = (agreement_code) => {
	const retouching_agreement = Retouching_Agreements.findOne({
		agreement_code: agreement_code
	})
	// get all services for this agreement
	const _list = []
	if (retouching_agreement) {
		__.map(retouching_agreement.services_list, (_item, index) => {
			const retouching_service = Retouching_Services.findOne({
				service_code: _item.service_code,
				vendor_code: retouching_agreement.vendor_code
			})
			_item._service_code_details = retouching_service // augment
			_list.push(_item)
		})
		retouching_agreement._services = _list
	}
	return retouching_agreement
}
// ====================================================================