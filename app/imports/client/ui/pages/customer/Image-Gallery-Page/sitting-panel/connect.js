import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React 										from 	'react'
// ----helpers----------------------
import { get_retouching_agreement_with_services } from '/imports/collections/Retouching-Agreements/helpers.js'
import { get_printing_agreement_with_options } 		from '/imports/collections/Printing-Agreements/helpers.js'
import { get_downloading_agreement_with_options } from '/imports/collections/Downloading-Agreements/helpers.js'
// ----collections------------------
import { Vendors }              from '/imports/collections/Vendors/collection.js'
import { Schools }              from '/imports/collections/Schools/collection.js'
// ----components-------------------
import { Sitting_Panel as Component } from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {
	// NOTE: all of the needed records below will already be in Minimongo from Parent's 
	// composite subscription

  const { tempStore: store } = props
  if (!store ) { return { ready: false, problem: `'tempStore' is not in props of getMeteorData` } } 
	// -> -> -> -> //
	
	const { app } = store
	const { sitting } = props

	const retouching_agreement = get_retouching_agreement_with_services(sitting.retouching_agreement_code)
	const printing_agreement = get_printing_agreement_with_options(sitting.printing_agreement_code)
	const downloading_agreement = get_downloading_agreement_with_options(sitting.downloading_agreement_code)
	
	const vendor = Vendors.findOne({
		vendor_code: 'luxarte' // sitting.studio_code
	})
	const school = Schools.findOne({
		school_code: '001' // sitting.school_code
	})
	

	return {
		ready:    true,
		connect: {
			retouching_agreement: retouching_agreement,
			printing_agreement: printing_agreement,
			downloading_agreement: downloading_agreement,
			vendor: vendor,
			school: school,
		}
	}
}
// ====================================================================
const Sitting_Panel = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Sitting_Panel }
