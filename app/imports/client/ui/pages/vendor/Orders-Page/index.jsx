import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Orders_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Orders_Listing }     	from  '/imports/client/ui/components/vendor/Orders/orders-listing/index.jsx'
import { Orders_Portlet } 			from  '/imports/client/ui/components/vendor/Orders/orders-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Orders_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { customer_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.orderListManager = new store.factories.orderListFactory(store, {
			source: {
				obj: this,
				name: 'Orders_Page',
				parms: {
					customer_code: customer_code,
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: customer_code === '~ALL'
					? 'ORDERS.composite.one-studio-code'
					: 'ORDERS.composite.one-studio-code__one-customer-code',
				args: customer_code === '~ALL'
					? { studio_codes: vendor_code }
					: { 
							studio_codes: vendor_code,
							customer_code: customer_code
						},
				options: {
					sort: {
						customer_code: 1
					}
				}
			},
			content: Orders_Listing
		})
	}

	componentWillUnmount() {
		this.orderListManager.run_disposers()
		this.orderListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<Page_ 	className='Orders_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Orders </Page_Title_>
					<Orders_Zone_ >
						<Orders_Portlet__withData__
								orderListManager={this.orderListManager}
						/>
					</Orders_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Orders_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { orderListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(orderListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			orderListManager: orderListManager // always need to send this
		}	} // -> -> -> -> //
		orderListManager.populate_orderManagerList(details)
	
		// everything is ready
		return {
			ready:    		true,
			orderListManager: orderListManager
		}
	}),  // e.g. next data provider
)(Orders_Portlet)
// ====================================================================

export { Orders_Page }
