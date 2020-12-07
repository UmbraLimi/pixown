import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
import { 
	printing_agreement_cursor__given__sitting_record,
	retouching_agreement_cursor__given__sitting_record,
	downloading_agreement_cursor__given__sitting_record
} 				from '/imports/collections/Sittings/server/publications.js'
// ----enums------------------------
//import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'WORKUPS'
	// ------------------
	Meteor.publish(`${name}.one-customer-code`, (args) => {
		check(args.customer_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-customer-code-IN_CART`, (args) => {
		check(args.customer_code, String)
		check(args.state, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.same-pose`, (args) => {
		check(args.customer_code, String)
		check(args.studio_code, String)
		check(args.school_code, String)
		check(args.sitting_code, String)
		check(args.pose_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------

	Meteor.publishComposite(`${name}.in-id-list`, (args) => {
		check(args._id, Object)
		check(args._id.$in, Array)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})

	Meteor.publishComposite(`${name}.composite.one-customer-code-IN_CART`, (args) => {
		check(args.customer_code, String)
		check(args.state, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})

	Meteor.publishComposite(`${name}.composite.one-studio-code`, (args) => {
		check(args.studio_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})

	Meteor.publishComposite(`${name}.composite.one-studio-code__one-customer-code`, (args) => {
		check(args.studio_code, String)
		check(args.customer_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})

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
				image_recs,
				vendor_rec,
				school_rec,
				sitting_rec,
				order_rec
			]
		)
	}
	// ===============
	const order_rec = {
		find: order_cursor__given__workup_record
	}
	// ===============
	const vendor_rec = {
		find: vendor_cursor__given__workup_record
	}
	// ===============
	const school_rec = {
		find: school_cursor__given__workup_record
	}
	// ===============
	const image_recs = {
		find: images_cursor__given__workup_record
	}
	// ===============
	const sitting_rec = {
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

	// ====================================================================
	// can't be arrow fns as it is not hoisted and therefore out of scope for local use
	// to be used in reywood:publish-composite children (find: xxx)
	// both locally (that's why its a fn and not an arrow fn
	// and from other publications travelling down their children trees

	// ===============
	/*
	export function printing_agreement__given__workup_record(wup) {
		return Printing_Agreements.find(
			{ agreement_code: wup.printing_agreement_code }
		)
	}
	// ===============
	export function retouching_agreement__given__workup_record(wup) {
		return Retouching_Agreements.find(
			{ agreement_code: wup.retouching_agreement_code }
		)
	}
	// ===============
	export function downloading_agreement__given__workup_record(wup) {
		return Downloading_Agreements.find(
			{ agreement_code: wup.downloading_agreement_code }
		)
	}
	*/
	// ===============
	export function images_cursor__given__workup_record(wup) {
		// get all images for this workup from Images
		const list = []
		if (wup.starting_image) 		{ list.push(wup.starting_image.image_id) }
		if (wup.final_image) 				{ list.push(wup.final_image.image_id) }
		if (wup.downloadable_image) { list.push(wup.downloadable_image.image_id) }
		return set_cursor_on_server({	name: 'IMAGES', 
			find_args: { _id: { "$in": list } }
		})
	}
	export function order_cursor__given__workup_record (wup) {
		if (wup.order && wup.order.order_id) {
			return set_cursor_on_server({	name: 'ORDERS', 
				find_args: { _id: wup.order.order_id }
			})
		}
	}
	// ===============
	export function school_cursor__given__workup_record (wup) {
		return set_cursor_on_server({	name: 'SCHOOLS', 
			find_args: { school_code: wup.school_code	}
		})
	}
	// ===============
	export function vendor_cursor__given__workup_record(wup) {
		return set_cursor_on_server({	name: 'VENDORS', 
			find_args:  { vendor_code: wup.studio_code }
		})
	}
	// ===============
	export function sitting_cursor__given__workup_record(wup) {
		return set_cursor_on_server({	name: 'SITTINGS', 
			find_args:  { 
				studio_code: wup.studio_code,
				school_code: wup.school_code,
				sitting_code: wup.sitting_code
				}
		})
	}
}
// ====================================================================
