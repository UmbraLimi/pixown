import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'VENDORS'
	// ------------------
	Meteor.publish(`${name}.one-vendor-code`, (args) => {
		check(args.vendor_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
}
// ====================================================================
