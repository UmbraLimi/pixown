// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
//import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
//import { 
//}																from  './styles.js'
// ----enums------------------------
//import { Cart_States } 					from  '/imports/enums/cart-states.js'
// ----helpers----------------------
//import { app_routes } from '../../../routes/app-routes';
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/customer/header-bar/connect.js'
import { Footer_Bar }						from  './footer-bar/index.jsx'
import { Pay_Section }					from  './pay-section/index.jsx'
import { Workups_Section }			from  './workups-section/index.jsx'
import { Totals_Section }				from  './totals-section/index.jsx'
import { Notifications_Section} from  './notifications-section/index.jsx'
import { Mailing_Section } 			from  './mailing-section/index.jsx'
import { Loading } 							from  '/imports/client/ui/components/loading.jsx'
import { Profile_Mailing_Form } from  '/imports/client/ui/components/customer/PUsers/profile-mailing-form/index.jsx'

// ====================================================================
@inject('store')
@observer
class Cart_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { app, cartStore } = store
		const { user_record } = app

		this.puserManager = new store.factories.puserFactory(store, {
			source: {
				obj: this,
				name: 'Mailing_Section',
				parms: {
					mode: 'EXISTING',
					mongo_id: user_record._id, //mongo_id,
				}
			},
			content: undefined, //Form_Wrapper, content only needed for Portlet I/F
			Form_Content: Profile_Mailing_Form,
			notifyStore: cartStore
		})
		this.puserManager._set_record(user_record) 
	}

	componentWillUnmount() {
		this.puserManager.run_disposers()
		this.puserManager = null
	}

	// ====================================================================
	render() {
		const { ready, problem, message } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
		// -> -> -> -> //
		const { store, connect } = this.props
		const { cartStore } = store
		//const { cart_state } = cartStore
	
		//{ cart_state === Cart_States.START.name ? <Prints_Zone /> : null }
		if (!store.app.is_logged_in) { return false }
		return (
			<Page_  							className={ 'Cart_Page_' }>
				<Header_Bar  				tempStore={ store } />
        <Work_Zone_>
					<Page_Title_> Cart </Page_Title_>
					<Workups_Section 				{...this.props} />
					<Totals_Section 				{...this.props} />
					<Notifications_Section  {...this.props} />
					<Mailing_Section 				{...this.props} Manager={this.puserManager} />
					<Pay_Section 						{...this.props} />
				</Work_Zone_>
				<Footer_Bar />
			</Page_>
		)
	}
}
// ====================================================================

export { Cart_Page }