// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
import { Button_Section_ }			from  './styles.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/customer/header-bar/connect.js'
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Homebase_Page extends React.Component {

	handleImageGalleryButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.image_gallery, {}, store)
	}
	handleCrunchButtonClick = async () => {
		//const numbersCrunched = await Meteor.callPromise('crushSomeNumbers', 'client1', 'client2')
		//console.log('Crunch Clicked!', numbersCrunched)
	}

	render() {
		const { store } = this.props
		if (!store.app.is_logged_in) { return false }
		return (
			<Page_ 								className='Homebase_Page_'>
				<Header_Bar 				tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Customer Home </Page_Title_>
					<Button_Section_>
						<Button 				title='Image Gallery'
														onClick={this.handleImageGalleryButtonClick}
						/>
						<Button 				title='Crunch'
														onClick={this.handleCrunchButtonClick}
						/>
					</Button_Section_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================

export { Homebase_Page }
