// ----collections------------------
import { Workups }							from  '/imports/collections/Workups/collection.js'
import { PUsers }								from  '/imports/collections/PUsers/collection.js'
import { Images }               from  '/imports/collections/Images/collection.js'
import { Orders }               from  '/imports/collections/Orders/collection.js'
import { Uploads }              from  '/imports/collections/Uploads/collection.js'
import { Vendors }              from  '/imports/collections/Vendors/collection.js'
import { Events }              	from  '/imports/collections/Events/collection.js'
import { Transactions }         from  '/imports/collections/Transactions/collection.js'
import { Schools }              from  '/imports/collections/Schools/collection.js'
import { Sittings }             from  '/imports/collections/Sittings/collection.js'
import { Downloading_Agreements }   from  '/imports/collections/Downloading-Agreements/collection.js'
import { Printing_Agreements }  from  '/imports/collections/Printing-Agreements/collection.js'
import { Retouching_Agreements }    from  '/imports/collections/Retouching-Agreements/collection.js'
import { Downloading_Options }  from  '/imports/collections/Downloading-Options/collection.js'
import { Printing_Options }     from  '/imports/collections/Printing-Options/collection.js'
import { Retouching_Services }  from  '/imports/collections/Retouching-Services/collection.js'
import { Folders }              from  '/imports/collections/Folders/collection.js'
// ----components-------------------


// ========================================================================
export const get_collection_from_name = (name) => {
	switch (name.toUpperCase()) {
		case "WORKUPS": return Workups
		case "PUSERS":  return PUsers
		case "VENDORS": return Vendors
		case "SCHOOLS": return Schools
		case "SITTINGS": return Sittings
		case "PRINTING_OPTIONS": return Printing_Options
		case "PRINTING_AGREEMENTS": return Printing_Agreements
		case "RETOUCHING_SERVICES": return Retouching_Services
		case "RETOUCHING_AGREEMENTS": return Retouching_Agreements
		case "DOWNLOADING_OPTIONS": return Downloading_Options
		case "DOWNLOADING_AGREEMENTS": return Downloading_Agreements
		case "ORDERS": return Orders
		case "IMAGES": return Images
		case "UPLOADS": return Uploads
		case "EVENTS": return Events
		case "TRANSACTIONS": return Transactions
		case "FOLDERS": return Folders
		default: 
		console.error("Collection Name: ", name, "isn't set up in /common/db/collection-from-name.js")
		return undefined
	}
}
