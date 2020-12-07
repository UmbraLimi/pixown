import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	/*
	Meteor.publish('TRANSACTIONS.all.unsorted', function () {
		return Transactions.find()
	})

	Meteor.publish('TRANSACTIONS.one-mongo-id', function (mongo_id_string) {
		check(mongo_id_string, String)
		return Transactions.find({
			"_id": mongo_id_string
		})
	})

	Meteor.publish('TRANSACTIONS.same-pose', function (
		customer_code,
		studio_code,
		school_code,
		sitting_code,
		pose_code
	) {
		check(customer_code, String)
		check(studio_code, String)
		check(school_code, String)
		check(sitting_code, String)
		check(pose_code, String)
		return Transactions.find({
			customer_code: customer_code,
			studio_code: studio_code,
			school_code: school_code,
			sitting_code: sitting_code,
			pose_code: pose_code
		})
	})
	*/
}
// ====================================================================
