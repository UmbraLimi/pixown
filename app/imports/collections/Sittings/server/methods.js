import { _ as __ }             	from  'lodash'
import { check }  							from  'meteor/check'
// ----helpers----------------------
import { Delivery_States } 			from  '/imports/enums/delivery-states.js'
import { get_pose_details_from_proofs_list } from '../helpers.js'
// ----collections------------------
import { Sittings } 						from  '../collection.js'
// ----components-------------------

// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'SITTINGS.update_paid_retouching'( wup ) {
		try {
			check(wup, Object) // this is all you need, but offers little protection
			let was_updated = false
		// get sittings record 
			const sitting_record = Sittings.findOne({
				studio_code: wup.studio_code,
				school_code: wup.school_code,
				sitting_code: wup.sitting_code
			})
			if (sitting_record === undefined) {
				console.error(`Sitting record unexpectedly not found for 
					studio_code: ${wup.studio_code} 
					school_code: ${wup.school_code}
					sitting_code: ${wup.sitting_code}`)
				return false // fix, as error, maybe
			}
			// find pose in proofs_list
			const pose_list = __.cloneDeep(sitting_record.proofs_list)
			const thepose_index = __.findIndex(pose_list, {pose_code: wup.pose_code})
			if (thepose_index === -1) {
				// not in the list, unexpected!
				console.error('Pose_code', wup.pose_code, 'was found workup but not in sittings proof list')
				return false
			} else {
				// already in proof list (as expected)
				const thepose = pose_list[thepose_index]
				const paid_list = thepose.paid_retouching_list || []
				const wanted_services = _.where(wup.retouches_list, {wanted: true})
				_.map(wanted_services, (service) => {
					// is this wup in the pose's paid_retouching_list?
					if (__.find(paid_list, { service_code: service.service_code,})) {  
						// already there -- nothing to do as this is an update for subsequent wups, not this wup
					} else {
						// not there -- add it
						was_updated = true
						paid_list.push({
							service_code: service.service_code,
							delivery_state: Delivery_States.READY_to_SEND_to_VENDOR.name,
							workup_id: wup._id
						})
						pose_list[thepose_index].paid_retouching_list = paid_list
					}
				})
			}
			if (was_updated) {
				const new_sitting_record = __.cloneDeep(sitting_record)
				new_sitting_record.proofs_list = pose_list
				await Meteor.call('DB.update', 'SITTINGS', new_sitting_record._id, new_sitting_record, {}) // there is no need for UNSET
			}
			return was_updated
		}
		catch (error) {
			console.log('--','SITTINGS.update_paid_retouching catch','--', error)
			throw error // pass the error along
		}
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})
