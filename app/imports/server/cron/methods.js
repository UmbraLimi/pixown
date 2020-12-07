//import { _ as __ }              from  'lodash'
import { check } 								from  'meteor/check'
//import { dateify } 							from  '/imports/client/misc/formatter.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	'crushSomeNumbers'(parm1, parm2) {
		check(parm1, String)
		check(parm2, String)
		console.log(parm1, parm2)
		return "run method at " + Date.now()
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	'import_luxarte_batch_from_dropbox'() {
		// find all NEW outout.xlsx files in dropbox of luxarte
		// move the rows into raw_imports table
		// add file 'status.txt' with status
		// create event trecord and transaction records
		// check that there are pictures in the same folder that match the client key-pose in output.xlsx
		// check that there are PUser records for each client key
		// notify vendor of problems/success via Notifications record
	},
	/*
	async 'bogus.insert'(colleXion_name, record) {
		const __fn = 'DB.insert()'
		const colleXion = get_collection_from_name(colleXion_name)
		let valid, mongo_id
		try {
			check(record, Object) // this is all you need, but offers little protection
			valid = await validate_record(colleXion.schema, record)
			mongo_id = await insert_record(colleXion, record)
			return mongo_id
		} catch (error) {
			if (error.type && error.type === 'Match.Error') {
				console.error(`${colleXion.collection_name}.insert`, 'Match error', '--', 'one of the following check()s failed')
				console.log('record', record)
				throw new Meteor.Error(__fn, `Failure during check for ${colleXion.collection_name}`, error)
			
			} else if (!valid) {
				console.error(`${colleXion.collection_name}.insert`, 'validation error', '--', error)
				throw new Meteor.Error(__fn, `Failure during validate_record() for ${colleXion.collection_name}`, error)
			
			} else if (!mongo_id) {
				console.error(`${colleXion.collection_name}.insert`, 'insert error', '--', error)
				throw new Meteor.Error(__fn, `Failure during insert_record() for ${colleXion.collection_name}`, error)
			} else {
				console.log(`${colleXion.collection_name}.insert`, 'unexpected error', '--', error)
				throw new Meteor.Error(__fn, `Unexpected Failure during DB.insert() for ${colleXion.collection_name}`, error)
			}
		}
	},
	*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})
// ====================================================================
