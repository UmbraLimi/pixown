// ----node_modules-----------------
import React                    from  'react'
//import { autorun, toJS }				from  'mobx'
import { observer, inject } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
import { Footer_Bar_, Info_, Page_Marker_,
}																from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Header_Bar } 					from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Profile_Form }         from  '/imports/client/ui/components/vendor/PUsers/profile-form/index.jsx'

// ====================================================================
@inject('store')
@observer
class Profile_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { app } = store
		const { user_record } = app

		this.puserManager = new store.factories.puserFactory(store, {
			source: {
				obj: this,
				name: 'Profile_Page',
				parms: {
					mode: 'EXISTING',
					mongo_id: user_record._id, //mongo_id,
				}
			},
			content: undefined, //Form_Wrapper, content only needed for Portlet I/F
			Form_Content: Profile_Form,
			notifyStore: false //not needed here
		})
		this.puserManager._set_record(user_record) 
	}

	componentWillUnmount() {
		this.puserManager.run_disposers()
		this.puserManager = null
	}

	render() {
		const { store } = this.props
		const { app } = store
		if (!app.is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<Page_ 	className='Profile_Page_' >
				<Header_Bar  tempstore={store} />
				<Work_Zone_ >
					<Page_Title_> Profile Page </Page_Title_>
					<Form_Wrapper  Manager={this.puserManager} />
				</Work_Zone_>
				<Footer_Bar_  className='Footer_Bar_' >
					<Info_  className='Info_' />
					<Page_Marker_  className='Page_Marker_'>
						Vendor <br /> Profile
					</Page_Marker_>
				</Footer_Bar_>
			</Page_>
		)
	}
}
// ====================================================================

export { Profile_Page }
