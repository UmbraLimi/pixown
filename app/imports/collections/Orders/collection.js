import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Orders = new Mongo.Collection('orders')

Orders.collection_name = "Orders"

Orders.schema = Yup.object().shape({
	customer_code: Yup.string().required(),
	payment_provider: Yup.string().required(),
	payment_datetime: Yup.date().required(),
	stripe_charge: Yup.object().shape({
		amount: Yup.number().integer().positive(),
		currency: Yup.string(),
		source: Yup.string(),
		description: Yup.string(),
		receipt_email: Yup.string().email(),
	}),
	workups: Yup.array().of(Yup.string()),
	studio_codes: Yup.array().of(Yup.string()), // convenience for vendor system
	stripe_response: Yup.object(), // for now leaving it undefined within as I don't know if it changes
	insurance: Yup.object().shape({
		wanted: Yup.boolean(),
		cost: Yup.number().integer().positive(),
	}),
	user_record: Yup.object(),
	discounts: Yup.object().shape({
		retouching: Yup.number().integer().negative(),
		flash_sale: Yup.number().integer().negative(),
		cost_threshold: Yup.number().integer().negative(),
		total: Yup.number().integer().negative(),
	}),
	raw_cost_totals: Yup.object().shape({
		retouching: Yup.number().integer().positive(),
		prints: Yup.number().integer().positive(),
		downloads: Yup.number().integer().positive(),
		total: Yup.number().integer().positive(),
	}),
	postage_handling: Yup.number().integer().positive(),
	pre_hst_total: Yup.number().integer().positive(),
	hst: Yup.number().integer().positive(),
	grand_total_cost: Yup.number().integer().positive(),
	createdOn: Yup.date()
})

// ====================================================================

export { Orders }