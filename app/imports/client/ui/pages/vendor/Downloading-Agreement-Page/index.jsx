import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Downloading_Agreement_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Downloading_Agreement_Portlet }  from  '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreement-portlet/index.jsx'
import { Downloading_Agreement_Form }     from  '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreement-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Agreement_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { mongo_id, mode='NEW' } = store.router.params
		const { user_record } = store.app

		this.daManager = new store.factories.downloadingAgreementFactory(store, {
			source: {
				obj: this,
				name: 'Downloading_Agreement_Page',
				parms: {
					mode: mode,
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Form_Wrapper,
			Form_Content: Downloading_Agreement_Form
		})
	}

	componentWillUnmount() {
		this.daManager.run_disposers()
		this.daManager = null
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
			<Page_ 	className='Downloading_Agreement_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Downloading Agreement </Page_Title_>
					<Downloading_Agreement_Zone_ >
						<Downloading_Agreement_Portlet__ 
								daManager={this.daManager} 
						/>
					</Downloading_Agreement_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Downloading_Agreement_Portlet__ extends React.Component {

	render() {
		const { daManager } = this.props
		const { mode, vendor_code } = daManager.source.parms
		
		if (mode==='NEW') {
			daManager._set_record({
				vendor_code: vendor_code // that's all we know for a new record
			})
			return (<Downloading_Agreement_Portlet ready={true} daManager={daManager} />)
		}	// -> -> -> -> //
	
		return (<Downloading_Agreement_Portlet__withData__ 	daManager={daManager} />)
	}
}
// ====================================================================
const Downloading_Agreement_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { daManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(daManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			daManager: daManager // always need to send this
		}	} // -> -> -> -> //
		console.info(details)
		daManager._set_record(details) // order_record
	
		// everything is ready
		return {
			ready:    		true,
			daManager: daManager
		}
	}), // e.g. next data provider
)(Downloading_Agreement_Portlet)
// ====================================================================

export { Downloading_Agreement_Page }
