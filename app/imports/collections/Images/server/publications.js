import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'IMAGES'
	// ------------------
	Meteor.publish(`${name}.one-mongo-id`, (args) => {
		check(args._id, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	
	Meteor.publish(`${name}.in-id-list`, (args) => {
		check(args._id, Object)
		check(args._id.$in, Array)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})

	/*
	Meteor.publish('IMAGES.one-studio-code', function(studio_code) {
		check(studio_code, String)
		return Images.find({
			studio_code: studio_code
		})
	})

	Meteor.publish('IMAGES.one-upload-id', function(upload_id) {
		check(upload_id, String)
		return Images.find({
			upload_id: upload_id
		})
	})
	*/
}
// ====================================================================
