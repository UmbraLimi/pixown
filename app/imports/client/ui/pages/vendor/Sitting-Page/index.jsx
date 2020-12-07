import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Sitting_Portlet }     	from  '/imports/client/ui/components/vendor/Sittings/sitting-portlet/index.jsx'
import { Sitting_Form }         from  '/imports/client/ui/components/vendor/Sittings/sitting-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Sitting_Page extends React.Component {
	constructor(props) {
		super(props)
    const { store } = props
		const { mongo_id, mode='NEW' } = store.router.params
		const { user_record } = store.app

		this.sittingManager = new store.factories.sittingFactory(store, {
			source: {
				obj: this,
				name: 'Order_Page',
				parms: {
					mode: mode,
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Form_Wrapper,
			Form_Content: Sitting_Form
		})
	}
	
	componentWillUnmount() {
		this.sittingManager.run_disposers()
		this.sittingManager = null
	}

	render() {
		const { store } = this.props
		if (!store.app.is_logged_in) { return false }
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
			<Page_ 	className='Sitting_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Sitting </Page_Title_>
					<Sitting_Portlet__
						sittingManager={this.sittingManager} 
					/>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Sitting_Portlet__ extends React.Component {

	render() {
		const { sittingManager } = this.props
		const { mode, vendor_code } = sittingManager.source.parms
		
		if (mode==='NEW') {
			sittingManager._set_record({
				studio_code: vendor_code // that's all we know for a new record
			})
			return (<Sitting_Portlet ready={true} sittingManager={sittingManager} />)
		}	// -> -> -> -> //
	
		return (<Sitting_Portlet__withData__ 	sittingManager={sittingManager} />)
	}
}
// ====================================================================
const Sitting_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { sittingManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(sittingManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			sittingManager: sittingManager // always need to send this
		}	} // -> -> -> -> //
		sittingManager._set_record(details) // order_record
	
		// everything is ready
		return {
			ready:    		true,
			sittingManager: sittingManager
		}
	}), // e.g. next data provider
)(Sitting_Portlet)
// ====================================================================

export { Sitting_Page }
