// ----node-packages----------------
import { Enum } 								from  'enumify'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
class Event_Types extends Enum { }
Event_Types.initEnum([
	'UI_EVENT',
	'DB_ACTION',
	'DB_ERROR',
	'ERROR'
])
// ========================================================================

export { Event_Types }
