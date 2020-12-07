import { create_test_meteor_PUsers } from '/imports/collections/PUsers/server/test-data.js'
import { insert_test_vendors } from '/imports/collections/Vendors/server/test-data.js'
import { insert_test_schools } from '/imports/collections/Schools/server/test-data.js'
import { insert_test_sittings } from '/imports/collections/Sittings/server/test-data.js'
import { insert_test_printing_options } from '/imports/collections/Printing-Options/server/test-data.js'
import { insert_test_printing_agreements } from '/imports/collections/Printing-Agreements/server/test-data.js'
import { insert_test_retouching_services } from '/imports/collections/Retouching-Services/server/test-data.js'
import { insert_test_retouching_agreements } from '/imports/collections/Retouching-Agreements/server/test-data.js'
import { insert_test_downloading_options } from '/imports/collections/Downloading-Options/server/test-data.js'
import { insert_test_downloading_agreements } from '/imports/collections/Downloading-Agreements/server/test-data.js'
import { insert_test_workups } from '/imports/collections/Workups/server/test-data.js'
import { insert_test_orders } from '/imports/collections/Orders/server/test-data.js'
import { insert_test_images } from '/imports/collections/Images/server/test-data.js'
import { insert_test_uploads } from '/imports/collections/Uploads/server/test-data.js'
import { insert_test_events } from '/imports/collections/Events/server/test-data.js'
import { insert_test_transactions } from '/imports/collections/Transactions/server/test-data.js'
import { insert_test_folders } from '/imports/collections/Folders/server/test-data.js'

// ===========================================================================================
const reset_to_test_data = async () => {
  const production_state = Meteor.settings.public.production_state
  if (production_state === 'DEVELOPMENT') {
    create_test_meteor_PUsers(true)

    insert_test_vendors(true)

    insert_test_schools(true)

    insert_test_sittings(true)
    insert_test_printing_options(true)
    insert_test_printing_agreements(true)
    insert_test_retouching_services(true)
    insert_test_retouching_agreements(true)
    insert_test_downloading_options(true)
    insert_test_downloading_agreements(true)
    insert_test_workups(true)
    insert_test_orders(true)

    insert_test_images(true)
    insert_test_uploads(true)

    insert_test_events(true)
    insert_test_transactions(true)

    insert_test_folders(true)

    return 'Database is now reset to test data'
  } else {
    return 'Cannot comply : production-state = ' + production_state
  }
}

export { reset_to_test_data }
