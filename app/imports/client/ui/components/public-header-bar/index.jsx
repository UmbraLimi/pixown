//import { Meteor } 							from  'meteor/meteor'
// ----node_modules-----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action, toJS } 	from  'mobx'
import { _ as __ }         			from  'lodash'
// ----styles-----------------------
import { Header_Bar_, Inner_, Link_, Logo_, Expander_, 
	Menu_Item_, Login_Link_, Icon_, Span_, 
	Submenu_, Submenu_Item_, Toggle_, Submenu_Link_,
}																from  './styles.js'
// ----helpers----------------------
import { app_routes, find_route_key_given_url 
} 															from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Public_Header_Bar extends React.Component {
	// used by Login and by Public pages

	onClick_logo = () => {}

	onClick_header = () => {}

	render() {
		const { store, on_login_page } = this.props
		const { app: { user_record } } = store
		const role = user_record ? user_record.role : undefined

		let homebase, profile
		if (role==='CUSTOMER') {
			homebase = 'homebase'
			profile = 'profile'
		} else if (role==='VENDOR') {
			homebase = 'vendor_homebase'
			profile = 'vendor_profile'
		} else if (role==='ADMIN') {
			homebase = 'admin_homebase'
			profile = 'admin_profile'
		} else {
			// send them to the public page
			homebase = 'login'
			profile = 'login'
		}

		const show_login = on_login_page
			? false
			: role ? false : true

		const show_logout = on_login_page
			? false
			: role ? true : false

		const show_homebase = role ? true : false

		const show_profile = on_login_page
			? false
			: role ? true : false

		const current_view = find_route_key_given_url(store.router.currentView.path)
		const logo_route = __.includes(['home', 'login'], current_view) ? 'home' : homebase

		return (
			<Header_Bar_					onClick={ this.onClick_header }>
				<Inner_>
					<Link_ 						view={ app_routes[logo_route] } store={ store }
														onClick={ this.onClick_logo }
					>
						<Logo_ 					src='/images/logo.png' alt='Pixown'	/>
					</Link_>
					<Expander_/>
					<ul>
						{ show_login  
							? <Login_Button__  
								store={store}
							/> 
							: null 
						}
						{ show_logout 
							? <User_Dropdown__ 
								store={store} 
								homebase={homebase} 
								profile={profile} 
								show_logout={show_logout}
								show_profile={show_profile}
								show_homebase={show_homebase}
							/> 
							: null 
						}
          </ul>
				</Inner_>
			</Header_Bar_ >
		)
	}
}
// ====================================================================
const Login_Button__ = (props) => {

	const { store, homebase } = props
  return (
    <Menu_Item_>
			<Login_Link_ 					view={app_routes.login} store={store}>
        Login
      </Login_Link_>
    </Menu_Item_>
  )
}
// ====================================================================
@observer
class User_Dropdown__ extends React.Component {

	@observable isOpen = false

  doLogout = () => {
    this.props.store.app.log_out()
  }

  goHomebase = () => {
		const { store, homebase } = this.props
		const { router } = store
		router.goTo(app_routes[homebase], {}, store)
  }

  goProfile = () => {
		const { store, profile } = this.props
		const { router } = store
		router.goTo(app_routes[profile], {}, store)
  }

	@action  
	toggleOpen = () => {
		this.isOpen = !this.isOpen
  }

	render() {
		const { store, show_logout, show_profile, show_homebase } = this.props
		const { app: { user_record } } = store
		const username = user_record 
			? user_record.username
			: '---' 
	  
    return (
      <Menu_Item_>
        <Toggle_ 						onClick={ this.toggleOpen } >
          <Icon_ 						className={ 'fa fa-user '} aria-hidden='true'/>
          	<Span_>{ username }</Span_>
          <Icon_ 						className={ (this.isOpen ? 'fa fa-angle-up ' : 'fa fa-angle-down ') }/>
        </Toggle_>

        <div style={ { position: "relative" } }>
          <Submenu_ 				isOpen={this.isOpen}>
						
						{ show_homebase 
							? 
								<Submenu_Link_ 	onClick={ this.goHomebase }>
									<Submenu_Item_>
										Home
									</Submenu_Item_>
								</Submenu_Link_>
							: null
						}
						
						{ show_profile 
							? 
								<Submenu_Link_ 	onClick={ this.goProfile }>
	            		<Submenu_Item_>
                		Profile
	            		</Submenu_Item_>
								</Submenu_Link_>
							: null
						}
						
						{ show_logout 
							? 
								<Submenu_Link_ 	onClick={ this.doLogout }>
									<Submenu_Item_>
										Logout
									</Submenu_Item_>
								</Submenu_Link_>
							: null
						}
          </Submenu_>
        </div>
      </Menu_Item_>
    )
  }
}
// ====================================================================
export { Public_Header_Bar }