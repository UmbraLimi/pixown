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
	const { title, meteor_username } = props // sent from Field
	
	if (!meteor_username) {return {ready:true}} // ok - no masthead/title for NEW records
	// -> -> -> -> //

	// - - - - - - - - - - - - 
	const spec = {
		type: 'single',
		colleXion: 'PUSERS',
		name: 'PUSERS.one-customer-code',
		args: { meteor_username: meteor_username },
		options: null,
	}
  const customers = subscribe(spec)
  if (!customers.ready()) { return { 
		ready: false, 
		message: `waiting for subscription '${spec.name}' to return` 
	}}
	// -> -> -> -> //
	const customer_record = subscription_is_ready(spec)

	return {
		ready:   true,
		title: 	 title,
		code:		 meteor_username,
		record:  customer_record
	}
}
// ====================================================================
const Customer_Masthead = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Customer_Masthead }
