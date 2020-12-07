import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	/*
	Meteor.publish('EVENTS.all.unsorted', function () {
		return Events.find()
	})

	Meteor.publish('EVENTS.one-mongo-id', function (mongo_id_string) {
		check(mongo_id_string, String)
		return Events.find({
			"_id": mongo_id_string
		})
	})
	*/
}
// ====================================================================
