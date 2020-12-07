import { Retouching_Agreements } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                    '~RETOUCHING-1',
		agreement_code:         'RETOUCHING-1',
		vendor_code:            'luxarte',
		date_of_agreement:       new Date("October 29, 2017"),
		title:                  'Test Luxarte retouching agreement for CN 2017',
		date_of_expiry:          new Date("October 29, 2018"),
		services_list: [ // in order of presentation
			{
				service_code:         'basic-retouching',
				pixown_price:         1000,
				vendor_cost:          550,
			},
			{
				service_code:         'advanced-retouching',
				pixown_price:         2000,
				vendor_cost:          1000,
			},
			{
				service_code:         'hair-retouching',
				pixown_price:         1000,
				vendor_cost:          550,
			},
			{
				service_code:         'teeth-whitening',
				pixown_price:         500,
				vendor_cost:          300,
			},
			{
				service_code:         'glasses-glare-removal',
				pixown_price:         1500,
				vendor_cost:          800,
			},
		],
	},
	{
		_id:                    '~RETOUCHING-2',
		agreement_code:         'RETOUCHING-2',
		vendor_code:            'luxarte',
		date_of_agreement:       new Date("October 29, 2017"),
		title:                  'Standard Luxarte retouching agreement for BR 2017',
		date_of_expiry:          new Date("October 29, 2018"),
		services_list: [ // in order of presentation
			{
				service_code:         'basic-retouching',
				pixown_price:         1200,
				vendor_cost:          570,
			},

			{
				service_code:         'advanced-retouching',
				pixown_price:         2300,
				vendor_cost:          1300,
			},
			{
				service_code:         'hair-retouching',
				pixown_price:         1400,
				vendor_cost:          590,
			},
			{
				service_code:         'teeth-whitening',
				pixown_price:         510,
				vendor_cost:          310,
			},
			{
				service_code:         'glasses-glare-removal',
				pixown_price:         1600,
				vendor_cost:          850,
			},
		],
	},
]
// ====================================================================
const insert_test_retouching_agreements = (clear_first=false) => {
	if (clear_first) { Retouching_Agreements.remove({}) }
	insert_raw_test_records("RETOUCHING_AGREEMENTS", raw_records)
}

export { insert_test_retouching_agreements };
