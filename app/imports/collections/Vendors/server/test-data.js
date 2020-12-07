import { Vendors } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'
import { _ as __ } from 'lodash'
// ====================================================================
const raw_records = [
	{
		vendor_code: 'luxarte',
		name:        'Luxarte Studios',
		is_studio:    true,
		retouching: {
			value: true
		},
		photography: {
			value: true
		},
		printing: {
			value: true,
			finish_list: [
				{ key: 'ECONO',   label: 'Econo' },
				{ key: 'LUSTER',  label: 'Luster' },
			],
			colour_list: [
				{ key: 'COLOUR', label: 'Colour' },
				{ key: 'BW',     label: 'Black & White' },
				{ key: 'SEPIA',  label: 'Sepia' },
			],
			size_list: [
				{ key: '2x3', label: '2x3', up: 8, max_qty: 12 },
				{ key: '5x7', label: '5x7', up: 2, max_qty: 2 },
			],
		},
		downloading: {
			value: true,
			colour_list: [
				{ key: 'COLOUR', label: 'Colour' },
				{ key: 'BW',     label: 'Black & White' },
				{ key: 'SEPIA',  label: 'Sepia' },
			],
			size_list: [
				{ key: '2x3', label: '2x3', up: 8, max_qty: 12 },
				{ key: '5x7', label: '5x7', up: 2, max_qty: 2 },
			],
		},
		dropbox: {
			dat_key: 'development',
			filemaker_export: 'Filemaker Exports',
			image_export: 'Image Exports'
		}
	},
	{
		vendor_code: 'rons',
		name:        "Ron's Studios",
		is_studio:    false,
		retouching: {
			value: false
		},
		photography: {
			value: true
		},
		printing: {
			value: false
		},
		downloading: {
			value: false
		},
	},
	{
		vendor_code: 'petes',
		name:        "Pete's Printing",
		is_studio:    false,
		retouching: {
			value: false
		},
		photography: {
			value: false
		},
		printing: {
			value: true,
			finish_list: [
				{ key: 'ECONO',   label: 'Econo' },
				{ key: 'LUSTER',  label: 'Luster' },
			],
			colour_list: [
				{ key: 'COLOUR', label: 'Colour' },
				{ key: 'BW',     label: 'Black & White' },
				{ key: 'SEPIA',  label: 'Sepia' },
			],
			size_list: [
				{ key: '2x3', label: '2x3', up: 8, max_qty: 12 },
				{ key: '5x7', label: '5x7', up: 2, max_qty: 2 },
			],
		},
		downloading: {
			value: false
		},
	},
	{
		vendor_code: 'brocks',
		name:        "Brock's Retouching",
		is_studio:    false,
		retouching: {
			value: true
		},
		photography: {
			value: false
		},
		printing: {
			value: false
		},
		downloading: {
			value: false
		},
	}
]
// ====================================================================
const insert_test_vendors = (clear_first=false) => {
	if (clear_first) { Vendors.remove({}) }
	insert_raw_test_records("VENDORS", raw_records)
}
// ====================================================================

export { insert_test_vendors }
