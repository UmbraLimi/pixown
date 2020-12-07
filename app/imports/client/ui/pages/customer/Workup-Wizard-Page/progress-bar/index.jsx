import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action } 	from  'mobx'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
import { Progress_Bar_, Progress_Bar_Container_, 
	Progress_Bar_Item_, Icon_Container_, Icon_, Label_
} 															from  './styles.js'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
import { Confirm }            	from  '/imports/client/ui/components/confirm/index.jsx'

// ====================================================================
@inject('store')
@observer
class Progress_Bar extends React.Component {

	@observable  show_confirm = false
	@observable  intended_page = undefined

	@action
	enableShowConfirmDialog = () => {
		this.show_confirm = true
	}
	@action
	disableShowConfirmDialog = () => {
		this.show_confirm = false
	}

	@action
	yes_handler = () => {
		const { workupWizardStore } = this.props.store
		const dest_page = this.intended_page // to be able to clear it now but use it later
		this.intended_page = undefined
		this.disableShowConfirmDialog()
		workupWizardStore._toggle_visible_for_progressBar()
		workupWizardStore._set_pageKey(dest_page.key)
	}
	@action
	no_handler = () => {
		this.intended_page = undefined
		this.disableShowConfirmDialog()
	}

	handleBarClick = () => {
		// they clicked somewhere on the progress_bar
		const { workupWizardStore } = this.props.store
		//workupWizardStore._save_workup_to_db()
	}

	@action
	handleProgressBarItemSelect = (page) => {
		const { router, workupWizardStore } = this.props.store
		const state = workupWizardStore.record.state

		this.intended_page = page

		__.includes(['cart', 'image-gallery'], page.key) && state === Workup_States.SAVED.name
			? this.enableShowConfirmDialog()
			: this.yes_handler()
	}

	render() {

		const { store } = this.props
		const { workupWizardStore } = store
		const state = workupWizardStore.record.state

		return (
			<Progress_Bar_Container_ onClick={ this.handleBarClick }>
				<Progress_Bar_>
					{
						__.map(workupWizardStore._orderedPages_for_wizard, (page, i) => {

							if ( page.key === 'cart' && state !== Workup_States.IN_CART.name ) {
								return null
							}
							//if ( page.key === 'image-gallery' || page.key === 'cart') {
							//	return null
							//}
							// show only those services in the current agreement
							const retouching_service = !page.service_code
								? undefined
								: __.find(workupWizardStore._retouchAgreementRecordWithServiceDetails._services, (service) => {
									return service.service_code === page.service_code
								})

							let colour, weight, cursor
							const on_page = page.key === workupWizardStore.pageKey
							const no_addToCart = page.key === 'add-to-cart' && !workupWizardStore._workup_is_cartable
							if (on_page) {
								colour = theme.colors.accentAlt
								weight = 700
								cursor = 'auto'
							} else {
								if (no_addToCart) {
									colour = 'lightgray'
									weight = 'normal'
									cursor = 'auto'
								} else {
									colour = theme.colors.foreground
									weight = 'normal'
									cursor = 'pointer'
								}
							}
							const label = page.service_code 
								? retouching_service._service_code_details.label
								: page.label
							const icon = page.service_code 
								? retouching_service._service_code_details.icon_name
								: page.icon_name

							return (
								<Progress_Bar_Item_ key={page.key} >
									<Icon_Container_	style={{ color: colour, fontWeight: weight, cursor: cursor }}
																		onClick={() => { on_page || no_addToCart ? null : this.handleProgressBarItemSelect(page) }}
									>
										<Icon_ 					className={`fa fa-fw ${icon}`} />
										<Label_>{label}</Label_>
									</Icon_Container_>
								</Progress_Bar_Item_>
							)
						})
					}
				</Progress_Bar_>

				{ this.show_confirm ?
					//confirm('Are you sure you want to leave this workup?')
					//	? this.yes_handler
					//	: this.no_handler
					<Confirm
						question={'Are you sure you want to leave this workup?'}
						comment={'You will lose whatever settings you have chosen for this pose'}
						yes_label={'Yes'}
						no_label={'Cancel'}
						yes_handler={this.yes_handler}
						no_handler={this.no_handler}
					/> 
				: null }
				)
			</Progress_Bar_Container_>
		)
	}
}
// ====================================================================

export { Progress_Bar }