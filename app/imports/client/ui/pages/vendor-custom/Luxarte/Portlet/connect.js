import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'
import { createContainer }      from 'meteor/react-meteor-data'
// ----helpers----------------------
import { user_actions, vendor_actions }
																from '/imports/store/action-creators/index.js'
// ----collections------------------
import { Images }             from '/imports/px-common/collections/Images/collection.js'
import { Vendors }              from '/imports/px-common/collections/Vendors/collection.js'
// ----components-------------------
import { Files_Portlet as Page } from './files-portlet.jsx'
// ----devtools---------------------
//import { dev_connect_error }    from '/imports/api/misc/dev-utilities.js'

// ====================================================================
function mapStateToProps(store) { // needs to be there so store changes turn into props
	return {
		user:   store.user,
		vendor_store: store.vendor_store
	}
}
// ====================================================================
function mapDispatchToProps(dispatch) { // needs to be here to dispatch to these action creatore from the component
	const actions = {
		...user_actions,
		...vendor_actions,
	}
	return bindActionCreators(actions, dispatch)
}
// ====================================================================
const Meteor_Container = createContainer(props => {
	// do reactive data access here

	const upload_id = '111111111111'

	// do reactive data access here
	let vendor = null
	let images = []

	if (!props.user || props.user.user_record === undefined) {
		return { ready: false }
	}

	// the entire PUser record is already in props.user.user_record via login
	const vendor_code = props.user.user_record.vendor_code

	const subs_vendors = Meteor.subscribe(
		'VENDORS.one-vendor-code',
		vendor_code
	)

	if (subs_vendors.ready()) {
		vendor = Vendors.findOne({vendor_code: vendor_code})
	}

	const subs = Meteor.subscribe(
		'IMAGES.one-upload-id',
		upload_id
	)
	
	if (subs.ready()) {
		images = Images.find(
			{
				upload_id: upload_id
			},
			{
				sort: {
					school_code: 1,
					sitting_code: 1,
					pose_code: 1
				}
			}
		).fetch()
	}

	const ready = subs && subs.ready() && subs_vendors && subs_vendors.ready()
	//console.log("----------------- ready", ready)

	return {
		ready:    ready,
		vendor:   vendor,
		images:  	images
	}
}, Page)
// ====================================================================
const Files_Portlet = connect(mapStateToProps, mapDispatchToProps)(Meteor_Container)
// ====================================================================

export { Files_Portlet }
