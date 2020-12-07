import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----node packages----------------
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'RETOUCHING_SERVICES'
	// ------------------
	Meteor.publish(`${name}.in-id-list`, (args) => {
		check(args._id, Object)
		check(args._id.$in, Array)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
}
// ====================================================================
