import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React 										from 	'react'
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}																from '/imports/client/db/collection-helpers.js'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----collections------------------
//import { Workups }							from  '/imports/collections/Workups/collection.js'
// ----components-------------------
import { Cart_Page as Component }   from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {

  const { tempStore: store } = props
  if (!store ) { return { ready: false, problem: `'tempStore' is not in props of getMeteorData` } } 
	// -> -> -> -> //
	
  const { app } = store
  const customer_code = app.customer_code // computed
  
  const _wups_spec = {
		type: 'list',
		colleXion: 'WORKUPS',
		name: 'WORKUPS.composite.one-customer-code-IN_CART',
		args: {
			customer_code: customer_code,
      state: Workup_States.IN_CART.name
		},
		options: {
			sort: { createdOn: -1 }
		}
	}
	const wups_sub = subscribe(_wups_spec)

	if (!wups_sub.ready()) { return {
		ready: false, 
		message: `waiting for subscription '${_wups_spec.name}' to return` 
	}}
	// -> -> -> -> //
  //const wups_records = subscription_is_ready(_wups_spec)
  // not using wups_records as just need these wups in minimongo
  // its fine to have the cart count = 0 for now

  return { 
    ready: true,
    connect: {
      junk: null // not using connect
    }
  }

}
// ====================================================================
const Cart_Page = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Cart_Page }
