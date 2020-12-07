import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	/*
	Meteor.publish('UPLOADS.all.unsorted', () => {
		return Uploads.find()
	})

	Meteor.publish('UPLOADS.one-mongo-id', (mongo_id_string) => {
		check(mongo_id_string, String)
		return Uploads.find({
			"_id": mongo_id_string
		})
	})

	Meteor.publish('UPLOADS.one-studio-code', (studio_code) => {
		check(studio_code, String)
		return Uploads.find({
			studio_code: studio_code
		})
	})
	*/
}
// ====================================================================
