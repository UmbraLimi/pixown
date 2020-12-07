// ----node-packages----------------
import React 										from  'react'
import { observer, inject } 		from  'mobx-react'
import { autorun }	 						from  'mobx'
//import { toJS, trace }	 				from  'mobx'
import { MobxRouter } 					from  'mobx-router'
import { ToastContainer } 			from  'react-toastify' // so toasts can work anywhere
import { startRouter } 					from  'mobx-router'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
// ----devtools---------------------
//import DevTools 								from  'mobx-react-devtools'

// ====================================================================
@inject( 'store' )
@observer 
class App extends React.Component {

	disposer = autorun( 
		() => {
			//const { app } = this.props.store
			//trace(true)
			//console.log('user_record', toJS(app.user_record))
			//console.log(app.cart)
			//console.log('cart.length', 		app.cart.length)
			//console.log('user_record', 		app.user_record)
			//console.log('intended_route', app.intended_route)
			//console.log('Meteor.userId()', Meteor.userId())
		}
	)

	componentWillUnMount() {
		this.disposer()
	}

	componentDidMount() {
		const { store } = this.props
		const { app } = store
		// loading user in CDM means that the user_record isn't reactive
		app.initialize() // set in motion getting user_record
		.then((rr) => {
			startRouter(app_routes, store) // start the router
		})
	}

	render() {
		const { store } = this.props
		if (store.app.user_record === undefined && Meteor.userId()) {
			return (<div>Waiting for user_record</div>)
		}
		return (
			<div 	className='_App_' >
        <ToastContainer />
				<MobxRouter />
				{/*<DevTools />*/}
			</div>
		)
	}
}
// ====================================================================
export { App }
