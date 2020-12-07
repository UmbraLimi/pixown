import { Meteor } 							from  'meteor/meteor'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } from 'lodash'
// ----styles-----------------------
import {
	Sitting_Panel_, Sittings_Title_, Sittings_Title_Container_,
	Sitting_, Proof_
} 															from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Pose_Panel } 					from  '../pose-panel/connect.js'
import { Loading } 							from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Sitting_Panel extends React.Component {

	render() {
		const { ready, problem, message } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
		// -> -> -> -> //
		let { tempStore } = this.props; tempStore = null // nolonger needed

		const { store, connect, sitting, poseWasSelected } = this.props
		const num_proofs = sitting.proofs_list.length

		return (
			<Sitting_Panel_>
				<Sittings_Title_Container_>
					<Sittings_Title_>
						Sitting { sitting.sitting_code }
					</Sittings_Title_>
				</Sittings_Title_Container_>
				<Sitting_>
					{ num_proofs === 0 ? <p>no proofs available</p> : (
						__.map(sitting.proofs_list, (proof, num) => {
							return (
								<Proof_ 						key={ proof.pose_code }>
									<Pose_Panel 			{ ...connect }
																		tempStore={ store } 
																		sitting={ sitting }
																		proof={ proof }
									/>
								</Proof_>
							)
						})
					)}
				</Sitting_>
			</Sitting_Panel_>
		)
	}
}
// ====================================================================

export { Sitting_Panel }
