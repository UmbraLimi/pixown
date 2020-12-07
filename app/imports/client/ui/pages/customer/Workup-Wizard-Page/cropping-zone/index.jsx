import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action } 	from  'mobx'
//import { _ as __ } 							from  'lodash'
//import { toast } 								from  'react-toastify'
//import numeral 									from  'numeral'
// ----styles-----------------------
//import { theme }           			from  '/imports/client/ui/styles/theme.js'
import {
	Cropping_Zone_,
} 															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Cropping_Zone extends React.Component {

	render() {

		const { store } = this.props
		const { workupWizardStore } = store

		return (
			<Cropping_Zone_>
				Cropping_Zone_
			</Cropping_Zone_>
		)
	}
}
// ====================================================================

export { Cropping_Zone }


