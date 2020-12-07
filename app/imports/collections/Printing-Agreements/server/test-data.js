import { Printing_Agreements } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                      '~PRINTING-1',
		agreement_code:           'PRINTING-1',
		vendor_code:              'luxarte',
		title:                    'Default Printing Agreement for all Luxarte work',
		//date_of_agreement:        null,
		//date_of_expiry:           null,
		options_list: [
			{
				option_code:          '2x3=8=SEPIA=ECONO',
				pixown_price:         1115,
				vendor_cost:          515,
			},
			{
				option_code:          '5x7=2=BW=LUSTER',
				pixown_price:         1330,
				vendor_cost:          515,
			},
		],
	},
	{
		agreement_code:           '003',
		vendor_code:              'luxarte',
		title:                    'Default Printing Agreement for all Luxarte work',
		//date_of_agreement:        null,
		//date_of_expiry:           null,
		options_list: [
			{
				option_code:          '2x3=8=SEPIA=ECONO',
				pixown_price:         1015,
				vendor_cost:          515,
			},
			{
				option_code:          '5x7=2=BW=LUSTER',
				pixown_price:         1230,
				vendor_cost:          515,
			},
		],
	}
]
// ====================================================================
const insert_test_printing_agreements = (clear_first=false) => {
	if (clear_first) { Printing_Agreements.remove({}) }
	insert_raw_test_records("PRINTING_AGREEMENTS", raw_records)
}
// ====================================================================

export { insert_test_printing_agreements }
