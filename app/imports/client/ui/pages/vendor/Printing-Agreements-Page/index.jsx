import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Printing_Agreements_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Printing_Agreements_Listing }     	from  '/imports/client/ui/components/vendor/Printing-Agreements/printing-agreements-listing/index.jsx'
import { Printing_Agreements_Portlet } 			from  '/imports/client/ui/components/vendor/Printing-Agreements/printing-agreements-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Printing_Agreements_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { school_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.paListManager = new store.factories.printingAgreementListFactory(store, {
			source: {
				obj: this,
				name: 'Printing_Agreements_Page',
				parms: {
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: 'PRINTING_AGREEMENTS.composite.one-vendor-code',
				args: { vendor_code: vendor_code },
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
			<Page_ 	className='Printing_Agreements_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Printing Agreements </Page_Title_>
					<Printing_Agreements_Zone_ >
						<Printing_Agreements_Portlet__withData__
								paListManager={this.paListManager}
						/>
					</Printing_Agreements_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Printing_Agreements_Portlet__withData__ = _.compose(
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
		paListManager.populate_paManagerList(details)
	
		// everything is ready
		return {
			ready:    		true,
			paListManager: paListManager
		}
	}),  // e.g. next data provider
)(Printing_Agreements_Portlet)
// ====================================================================

export { Printing_Agreements_Page }
