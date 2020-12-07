import { Sittings } 								from  '../collection.js'
import { insert_raw_test_records } 	from  '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id: 							'~SITTING-1',
		studio_code:      'luxarte', // is a vendor_code
		school_code:      '001',
		sitting_code:     'DD0001',
		customer_code:    'Wendy',
		upload_code:			'UPLOAD-1',
		proofs_list: [
			{
				pose_code:   	'01',
				image_id:    	'~IMAGE-1',
				paid_retouching_list : [
					{
						service_code: 'basic-retouching',
						workup_id: '~WUP-1',
						image_id: '~IMAGE-5',
						delivery_state: "DELIVERED_to_PIXOWN",
					},
					{
						service_code: 'advanced-retouching',
						workup_id: '~WUP-3',
						//image_id: '~IMAGE-6',
						delivery_state: "READY_to_SEND_to_VENDOR",
					},
					{
						service_code: 'hair-retouching',
						workup_id: '~WUP-4',
						//image_id: '~IMAGE-7',
						delivery_state: "REQUESTED_from_VENDOR",
					},
					{
						service_code: 'teeth-whiteniing',
						workup_id: '~WUP-3',
						//image_id: '~IMAGE-8',
						delivery_state: "READY_to_SEND_to_VENDOR",
					},
					{
						service_code: "glasses-glare-removal",
						non_pixown_order_id:	'~NON-PIXOWN-ORDER-1',
						image_id: '~IMAGE-9',
						delivery_state: "DELIVERED_to_PIXOWN",
					}
						]
			},
			{
				pose_code: 		'02',
				image_id:    	'~IMAGE-2'
			}
		],
		sitting_fee: 			2000,
		photographer: 		'ron',
		is_retake:				false,
		downloading_agreement_code: 'DOWNLOADING-1',
		retouching_agreement_code: 	'RETOUCHING-1',
		printing_agreement_code:		'PRINTING-1',
		studio_data:	{
			key:	'DD0065',
			other: {
				customer_id: 	'166',
				bar_code: 		'1030'
			}
		}
	},
	{
		_id: 							'~SITTING-2',
		studio_code:      'luxarte', // is a vendor_code
		school_code:      '001',
		sitting_code:     'DD0002',
		customer_code:    'Wendy',
		upload_code:			'UPLOAD-2',
		proofs_list: [
			{
				pose_code:   	'01',
				image_id:    	'~IMAGE-3'
			},
			{
				pose_code: 		'02',
				image_id:    	'~IMAGE-4'
			}
		],
		sitting_fee: 			2000,
		photographer: 		'ron',
		is_retake:				false,
		downloading_agreement_code: 'DOWNLOADING-1',
		retouching_agreement_code: 	'RETOUCHING-1',
		printing_agreement_code:		'PRINTING-1',
		studio_data:	{
			key:	'DD0065',
			other: {
				customer_id: 	'166',
				bar_code: 		'1030'
			}
		}
	},
]
// ====================================================================
const insert_test_sittings = (clear_first=false) => {
	if (clear_first) { Sittings.remove({}) }
	insert_raw_test_records("SITTINGS", raw_records)
}
// ====================================================================

export { insert_test_sittings }
