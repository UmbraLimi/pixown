// ----node-packages----------------
import React 										from 'react'
// ----styles-----------------------
import { BackDrop_, Modal_, Button_Bar_, Yes_Button_,
					No_Button_, Question_, Comment_
} 															from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
// ----devtools---------------------

// ====================================================================
class Confirm extends React.Component {

	render() {
		// the function that closes this modal must be passed in 
		// as props.toggle_show

		return (
			<BackDrop_   					className={'(_Modal backdrop)'} >
				<Modal_   					className="modal">
					<Question_>{this.props.question}</Question_>
					<Comment_>{this.props.comment}</Comment_>
					<Button_Bar_>
						<Yes_Button_ 		className="Yes" 
														onClick={this.props.yes_handler}
						>
							{this.props.yes_label}
						</Yes_Button_>
						<No_Button_ 		className="No"
														onClick={this.props.no_handler}
						>
							{this.props.no_label}
						</No_Button_>
					</Button_Bar_>
				</Modal_>
			</BackDrop_>
		)
	}
}
// ====================================================================

export { Confirm }