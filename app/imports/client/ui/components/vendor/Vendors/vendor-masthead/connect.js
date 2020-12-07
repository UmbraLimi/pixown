import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
// ----styles-----------------------
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}					from '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Masthead as Component} from '/imports/client/ui/components/masthead/index.jsx'

// ====================================================================
const getMeteorData = (props) => {
	// is called from <Field /> components
	const store = props.tempStore // sent from Field
	const { title, vendor_code } = props // sent from Field

	if (!vendor_code) {return {ready:true}} // ok - no masthead/title for NEW records
	// -> -> -> -> //

	// - - - - - - - - - - - - 
	const spec = {
		type: 'single',
		colleXion: 'VENDORS',
		name: 'VENDORS.one-vendor-code',
		args: { vendor_code: vendor_code },
		options: null,
	}
	const vendors = subscribe(spec)
  if (!vendors.ready()) { return { 
		ready: false, 
		message: `waiting for subscription '${spec.name}' to return` 
	}}
	// -> -> -> -> //
	const vendor_record = subscription_is_ready(spec)

	return {
		ready:   true,
		title: 	 title,
		code:		 vendor_code,
		record:  vendor_record
	}
}
// ====================================================================
const Vendor_Masthead = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Vendor_Masthead }
