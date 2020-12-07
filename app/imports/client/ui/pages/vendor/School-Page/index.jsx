import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { School_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { School_Portlet }     		from  '/imports/client/ui/components/vendor/Schools/school-portlet/index.jsx'
import { School_Form }         	from  '/imports/client/ui/components/vendor/Schools/school-form/index.jsx'
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class School_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { mongo_id, mode='NEW' } = store.router.params
		const { user_record } = store.app

		this.schoolManager = new store.factories.schoolFactory(store, {
			source: {
				obj: this,
				name: 'School_Page',
				parms: {
					mode: mode,
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Form_Wrapper,
			Form_Content: School_Form
		})
	}

	componentWillUnmount() {
		this.schoolManager.run_disposers()
		this.schoolManager = null
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
			<Page_ 	className='School_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > School </Page_Title_>
					<School_Zone_ >
						<School_Portlet__ 
								schoolManager={this.schoolManager} 
						/>
					</School_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class School_Portlet__ extends React.Component {

	render() {
		const { schoolManager } = this.props
		const { mode, vendor_code } = schoolManager.source.parms
		
		if (mode==='NEW') {
			schoolManager._set_record({
				vendor_code_list: [vendor_code] // that's all we know for a new record
			})
			return (<School_Portlet ready={true} schoolManager={schoolManager} />)
		}	// -> -> -> -> //
	
		return (<School_Portlet__withData__ 	schoolManager={schoolManager} />)
	}
}
// ====================================================================
const School_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { schoolManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(schoolManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			schoolManager: schoolManager // always need to send this
		}	} // -> -> -> -> //
		schoolManager._set_record(details) // order_record
	
		// everything is ready
		return {
			ready:    		true,
			schoolManager: schoolManager
		}
	}), // e.g. next data provider
)(School_Portlet)
// ====================================================================

export { School_Page }
