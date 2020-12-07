//import { _ as __ }              from  'lodash'
import { check } 								from  'meteor/check'
// ----helpers----------------------
import { does_record_exist, insert_record, 
	delete_record, delete_many_records, 
	update_record, replace_record
} 															from  '/imports/server/db/helpers.js'
import { validate_record } 			from  '/imports/common/3rd-party/yup/helpers.js'
import { get_collection_from_name } from '/imports/common/db/collection-from-name.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'DB.insert'(colleXion_name, record) {
		const __fn = 'DB.insert()'
		const colleXion = get_collection_from_name(colleXion_name)
		let valid, mongo_id
		try {
			check(record, Object) // this is all you need, but offers little protection
			valid = await validate_record(colleXion.schema, record)
			mongo_id = await insert_record(colleXion, record)
			return mongo_id
		} catch (error) {
			if (error.errorType === 'Match.Error') {
				console.error(`${colleXion.collection_name}.insert`, 'Match error', '--', 'one of the following checks failed:')
				console.log('record:', record)
				throw new Meteor.Error(__fn, `Failure during check for ${colleXion.collection_name}`, error)
			} else if (error.type && error.type === 'Match.Error') {
				console.error(`${colleXion.collection_name}.insert`, 'Match error', '--', 'one of the following check()s failed')
				console.log('record', record)
				debugger
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
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'DB.deleteMany'(colleXion_name, args) {
		const __fn = 'DB.deletes()'
		const colleXion = get_collection_from_name(colleXion_name)
		let wasDeleted
		try {
			check(args.vendor_code, String)
			const {wasDeleted, nRemoved} = await delete_many_records(colleXion, args)
			return {wasDeleted, nRemoved} 
		} catch (error) {
			if (error.type && error.type === 'Match.Error') {
				console.error(`${colleXion.collection_name}.delete`, 'Match error', '--', 'one of the following check()s failed')
				console.log(args)
				throw new Meteor.Error(__fn, `Failure during check for ${colleXion.collection_name}`, error)
			} else if (!wasDeleted) {
				console.error(`${colleXion.collection_name}.delete`, 'delete error', '--', error)
				throw new Meteor.Error(__fn, `Failure during delete_record() for ${colleXion.collection_name}`, error)
			} else {
				console.log(`${colleXion.collection_name}.delete`, 'unexpected error', '--', error)
				throw new Meteor.Error(__fn, `Unexpected Failure during DB.delete() for ${colleXion.collection_name}`, error)
			}
		}
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'DB.delete'(colleXion_name, mongo_id) {
		debugger // test this fn
		const __fn = 'DB.delete()'
		const colleXion = get_collection_from_name(colleXion_name)
		let deleted, exists
		try {
			check(mongo_id, String)
			exists = await does_record_exist(colleXion, mongo_id)
			deleted = await delete_record(colleXion, mongo_id)
			return deleted
		} catch (error) {
			if (error.type && error.type === 'Match.Error') {
				console.error(`${colleXion.collection_name}.delete`, 'Match error', '--', 'one of the following check()s failed')
				console.log('mongo_id', mongo_id)
				throw new Meteor.Error(__fn, `Failure during check for ${colleXion.collection_name}`, error)
			} else if (!exists) {
				console.error(`${colleXion.collection_name}.delete`, 'does not exist error', '--', error)
				throw new Meteor.Error(__fn, `Failure during does_record_exist() for ${colleXion.collection_name}`, error)
			} else if (!deleted) {
				console.error(`${colleXion.collection_name}.delete`, 'delete error', '--', error)
				throw new Meteor.Error(__fn, `Failure during delete_record() for ${colleXion.collection_name}`, error)
			} else {
				console.log(`${colleXion.collection_name}.delete`, 'unexpected error', '--', error)
				throw new Meteor.Error(__fn, `Unexpected Failure during DB.delete() for ${colleXion.collection_name}`, error)
			}
		}
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'DB.replace'(colleXion_name, mongo_id, set__record) {
		const __fn = 'DB.replace()'
		const colleXion = get_collection_from_name(colleXion_name)
		let valid, exists, update
		try {
			check(set__record, Object)
			check(mongo_id, String)
			valid = await validate_record(colleXion.schema, set__record)
			exists = await does_record_exist(colleXion, mongo_id)
			replace = await replace_record(colleXion, mongo_id, set__record)
			return replace // replace = true
		} catch (error) {
			if (error.type && error.type === 'Match.Error') {
				console.error(`${colleXion.collection_name}.replace`, 'Match error', '--', 'one of the following check()s failed')
				console.log('mongo_id', mongo_id)
				console.log('set__record', set__record)
				throw new Meteor.Error(__fn, `Failure during check for ${colleXion.collection_name}`, error)
			} else if (!valid) {
				console.error(`${colleXion.collection_name}.replace`, 'validation error', '--', error)
				throw new Meteor.Error(__fn, `Failure during validate_record() for ${colleXion.collection_name}`, error)
			} else if (!exists) {
				console.error(`${colleXion.collection_name}.replace`, 'does not exist error', '--', error)
				throw new Meteor.Error(__fn, `Failure during does_record_exist() for ${colleXion.collection_name}`, error)
			} else if (!update) {
				console.error(`${colleXion.collection_name}.replace`, 'update error', '--', error)
				throw new Meteor.Error(__fn, `Failure during replace_record() for ${colleXion.collection_name}`, error)
			} else {
				console.log(`${colleXion.collection_name}.replace`, 'unexpected error', '--', error)
				throw new Meteor.Error(__fn, `Unexpected Failure during DB.replace() for ${colleXion.collection_name}`, error)
			}
		}
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'DB.update'(colleXion_name, mongo_id, set__record, unset__record) {
		const __fn = 'DB.update()'
		const colleXion = get_collection_from_name(colleXion_name)
		let valid, exists, update
		try {
			check(set__record, Object)
			check(unset__record, Object)
			check(mongo_id, String)
			valid = await validate_record(colleXion.schema, set__record)
			exists = await does_record_exist(colleXion, mongo_id)
			update = await update_record(colleXion, mongo_id, set__record, unset__record)
			return update // update = true
		} catch (error) {
			if (error.type && error.type === 'Match.Error') {
				console.error(`${colleXion.collection_name}.update`, 'Match error', '--', 'one of the following check()s failed')
				console.log('mongo_id', mongo_id)
				console.log('set__record', set__record)
				console.log('unset__record', unset__record)
				throw new Meteor.Error(__fn, `Failure during check for ${colleXion.collection_name}`, error)
			} else if (!valid) {
				console.error(`${colleXion.collection_name}.update`, 'validation error', '--', error)
				throw new Meteor.Error(__fn, `Failure during validate_record() for ${colleXion.collection_name}`, error)
			} else if (!exists) {
				console.error(`${colleXion.collection_name}.update`, 'does not exist error', '--', error)
				throw new Meteor.Error(__fn, `Failure during does_record_exist() for ${colleXion.collection_name}`, error)
			} else if (!update) {
				console.error(`${colleXion.collection_name}.update`, 'update error', '--', error)
				throw new Meteor.Error(__fn, `Failure during update_record() for ${colleXion.collection_name}`, error)
			} else {
				console.log(`${colleXion.collection_name}.update`, 'unexpected error', '--', error)
				throw new Meteor.Error(__fn, `Unexpected Failure during DB.update() for ${colleXion.collection_name}`, error)
			}
		}
	},
})
// ====================================================================
