// ----node-packages----------------
import React                    from  'react'
import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
import { Button_Section_, Button_Row_ 
} 															from  './styles.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Homebase_Page extends React.Component {

	handleFoldersButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_folders, {}, store, {})
	}

	handleSittingButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_sitting, {mode:'NEW'}, store, {})
	}

	handleOrderButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_order, {mode:'NEW'}, store, {})
	}

	handleWorkupButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_workup, {mode:'NEW'}, store, {})
	}

	handleSchoolButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_school, {mode:'NEW'}, store, {})
	}

	handleRetouchingAgreementButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_retouching_agreement, {mode:'NEW'}, store, {})
	}

	handlePrintingAgreementButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_printing_agreement, {mode:'NEW'}, store, {})
	}

	handleDownloadingAgreementButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_downloading_agreement, {mode:'NEW'}, store, {})
	}

	handleSittingsButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_sittings, {school_code:'~ALL'}, store, {})
	}

	handleOrdersButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_orders, {customer_code:'~ALL'}, store, {})
	}

	handleWorkupsButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_workups, {vendor_code:'~ALL'}, store, {})
	}

	handleSchoolsButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_schools, {school_code:'~ALL'}, store, {})
	}

	handleRetouchingAgreementsButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_retouching_agreements, {vendor_code:'~ALL'}, store, {})
	}

	handlePrintingAgreementsButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_printing_agreements, {vendor_code:'~ALL'}, store, {})
	}

	handleDownloadingAgreementsButtonClick = () => {
		const { store } = this.props
		store.router.goTo(app_routes.vendor_downloading_agreements, {vendor_code:'~ALL'}, store, {})
	}

	render() {
		const { store } = this.props
		if (!store.app.is_logged_in) { return false }
		return (
			<Page_ 								className='Homebase_Page_'>
				<Header_Bar 				tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Vendor Home </Page_Title_>
					<Button_Section_>
						<Button_Row_>
							<Button 				title='Folders List'
															onClick={this.handleFoldersButtonClick}
							/>
							<div> Placeholder</div>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='Sittings List'
															onClick={this.handleSittingsButtonClick}
							/>
							<Button 				title='Sitting'
															onClick={this.handleSittingButtonClick}
						/>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='Orders List'
															onClick={this.handleOrdersButtonClick}
							/>
							<Button 				title='Order'
															onClick={this.handleOrderButtonClick}
							/>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='Workup List'
															onClick={this.handleWorkupsButtonClick}
							/>
							<Button 				title='Workup'
															onClick={this.handleWorkupButtonClick}
							/>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='School List'
															onClick={this.handleSchoolsButtonClick}
							/>
							<Button 				title='School'
															onClick={this.handleSchoolButtonClick}
							/>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='Retouching Agreement List'
															onClick={this.handleRetouchingAgreementsButtonClick}
							/>
							<Button 				title='Retouching Agreement'
															onClick={this.handleRetouchingAgreementButtonClick}
							/>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='Printing Agreement List'
															onClick={this.handlePrintingAgreementsButtonClick}
							/>
							<Button 				title='Printing Agreement'
															onClick={this.handlePrintingAgreementButtonClick}
							/>
						</Button_Row_>
						<Button_Row_>
							<Button 				title='Downloading Agreement List'
															onClick={this.handleDownloadingAgreementsButtonClick}
							/>
							<Button 				title='Downloading Agreement'
															onClick={this.handleDownloadingAgreementButtonClick}
							/>
						</Button_Row_>
					</Button_Section_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================

export { Homebase_Page }
