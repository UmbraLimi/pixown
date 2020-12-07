import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Retouching_Agreements_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Retouching_Agreements_Listing }     	from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreements-listing/index.jsx'
import { Retouching_Agreements_Portlet } 			from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreements-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Retouching_Agreements_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { school_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.raListManager = new store.factories.retouchingAgreementListFactory(store, {
			source: {
				obj: this,
				name: 'Retouching_Agreements_Page',
				parms: {
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: 'RETOUCHING_AGREEMENTS.composite.one-vendor-code',
				args: { vendor_code: vendor_code },
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
			<Page_ 	className='Retouching_Agreements_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Retouching Agreements </Page_Title_>
					<Retouching_Agreements_Zone_ >
						<Retouching_Agreements_Portlet__withData__
								raListManager={this.raListManager}
						/>
					</Retouching_Agreements_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Retouching_Agreements_Portlet__withData__ = _.compose(
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
			ready:    		true,
			raListManager: raListManager
		}
	}),  // e.g. next data provider
)(Retouching_Agreements_Portlet)
// ====================================================================

export { Retouching_Agreements_Page }
