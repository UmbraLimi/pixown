// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { BackDrop_, Modal_, Button_Row_
 } 															from  './styles.js'
// ----helpers----------------------
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Modal extends React.Component {

	render() {
		// the function that closes this modal must be passed in 
		// as props.toggle_show
		const {toggle_show} = this.props

		const icon = {name: 'sign-out', code: '\f08b'}

		return (
			<BackDrop_>
				<Modal_>
					{this.props.children}

					<Button_Row_>
						<Button
							type='ICON+LABEL'
							title='Close'
							icon={icon}
							textColour='white'
							bgColour='blue'
							hover={{
								textColour: 'blue',
								bgColour: 'white'
							}}
							isSelected={false}
							onClick={toggle_show}
						/>
					</Button_Row_>
				</Modal_>
			</BackDrop_>
		)
	}
}
// ====================================================================

export { Modal }