import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Workups_Section_, Workups_Title_, Workups_, 
}															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Workup_Panel }         from  './workup-panel/index.jsx'

// ====================================================================
@inject('store')
@observer
class Workups_Section extends React.Component {

	render() {
		const { store } = this.props
		const { cartStore } = store
		const title = cartStore.num_workups === 0
		? 'No workups in cart yet!'
		: cartStore.num_workups + ' workups in your cart'
		
		return (
			<Workups_Section_>
				<Workups_Title_>{ title }</Workups_Title_>
				<Workups_>
					{
						(
							__.map(cartStore.wup_stores, (wup_store, num) => {
								return (
									<Workup_Panel 	wup_store={ wup_store } key={ wup_store.record._id } />
								)
							})
						)
					}
				</Workups_>
			</Workups_Section_>
		)
	}
}
// ====================================================================

export { Workups_Section }