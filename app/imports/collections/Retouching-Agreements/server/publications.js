import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'RETOUCHING_AGREEMENTS'
	// ------------------
	Meteor.publishComposite(`${name}.composite.one-vendor-code`,	function (args) {
		check(args.vendor_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})
	// ------------------
	Meteor.publishComposite(`${name}.composite.one-agreement-code`,	function (args) {
		check(args.agreement_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})
	// ------------------
	Meteor.publishComposite(`${name}.composite.one-mongo-id`,	function (args) {
		check(args._id, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})
	// ====================================================================
	const composite_children = () => {
		return [
			{
				find: 		retouching_services_cursor__given__agreement_record,
				children: []
			}
		]
	}
	
	// ====================================================================
	// can't be arrow fn as it is not hoisted and therefore out of scope for local use
	// to be used in reywood:publish-composite children (find: xxx)
	// both locally (that's why its a fn and not an arrow fn
	// and from other publications travelling down their children trees

	export function retouching_services_cursor__given__agreement_record (agreement) {
		const list = __.map(agreement.services_list, (service) => {
			return service.service_code
		})
		return set_cursor_on_server({	name: 'RETOUCHING_SERVICES', 
			find_args: {
				vendor_code: agreement.vendor_code,
				service_code: { "$in": list }
			}
		})
	}
}
// ====================================================================
