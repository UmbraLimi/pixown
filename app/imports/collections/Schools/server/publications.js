import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'SCHOOLS'
	// ------------------
	Meteor.publish(`${name}.one-school-code`, function (args) {
		check(args.school_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-vendor-code`, function (args) {
		check(args.vendor_code_list, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-vendor-code__one-school-code`, function (args) {
		check(args.vendor_code_list, String)
		check(args.school_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-mongo-id`,	function (args) {
		check(args._id, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	
}
// ====================================================================
