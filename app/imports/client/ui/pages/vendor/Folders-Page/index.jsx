import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { observable, action, toJS }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 				from  '/imports/client/ui/styles/common.js'
import { Zone_ } 								from  './styles.js'
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Header_Bar }           from  '/imports/client/ui/components/vendor/header-bar/connect.js'
import { Folders_Listing }     	from  '/imports/client/ui/components/vendor/Folders/folders-listing/index.jsx'
import { Folders_Portlet } 			from  '/imports/client/ui/components/vendor/Folders/folders-portlet/index.jsx'

// ====================================================================
@inject('store')
@observer
class Folders_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		//const { folder_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.folderListManager = new store.factories.folderListFactory(store, {
			source: {
				obj: this,
				name: 'Folders_Page',
				parms: {
					vendor_code: user_record.vendor_code
				}
			},
			spec: {
				name: 'FOLDERS.one-vendor-code',
				args: { vendor_code: vendor_code },
				options: {
					sort: {
						sequence: 1
					}
				}
			},
			content: Folders_Listing
		})
	}

	componentWillUnmount() {
		this.folderListManager.run_disposers()
		this.folderListManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //

		return (
			<Page_ 	className='Folders_Page'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Folders </Page_Title_>
					<Zone_ >
						<Folders_Portlet__withData__
								folderListManager={this.folderListManager}
						/>
					</Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Folders_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => { 
		const { folderListManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(folderListManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			folderListManager: folderListManager // always need to send this
		}	} // -> -> -> -> //
		folderListManager.populate_folderManagerList(details)

		// everything is ready
		return {
			ready:   true,
			folderListManager: folderListManager // this is an updated folderListManager
		}
	}),  // e.g. next data provider
)(Folders_Portlet)
// ====================================================================

export { Folders_Page }
