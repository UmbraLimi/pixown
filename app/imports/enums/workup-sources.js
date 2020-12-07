// ----node-packages----------------
import { Enum } 								from  'enumify'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
class Workup_Sources extends Enum { }
Workup_Sources.initEnum([
	'from_SITTING',
	'from_ORDER'
])
// ========================================================================

export { Workup_Sources }
