import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// currenty, this collection is meant to house the latest scan of dropbox folder contents
// ====================================================================
const Folders = new Mongo.Collection('folders')

Folders.collection_name = "Folders"

Folders.schema = Yup.object().shape({
	vendor_code: Yup.string(),
	foldername: Yup.string(),
	subfolders: Yup.array().of(Yup.string()),
	files: Yup.array().of(Yup.object().shape({
		name: Yup.string(),
		url: Yup.string(),
		thumbnail: Yup.string(),
		error: Yup.object()
	})),
	sequence: Yup.number().integer(),
	transaction_id: Yup.string(),
	schema_version: Yup.number().integer().positive(),
	last_scan_time: Yup.date()
})

// ====================================================================

export { Folders }