import { Downloading_Agreements } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                      '~DOWNLOADING-1',
		agreement_code:           'DOWNLOADING-1',
		vendor_code:              'luxarte',
		title:                    'Test Downloading Agreement for all Luxarte work',
		//date_of_agreement:        null,
		//date_of_expiry:           null,
		options_list: [
			{
				option_code:          '2x3=SEPIA',
				pixown_price:         3000,
				vendor_cost:          1215,
			},
			{
				option_code:          '5x7=BW',
				pixown_price:         2300,
				vendor_cost:          915,
			},
		],
	},
	{
		agreement_code:           '003',
		vendor_code:              'luxarte',
		title:                    'Default Downloading Agreement for all Luxarte work',
		//date_of_agreement:        null,
		//date_of_expiry:           null,
		options_list: [
			{
				option_code:                  '2x3=SEPIA',
				pixown_price:         1015,
				vendor_cost:          515,
			},
			{
				option_code:                  '5x7=BW',
				pixown_price:         1230,
				vendor_cost:          515,
			},
		],
	}
]
// ====================================================================
const insert_test_downloading_agreements = (clear_first=false) => {
	if (clear_first) { Downloading_Agreements.remove({}) }
	insert_raw_test_records("DOWNLOADING_AGREEMENTS", raw_records)
}
// ====================================================================

export { insert_test_downloading_agreements }
