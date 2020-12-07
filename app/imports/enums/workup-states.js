// ----node-packages----------------
import { Enum } 								from  'enumify'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
class Workup_States extends Enum { }
Workup_States.initEnum([
	'NEW',
	'SAVED',
	'IN_CART',
	'ORDERED',
	'COMPLETE' // all prints and downloads and lores proffs from any retouching are deleivered to pixown
])
// ========================================================================

export { Workup_States }
