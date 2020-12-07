import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Order_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Order_Portlet }     		from  '/imports/client/ui/components/vendor/Orders/order-portlet/index.jsx'
import { Order_Form }         	from  '/imports/client/ui/components/vendor/Orders/order-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Order_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { mongo_id, mode='NEW' } = store.router.params
		const { user_record } = store.app

		this.orderManager = new store.factories.orderFactory(store, {
			source: {
				obj: this,
				name: 'Order_Page',
				parms: {
					mode: mode,
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Form_Wrapper,
			Form_Content: Order_Form
		})
	}

	componentWillUnmount() {
		this.orderManager.run_disposers()
		this.orderManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //
		const { mongo_id, mode='NEW' } = store.router.params
		if (mode==='EXISTING' && !mongo_id) { return (
			<Loading  problem={` Missing mongo_id for mode: ${mode}`}/>
		)}
		// -> -> -> -> //
		if (mode==='NEW' && mongo_id) { return (
			<Loading  problem={` mongo_id ${mongo_id} was specified for mode: ${mode}`}/>
		)}
		// -> -> -> -> //

		return (
			<Page_ 	className='Order_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Order </Page_Title_>
					<Order_Zone_ >
						<Order_Portlet__ 
								orderManager={this.orderManager} 
						/>
					</Order_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Order_Portlet__ extends React.Component {

	render() {
		const { orderManager } = this.props
		const { mode, vendor_code } = orderManager.source.parms
		
		if (mode==='NEW') {
			orderManager._set_record({
				studio_codes: [vendor_code] // that's all we know for a new record
			})
			return (<Order_Portlet ready={true} orderManager={orderManager} />)
		}	// -> -> -> -> //
	
		return (<Order_Portlet__withData__ 	orderManager={orderManager} />)
	}
}
// ====================================================================
const Order_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { orderManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(orderManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			orderManager: orderManager // always need to send this
		}	} // -> -> -> -> //
		orderManager._set_record(details) // order_record
	
		// everything is ready
		return {
			ready:    		true,
			orderManager: orderManager
		}
	}), // e.g. next data provider
)(Order_Portlet)
// ====================================================================

export { Order_Page }
