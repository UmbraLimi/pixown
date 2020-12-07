import { Events } from '../collection.js'
import { Event_Types } from '/imports/enums/event-types.js'
import { Systems } from '/imports/enums/systems.js'
import { log_error_details, insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:                '~EVENT-1',
		event_type:					Event_Types.DB_ERROR.name,
		//system:					Systems.CUSTOMER.name,
		payload:						{
			collection_name: "Orders",
			error: new Meteor.Error("AA", "BB", "CC")
		},
		foldertree:			    'imports/collections/Transactions',		
		module_name:				'methods.js',
		function_name:			'TRANSACTIONS.insert()',	
		block:							'catch block',
		//comments:							
		//transaction_id:				
		server_or_client:		"SERVER",
		schema_version:			1,
		meteor_user_id:			'bogus meteor_user_id', //Meteor.userId(),
	}
]

const method_records = [
	{
		name: 'log_db_error',
		record: {
			meteor_user_id:			'bogus meteor_user_id', //Meteor.userId(),
			server_or_client: 'SERVER', 
			foldertree: 'imports/collections/Transactions', 
			module_name: 'methods.js', 
			function_name: 'TRANSACTIONS.insert()', 
			block: 'catch block', 
			collection_name: 'Transactions', 
			error: new Meteor.Error("AAaa", "BBbb", "CCcc"),
			//comments
			//transaction_id
			//system:					Systems.CUSTOMER.name,
		}
	},
]
// ====================================================================
const insert_test_events = async (clear_first=false) => {
	if (clear_first) { Events.remove({}) }
	insert_raw_test_records("EVENTS", raw_records)

	// #FIXME this section produces an error I have yet to find
	/*_.map(method_records, async (method) => {
		try {
			const mongo_id = await	Meteor.call(`EVENTS.${method.name}`, method.record)
			console.log(`+++ EVENTS.${method.name} insert Success!`, mongo_id)
		} catch (error) {
			log_error_details(`--- EVENTS.${method.name} insert Error!`, error)
		}
	})*/
	
}
// =======================================================

export { insert_test_events }
