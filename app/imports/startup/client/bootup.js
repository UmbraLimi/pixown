import { Meteor }              	from  'meteor/meteor'
// ----node-packages----------------
import React                   	from  'react'
import { render }    				 	 	from  'react-dom'
import { configure, autorun }		from  'mobx'
import { Provider } 					 	from  'mobx-react'
// ----helpers----------------------
// ----collections------------------
import { RootStore }           	from  '/imports/client/stores/index.js'
// ----components-------------------
import { App } 								 	from  '/imports/client/ui/App/App.jsx'
// ====================================================================
Meteor.startup(() => {
	console.log(">>>> client startup <<<<")
	
	configure({enforceActions: true})  // don't allow state modifications outside actions

	const store = new RootStore()

	render (
		<Provider store={store}>
			<App />
		</Provider>
		,document.getElementById('react-root')
	)
})
// ====================================================================