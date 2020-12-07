import { Meteor }      					from  'meteor/meteor'
import { check }       					from  'meteor/check'
// ----npm packages-----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { set_cursor_on_server } from  '/imports/server/db/publication-helpers.js'
import { printing_options_cursor__given__agreement_record 
} 				from '/imports/collections/Printing-Agreements/server/publications.js'
import { downloading_options_cursor__given__agreement_record 
} 				from '/imports/collections/Downloading-Agreements/server/publications.js'
import { retouching_services_cursor__given__agreement_record 
} 				from '/imports/collections/Retouching-Agreements/server/publications.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
if (Meteor.isServer) {
	const name = 'SITTINGS'

	const r=9
	// ------------------
	Meteor.publish(`${name}.one-mongo-id`, (args) => {
		check(args._id, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-studio-code`, function (args) {
		check(args.studio_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})
	// ------------------
	Meteor.publish(`${name}.one-studio-code__one-school-code`, function (args) {
		check(args.studio_code, String)
		check(args.school_code, String)
		return set_cursor_on_server({is_root: false, name: name, find_args: args})
	})

	// ------------------
	Meteor.publishComposite(`${name}.composite.given-customer-code`,	function (args) {
		check(args.customer_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})
	// ------------------
	Meteor.publishComposite(`${name}.composite.given-sitting`,	function (args) {
		check(args.studio_code, String)
		check(args.school_code, String)
		check(args.sitting_code, String)
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
	// ------------------
	Meteor.publishComposite(`${name}.composite.one-studio-code`,	function (args) {
		check(args.studio_code, String)
		return {
			find: 		set_cursor_on_server({is_root: true, name: name, find_args: args}),
			children: composite_children()
		}
	})
	// ------------------
	Meteor.publishComposite(`${name}.composite.one-studio-code__one-school-code`,	function (args) {
		check(args.studio_code, String)
		check(args.school_code, String)
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
				customer_rec,
				vendor_rec,
				school_rec,
				printing_agreement_recs,
				downloading_agreement_recs,
				retouching_agreement_recs
			]
		)
	}

	// ===============
	const vendor_rec = {
		find: vendor_cursor__given__sitting_record
	}
	// ===============
	const school_rec = {
		find: school_cursor__given__sitting_record
	}
	// ===============
	const image_recs = {
		find: images_cursor__given__sitting_record
	}
	// ===============
	const customer_rec = {
		find: customer_cursor__given__sitting_record
	}
	// ===============
	const printing_agreement_recs = {
		find: printing_agreement_cursor__given__sitting_record,
		children: [
			{
				find: printing_options_cursor__given__agreement_record 
			}
		]
	}
	// ===============
	const retouching_agreement_recs = {
		find: retouching_agreement_cursor__given__sitting_record,
		children: [
			{
				find: retouching_services_cursor__given__agreement_record
			}
		]
	}
	// ===============
	const downloading_agreement_recs = {
		find: downloading_agreement_cursor__given__sitting_record,
		children: [
			{
				find: downloading_options_cursor__given__agreement_record 
			}
		]
	}
	
	// ====================================================================
	// can't be arrow fns as it is not hoisted and therefore out of scope for local use
	// to be used in reywood:publish-composite children (find: xxx)
	// both locally (that's why its a fn and not an arrow fn
	// and from other publications travelling down their children trees

	export function printing_agreement_cursor__given__sitting_record(sitting) {
		return set_cursor_on_server({	name: 'PRINTING_AGREEMENTS', 
			find_args: { agreement_code: sitting.printing_agreement_code }
		})
	}
	// ===============
	export function retouching_agreement_cursor__given__sitting_record(sitting) {
		return set_cursor_on_server({	name: 'RETOUCHING_AGREEMENTS', 
			find_args: { agreement_code: sitting.retouching_agreement_code }
		})
	}
	// ===============
	export function downloading_agreement_cursor__given__sitting_record(sitting) {
		return set_cursor_on_server({	name: 'DOWNLOADING_AGREEMENTS', 
			find_args: { agreement_code: sitting.downloading_agreement_code }
		})
	}
	// ===============
	export function images_cursor__given__sitting_record(sitting) {
		// get the image_ids for each pose from the Images
		const list = __.map(sitting.proofs_list, (proof) => {
			return proof.image_id
		})
		return set_cursor_on_server({	name: 'IMAGES', 
			find_args: { _id: { "$in": list } }
		})
	}
	// ===============
	export function customer_cursor__given__sitting_record(sitting) {
		return set_cursor_on_server({	name: 'PUSERS', 
			find_args: { meteor_username: sitting.customer_code }
		})
	}
	// ===============
	export function school_cursor__given__sitting_record (sitting) {
		return set_cursor_on_server({	name: 'SCHOOLS', 
			find_args: { school_code: sitting.school_code }
		})
	}
	// ===============
	export function vendor_cursor__given__sitting_record(sitting) {
		return set_cursor_on_server({	name: 'VENDORS', 
			find_args:  { vendor_code: sitting.studio_code }
		})
	}

}
// ====================================================================
