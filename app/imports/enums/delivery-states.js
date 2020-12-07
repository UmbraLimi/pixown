// ----node-packages----------------
import { Enum } 								from  'enumify'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
class Delivery_States extends Enum { }
Delivery_States.initEnum([
	"NOT_APPLICABLE",
	"READY_to_SEND_to_VENDOR", // happens when order is saved 
	"RECEIVED_from_Vendor", // from vendor
	"REQUESTED_from_VENDOR", // applies to prints, retouch layer prrofs and downloadable files and retouched proofs
	"DELIVERED_to_PIXOWN", // vendor sent image to Pixown
	"DELIVERED_to_CLIENT_from_Pixown", // applies to hires downlaoded images
	"DELIVERED_to_CLIENT_from_VENDOR" // applies to prints
])
// ========================================================================

export { Delivery_States }
