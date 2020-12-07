// ----node packages----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
// ----collections------------------
import { Downloading_Agreements } from  './collection.js'
import { Downloading_Options } 		from  '/imports/collections/Downloading-Options/collection.js'
// ----components-------------------

// ====================================================================
/*export const find_downloads_pricing_from_agreement_and_item = (agreement, download_item) => {
	// not tested
	const matches = _.where(agreement.options_list, {
		size: download_item.size,
		colour: download_item.colour,
	})
	if (matches.length === 0) {
		console.log('No download-item matches for size:', download_item.size, 'colour:', download_item.colour)
		return 0
	} // found no matches
	if (matches.length > 1) {
		console.log('Not just a single (', matches.length, ') download-item matches for size:', download_item.size, 'colour:', download_item.colour)
		return 0
	} // found more than 1 match
	return matches[0].pixown_price
}*/
// ====================================================================
/***const find_downloads_pricing_from_agreement_given_option_code = (agreement, option_code) => {
	const matches = _.where(agreement.options_list, {
		option_code:   option_code
	})
	if (matches.length === 0) {
		console.log('No download-item for option_code:', option_code)
		return 0 } // found no matches
	return matches[0].pixown_price
}***/
// ====================================================================
export const get_downloading_agreement_with_options = (agreement_code) => {
	const downloading_agreement = Downloading_Agreements.findOne({
		agreement_code: agreement_code
	})

	const _list = []
	// get all options for this agreement
	if (downloading_agreement) {
		__.map(downloading_agreement.options_list, (_item, index) => {
			const print_option = Downloading_Options.findOne({
				option_code: _item.option_code,
				vendor_code: downloading_agreement.vendor_code
			})
			_item._option_code_details = print_option // augment agr
			_list.push(_item)
		})
		downloading_agreement._options = _list
	}
	return downloading_agreement
}
// ====================================================================
