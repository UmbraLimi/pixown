import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Downloading_Options = new Mongo.Collection('downloading_options')

Downloading_Options.collection_name = "Downloading_Options"

Downloading_Options.schema = Yup.object().shape({
	// option_code '2x3=SEPIA' size=colour
	option_code: Yup.string().required(),
	vendor_code: Yup.string().required(),
	size: Yup.string().required(),
	colour: Yup.string().required(),
	// prices are overridden by agreements
	pixown_price: Yup.number().integer().positive().required(),
	vendor_cost: Yup.number().integer().positive().required(),
	note_to_customers: Yup.string(),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Downloading_Options }