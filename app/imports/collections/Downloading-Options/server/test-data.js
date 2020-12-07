import { Downloading_Options } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                  '~DOPT-1',
		option_code:          '2x3=SEPIA',
		vendor_code:          'luxarte',
		size:                 '2x3',
		colour:               'SEPIA',
		pixown_price:         1015,
		vendor_cost:          515,
		note_to_customers:    'These do not have text',
	},
	{
		_id:                  '~DOPT-2',
		option_code:          '5x7=COLOUR',
		vendor_code:          'luxarte',
		size:                 '5x7',
		colour:               'BW',
		pixown_price:         1230,
		vendor_cost:          515,
		note_to_customers:    'These do not have text',
	},
]
// ====================================================================
const insert_test_downloading_options = (clear_first=false) => {
	if (clear_first) { Downloading_Options.remove({}) }
	insert_raw_test_records("DOWNLOADING_OPTIONS", raw_records)
}
// ====================================================================

export { insert_test_downloading_options }
