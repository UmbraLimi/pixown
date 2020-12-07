import { Meteor } 							from  'meteor/meteor'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
//import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Page_, Work_Zone_ } 		from  '/imports/client/ui/styles/common.js'
import { Pose_, Overlay_ }			from  './styles.js'
// ----enums------------------------
import { Workup_Groups } 				from  '/imports/enums/workup-groups.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/customer/header-bar/connect.js'
import { Loading } 							from  '/imports/client/ui/components/loading.jsx'
import { Footer_Bar }           from  './footer-bar/index.jsx'
import { Progress_Bar } 				from  './progress-bar/index.jsx'
import { Retouching_Zone } 			from  './retouching-zone/index.jsx'
import { Summary_Zone } 				from 	'./summary-zone/index.jsx'
import { Cropping_Zone } 				from  './cropping-zone/index.jsx'
import { Download_Zone } 				from  './download-zone/index.jsx'
import { Prints_Zone } 					from  './prints-zone/index.jsx'
import { Add_To_Cart_Zone } 		from  './add-to-cart-zone/index.jsx'

// ====================================================================
@inject('store')
@observer
class Workup_Wizard_Page extends React.Component {

	render() {
		const { ready, problem, message } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
		// -> -> -> -> //
		const { store, connect } = this.props
		const { workupWizardStore } = store
		/*const handlers = {
			prints: value => <Prints_Zone />,
			summary: value => <Summary_Zone />
		}*/

		if (!store.app.is_logged_in) { return false }
		return (
			<Page_  							className={ 'Workup_Wizard_Page_' }>
        <Header_Bar  				tempStore={ store } />
        <Work_Zone_ 				style={{ position: 'relative' }}>
					{ !workupWizardStore.eyeMode_is_active ? 
						<Overlay_ 			className={'Overlay_'} /> : null }
					{ workupWizardStore.progressBar_is_visible && !workupWizardStore.eyeMode_is_active ? 
						<Progress_Bar /> : null }
					{ workupWizardStore._activePage.group === Workup_Groups.RETOUCH.name ?
						<Retouching_Zone /> : null }
					{ workupWizardStore.pageKey === 'prints' ? <Prints_Zone /> : null }
					{ workupWizardStore.pageKey === 'summary' ? <Summary_Zone /> : null }
					{ workupWizardStore.pageKey === 'cropping' ? <Cropping_Zone /> : null }
					{ workupWizardStore.pageKey === 'download' ? <Download_Zone /> : null }
					{ workupWizardStore.pageKey === 'add-to-cart' ? <Add_To_Cart_Zone /> : null }

					<Pose_						style={{ backgroundImage: `url('${workupWizardStore._closestImageURL_for_pose}')` }}/>
				</Work_Zone_>
				<Footer_Bar />
      </Page_>
		)
	}
}
// ====================================================================

export { Workup_Wizard_Page }
