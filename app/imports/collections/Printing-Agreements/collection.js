import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Printing_Agreements = new Mongo.Collection('printing_agreements')

Printing_Agreements.collection_name = "Printing_Agreements"

Printing_Agreements.schema = Yup.object().shape({
	agreement_code: Yup.string().required(),
	vendor_code: Yup.string().required(),
	title: Yup.string().required(),

	options_list: Yup.array().required().of(Yup.object().shape({
		// option_code '2x3=8-SEPIA=ECONO' size=qty=colour=finish
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

export { Printing_Agreements }