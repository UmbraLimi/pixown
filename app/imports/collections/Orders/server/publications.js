import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
import { 
	images_cursor__given__workup_record,
	sitting_cursor__given__workup_record,
	vendor_cursor__given__workup_record
} 				from '/imports/collections/Workups/server/publications.js'
import { 
	printing_agreement_cursor__given__sitting_record,
	retouching_agreement_cursor__given__sitting_record,
	downloading_agreement_cursor__given__sitting_record
} 				from '/imports/collections/Sittings/server/publications.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'ORDERS'
	// ------------------
	Meteor.publish(`${name}.one-studio-code`, function (args) {
		check(args.studio_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-studio-code__one-customer-code`, function (args) {
		check(args.studio_code, String)
		check(args.customer_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------

	Meteor.publishComposite(`${name}.composite.one-studio-code__one-customer-code`, function (args) {
		check(args.studio_code, String)
		check(args.customer_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})
	// ------------------
	Meteor.publishComposite(`${name}.composite.one-studio-code`, function (args) {
		check(args.studio_codes, String)
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
		return (
			[
				workup_recs,
				customer_rec,
				vendor_recs
			]
		)
	}

	// ===============
	const customer_rec = {
		find: customer_cursor__given__order_record
	}
	// ===============
	const vendor_recs = {
		find: vendors_cursor__given__order_record
	}
	// ===============
	const workup_recs = {
		find: workups_cursor__given__order_record,
		children: [
			{
				find: images_cursor__given__workup_record 
			},
			{
				find: vendor_cursor__given__workup_record 
			},
			{
				find: sitting_cursor__given__workup_record,
				children: [
					{
						find: printing_agreement_cursor__given__sitting_record
					},
					{
						find: retouching_agreement_cursor__given__sitting_record
					},
					{
						find: downloading_agreement_cursor__given__sitting_record
					},
				]		
			}
		]
	}

	// ====================================================================
	// can't be arrow fns as it is not hoisted and therefore out of scope for local use
	// to be used in reywood:publish-composite children (find: xxx)
	// both locally (that's why its a fn and not an arrow fn
	// and from other publications travelling down their children trees
	// ===============
	export function workups_cursor__given__order_record(order) {
		// get the Workups from this Order
		return set_cursor_on_server({	name: 'WORKUPS', 
			find_args: { _id: { "$in": order.workups } }
		})
	}
	// ===============
	export function customer_cursor__given__order_record(order) {
		return set_cursor_on_server({	name: 'PUSERS', 
			find_args: { meteor_username: order.customer_code }
		})
	}
	// ===============
	export function vendors_cursor__given__order_record(order) {
		return set_cursor_on_server({	name: 'VENDORS', 
			find_args:  { vendor_code: order.studio_codes }
		})
	}

}
// ====================================================================
