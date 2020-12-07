import { _ as __ }              from  'lodash'

// ====================================================================
export const insert_raw_test_records = (collection_name, raw_records) => {
	_.map(raw_records, async (record) => {
		try {
			const mongo_id = await Meteor.call('DB.insert', collection_name, record)
			//console.log('+++ DB.insert Success!', collection_name, mongo_id)
		} catch (error) {
			log_error_details(`--- DB.insert Error! for ${collection_name}`, record, error)
		}
	})
}
// ====================================================================