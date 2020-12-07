import { Uploads } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:								'~UPLOAD-1',
		upload_code:				'UPLOAD-1',
		studio_code: 				'luxarte',
		upload_type:        'location',
		csv: {
			filename:     		'Location Filemaker Export.csv',
			datestamp: 	  		new Date(),
			bytes:						21369,
			folder:  					'/images/luxarte/001',
		},
		comment:						'This is a comment',
		tags:								['there','are','two'],
		num_sittings:				34,
		createdOn: 					new Date()
	},
	{
		_id:								'~UPLOAD-2',
		upload_code:				'UPLOAD-2',
		studio_code: 				'luxarte',
		upload_type:        'location',
		csv: {
			filename:     		'Location Filemaker Export.csv',
			datestamp: 	  		new Date(),
			bytes:						21369,
			folder:  					'/images/luxarte/002',
		},
		comment:						'This is a comment',
		tags:								['there','are','two'],
		num_sittings:				11,
		createdOn: 					new Date()
	}
]
// ====================================================================
const insert_test_uploads = (clear_first=false) => {
	if (clear_first) { Uploads.remove({}) }
	insert_raw_test_records("UPLOADS", raw_records)
}
// ====================================================================

export { insert_test_uploads }
