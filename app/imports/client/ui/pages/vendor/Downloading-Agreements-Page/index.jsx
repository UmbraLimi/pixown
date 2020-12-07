import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Downloading_Agreements_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Downloading_Agreements_Listing }     	from  '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreements-listing/index.jsx'
import { Downloading_Agreements_Portlet } 			from  '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreements-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Agreements_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { school_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.daListManager = new store.factories.downloadingAgreementListFactory(store, {
			source: {
				obj: this,
				name: 'Downloading_Agreements_Page',
				parms: {
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: 'DOWNLOADING_AGREEMENTS.composite.one-vendor-code',
				args: { vendor_code: vendor_code },
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
			<Page_ 	className='Downloading_Agreements_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Downloading Agreements </Page_Title_>
					<Downloading_Agreements_Zone_ >
						<Downloading_Agreements_Portlet__withData__
								daListManager={this.daListManager}
						/>
					</Downloading_Agreements_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Downloading_Agreements_Portlet__withData__ = _.compose(
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
		daListManager.populate_daManagerList(details)
	
		// everything is ready
		return {
			ready:    		true,
			daListManager: daListManager
		}
	}),  // e.g. next data provider
)(Downloading_Agreements_Portlet)
// ====================================================================

export { Downloading_Agreements_Page }
