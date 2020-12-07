import { Retouching_Services } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                  '~basic-retouching',
		vendor_code:          'luxarte',
		service_code:        	'basic-retouching',
		//note_to_customers:    null,
		question:             'Would you like basic retouching?',
		explain:							['i.e. small blemishes removed'],
		title:                'Basic|Retouching',
		image_filename:       '/images/Basic After.png',
		image_before_filename:'/images/Basic Before.png',
		label:                'BASIC',
		icon_name:            'fa-spinner',
	},
	{
		_id:                 	'~advanced-retouching',
		vendor_code:          'luxarte',
		service_code:         'advanced-retouching',
		//note_to_customers:    null,
		question:             'Would you like advanced retouching?',
		explain: [
			'removal of acne and the shine caused by oily skin',
			'softening of the lines under the eyes'
		],
		title:                'Advanced|Retouching',
		image_filename:       '/images/Advance After.png',
		image_before_filename:'/images/Advance Before.png',
		label:                'ADVANCED',
		icon_name:            'fa-snowflake-o',
	},
	{
		_id:                  '~hair-retouching',
		vendor_code:          'luxarte',
		service_code:         'hair-retouching',
		//note_to_customers:    null,
		question:             'Would you like any stray hairs removed?',
		explain:							['e.g. over your forehead'],
		title:                'Stray Hairs|Removal',
		image_filename:       '/images/Hair After.png',
		image_before_filename:'/images/Hair Before.png',
		label:                'HAIR',
		icon_name:            'fa-strikethrough',
	},
	{
		_id:                  '~teeth-whitening',
		vendor_code:          'luxarte',
		service_code:         'teeth-whitening',
		//note_to_customers:    null,
		question:             'Would you like your teeth whitened?',
		explain:							[],
		title:                'Teeth|Whitening',
		image_filename:       '/images/Teeth After.png',
		image_before_filename:'/images/Teeth Before.png',
		label:                'TEETH',
		icon_name:            'fa-smile-o',
	},
	{
		_id:                  '~glasses-glare-removal',
		vendor_code:          'luxarte',
		service_code:         'glasses-glare-removal',
		//note_to_customers:    null,
		question:             'Would you like glare from your glasses removed?',
		explain:							[],
		title:                'Glasses Glare|Removal',
		image_filename:       '/images/Glass Glare After.png',
		image_before_filename:'/images/Glass Glare Before.png',
		label:                'GLASSES',
		icon_name:            'fa-glass',
	}
]
// ====================================================================
const insert_test_retouching_services = (clear_first=false) => {
	if (clear_first) { Retouching_Services.remove({}) }
	insert_raw_test_records("RETOUCHING_SERVICES", raw_records)
}

export { insert_test_retouching_services }
