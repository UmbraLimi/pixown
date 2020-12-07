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
		const { store, orderManager } = this.props

		const title = orderManager.num_workups === 0
		? 'No workups in this order!'
		: orderManager.num_workups + ' workups in this order'
		
		return (
			<Workups_Section_>
				{/*<Workups_Title_>{ title }</Workups_Title_>*/}
				<Workups_>
					{(
						__.map(orderManager.workupManagerList, (workup_manager, num) => {
							return (
								<Workup_Panel 	workup_manager={ workup_manager } key={ workup_manager.record._id } />
							)
						})
					)}
				</Workups_>
			</Workups_Section_>
		)
	}
}
// ====================================================================

export { Workups_Section }