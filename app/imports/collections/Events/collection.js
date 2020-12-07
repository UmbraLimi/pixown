import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Events = new Mongo.Collection('events')

Events.collection_name = "Events"

Events.schema = Yup.object().shape({
	// this is the currently logged-in Meteor.userId()
	meteor_user_id: Yup.string().required(),

	event_type: Yup.string().required(), //enum Event_Types
	payload: Yup.object(), // event-type-specific
	foldertree: Yup.string(),
	//system: Yup.string().required(), //enum Systems
	module_name: Yup.string(),
	function_name: Yup.string(),
	block: Yup.string(),
	comments: Yup.string(),
	transaction_id: Yup.string(),
	schema_version: Yup.number().integer().positive().required(),
	server_or_client: Yup.string(),  // should be enum
	createdOn: Yup.date()
})

// ====================================================================

export { Events }