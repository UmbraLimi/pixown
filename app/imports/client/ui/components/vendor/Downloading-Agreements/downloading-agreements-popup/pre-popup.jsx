import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Downloading_Agreements_Listing }     	from  '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreements-listing/index.jsx'
import { Downloading_Agreements_Popup } 				from  './index.jsx'

// ====================================================================
@inject('store')
@observer
class Pre_Popup extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.daListManager = new store.factories.downloadingAgreementListFactory(store, {
			source: {
				obj: this,
				name: 'Pre_Popup',
				parms: {vendor_code: vendor_code}
			},
			spec: {
				name: 'DOWNLOADING_AGREEMENTS.composite.one-vendor-code',
				args: {vendor_code: vendor_code} ,
				options: {
					sort: {
						agreement_code: 1
					}
				}
			},
			content: Downloading_Agreements_Listing
		})
	}

	componentWillUnmount() {
		this.daListManager.run_disposers()
		this.daListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<DownloadingAgreements_Popup__withData__ 
					{...this.props}
					daListManager={this.daListManager}
			/>
		)
	}
}
// ====================================================================
const DownloadingAgreements_Popup__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { daListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(daListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			daListManager: daListManager // always need to send this
		}	} // -> -> -> -> //
		daListManager.populate_raManagerList(details)
	
		// everything is ready
		return {
			...props,
			ready: true,
			daListManager: daListManager // changed from version in props
		}
	}),  // e.g. next data provider
)(Downloading_Agreements_Popup)
// ====================================================================

export { Pre_Popup }
