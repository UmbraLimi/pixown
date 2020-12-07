import { Meteor } 							from  'meteor/meteor'
// ----node_modules-----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action, toJS } 	from  'mobx'
import { _ as __ }         			from  'lodash'
// ----styles-----------------------
import { Header_Bar_, Inner_, Link_, Logo_, Expander_, 
	Menu_Item_, Login_Link_, Icon_, Span_, 
	Submenu_, Submenu_Item_, Toggle_, Submenu_Link_,
	Outer_, Cart_Link_, Badge_Container_, Badge_, Cart_Icon_
}																from  './styles.js'
// ----helpers----------------------
import { app_routes, find_route_key_given_url 
} 															from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Header_Bar extends React.Component {

	onClick_logo = () => {}

	onClick_header = () => {
		/*
		// they clicked somewhere on the header
		const { workupWizardStore, router } = this.props.store
		const current_view = find_route_key_given_url(router.currentView.path)
		if (current_view === 'workupWizardStore') {
			workupWizardStore._save_workup_to_db()
		}
		*/
	}

	render() {
		const { store, on_login_page } = this.props
		const { app: { user_record } } = store

		//console.info('app.user_record', toJS(user_record))
		
		const show_login = on_login_page
			? false
			: user_record ? false : true
		const show_logout = on_login_page
			? false
			: user_record ? true : false
		const show_cart = on_login_page
			? false
			: user_record ? true : false

		const current_view = find_route_key_given_url(store.router.currentView.path)
		const logo_route = __.includes(['home', 'login'], current_view) ? 'home' : 'homebase'

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
            { show_login  ? <Login_Button__  { ...this.props } /> : null }
            { show_logout ? <User_Dropdown__ { ...this.props } /> : null }
            { show_cart   ? <Cart__  				 { ...this.props } /> : null }
          </ul>
				</Inner_>
			</Header_Bar_ >
		)
	}
}
// ====================================================================
const Login_Button__ = (props) => {

  return (
    <Menu_Item_>
			<Login_Link_ 					view={app_routes.homebase} store={props.store}>
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
		const { store } = this.props
		const { router } = store
		router.goTo(app_routes.homebase, {}, store)
  }

  goProfile = () => {
		const { store } = this.props
		const { router } = store
		router.goTo(app_routes.profile, {}, store)
  }

	@action  
	toggleOpen = () => {
		this.isOpen = !this.isOpen
  }

	render() {
		const { store } = this.props
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
						
						<Submenu_Link_ 	onClick={ this.goHomebase }>
	            <Submenu_Item_>
                Home
	            </Submenu_Item_>
						</Submenu_Link_>
						
						<Submenu_Link_ 	onClick={ this.goProfile }>
	            <Submenu_Item_>
                Profile
	            </Submenu_Item_>
						</Submenu_Link_>
						
						<Submenu_Link_ 	onClick={ this.doLogout }>
	            <Submenu_Item_>
                Logout
	            </Submenu_Item_>
						</Submenu_Link_>
          </Submenu_>
        </div>
      </Menu_Item_>
    )
  }
}
// ====================================================================
const Cart__ = observer((props) => {
	const countt = props.store.cartStore.cart_count

	const onClick = () => {}

	return (
    <Menu_Item_>
			<Cart_Link_ 					view={app_routes.cart} store={props.store}
														onClick={ onClick }
			>
				<Cart_Icon_ 				className={ 'fa fa-shopping-cart '} />
				{countt > 0 ?
					<Outer_>
						<Badge_Container_>
							<Badge_ > { countt } </Badge_>
						</Badge_Container_>
					</Outer_> : null
				}
			</Cart_Link_>
    </Menu_Item_>
  )
})
// ====================================================================
export { Header_Bar }