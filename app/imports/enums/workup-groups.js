// ----node-packages----------------
import { Enum } 								from 'enumify'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
class Workup_Groups extends Enum { }
Workup_Groups.initEnum([
	'RETOUCH',
	'CROP',
	'PRINT',
	'SUMMARY',
	'DOWNLOAD',
	'ADD2CART',
	'NA' // for the image gallery and cart which are just the endpoints, not in the wizard
])
// ========================================================================

export { Workup_Groups }