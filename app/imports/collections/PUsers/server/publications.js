import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'PUSERS'
	// ------------------
	Meteor.publish(`${name}.one-customer-code`, (args) => {
		check(args.meteor_username, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
}
// ====================================================================
