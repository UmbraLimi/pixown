import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Uploads = new Mongo.Collection('uploads')

Uploads.collection_name = "Uploads"

Uploads.schema = Yup.object().shape({
	upload_code: Yup.string().required(),
	studio_code: Yup.string().required(),
	upload_type: Yup.string().required(),
	csv: Yup.object().required().shape({
		filename: Yup.string(),
		folder: Yup.string(),
		datestamp: Yup.date(),
		bytes: Yup.number().integer().positive(),
	}),
	comment: Yup.string(),
	tags: Yup.array().of(Yup.string()),
	num_sittings: Yup.number().integer().positive(),
	createdOn: Yup.date()
})

// ====================================================================

export { Uploads }