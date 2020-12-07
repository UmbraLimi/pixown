// ----node_modules-----------------
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
// ----helpers----------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
import { Workup_Sources } 			from  '/imports/enums/workup-sources.js'
import { Workup_Groups } 				from  '/imports/enums/workup-groups.js'
import { Delivery_States } 			from  '/imports/enums/delivery-states.js'
/*import { calc_total_retouching_price_for_wup } 	from '/imports/collections/Workups/retouch-items.js'
import { calc_total_printing_price_for_wup } 		from '/imports/collections/Workups/print-items.js'
import { calc_total_downloading_price_for_wup } from '/imports/collections/Workups/download-items.js'
import { calc_total_cropping_price_for_wup } from '/imports/collections/Workups/crop-items.js'

*/

// ----collections------------------
// ----components-------------------

// ====================================================================
/*export const wanted_retouches_list = (retouches_list) => {
	return _.filter(retouches_list, function(item) {return item.wanted === true})
}*/
// ====================================================================
/*export const wanted_prints_list = (prints_list) => {
	return _.filter(prints_list, function(item) {return item.wanted === true})
}*/
// ====================================================================
/*export const wanted_downloads_list = (downloads_list) => {
	return _.filter(downloads_list, function(item) {return item.wanted === true})
}*/
// ====================================================================
/*export const has_ordered_retouching = (wup) => {
	if (wup.state === Workup_States.ORDERED.name || wup.state === Workup_States.COMPLETE.name) {
		const wanted_items_list = _.filter(wup.retouches_list, function(item) {return item.wanted === true})
		return wanted_items_list.length > 0		
	} 
	return false
}*/
// ====================================================================
/*export const has_ordered_prints = (wup) => {
	if (wup.state === Workup_States.ORDERED.name || wup.state === Workup_States.COMPLETE.name) {
		const wanted_items_list = _.filter(wup.prints_list, function(item) {return item.wanted === true})
		return wanted_items_list.length > 0		
	} 
	return false
}*/
// ====================================================================
/*export const has_ordered_downloads = (wup) => {
	if (wup.state === Workup_States.ORDERED.name || wup.state === Workup_States.COMPLETE.name) {
		const wanted_items_list = _.filter(wup.downloads_list, function(item) {return item.wanted === true})
		return wanted_items_list.length > 0		
	} 
	return false
}*/
// ====================================================================
/*export const has_retouching = (list) => {
	return wanted_retouches_list(list).length > 0
}*/
// ====================================================================
/*export const has_prints = (list) => {
	return wanted_prints_list(list).length > 0
}*/
// ====================================================================
/*export const has_downloads = (list) => {
	return wanted_downloads_list(list).length > 0
}*/
// ====================================================================
/*export const calc_total_price_for_wup = (wup) => {
	const total = 0 +
	+ calc_total_printing_price_for_wup(wup)
	+ calc_total_downloading_price_for_wup(wup)
	+ calc_total_retouching_price_for_wup(wup)
	+ calc_total_cropping_price_for_wup(wup)
	return total
}*/
// ====================================================================

// ====================================================================
//const assemble_printItem_option = () => {}
// ====================================================================
//const assemble_download_item_option = () => {}
// ====================================================================