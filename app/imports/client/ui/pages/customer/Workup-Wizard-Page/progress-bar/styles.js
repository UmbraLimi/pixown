// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Progress_Bar_Container_ = styled.div`
`
export const Progress_Bar_ = styled.ul`
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
	${theme.breakpoints.isMobileMedium`
		width: 									160px;
	`}
	${theme.breakpoints.isMobileLarge`
		width: 									235px;
	`}
	${flex.coln_center_start}
`
export const Progress_Bar_Item_ = styled.li`
	font-size: 								10px;
  padding: 									3px;
	width:										100%;
	${theme.breakpoints.isMobileMedium`
		font-size:							12px;
	`}
	${theme.breakpoints.isMobileLarge`
		font-size:							18px;
		margin: 								3px 7px;
	`}
`
export const Icon_Container_ = styled.div`
  flex:											1;
	height:										100%;
	width:										100%;
	font-size: 								1.5em;
	vertical-align: 					middle;
	&:hover {
		color:      						orange !important;
	}
	${flex.rown_start_center}
`
export const Icon_ = styled.i`
`
export const Label_ = styled.span`
  margin-left: 							7px;
`
// ====================================================================
