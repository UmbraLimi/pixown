import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React 										from 	'react'
import { _ as __ }         			from  'lodash'
// ----enums------------------------
import { Delivery_States }			from  '/imports/enums/delivery-states.js'
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}																from '/imports/client/db/collection-helpers.js'
// ----collections------------------
import { Sittings }             from  '/imports/collections/Sittings/collection.js'
// ----components-------------------
import { Workup_Wizard_Page as Component }   from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {

  const { tempStore: store } = props
  if (!store ) { return { ready: false, problem: `'tempStore' is not in props of getMeteorData` } } 
	// -> -> -> -> //
	
	const { workupWizardStore } = store
	const { record } = workupWizardStore



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// get a composite of all the data we will need given this sitting
	//     and ensure all related records are available in Minimongo
	// Note: Images are NOT handled here (see below)
	const _sitting_spec = {
		type: 'single',
		colleXion: 'SITTINGS',
		name: 'SITTINGS.composite.given-sitting',
		args: {
			studio_code: record.studio_code,
			school_code: record.school_code,
			sitting_code: record.sitting_code
		},
		options: null
	}
	const sitting_sub = subscribe(_sitting_spec)

	if (!sitting_sub.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${_sitting_spec.name}' to return` 
	}}
	// -> -> -> -> //
	//const sitting_record = subscription_is_ready(_sitting_spec)
	// sitting_record is not used
	// the pupose is to get the record into mini_mongo
	// to be used in the Workup_Wizard_Store
	// and NOT to push the sitting record into the store
	//////workupWizardStore._set_sitting_to(sitting)

	// now get all the images used anywhere in this workup
	const image_id_list = []

	// start with the images in the workup
	image_id_list.push(record.starting_image.image_id) // will always be there
	record.final_image && record.final_image.image_id
		? image_id_list.push(record.final_image.image_id)
		: undefined
	record.downloadable_image && record.downloadable_image.image_id
		? image_id_list.push(record.downloadable_image.image_id)
		: undefined

	// add in the images from the sitting
	const paid_list = workupWizardStore._detail_for_pose.paid_retouching_list || []
	__.map(paid_list, (service) => {
		service.delivery_state === Delivery_States.READY_to_SEND_to_VENDOR.name
			|| service.delivery_state === Delivery_States.REQUESTED_from_VENDOR.name
			? null // already has proof (that will be overlaid, so nothing to add)
			: image_id_list.push(service.image_id)
	})

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	const _images_spec = {
		type: 'list',
		colleXion: 'IMAGES',
		name: 'IMAGES.in-id-list',
		args: {
			//id_list: image_id_list
			_id: {"$in": image_id_list} 
		},
		options: null
	}
	const images_sub = subscribe(_images_spec)

	if (!images_sub.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${_images_spec.name}' to return` 
	}}
	// -> -> -> -> //
	//const image_records = subscription_is_ready(_images_spec)
	//image_records is not used
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// we now have everything on the client that we need

	return {
		ready: true,
		connect: {}
	}
}
// ====================================================================
const Workup_Wizard_Page = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Workup_Wizard_Page }
