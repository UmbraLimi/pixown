import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
// ----styles-----------------------
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}					from '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Masthead as Component} 	from '/imports/client/ui/components/masthead/index.jsx'

// ====================================================================
const getMeteorData = (props) => {
	// is called from <Field /> components
	const store = props.tempStore // sent from Field
	const { user_record } = store.app
	const { vendor_code } = user_record
	const { title, agreement_code } = props // sent from Field

	if (!agreement_code) {return {ready:true}} // ok - no masthead/title for NEW records
	// -> -> -> -> //

	// ensure that minimongo has the xlate-able records for the codes in this school
	// to be xlated post mount

	const spec = {
		type: 'single',
		colleXion: 'DOWNLOADING_AGREEMENTS',
		name: 'DOWNLOADING_AGREEMENTS.composite.one-agreement-code',
		args: {
			agreement_code: agreement_code,
		},
		options: null
	}
	const agreements = subscribe(spec)
	if (!agreements.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${spec.name}' to return` 
	}}
	// -> -> -> -> //
	const agreement_record = subscription_is_ready(spec)

	return {
		ready:   true,
		title: 	 title,
		code:		 agreement_code,
		record:  agreement_record
	}
}
// ====================================================================
const Downloading_Agreement_Masthead = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Downloading_Agreement_Masthead }
