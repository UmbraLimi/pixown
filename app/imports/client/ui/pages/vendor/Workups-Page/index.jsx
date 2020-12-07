import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Workups_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Workups_Listing }     	from  '/imports/client/ui/components/vendor/Workups/workups-listing/index.jsx'
import { Workups_Portlet } 			from  '/imports/client/ui/components/vendor/Workups/workups-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Workups_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { customer_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.workupListManager = new store.factories.workupListFactory(store, {
			source: {
				obj: this,
				name: 'Workups_Page',
				parms: {
					customer_code: customer_code,
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: customer_code === '~ALL'
					? 'WORKUPS.composite.one-studio-code'
					: 'WORKUPS.composite.one-studio-code__one-customer-code',
				args: customer_code === '~ALL'
					? { studio_code: vendor_code }
					: { 
							studio_code: vendor_code,
							customer_code: customer_code
						},
				options: {
					sort: {
						customer_code: 1
					}
				}
			},
			content: Workups_Listing
		})
	}

	componentWillUnmount() {
		this.workupListManager.run_disposers()
		this.workupListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<Page_ 	className='Workups_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Workups </Page_Title_>
					<Workups_Zone_ >
						<Workups_Portlet__withData__
								workupListManager={this.workupListManager}
						/>
					</Workups_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Workups_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { workupListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(workupListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			workupListManager: workupListManager // always need to send this
		}	} // -> -> -> -> //
		workupListManager.populate_workupManagerList(details)
	
		// everything is ready
		return {
			ready:    		true,
			workupListManager: workupListManager
		}
	}),  // e.g. next data provider
)(Workups_Portlet)
// ====================================================================

export { Workups_Page }
