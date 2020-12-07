import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Footer_Bar_, Footer_Bar_Container_, Arrow_, Footer_Button_,
					Icon_Previous_, Icon_Next_, Footer_Menu_Item_, Middle_, 
					Icon_, Toggle_Footer_Button_, State_, Eye_Button_
} 															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Footer_Bar extends React.Component {

	handleFooterBarToggle = () => {
		this.props.store.workupWizardStore._toggle_visible_for_progressBar()
	}

	handleEyeClick = () => {
		this.props.store.workupWizardStore._toggle_eyeMode()
	}

	render() {
		const { store } = this.props
		const { workupWizardStore } = store

		const nextArrowIsValid = workupWizardStore._nextPage_is_CartPage
			? false
			: true
		const prevArrowIsValid = workupWizardStore._prevPage_is_ImageGalleryPage
			? false
			: true

		const iconClass = workupWizardStore.eyeMode_is_active ? 'fa-eye-slash' : 'fa-eye'
		const state_label = `${workupWizardStore.record.state}${workupWizardStore.record_is_dirty ? '*' : ''}`
		
		return (
			<Footer_Bar_>
				<Footer_Bar_Container_>
					<Arrow__ 					show={prevArrowIsValid} type={'PREVIOUS'} />
					<Middle_ >
						<Toggle_Footer_Button_ onClick={ this.handleFooterBarToggle }>
							<Icon_ 				className={ 'fa fa-bars' }/>
						</Toggle_Footer_Button_>
						<State_> { state_label } </State_>
						<Eye_Button_ 		onClick={ this.handleEyeClick }>
							<Icon_ 				className={ `fa ${iconClass}` }/>
						</Eye_Button_>
					</Middle_>
					<Arrow__ 					show={nextArrowIsValid} type={'NEXT'} />
				</Footer_Bar_Container_>
			</Footer_Bar_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Arrow__ extends React.Component {

	handlePreviousArrowClick = () => {
		// auto save as they leave the page
		const { workupWizardStore } = this.props.store
		//workupWizardStore._save_workup_to_db()
		workupWizardStore._set_pageKey(workupWizardStore._prevPage.key)
	}

	handleNextArrowClick = () => {
		// auto save as they leave the page
		const { workupWizardStore } = this.props.store
		//workupWizardStore._save_workup_to_db()
		workupWizardStore._set_pageKey(workupWizardStore._nextPage.key)
	}

	render() {
		const { store, type, show } = this.props
		const { workupWizardStore } = store

		if (!show) { return (	<Arrow_ /> ) }
		// -> -> -> -> //

		const label = type === 'NEXT'
			? workupWizardStore._label_for_nextPage
			: workupWizardStore._label_for_prevPage

		const icon = type === 'NEXT'
			? 'fa-chevron-right'
			: 'fa-chevron-left'
			
		const clickHandler = type === 'NEXT'
			? this.handleNextArrowClick
			: this.handlePreviousArrowClick

		return (
			<Arrow_ 							onClick={ show ? clickHandler : null } 
			>
				<Footer_Button_	>
					<Icon_Previous_ 	className={ `fa ${icon}` } />
					<Footer_Menu_Item_ >
						{ label }
					</Footer_Menu_Item_>
				</Footer_Button_>
			</Arrow_>
		)
	}
}
// ====================================================================

export { Footer_Bar }