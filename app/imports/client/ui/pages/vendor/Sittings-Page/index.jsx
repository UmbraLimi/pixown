import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Sittings_Zone_ } 			from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Sittings_Portlet }     from  '/imports/client/ui/components/vendor/Sittings/sittings-portlet/index.jsx'
import { Sittings_Listing }     from  '/imports/client/ui/components/vendor/Sittings/sittings-listing/index.jsx'

// ====================================================================
@inject('store')
@observer
class Sittings_Page extends React.Component {
	constructor(props) {
		super(props)
    const { store } = props
		const { school_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.sittingListManager = new store.factories.sittingListFactory(store, {
			source: {
				obj: this,
				name: 'Sittings_Page',
				parms: {
					school_code: school_code,
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: school_code === '~ALL'
					? 'SITTINGS.composite.one-studio-code'
					: 'SITTINGS.composite.one-studio-code__one-school-code',
				args: school_code === '~ALL'
					? { studio_code: vendor_code }
					: { 
							studio_code: vendor_code,
							customer_code: school_code
						},
				options: {
					sort: {
						school_code: 1,
						sitting_code: 1
					}
				}
			},
			content: Sittings_Listing
		})
	}

	componentWillUnmount() {
		this.sittingListManager.run_disposers()
		this.sittingListManager = null
	}

	render() {
		const { store } = this.props
		if (!store.app.is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<Page_ 	className='Sittings_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Sittings </Page_Title_>
					<Sittings_Zone_ >
						<Sittings_Portlet__withData__
								sittingListManager={this.sittingListManager} 
						/>
					</Sittings_Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Sittings_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { sittingListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(sittingListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			sittingListManager: sittingListManager // always need to send this
		}	} // -> -> -> -> //
		sittingListManager.populate_sittingManagerList(details)
	
		// everything is ready
		return {
			ready:    		true,
			sittingListManager: sittingListManager
		}
	}),  // e.g. next data provider
)(Sittings_Portlet)
// ====================================================================

export { Sittings_Page }
