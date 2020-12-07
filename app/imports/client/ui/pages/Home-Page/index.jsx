//import { Meteor } 							from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
import { Abc_, Vendors_ }				from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Public_Header_Bar }           from  '/imports/client/ui/components/public-header-bar/connect.js'

// ====================================================================
@inject( 'store' )
@observer 
class Home_Page extends React.Component {

	onClick = () => {}

	render() {
		const { store } = this.props
		
		return (
			<Page_ 								className='_Home_Page_' >
				<Public_Header_Bar 	tempStore={store} />
				<Work_Zone_>
					<Page_Title_ > Students! <br /> Welcome to Pixown! </Page_Title_>
					<Abc_							className={'_Abc_'}> 
						<div>Explore your school photos</div>
						<div>and customize how they look!</div>
						<br />
						<Vendors_>Vendors: please log in</Vendors_>
					</Abc_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================

export { Home_Page }
