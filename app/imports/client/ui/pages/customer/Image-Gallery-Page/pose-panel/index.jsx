// ----node-packages----------------
import React                    from  'react'
import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { 
	Pose_Panel_, Pose_, Pose_Image_, 
	State_Badge_Container_, Badge_,
	Pose_Label_Container_, Pose_Label_
} 															from  './styles.js'
// ----helpers----------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----collections------------------
// ----components-------------------
import { Loading } 							from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Pose_Panel extends React.Component {
	
	@observable isAnimating = false
	@action stopAnimating = () => {this.isAnimating = false}
	@action startAnimating = () => {this.isAnimating = true}

	poseWasSelected = (sitting, proof, retouching_agreement) => {
		const { store } = this.props
		this.startAnimating()
		setTimeout(() => {
			this.stopAnimating()
			store.imageGalleryStore.handlePoseWasSelected(sitting, proof, retouching_agreement)
		}, 1000)
	}

	render() {
		const { ready, problem, message } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
		// -> -> -> -> //
		let { tempStore } = this.props; tempStore = null // nolonger needed

		const { store, connect, sitting, proof, retouching_agreement } = this.props
		const { state_counts, image } = this.props.connect

		__.isEmpty(image) ? image.url = "apple-icon-60x60.png" : null

		const number_ordered_or_complete = state_counts[Workup_States.ORDERED.name] 
																			+ state_counts[Workup_States.COMPLETE.name]
		const number_in_cart = state_counts[Workup_States.IN_CART.name]
		const proofs_title = `Proofs/Poses for Sitting Code ${sitting.sitting_code}`
		const isAnimating = this.isAnimating

		return (
			<Pose_Panel_>
				<Pose_
														onClick={() => { this.poseWasSelected(sitting, proof, retouching_agreement) }}
														isAnimating={isAnimating}
				>
					<Pose_Image_ 			src={image.url} className={ 'Pose_Image_' }
					/>
					<div style={{ position: 'relative' }}>
						<State_Badge_Container_>
							<Badge__ bgcolorr={'#f44336'} colorr={'white'} countt={number_in_cart} />
							<Badge__ bgcolorr={'limegreen'} colorr={'white'} countt={number_ordered_or_complete} />
						</State_Badge_Container_>
					</div>
				</Pose_>

				<Pose_Label_Container_>
					<Pose_Label_ > {`Pose ${proof.pose_code}`} </Pose_Label_>
				</Pose_Label_Container_>

			</Pose_Panel_>
		)
	}
}
// ====================================================================
const Badge__ = ({ countt, bgcolorr, colorr, labell='' }) => {
	if (countt === 0) { return null }
	return (
		<Badge_
			style={{
				color: colorr,
				backgroundColor: bgcolorr,
			}}
		>
			{labell === '' ? countt : labell}
		</Badge_>
	)
}
// ====================================================================
const _PlaceHolder = (props) => {
	return (<div>Placeholder for {props.name}</div>)
}
// ====================================================================

export { Pose_Panel }
