import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Workups = new Mongo.Collection('workups')

Workups.collection_name = "Workups"

Workups.schema = Yup.object().shape({
	//_id is always in a collection
	state: Yup.string().required(), //enum Workup_States.XXXX.name
	source: Yup.string().required(), //enum Workup_Sources.XXXX.name
	customer_code: Yup.string().required(),
	studio_code: Yup.string().required(),
	school_code: Yup.string().required(),
	sitting_code: Yup.string().required(),
	pose_code: Yup.string().required(),

	downloading_agreement_code: Yup.string().required(),
	retouching_agreement_code: Yup.string().required(),
	printing_agreement_code: Yup.string().required(),

	order: Yup.object().shape({
		order_id: Yup.string(),
		raw_prints_total_cost: Yup.number().integer().positive(),
		raw_downloads_total_cost: Yup.number().integer().positive(),
		raw_retouching_total_cost: Yup.number().integer().positive(),
		retouching_total_discount: Yup.number().integer().negative()
	}),

	parent_workup_id: Yup.string(),

	// is proof for new (and possibly a lores retouched image if derived from an order with either retouching or HIRES d/l)
	starting_image: Yup.object().required().shape({
		image_id: Yup.string().required(),
	}),

	// only if ANY retouching done, else is the same as starting image
	// will always have watermark and thus a "proof"
	final_image: Yup.object().shape({
		delivery_state: Yup.string(), //enum Delivery_States.XXXX.name -- only shows the most recent state - other avail via trasactions query
		delivery_transaction_id: Yup.string(), // matched delivery_state
		image_id: Yup.string(),  // has a value after vendor returns image and delivery_state = DELIVERED_to_PIXOWN
		//file_request_string:			Yup.string(), // will be placed into the csv to the vendor when requesting the file
	}),

	// only if they want a download (can be retouched or original)
	downloadable_image: Yup.object().shape({
		delivery_state: Yup.string(), //enum Delivery_States.XXXX.name -- only shows the most recent state - other avail via trasactions query
		delivery_transaction_id: Yup.string(), // matched delivery_state
		image_id: Yup.string(),  // has a value after vendor returns image and delivery_state = DELIVERED_to_PIXOWN
		//file_request_string:			Yup.string(), // will be placed into the csv to the vendor when requesting the file
	}),

	prints_list: Yup.array().of(Yup.object().shape({
		wanted: Yup.boolean().required(),
		option_code: Yup.string().required(),
		size: Yup.string(),
		qty: Yup.number().integer().positive(),
		colour: Yup.string(),
		finish: Yup.string(),
		//price_code: Yup.string(), // enum Price_Codes ???
		sold_price: Yup.number().integer().positive(),
		delivery_state: Yup.string(), //enum Delivery_States.XXXX.name
		delivery_transaction_id: Yup.string(),
		//print_request_string:			Yup.string(),
	})),

	retouches_list: Yup.array().of(Yup.object().shape({
		service_code: Yup.string().required(),
		wanted: Yup.boolean().required(),
		sold_price: Yup.number().integer().positive(), // includes any discount
		delivery_state: Yup.string(), //enum Delivery_States.XXXX.name
		delivery_transaction_id: Yup.string(),
		//retouch_request_string:			Yup.string(),
		//price_history: Yup.array().of(Yup.object().shape({
		//	code: Yup.string().required(), // enum Price_Codes
		//	change: Yup.number().required()  // shows a number (+ or -) that can be added to initial value of 0 assumed
		//}))
	})),

	downloads_list: Yup.array().of(Yup.object().shape({
		option_code: Yup.string().required(),
		wanted: Yup.boolean().required(),
		size: Yup.string(),
		colour: Yup.string(),
		//price_code: Yup.string(), // enum Price_Codes ???
		sold_price: Yup.number().integer().positive(),
		delivery_state: Yup.string(), //enum Delivery_States.XXXX.name
		delivery_transaction_id: Yup.string(),
		//download_request_string:			Yup.string(),
	})),

	crop: Yup.object().required().shape({
		wanted: Yup.boolean().required(),
		sold_price: Yup.number().integer().positive(),
	}),

	last_updated: Yup.date(),
	createdOn: Yup.date()
})
// ====================================================================

export { Workups }
