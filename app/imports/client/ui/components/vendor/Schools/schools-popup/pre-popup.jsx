import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
// ----helpers----------------------
import { do_subscription2 }			from  '/imports/client/db/collection-helpers.js'
// ----collections------------------
// ----components-------------------
import { Schools_Listing }     	from  '/imports/client/ui/components/vendor/Schools/schools-listing/index.jsx'
import { Schools_Popup } 				from  './index.jsx'

// ====================================================================
@inject('store')
@observer
class Pre_Popup extends React.Component {
	constructor(props) {
		super(props)
		const { store } = props
		const { school_code='~ALL' } = store.router.params
		const { user_record } = store.app
		const vendor_code = user_record.vendor_code

		this.schoolListManager = new store.factories.schoolListFactory(store, {
			source: {
				obj: this,
				name: 'Pre_Popup',
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
			<Schools_Popup__withData__ 
					{...this.props}
					schoolListManager={this.schoolListManager}
			/>
		)
	}
}
// ====================================================================
const Schools_Popup__withData__ = _.compose(
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
			...props,
			ready: true,
			schoolListManager: schoolListManager // changed from version in props
		}
	}),  // e.g. next data provider
)(Schools_Popup)
// ====================================================================

export { Pre_Popup }
