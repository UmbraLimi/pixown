import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Retouching_Agreements = new Mongo.Collection('retouching_agreements')

Retouching_Agreements.collection_name = "Retouching_Agreements"

Retouching_Agreements.schema = Yup.object().shape({
	agreement_code: Yup.string().required(),
	vendor_code: Yup.string().required(),
	title: Yup.string().required(),

	services_list: Yup.array().of(Yup.object().shape({
		service_code: Yup.string().required(),
		pixown_price: Yup.number().integer().positive().required(),
		vendor_cost: Yup.number().integer().positive().required(),
	})),
	date_of_agreement: Yup.date(),
	date_of_expiry: Yup.date(),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Retouching_Agreements }