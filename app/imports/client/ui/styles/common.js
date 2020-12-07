// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
//import { Link } 								from  'mobx-router'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Page_ = styled.div`
	width:      							100%;
	min-height:								100vh;
	background-color: 				${theme.colors.backgroundAlt};
	${flex.coln_start_center}
`
export const Work_Zone_ = styled.div`
	flex:     								1 1 auto;
	width:    								100%;
	height:   								100%;
	margin-top: 							${theme.headerHeight};
	margin-bottom: 						${theme.footerHeight};
	max-width: 								950px;
	${theme.breakpoints.isMobileLarge`
		margin-bottom: 					${theme.footerHeightMobileLarge};
	`}
	${flex.coln_start_center}
`
export const Page_Title_ = styled.h2`
	width:								100%;
	color:      							${theme.colors.foreground};
	font-family: 							${theme.typography.display};
	font-size:  							2em;
	font-weight:							700;
	overflow:   							hidden;
	padding:    							15px;
	text-align: 							center;
	text-transform: 					uppercase;
	${theme.breakpoints.isMobileMedium`
		font-size:  							1.5em;
		padding:    							8px;
	`}
`
// ====================================================================
