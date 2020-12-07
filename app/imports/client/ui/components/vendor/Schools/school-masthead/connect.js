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
	const { user_record } = store.app
	const { vendor_code } = user_record
	const { title, school_code } = props // sent from Field

	if (!school_code) {return {ready:true}} // ok - no masthead/title for NEW records
	// -> -> -> -> //

	// ensure that minimongo has the xlate-able records for the codes in this school
	// to be xlated post mount

	const spec = {
		type: 'single',
		colleXion: 'SCHOOLS',
		name: 'SCHOOLS.one-vendor-code__one-school-code',
		args: {
			school_code: school_code,
			vendor_code_list: vendor_code
		},
		options: null
	}
	const schools = subscribe(spec)

	if (!schools.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${spec.name}' to return` 
	}}
	// -> -> -> -> //
	const school_record = subscription_is_ready(spec)

	return {
		ready:   true,
		title: 	 title,
		code:		 school_code,
		record:  school_record
	}
}
// ====================================================================
const School_Masthead = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { School_Masthead }
