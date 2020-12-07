import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React 										from 	'react'
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}																from '/imports/client/db/collection-helpers.js'
// ----enums -----------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
//import { has_retouching, has_prints, has_downloads 
//} 															from  '/imports/collections/Workups/helpers.js'
// ----collections------------------
import { Workups } 							from  '/imports/collections/Workups/collection.js'
import { Images } 							from  '/imports/collections/Images/collection.js'
// ----components-------------------
import { Pose_Panel as Component }   from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {
	// NOTE: all of the needed records below will already be in Minimongo from Parent's 
	// composite subscription

  const { tempStore: store } = props
  if (!store ) { return { ready: false, problem: `'tempStore' is not in props of getMeteorData` } } 
	// -> -> -> -> //
	
	const { imageGalleryStore } = store
	const { studio_code, school_code, sitting_code, customer_code } = props.sitting
	const pose_code = props.proof.pose_code

	// but the wups need to be subscribed to
	// find all workups that have this pose
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	const _wups_spec = {
		type: 'list',
		colleXion: 'WORKUPS',
		name: 'WORKUPS.same-pose',
		args: {
			customer_code: customer_code,
			studio_code: studio_code,
			school_code: school_code,
			sitting_code: sitting_code,
			pose_code: pose_code
		},
		options: null
	}
	const wups_sub = subscribe(_wups_spec)

	if (!wups_sub.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${_wups_spec.name}' to return` 
	}}
	// -> -> -> -> //
	const wups_records = subscription_is_ready(_wups_spec)

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	const _images_spec = {
		type: 'list',
		colleXion: 'IMAGES',
		name: 'IMAGES.in-id-list',
		args: {
			_id: {"$in": [props.proof.image_id]} // just one but it has to be in an array
		},
		options: null
	}
	const images_sub = subscribe(_images_spec)

	if (!images_sub.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${_images_spec.name}' to return` 
	}}
	// -> -> -> -> //
	const images_records = subscription_is_ready(_images_spec)

	// we now have everything on the client that we need

	const state_counts = {
		[Workup_States.IN_CART.name]: 0,
		[Workup_States.ORDERED.name]: 0,
		[Workup_States.SAVED.name]: 0,
		[Workup_States.NEW.name]: 0,
		[Workup_States.COMPLETE.name]: 0,
	}
	
	__.map(wups_records, (wup, index) => {
		state_counts[wup.state] += 1
	})
	
	return {
		ready:    true,
		connect: {
			image: images_records[0] || {}, // there will only be one
			state_counts: state_counts,
		}
	}
}
// ====================================================================
const Pose_Panel = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Pose_Panel }
