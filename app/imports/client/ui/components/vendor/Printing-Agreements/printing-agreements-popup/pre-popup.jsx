import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Printing_Agreements_Listing }     	from  '/imports/client/ui/components/vendor/Printing-Agreements/printing-agreements-listing/index.jsx'
import { Printing_Agreements_Popup } 				from  './index.jsx'

// ====================================================================
@inject('store')
@observer
class Pre_Popup extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.paListManager = new store.factories.printingAgreementListFactory(store, {
			source: {
				obj: this,
				name: 'Pre_Popup',
				parms: {vendor_code: vendor_code}
			},
			spec: {
				name: 'PRINTING_AGREEMENTS.composite.one-vendor-code',
				args: {vendor_code: vendor_code} ,
				options: {
					sort: {
						agreement_code: 1
					}
				}
			},
			content: Printing_Agreements_Listing
		})
	}

	componentWillUnmount() {
		this.paListManager.run_disposers()
		this.paListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<PrintingAgreements_Popup__withData__ 
					{...this.props}
					paListManager={this.paListManager}
			/>
		)
	}
}
// ====================================================================
const PrintingAgreements_Popup__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { paListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(paListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			paListManager: paListManager // always need to send this
		}	} // -> -> -> -> //
		paListManager.populate_raManagerList(details)
	
		// everything is ready
		return {
			...props,
			ready: true,
			paListManager: paListManager // changed from version in props
		}
	}),  // e.g. next data provider
)(Printing_Agreements_Popup)
// ====================================================================

export { Pre_Popup }
