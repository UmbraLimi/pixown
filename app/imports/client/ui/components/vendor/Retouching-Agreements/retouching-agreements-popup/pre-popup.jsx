import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Retouching_Agreements_Listing }     	from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreements-listing/index.jsx'
import { Retouching_Agreements_Popup } 				from  './index.jsx'

// ====================================================================
@inject('store')
@observer
class Pre_Popup extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.raListManager = new store.factories.retouchingAgreementListFactory(store, {
			source: {
				obj: this,
				name: 'Pre_Popup',
				parms: {vendor_code: vendor_code}
			},
			spec: {
				name: 'RETOUCHING_AGREEMENTS.composite.one-vendor-code',
				args: {vendor_code: vendor_code} ,
				options: {
					sort: {
						agreement_code: 1
					}
				}
			},
			content: Retouching_Agreements_Listing
		})
	}

	componentWillUnmount() {
		this.raListManager.run_disposers()
		this.raListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<RetouchingAgreements_Popup__withData__ 
					{...this.props}
					raListManager={this.raListManager}
			/>
		)
	}
}
// ====================================================================
const RetouchingAgreements_Popup__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { raListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(raListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			raListManager: raListManager // always need to send this
		}	} // -> -> -> -> //
		raListManager.populate_raManagerList(details)
	
		// everything is ready
		return {
			...props,
			ready: true,
			raListManager: raListManager // changed from version in props
		}
	}),  // e.g. next data provider
)(Retouching_Agreements_Popup)
// ====================================================================

export { Pre_Popup }
