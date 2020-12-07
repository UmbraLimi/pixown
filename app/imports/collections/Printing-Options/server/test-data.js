import { Printing_Options } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                  '~POPT-1',
		option_code:          '2x3=8=SEPIA=ECONO',
		vendor_code:          'luxarte',
		size:                 '2x3',
		qty:                  8,
		colour:               'SEPIA',
		finish:               'ECONO',
		pixown_price:         1015,
		vendor_cost:          515,
		note_to_customers:    'These do not have text',
	},
	{
		_id:                  '~POPT-2',
		option_code:          '5x7=2=BW=LUSTER',
		vendor_code:          'luxarte',
		size:                 '5x7',
		qty:                  2,
		colour:               'BW',
		finish:               'LUSTER',
		pixown_price:         1230,
		vendor_cost:          515,
		note_to_customers:    'These do not have text',
	},
]
// ====================================================================
const insert_test_printing_options = (clear_first=false) => {
	if (clear_first) { Printing_Options.remove({}) }
	insert_raw_test_records("PRINTING_OPTIONS", raw_records)
}
// ====================================================================

export { insert_test_printing_options }
