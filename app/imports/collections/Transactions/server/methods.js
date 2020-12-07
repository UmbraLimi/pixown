import { _ as __ }             	from  'lodash'
import randomstring            	from  'randomstring'
import { check }  							from  'meteor/check'
// ----helpers----------------------
import { Transaction_Types } 		from  '/imports/enums/transaction-types.js'
// ----collections------------------
//import { Transactions } 				from  '../collection.js'
// ----components-------------------

// ====================================================================
const create_transaction_shell = () => {
	return {
		meteor_user_id: Meteor.userId(),
		schema_version: 1,
		//system: Meteor.settings.public.system,
		createdOn: new Date()
	}
}
// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'TRANSACTIONS.log_successful_order'(settings) {
		try {
			check(settings, Object) // this is all you need, but offers little protection
			const record = { ...create_transaction_shell() }
			record.transaction_type = Transaction_Types.SUCCESSFUL_ORDER.name
			__.map(settings, (value, key) => {
				record[key] = value
			})
			const mongo_id = await Meteor.call('DB.insert', "TRANSACTIONS", record) // to force validation before inseet
			return mongo_id

		} catch (error) {
			console.log('--', 'TRANSACTIONS.log_successful_order catch', '--', error)
			throw error // pass the error along
		}
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})
