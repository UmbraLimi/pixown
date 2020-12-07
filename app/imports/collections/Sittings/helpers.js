// ----node-packages----------------
import { _ as __ } 							from  'lodash'
//import { _ } 										from  'underscore'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
import { Sittings } 						from  './collection.js'
// ----components-------------------

// ====================================================================
/***const promise_get_pose_details_from_proofs_list = (proofs_list, pose_code) => {
	return new Promise( (resolve, reject) => {
		// find pose in proofs_list
		const list = __.cloneDeep(proofs_list)
		const index = __.findIndex(list, {pose_code: pose_code})
		if (index === -1) {
			const the_err = `Pose_code: ${pose_code} was found in workup but not in sittings proof list !!`
			console.error(the_err)
			reject(new Meteor.Error('error', "get_pose_details_from_proofs_list", the_err))
			return // force function to end
		} else {
			resolve(pose_list[thepose_index])
			return // force function to end
		}
	})
}***/
// ====================================================================
export const get_pose_details_from_proofs_list = (proofs_list, pose_code) => {
	// find pose in proofs_list
	const list = __.cloneDeep(proofs_list)
	const index = __.findIndex(list, { pose_code: pose_code })
	if (index === -1) {
		const the_err = `Pose_code: ${pose_code} was not found in proofs_list of sitting !!`
		console.error(the_err)
		return undefined
	} else {
		return list[index]
	}
}
// ====================================================================
export const get_paid_retouch_for_pose_from_proofs_list = (proofs_list, pose_code, service_code) => {
	const thepose = get_pose_details_from_proofs_list(proofs_list, pose_code)
	const paid_list = thepose.paid_retouching_list || []
	const paid_retouch_details = __.filter(paid_list, { service_code: service_code })
	return paid_retouch_details
}
// ====================================================================