import { _ as __ } from 'lodash'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
export const insert_record = (collection, record) => {
	record.createdOn = new Date()
	return new Promise( (resolve, reject) => {
		collection.insert(record, (err, res) => {
			if (err) {
				console.error('Mongo INSERT error', err)
				reject(new Meteor.Error('mongo error', "insert", err))
				return // force function to end
			}
			const mongo_id = res
			console.log("NEW _id", mongo_id, 'was just SAVED to', collection._name)
			resolve(mongo_id)
			return // force function to end
		})
	})
}
// ====================================================================
export const replace_record = (collection, mongo_id, set__record) => {
	const actions = {}
	set__record.last_updated = new Date()
	return new Promise( (resolve, reject) => {
		collection.update(
			{ _id:  mongo_id }, set__record,
			// options
			(err, res) => {
				if (err) {
					console.error('Mongo UPDATE error', mongo_id, err)
					reject(new Meteor.Error('mongo error', "update", err))
					return // force function to end
				}
				// res = number of records updated, in this case always = 1
				console.log("_id", mongo_id, 'was just UPDATED/REPLACED in', collection._name)
				resolve(true)
				return // force function to end
			}
		)
	})
}
// ====================================================================
export const update_record = (collection, mongo_id, set__record, unset__record) => {
	const actions = {}
	set__record.last_updated = new Date()
	if (!__.isEmpty(set__record)) {actions.$set = set__record}
	if (!__.isEmpty(unset__record)) {actions.$unset = unset__record}
	//console.log('-+-+-+-+', actions)
	return new Promise( (resolve, reject) => {
		collection.update(
			{ _id:  mongo_id }, actions,
			// options
			(err, res) => {
				if (err) {
					console.error('Mongo UPDATE error', mongo_id, err)
					reject(new Meteor.Error('mongo error', "update", err))
					return // force function to end
				}
				// res = number of records updated, in this case always = 1
				console.log("_id", mongo_id, 'was just UPDATED in', collection._name)
				resolve(true)
				return // force function to end
			}
		)
	})
}
// ====================================================================
export const delete_many_records = (collection, args) => {
	return new Promise( (resolve, reject) => {
		collection.remove(args, (err, res) => {
			if (err) {
				console.error('Mongo DELETE error', args, err)
				reject(new Meteor.Error('mongo error', "delete many", err))
				return // force function to end
			}
			console.log('just DELETED', res, 'from', collection._name)
			resolve({
				wasDeleted: true,
				nRemoved: res
			})
			return // force function to end
		})
	})
}
// ====================================================================
export const delete_record = (collection, mongo_id) => {
	return new Promise( (resolve, reject) => {
		collection.remove(mongo_id, (err, res) => {
			if (err) {
				console.error('Mongo DELETE error', mongo_id, err)
				reject(new Meteor.Error('mongo error', "delete", err))
				return // force function to end
			}
			console.log("_id", mongo_id, 'was just DELETED from', collection._name)
			resolve(true)
			return // force function to end
		})
	})
}
// ====================================================================
export const does_record_exist = (collection, mongo_id) => {
	//console.log( '~~~ ~~~', 'does_record_exist', '~~~~')
	return new Promise( (resolve, reject) => {
		const keyObj = {_id: mongo_id }
		if (collection.findOne(keyObj) === undefined) {
			console.error('Mongo EXIST error', mongo_id, err)
			reject( new Meteor.Error('record not found', '_id: ' + mongo_id + ' does not exist in ', collection._name))
			return // force function to end
		}
		resolve(true)
		return // force function to end
	})
}
// ====================================================================