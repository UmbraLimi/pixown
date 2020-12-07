//import { Meteor } 							from 	'meteor/meteor'
// ----node_modules-----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
//import { autorun, toJS }				from  'mobx'
import { observer, inject } 		from  'mobx-react'
//import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
import { Footer_Bar_, Info_, Page_Marker_
}																from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Public_Header_Bar } 		from  '/imports/client/ui/components/public-header-bar/connect.js'
import { Login_Form } 					from  './login-form/index.jsx'

// ====================================================================
@inject('store')
@observer
class Login_Page extends React.Component {

	render() {
		const { store } = this.props
		return (
			<Page_ 									className='Login_Page_' >
				<Public_Header_Bar		on_login_page tempstore={store} />
				<Work_Zone_ >
					<Page_Title_> Login Page </Page_Title_>
					<Login_Form />
				</Work_Zone_>
				<Footer_Bar_ 					className='Footer_Bar_' >
					<Info_ 							className='Info_' />
					<Page_Marker_ 			className='Page_Marker_'>
						Login
					</Page_Marker_>
				</Footer_Bar_>
			</Page_>
		)
	}
}
// ====================================================================

export { Login_Page }
