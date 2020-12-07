import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Downloading_Agreements = new Mongo.Collection('downloading_agreements')

Downloading_Agreements.collection_name = "Downloading_Agreements"

Downloading_Agreements.schema = Yup.object().shape({
	// pseudo-key is agreement_code
	agreement_code: Yup.string().required(),
	vendor_code: Yup.string().required(),
	title: Yup.string().required(),
	options_list: Yup.array().required().of(Yup.object().shape({
		// option_code '2x3=SEPIA' size=colour
		option_code: Yup.string().required(),
		pixown_price: Yup.number().integer().positive().required(),
		vendor_cost: Yup.number().integer().positive().required(),
	})),
	date_of_agreement: Yup.date(),
	date_of_expiry: Yup.date(),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Downloading_Agreements }