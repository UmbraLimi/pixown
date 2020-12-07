import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Retouching_Services = new Mongo.Collection('retouching_services')

Retouching_Services.collection_name = "Retouching_Services"

Retouching_Services.schema = Yup.object().shape({
	service_code: Yup.string().required(),
	vendor_code: Yup.string().required(),
	title: Yup.string().required(),
	note_to_customers: Yup.string(),
	question: Yup.string().required(),
	explain: Yup.array().of(Yup.string()),
	image_filename: Yup.string().required(),
	image_before_filename: Yup.string(),
	label: Yup.string().required(),
	icon_name: Yup.string().required(),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Retouching_Services }