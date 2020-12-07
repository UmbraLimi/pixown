import { PUsers }         from '../collection.js'
import { User_Roles }     from '/imports/enums/user-roles.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ===========================================================================
const raw_records = [
	{
		meteor_username:     'Wendy', // also in Meteor.PUsers.findOne() as "username"
		password:      '111', // will NOT be stored in PUsers Table
		username:      'Wendy H.',
		role:          User_Roles.CUSTOMER.name,
		surname:       'Holtzana',
		other_names:   'Wendy',
		mailing_address: {
			street: '164 Hanover Street',
			city: 'Grand Creek',
			province: 'Alberta',
			postal_code: "M2R 3T5",
			country: 'Canada',
		},
		billing_address: {
			street: '13 Markham Street',
			city: 'Granada',
			province: 'Ontario',
			postal_code: "L2S 6W6",
			country: 'Canada',
		},
		email: 'wendy@ho.ho',
		phone: '1234567890',
	},
	{
		meteor_username:     'Sam', // must be unique - should use email if nothing else
		password:      '111',
		username:      'Sam Young',
		role:          User_Roles.VENDOR.name,
		vendor_code:   'luxarte',
		surname:       'Young',
		other_names:   'Sam',
		mailing_address: {
			street: '165 Hanover Street',
			city: 'Aloha Ridge',
			province: 'Quebec',
			postal_code: "M2R 3T5",
			country: 'Canada',
		},
		billing_address: {
			street: '13 Markham Street',
			city: 'Granada',
			province: 'Ontario',
			postal_code: "L2S 6W6",
			country: 'Canada',
		},
		email: 'sam@ho.ho',
		phone: '1234567890'
	},
	{
		meteor_username:     'Fraser',
		password:      '111',
		username:      'Fraser G.',
		role:          User_Roles.ADMIN.name,
		surname:       'Gorrie',
		other_names:   'Fraser',
		mailing_address: {
			street: '166 Hanover Street',
			city: 'Grand City',
			province: 'PEI',
			postal_code: "M2R 3T5",
			country: 'Canada'
		},
		billing_address: {
			street: '13 Markham Street',
			city: 'Granada',
			province: 'Ontario',
			postal_code: "L2S 6W6",
			country: 'Canada',
		},
		email: 'fraser@ho.ho',
		phone: '1234567890'
	}
]
// ===========================================================================
//const insert_test_PUsers = (clear_first=false) => {
//	if (clear_first) { PUsers.remove({}) }
//	insert_raw_test_records("PUSERS", raw_records)
//}
// ===========================================================================
const create_test_meteor_PUsers = (clear_first=false) => {
	if (clear_first) { 
		Meteor.users.remove({}) 
		PUsers.remove({})
	}
	_.map(raw_records, (record) => {
		const user = {
			username: record.meteor_username,
			email:    record.email,
			password: record.password
		}
		// 1st create the meteor user
		console.log(user)
		const user_id = Accounts.createUser(user)
		// 2nd create the corresponding PUser
		record.meteor_user_id = user_id
		insert_raw_test_records("PUSERS", [record])
	})
}
// ===========================================================================

export { insert_test_PUsers, create_test_meteor_PUsers }
