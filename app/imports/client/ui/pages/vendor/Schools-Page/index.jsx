import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Schools_Zone_ } 				from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Schools_Listing }     	from  '/imports/client/ui/components/vendor/Schools/schools-listing/index.jsx'
import { Schools_Portlet } 			from  '/imports/client/ui/components/vendor/Schools/schools-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Schools_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { school_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.schoolListManager = new store.factories.schoolListFactory(store, {
			source: {
				obj: this,
				name: 'Schools_Page',
				parms: {
					school_code: school_code,
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: school_code === '~ALL'
					? 'SCHOOLS.one-vendor-code'
					: 'SCHOOLS.one-vendor-code__one-school-code',
				args: school_code === '~ALL'
					? { vendor_code_list: vendor_code }
					: { 
						vendor_code_list: vendor_code,
							school_code: school_code
						},
				options: {
					sort: {
						school_code: 1
					}
				}
			},
			content: Schools_Listing
		})
	}

	componentWillUnmount() {
		this.schoolListManager.run_disposers()
		this.schoolListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<Page_ 	className='Schools_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Schools </Page_Title_>
					<Schools_Zone_ >
						<Schools_Portlet__withData__
								schoolListManager={this.schoolListManager}
						/>
					</Schools_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Schools_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { schoolListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)
		const [ready, details] = do_subscription2(schoolListManager.spec, subs_cache)

		if ( !ready ) {return {
			ready: false,
			message: details,
			schoolListManager: schoolListManager // always need to send this
		}	} // -> -> -> -> //
		schoolListManager.populate_schoolManagerList(details)
	
		// everything is ready
		return {
			ready:    		true,
			schoolListManager: schoolListManager
		}
	}),  // e.g. next data provider
)(Schools_Portlet)
// ====================================================================

export { Schools_Page }
