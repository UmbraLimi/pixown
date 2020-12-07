import { Meteor } 							from  'meteor/meteor'
// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Page_, Work_Zone_, Page_Title_ 
} 															from  '/imports/client/ui/styles/common.js'
import { Gallery_Zone_, Sittings_List_
} 															from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Sitting_Panel }        from  './sitting-panel/connect.js'
import { Header_Bar }           from  '/imports/client/ui/components/customer/header-bar/connect.js'
import { Loading } 							from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Image_Gallery_Page extends React.Component {

	render() {
		const { ready, problem, message } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
		// -> -> -> -> //
		const { store, connect } = this.props
		const num_sittings = connect.sittings.length

		if (!store.app.is_logged_in) { return false }
		return (
			<Page_  							className={ 'Image_Gallery_Page_' }>
        <Header_Bar  				tempStore={ store } />
        <Work_Zone_>
					<Page_Title_> Image Gallery </Page_Title_>
					<Gallery_Zone_>
						<Sittings_List_ className={ 'Sittings_List_' }>
							{ num_sittings === 0 ? <p>no sittings available</p> : (
								__.map(connect.sittings, (sitting, num) => {
									return (
										<Sitting_Panel
														tempStore={ store } 
														sitting={ sitting } 
														key={ sitting._id }
										/>
									)
								})
							)}
						</Sittings_List_>
					</Gallery_Zone_>
				</Work_Zone_>
      </Page_>
		)
	}
}
// ====================================================================
export { Image_Gallery_Page }
