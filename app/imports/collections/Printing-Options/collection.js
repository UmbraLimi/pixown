import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Printing_Options = new Mongo.Collection('printing_options')

Printing_Options.collection_name = "Printing_Options"

Printing_Options.schema = Yup.object().shape({
	// option_code '2x3=8-SEPIA=ECONO' size=qty=colour=finish
	option_code: Yup.string().required(),
	vendor_code: Yup.string().required(),
	size: Yup.string().required(),
	qty: Yup.number().integer().positive().required(),
	colour: Yup.string().required(),
	finish: Yup.string().required(),
	// prices are overridden by agreements
	pixown_price: Yup.number().integer().positive().required(),
	vendor_cost: Yup.number().integer().positive().required(),
	note_to_customers: Yup.string(),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Printing_Options }