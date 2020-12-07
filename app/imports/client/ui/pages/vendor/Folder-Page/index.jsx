import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
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
import { Folder_Portlet }     	from  '/imports/client/ui/components/vendor/Folders/folder-portlet/index.jsx'
import { Folder_Listing }     	from  '/imports/client/ui/components/vendor/Folders/folder-listing/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Folder_Page extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { mongo_id } = store.router.params
		const { user_record } = store.app

		this.folderManager = new store.factories.folderFactory(store, {
			source: {
				obj: this,
				name: 'Folder_Page',
				parms: {
					mongo_id: mongo_id,
					vendor_code: user_record.vendor_code
				}
			},
			content: Folder_Listing
		})
	}

	componentWillUnmount() {
		this.folderManager.run_disposers()
		this.folderManager = null
	}

	render() {
		const { store } = this.props
		const { is_logged_in, user_record } = store.app
		if (!is_logged_in) { return false }
		// -> -> -> -> //
		const { mongo_id } = store.router.params
		if (!mongo_id) { return (
			<Loading  problem={'Missing mongo_id'}/>
		)}
		// -> -> -> -> //

		return (
			<Page_ 	className='Folder_Page_'>
				<Header_Bar  tempStore={store}/>
				<Work_Zone_ >
					<Page_Title_ > Folder </Page_Title_>
					<Zone_>
						<Folder_Portlet__withData__
 							folderManager={this.folderManager} 
						/>
					</Zone_>
				</Work_Zone_>
			</Page_>
		)
	}
}
// ====================================================================
const Folder_Portlet__withData__ = _.compose(
	// will add data and manager props to existing props
	withTracker((props) => {  
		const { folderManager } = props
		const subs_cache = {} // holds completed results of subscription (i.e. ready() is true)

		const [ready, details] = do_subscription2(folderManager.spec, subs_cache)
		if ( !ready ) {return {
			ready: false,
			message: details,
			folderManager: folderManager // always need to send this
		}	} // -> -> -> -> //
		folderManager._set_record(details) // order_record
	
		// everything is ready
		return {
			ready:    		true,
			folderManager: folderManager
		}
	}), // e.g. next data provider
)(Folder_Portlet)
// ====================================================================

export { Folder_Page }
