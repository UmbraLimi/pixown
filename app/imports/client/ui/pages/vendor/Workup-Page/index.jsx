import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Workup_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Workup_Portlet }     	from  '/imports/client/ui/components/vendor/Workups/workup-portlet/index.jsx'
import { Workup_Form }         	from  '/imports/client/ui/components/vendor/Workups/workup-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Workup_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { mongo_id, mode='NEW' } = store.router.params
		const { user_record } = store.app

		this.workupManager = new store.factories.workupFactory(store, {
			source: {
				obj: this,
				name: 'Workup_Page',
				parms: {
					mode: mode,
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Form_Wrapper,
			Form_Content: Workup_Form
		})
	}

	componentWillUnmount() {
		this.workupManager.run_disposers()
		this.workupManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //
		const { mongo_id, mode='NEW' } = store.router.params
		if (mode==='EXISTING' && !mongo_id) { return (
			<Loading  problem={` Missing mongo_id for mode: ${mode}`}/>
		)}
		// -> -> -> -> //
		if (mode==='NEW' && mongo_id) { return (
			<Loading  problem={` mongo_id ${mongo_id} was specified for mode: ${mode}`}/>
		)}
		// -> -> -> -> //

		return (
			<Page_ 	className='Workup_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Workup </Page_Title_>
					<Workup_Zone_ >
						<Workup_Portlet__ 
								workupManager={this.workupManager} 
						/>
					</Workup_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Workup_Portlet__ extends React.Component {

	render() {
		const { workupManager } = this.props
		const { mode, vendor_code } = workupManager.source.parms
		
		if (mode==='NEW') {
			workupManager._set_record({
				studio_codes: [vendor_code] // that's all we know for a new record
			})
			return (<Workup_Portlet ready={true} workupManager={workupManager} />)
		}	// -> -> -> -> //
	
		return (<Workup_Portlet__withData__ 	workupManager={workupManager} />)
	}
}
// ====================================================================
const Workup_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { workupManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(workupManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			workupManager: workupManager // always need to send this
		}	} // -> -> -> -> //
		workupManager._set_record(details) // workup_record
	
		// everything is ready
		return {
			ready:    		true,
			workupManager: workupManager
		}
	}), // e.g. next data provider
)(Workup_Portlet)
// ====================================================================

export { Workup_Page }
