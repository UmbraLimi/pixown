// ----node-packages----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
// ----collections------------------
import { Printing_Agreements } 	from  '/imports/collections/Printing-Agreements/collection.js'
import { Printing_Options } 		from  '/imports/collections/Printing-Options/collection.js'
// ----components-------------------

// ====================================================================
/*export const find_prints_pricing_from_agreement_and_item = (agreement, printItem) => {
	const matches = _.where(agreement.options_list, {
		size: printItem.size,
		finish: printItem.finish,
		colour: printItem.colour,
		qty: printItem.qty
	})
	//console.log(matches)
	if (matches.length === 0) {
		console.log('No print-item matches for size:', printItem.size, 'finish:', printItem.finish, 'colour:', printItem.colour, 'qty:', printItem.qty)
		return 0
	} // found no matches
	if (matches.length > 1) {
		console.log('Not just a single (', matches.length, ') print-item matches for size:', printItem.size, 'finish:', printItem.finish, 'colour:', printItem.colour, 'qty:', printItem.qty)
		return 0
	} // found more than 1 match
	return matches[0].pixown_price
}*/
// ====================================================================
/***const find_prints_pricing_by_key = (agreement, key) => {
	const matches = _.where(agreement.options_list, {
		key:   key
	})
	if (matches.length === 0) {
		console.log('No download-item for key:', key)
		return 0 } // found no matches
	return matches[0].pixown_price
}***/
// ====================================================================
export const get_printing_agreement_with_options = (agreement_code) => {
	const printing_agreement = Printing_Agreements.findOne({
		agreement_code: agreement_code
	})

	const _list = []
	// get all options for this agreement
	if (printing_agreement) {
		__.map(printing_agreement.options_list, (_item, index) => {
			const print_option = Printing_Options.findOne({
				option_code: _item.option_code,
				vendor_code: printing_agreement.vendor_code
			})
			_item._option_code_details = print_option // augment agr
			_list.push(_item)
		})
		printing_agreement._options = _list
	}

	return printing_agreement
}
// ====================================================================
