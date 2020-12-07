import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
// ----helpers----------------------
import { subscribe, subscription_is_ready 
}																from '/imports/client/db/collection-helpers.js'
// ----enums------------------------
import { Workup_States }        from  '/imports/enums/workup-states.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar as Component }   from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {
  /* 
    this is a special connect in that it ALWAYS will return true
    it doesn't need to pass any data to header-bar.jsx
    it simply establishes a means whereby the workups in the cartStore
    are kept in the app.cartarray and that array is observed
    (via a computed cart_count property)

    So this connect sets up reactivity but provides no props to header bar
  */

  const { on_login_page } = props
  if (on_login_page) {return { on_login_page: true }}
  // no need to do anything else
  // -> -> -> -> //

  const { tempStore: store } = props
  if (!store ) { return { ready: true } } 
  // no need to do anything else
  // -> -> -> -> //

  const { app, cartStore } = store
  const { user_record } = app
  if (!user_record ) { return { ready: true } } 
  // no need to do anything else
  // -> -> -> -> //

  const customer_code = app.customer_code // this is a computed user_record.meteor_username

  
	const _wups_spec = {
		type: 'list',
		colleXion: 'WORKUPS',
		//name: 'WORKUPS.one-customer-code-IN_CART',
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
  const workup_records_in_cart = subscription_is_ready(_wups_spec)
  
  cartStore.set__workup_stores(workup_records_in_cart)
  
  // doesn't need to return anything
  
  return { ready: true }
}
// ====================================================================
const Header_Bar = _.compose(
    withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)
// ====================================================================

export { Header_Bar }
