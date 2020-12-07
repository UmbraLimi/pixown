import { Workups } from '../collection.js'
import { Workup_Sources } from '/imports/enums/workup-sources.js'
import { Workup_States } from '/imports/enums/workup-states.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:					'~WUP-1',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		order: {
			order_id: '~ORDER-1',
			raw_prints_total_cost: 6005,
			raw_downloads_total_cost: 9000,
			raw_retouching_total_cost: 9500,
			retouching_total_discount: -3333
		},

		//parent_workup_id: '~WUP-1',
		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.ORDERED.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {
			image_id: '~IMAGE-1-BA',
			delivery_state: "DELIVERED_to_PIXOWN",
			delivery_transaction_id: '~TRANS-99',
			//file_request_string: 'xxxxxx'
		},
		downloadable_image: {
			image_id: '~IMAGE-1-BA-HIRES',
			delivery_state: "DELIVERED_to_PIXOWN",
			delivery_transaction_id: '~TRANS-99',
			//file_request_string: 'xxxxxx'
		},

		prints_list: [],

		retouches_list: [
			{
				service_code: "basic-retouching",
				wanted: true,
			},
			{
				service_code: "hair-retouching",
				wanted: false,
			},
			{
				service_code: "teeth-whitening",
				wanted: false,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: false,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: [
			{
				option_code: '2x3=SEPIA',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				colour: 'SEPIA'
			}
		]
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-2',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		order: {
			order_id: '~ORDER-2',
			raw_prints_total_cost: 6005,
			raw_downloads_total_cost: 9000,
			raw_retouching_total_cost: 9500,
			retouching_total_discount: -3333
		},
		parent_workup_id: '~WUP-1',
		last_updated: new Date("March 13, 2017"),
		
		source: Workup_Sources.from_ORDER.name,
		state: Workup_States.ORDERED.name,
		starting_image: {
			image_id: '~IMAGE-1-BA',
		},
		final_image: {},
		downloadable_image: {
			//image_id: '',
			delivery_state: "READY_to_SEND_to_VENDOR",
			delivery_transaction_id: "~TRANS-01",
			file_request_string: 'xxxxxxx'
		},

		prints_list: [
			{
				option_code: '2x3=8=SEPIA=ECONO',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				qty: 8,
				finish: 'ECONO',
				colour: 'SEPIA'
			}
		],
		retouches_list: [
			{
				service_code: "basic-retouching",
				wanted: true,
				price_code: "SERVICE-PREVIOUSLY-PAID",
				price_history: [
					{
						code: 'ORIG',
						change: 1000
					},
					{
						code: 'PREV-PAID',
						change: -1000
					}
				]
			},
			{
				service_code: "hair-retouching",
				wanted: false,
			},
			{
				service_code: "teeth-whitening",
				wanted: false,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: false,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: []
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-3',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		order: {
			order_id: '~ORDER-2',
			raw_prints_total_cost: 6005,
			raw_downloads_total_cost: 9000,
			raw_retouching_total_cost: 9500,
			retouching_total_discount: -3333
		},
		//parent_workup_id: '~WUP-1',
		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state: Workup_States.ORDERED.name,
		
		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {
			//image_id: '~IMAGE-1-BA',
			delivery_state: "READY_to_SEND_to_VENDOR",
			delivery_transaction_id: '~TRANS-01',
			//file_request_string: 'xxxxxx'
		},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			//delivery_state: "DELIVERED_to_PIXOWN",
			//delivery_transaction_id: '~TRANS-99',
			//file_request_string: 'xxxxxx'
		},
		prints_list: [
			{
				option_code: '5x7=2=BW=LUSTER',
				wanted: true,
				size: "5x7",
				colour: "BW",
				finish: "LUSTER",
				qty: "2",
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
			}
		],
		retouches_list: [
			{
				service_code: "advanced-retouching",
				wanted: true,
				price_history: [
					{
						code: 'ORIG',
						change: 1000
					},
					{
						code: 'PREV-PAID',
						change: -1000
					}
				]
			},
			{
				service_code: "hair-retouching",
				wanted: false,
			},
			{
				service_code: "teeth-whitening",
				wanted: true,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: false,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: []
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-4',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		order: {
			order_id: '~ORDER-2',
			raw_prints_total_cost: 6005,
			raw_downloads_total_cost: 9000,
			raw_retouching_total_cost: 9500,
			retouching_total_discount: -3333
		},
		//parent_workup_id: '~WUP-1',
		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.ORDERED.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {
			//image_id: '~IMAGE-1-BA',
			delivery_state: "READY_to_SEND_to_VENDOR",
			delivery_transaction_id: '~TRANS-01',
			//file_request_string: 'xxxxxx'
		},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			delivery_state: "READY_to_SEND_to_VENDOR",
			delivery_transaction_id: '~TRANS-01',
			file_request_string: 'xxxxxx'
		},

		prints_list: [
			{
				option_code: '2x3=8=SEPIA=ECONO',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				qty: 8,
				finish: 'ECONO',
				colour: 'SEPIA'
			}
		],
		retouches_list: [
			{
				service_code: "basic-retouching",
				wanted: false,
			},
			{
				service_code: "advanced-retouching",
				wanted: false,
			},
			{
				service_code: "hair-retouching",
				wanted: true,
			},
			{
				service_code: "teeth-whitening",
				wanted: false,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: false,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: [
			{
				option_code: '2x3=SEPIA',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				colour: 'SEPIA'
			}
		]
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-5',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.IN_CART.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			//delivery_state: "DELIVERED_to_PIXOWN",
			//delivery_transaction_id: '~TRANS-99',
			//file_request_string: 'xxxxxx'
		},

		prints_list: [
			{
				option_code: '2x3=8=SEPIA=ECONO',
				wanted: true,
				size: '2x3',
				qty: 8,
				finish: 'ECONO',
				colour: 'SEPIA'
				//delivery_state: "READY_to_SEND_to_VENDOR",
				//delivery_transaction_id: '~TRANS-01',
			},
			{
				option_code: '5x7=2=BW=LUSTER',
				wanted: true,
				size: '5x7',
				qty: 2,
				finish: 'LUSTER',
				colour: 'BW'
				//delivery_state: "READY_to_SEND_to_VENDOR",
				//delivery_transaction_id: '~TRANS-01',
			}
		],
		retouches_list: [
			{
				service_code: "basic-retouching",
				wanted: true,
				price_history: [
					{
						code: 'ORIG',
						change: 1000
					},
					{
						code: 'PREV-PAID',
						change: -1000
					}
				]
			},
			{
				service_code: "advanced-retouching",
				wanted: true,
				price_history: [
					{
						code: 'ORIG',
						change: 1000
					},
					{
						code: 'PREV-PAID',
						change: -1000
					}
				]
			},
			{
				service_code: "hair-retouching",
				wanted: true,
				price_history: [
					{
						code: 'ORIG',
						change: 1000
					},
					{
						code: 'PREV-PAID',
						change: -1000
					}
				]
			},
			{
				service_code: "teeth-whitening",
				wanted: false,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: true,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: [
			{
				option_code: '2x3=SEPIA',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				colour: 'SEPIA'
			}
		]
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-6',
		studio_code: "luxarte",                                                             
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.SAVED.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			//delivery_state: "READY_to_SEND_to_VENDOR",
			//delivery_transaction_id: '~TRANS-01',
			//file_request_string: 'xxxxxx'
		},

		prints_list: [
			{
				option_code: '2x3=8=SEPIA=ECONO',
				wanted: true,
				size: '2x3',
				qty: 8,
				finish: 'ECONO',
				colour: 'SEPIA'
				//delivery_state: "READY_to_SEND_to_VENDOR",
				//delivery_transaction_id: '~TRANS-01',
			}
		],
		retouches_list: [
			{
				service_code: "basic-retouching",
				wanted: false,
			},
			{
				service_code: "advanced-retouching",
				wanted: true,
				price_history: [
					{
						code: 'ORIG',
						change: 1000
					},
					{
						code: 'PREV-PAID',
						change: -1000
					}
				]
			},
			{
				service_code: "hair-retouching",
				wanted: false,
			},
			{
				service_code: "teeth-whitening",
				wanted: false,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: false,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: [
			{
				option_code: '2x3=SEPIA',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				colour: 'SEPIA'
			}
		]
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-5a',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.IN_CART.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			//delivery_state: "DELIVERED_to_PIXOWN",
			//delivery_transaction_id: '~TRANS-99',
			//file_request_string: 'xxxxxx'
		},

		prints_list: [
			{
				option_code: '2x3=8=SEPIA=ECONO',
				wanted: true,
				size: '2x3',
				qty: 8,
				finish: 'ECONO',
				colour: 'SEPIA'
				//delivery_state: "READY_to_SEND_to_VENDOR",
				//delivery_transaction_id: '~TRANS-01',
			},
			{
				option_code: '5x7=2=BW=LUSTER',
				wanted: true,
				size: '5x7',
				qty: 2,
				finish: 'LUSTER',
				colour: 'BW'
				//delivery_state: "READY_to_SEND_to_VENDOR",
				//delivery_transaction_id: '~TRANS-01',
			}
		],
		retouches_list: [
			{
				service_code: "teeth-whitening",
				wanted: true,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: true,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: [
			{
				option_code: '2x3=SEPIA',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				colour: 'SEPIA'
			}
		]
	},
	// - - - - - - - - - - - - - - - - - - 
	{
		_id:					'~WUP-5b',
		studio_code: "luxarte",
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.IN_CART.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			//delivery_state: "DELIVERED_to_PIXOWN",
			//delivery_transaction_id: '~TRANS-99',
			//file_request_string: 'xxxxxx'
		},

		prints_list: [],
		retouches_list: [
			{
				service_code: "teeth-whitening",
				wanted: true,
			},
			{
				service_code: "glasses-glare-removal",
				wanted: true,
			}
		],
		crop: {
			wanted: false,
		},
		downloads_list: [
			{
				option_code: '2x3=SEPIA',
				wanted: true,
				delivery_state: "READY_to_SEND_to_VENDOR",
				delivery_transaction_id: '~TRANS-01',
				size: '2x3',
				colour: 'SEPIA'
			}
		]
	},
	{
		_id:					'~WUP-6a',
		studio_code: "luxarte",                                                             
		school_code: "001",
		customer_code: "Wendy",
		sitting_code: "DD0001",
		pose_code: "01",

		downloading_agreement_code: "DOWNLOADING-1",
		retouching_agreement_code: "RETOUCHING-1",
		printing_agreement_code: "PRINTING-1",

		last_updated: new Date("March 12, 2017"),
		
		source: Workup_Sources.from_SITTING.name,
		state:  Workup_States.IN_CART.name,

		starting_image: {
			image_id: '~IMAGE-1',
		},
		final_image: {},
		downloadable_image: {
			//image_id: '~IMAGE-1-BA-HIRES',
			//delivery_state: "READY_to_SEND_to_VENDOR",
			//delivery_transaction_id: '~TRANS-01',
			//file_request_string: 'xxxxxx'
		},

		prints_list: [
			{
				option_code: '2x3=8=SEPIA=ECONO',
				wanted: true,
				size: '2x3',
				qty: 8,
				finish: 'ECONO',
				colour: 'SEPIA'
				//delivery_state: "READY_to_SEND_to_VENDOR",
				//delivery_transaction_id: '~TRANS-01',
			}
		],
		retouches_list: [],
		crop: {
			wanted: false,
		},
		downloads_list: []
	},

]
// ====================================================================
const insert_test_workups = (clear_first=false) => {
	if (clear_first) { Workups.remove({}) }
	insert_raw_test_records("WORKUPS", raw_records)
}
// ====================================================================

export { insert_test_workups }
