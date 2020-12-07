// ----npm packages-----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { Event_Types } 					from  '/imports/enums/event-types.js'
//import { log_error_details } 		from 	'/imports/client/misc/misc.js'
// ----collections------------------
//import { Events } 							from  '../collection.js'
// ----components-------------------

// ====================================================================
const create_event_shell = () => {
	return {
		meteor_user_id: Meteor.userId(),
		schema_version: 1,
		//system: Meteor.settings.public.system,
		createdOn: new Date()
	}
}
// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'EVENTS.log_db_error'(settings) {
		try {
			check(settings, Object) // this is all you need, but offers little protection
			const record = { ...create_event_shell() }
			record.event_type = Event_Types.DB_ERROR.name
			record.payload = {
				collection_name: settings.collection_name,
				error: settings.error
			}
			__.map(settings, (value, key) => {
				record[key] = value
			})
			log_error_details(
				[
					'--EVENTS.log_db_error--',
					`in ${record.foldertree}/${record.module_name}/${record.function_name} in block: ${record.block}`,
					`collection: ${record.collection_name}  [${record.client_or_server}]`
				],
				record.error
			)

			const mongo_id = await Meteor.call('DB.insert', "EVENTS", record) // to force validation before inseet
			return mongo_id

		} catch (error) {
			//console.log('--','EVENTS.log_db_error catch','--', error)
			throw error // pass the error along
		}
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})
