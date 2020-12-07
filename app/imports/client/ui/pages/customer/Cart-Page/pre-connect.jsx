import { Meteor } 							from  'meteor/meteor'
// ----node-packages----------------
import React                    from  'react'
import { inject } 							from  'mobx-react'
// ----styles-----------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Cart_Page as Component }   from  './connect.js'

/* 
		NOTE: only use this to connect mobx-router to connect.js of a component
		since mobx-router does not allow for passing of store as a prop
		it only allows a direct call to a component with not props.
		Therefore, this component's only job is to inject a copy of store
		temporarily for use inside connect.js

		NOTE: you only need to copy this file into the same folder as the connect.js
					and then set the XXXX_Page to the name which is exported in connect.js

		ALTERNATIVE: if calling from inside a component just send the store as a prop
		(e.g. home/index.jsx)
		import { Header_Bar } from  '/imports/client/ui/components/header-bar/connect.js'
		<Header_Bar 				tempStore={store}/>
*/

// ====================================================================
@inject('store')
class Pre_Connect extends React.Component {
	render() {
		return (<Component tempStore={this.props.store} />)
	}
}
// ====================================================================

export { Pre_Connect }
