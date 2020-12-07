// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Summary_Zone_ = styled.div`
`
// ====================================================================
export const ccccccccccc = styled.ul`
	position: 								fixed;
	background-color: 				${theme.colors.background};
	display: 									flex;
	left: 										0;
	height: 									100%;
	width: 										135px;
	padding-bottom: 					${theme.footerHeight};
	padding-top: 							${theme.headerHeight};
	top: 											0;
	z-index: 									2;
	font-size: 								10px;
  padding: 									3px;
	margin: 								3px 7px;
  flex:											1;
	&:hover {
		color:      						orange !important;
	}
	vertical-align: 					middle;
	${theme.breakpoints.isMobileMedium`
		width: 									160px;
	`}
	${flex.coln_center_start}
`
