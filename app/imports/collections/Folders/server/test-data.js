import { Folders } from '../collection.js'
import { log_error_details, insert_raw_test_records } from '/imports/server/misc/misc.js'
// ====================================================================

const raw_records = [
  {
		_id:					'~FOLDER-1',
		vendor_code: 'luxarte',
		sequence:			1,
		name:  'Test folder',
		createdOn: new Date()
  },
  {
		_id:					'~FOLDER-2',
		vendor_code: 'luxarte',
		sequence:			2,
    name:  'Test folder/subfolder',
		createdOn: new Date()
	}
]
// ====================================================================
const insert_test_folders = (clear_first=false) => {
  if (clear_first) { Folders.remove({}) }
	insert_raw_test_records("FOLDERS", raw_records)
}
// ====================================================================

export { insert_test_folders }
