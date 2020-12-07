// ----node-packages----------------
import { Enum } 								from  'enumify'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
class Workup_Page_Types extends Enum { }
Workup_Page_Types.initEnum([
	'YES_NO',
	'CUSTOM_PAGE',  // uses a specific page template and passes events
	'DISPLAY_ONLY', // uses a specific page template but NO EVENTS passed
	'NA' // for the image gallery and cart which are just the endpoints, not in the wizard
])
// ========================================================================

export { Workup_Page_Types }
