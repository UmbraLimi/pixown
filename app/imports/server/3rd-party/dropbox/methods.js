import { Meteor } 							from  'meteor/meteor'
// ----node-packages----------------
import { _ as __ }              from  'lodash'
import { check } 								from  'meteor/check'
//import { dateify } 							from  '/imports/client/misc/formatter.js'
// ----helpers----------------------
import { walk_dropbox, delete_vendor_folders 
}					from  '/imports/server/3rd-party/dropbox/helpers.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async check_dropbox() {
		// get vendor's dropbox credentials
		const user_record = await Meteor.call('PUSERS.get_logged_in_user_record')
		const vendor_code = user_record.vendor_code

		// clear all folder records for this vendor
		const wasDeleted = await delete_vendor_folders(vendor_code)
		if (!wasDeleted) return {
			time_of_scan: new Date(),
			success: false,
			message: 'Error while deleting existing folder records'
		}
		
		// walk dropbox folders and write to Folders collection
		console.log('===', 'starting check_dropbox' )
		const DAT = Meteor.settings.private.dropbox_access_tokens.development
		const Messages = []
		const Cfolders = []
		try {
			await walk_dropbox(DAT, Cfolders, Messages)
			console.log('===', 'ending check_dropbox', 'success' )
			console.log(Cfolders, Messages)
			const records = __.map(Cfolders, (folder) => {
				return {
					vendor_code: vendor_code,
					...folder
				}
			})
			insert_raw_test_records("FOLDERS", records)
			return {
				time_of_scan: new Date(),
				messages: Messages
			}	
		} catch(e) {
			//push_message_for_Sam('e', e, 'Unexpected Failure')
			console.log('===', 'ending check_dropbox', 'failure' )
			console.error(e)
			throw new Error(e)
		}
	},
})
// ====================================================================

