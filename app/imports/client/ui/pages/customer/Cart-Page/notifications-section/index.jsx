import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Notifications_, Wrapper_, Item_, Title_, Icon_ 
}																from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Notifications_Section extends React.Component {

	render() {
		const { store } = this.props
		const { cartStore } = store
		//const { cart_state } = cacartStorert
		const notifications = cartStore.notifications //|| ["hello there. What in the world are you doing? I could 've had a studebaker at that price. You might as well save your money and bet on Poland","how are ya?"]
		if (__.isEmpty(notifications)) {
			return null
		}
		return (
			<Wrapper_>
				<Title_ > Notifications </Title_>
				<Notifications_ className={'fa-ul'}>
					{
						__.map(notifications, (note, num) => {
							return (
								<Item_ key={ num } >
									<Icon_ className={'fa-li fa fa-check'} />
									{ note } 
								</Item_>
							)
						})
					}
				</Notifications_>
			</Wrapper_>
		)
	}
}
// ====================================================================

export { Notifications_Section }