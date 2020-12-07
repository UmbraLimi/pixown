// ----node-packages----------------
import React                    from  'react'
import styled, { keyframes }    from  'styled-components'
import { inject, observer } 		from  'mobx-react'
//import { Link } 								from  'mobx-router'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
import { flex }                 from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Not_Found_Page extends React.Component {

	render() {
		const _Not_Found_Page = styled.div`
			width:      	100%;
			min-height:		100vh;
			background-color: 		lightsteelblue;
			${flex.coln_start_center}
		`
		const _Header_Bar = styled.div`
			width:        100%;
			height:				7vh;
			padding:			3px;
			background-color: 		aliceblue;
			${flex.rown_sb_center}
		`
		const _Page_Title = styled.div`
			width:        100%;
			height:				7vh;
			padding:			3px;
			text-align:   center;
			font-size:    3.0vh;
			background-color: 		red
		`
		const _Work_Zone = styled.div`
			flex:					1 1 auto;
			width:        100%;
			height:				100%;
			padding:			3px;
			${flex.coln_sb_center}
		`
		const _Logo = styled.div`
			background-image:     url('/images/PiXOWN-X.jpg');
			background-size:      contain;
			background-repeat:    no-repeat;
			background-position:  left;
			cursor:       pointer;
		`

		const _Logo_onClick = () => {}

		const { store } = this.props
		const bad_route = store.app.bad_route
		return (
			<_Not_Found_Page>
				<_Header_Bar>
					<_Logo 
						/*view={app_routes.image_gallery} store={this.props.store}*/
						onClick={ _Logo_onClick } 
					/>
				</_Header_Bar >
				<_Page_Title> Oops! Page not found</_Page_Title>
				<_Work_Zone>
					<p>
						<strong>
							Error [404]
						</strong>
						: { bad_route ? bad_route : "???" } does not exist.
					</p>
				</_Work_Zone>
			</_Not_Found_Page>
		)
	}
}
// ====================================================================

export { Not_Found_Page }
