import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Transactions = new Mongo.Collection('transactions')

Transactions.collection_name = "Transactions"

Transactions.schema = Yup.object().shape({
	// this is the currently logged-in Meteor.userId()
	meteor_user_id: Yup.string().required(),

	transaction_type: Yup.string().required(), //enum Transaction_Types.XXXX.name
	payload: Yup.object(), // transaction-type-specific
	customer_code: Yup.string(),
	studio_code: Yup.string(),
	school_code: Yup.string(),
	sitting_code: Yup.string(),
	pose_code: Yup.string(),
	image_id: Yup.string(),
	upload_id: Yup.string(),
	vendor_code: Yup.string(),
	workup_id: Yup.string(),
	retouching_agreement_code: Yup.string(),
	downloading_agreement_code: Yup.string(),
	printing_agreement_code: Yup.string(),
	order_id: Yup.string(),
	comments: Yup.string(),
	event_id: Yup.string(),
	schema_version: Yup.number().integer().positive().required(),
	//system: Yup.string().required(), //enum systems.XXXX.name
	createdOn: Yup.date()
})

// ====================================================================

export { Transactions }