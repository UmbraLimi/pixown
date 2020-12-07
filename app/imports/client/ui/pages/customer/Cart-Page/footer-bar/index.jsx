import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Footer_Bar_, Footer_Bar_Container_, 
	Arrow_, Footer_Button_,	Icon_Previous_, 
	Icon_Next_, Footer_Menu_Item_, Middle_, 
	Icon_, State_, Arrow_Placeholder_ 
}																from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Footer_Bar extends React.Component {

	handletoImageGalleryClick = () => {
		const { store } = this.props
		const { cartStore, router } = store
		router.goTo(app_routes.image_gallery, {}, this.props.store)
	}

	handlePayWithCardClick = () => {
		const { cartStore } = this.props.store
		// ????
	}

	render() {
		const { store } = this.props
		const { cartStore } = store

		return (
			<Footer_Bar_>
				<Footer_Bar_Container_>
					<Arrow_ 					onClick={this.handletoImageGalleryClick } 
					>
						<Footer_Button_	>
							<Icon_Previous_ className={ 'fa fa-chevron-left' } />
							<Footer_Menu_Item_ >
								{ 'Image Gallery' }
							</Footer_Menu_Item_>
						</Footer_Button_>
					</Arrow_>

					<Middle_ >
						<State_> { 'CART' } </State_>
					</Middle_>

					<Arrow_Placeholder_ />
				</Footer_Bar_Container_>
			</Footer_Bar_>
		)
	}
}
// ====================================================================

export { Footer_Bar }