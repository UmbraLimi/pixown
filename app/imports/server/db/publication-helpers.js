import { Meteor }      					from  'meteor/meteor'
import { check } 								from  'meteor/check'
// ----helpers----------------------
import { get_collection_from_name } from '/imports/common/db/collection-from-name.js'
// ----collections------------------
// ----components-------------------

// ========================================================================
if (Meteor.isServer) {
	export const set_cursor_on_server = (args) => {
		const {is_root=false, name, find_args={}} = args
		check(name, String)
		check(find_args, Object)
		const colleXion = get_collection_from_name(name)

		/*console.log('----')
		console.log('set_cursor_on_server:', name)
		console.log('find_args:', find_args)
		console.log('published recs:',colleXion.find(find_args).fetch())
		console.log('----')*/
		return is_root
			? function () {
					return colleXion.find(find_args)
				}
			: colleXion.find(find_args)
	}
}
// ========================================================================
