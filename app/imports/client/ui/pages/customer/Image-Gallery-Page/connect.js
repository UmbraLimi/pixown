import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}																from '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Image_Gallery_Page as Component }   from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {

  const { tempStore: store } = props
  if (!store ) { return { ready: false, problem: `'tempStore' is not in props of getMeteorData` } } 
	// -> -> -> -> //
	
	const { app } = store
	const customer_code = app.customer_code // computed
	// get a composite of all the data we will need given this sittings list
	//     and ensure it is available in Minimongo
	const _sittings_spec = {
		type: 'list',
		colleXion: 'SITTINGS',
		name: 'SITTINGS.composite.given-customer-code',
		args: {
			customer_code: customer_code
		},
		options: {
			sort: { createdOn: -1 }
		}
	}
	const sittings_sub = subscribe(_sittings_spec)

	if (!sittings_sub.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${_sittings_spec.name}' to return` 
	}}
	// -> -> -> -> //
	const sittings_record = subscription_is_ready(_sittings_spec)

	return {
		ready: true,
		connect: {
			sittings: sittings_record
		}
	}
}
// ====================================================================
const Image_Gallery_Page = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Image_Gallery_Page }
