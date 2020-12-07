import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Retouching_Agreement_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Retouching_Agreement_Portlet }  from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreement-portlet/index.jsx'
import { Retouching_Agreement_Form }     from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreement-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Retouching_Agreement_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { mongo_id, mode='NEW' } = store.router.params
		const { user_record } = store.app

		this.raManager = new store.factories.retouchingAgreementFactory(store, {
			source: {
				obj: this,
				name: 'Retouching_Agreement_Page',
				parms: {
					mode: mode,
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Form_Wrapper,
			Form_Content: Retouching_Agreement_Form
		})
	}

	componentWillUnmount() {
		this.raManager.run_disposers()
		this.raManager = null
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
			<Page_ 	className='Retouching_Agreement_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Retouching Agreement </Page_Title_>
					<Retouching_Agreement_Zone_ >
						<Retouching_Agreement_Portlet__ 
								raManager={this.raManager} 
						/>
					</Retouching_Agreement_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Retouching_Agreement_Portlet__ extends React.Component {

	render() {
		const { raManager } = this.props
		const { mode, vendor_code } = raManager.source.parms
		
		if (mode==='NEW') {
			raManager._set_record({
				vendor_code: vendor_code // that's all we know for a new record
			})
			return (<Retouching_Agreement_Portlet ready={true} raManager={raManager} />)
		}	// -> -> -> -> //
	
		return (<Retouching_Agreement_Portlet__withData__ 	raManager={raManager} />)
	}
}
// ====================================================================
const Retouching_Agreement_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { raManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(raManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			raManager: raManager // always need to send this
		}	} // -> -> -> -> //
		raManager._set_record(details) // order_record
	
		// everything is ready
		return {
			ready:    		true,
			raManager: raManager
		}
	}), // e.g. next data provider
)(Retouching_Agreement_Portlet)
// ====================================================================

export { Retouching_Agreement_Page }
