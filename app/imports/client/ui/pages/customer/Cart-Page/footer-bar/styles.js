// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Footer_Bar_ = styled.div`
	position: 								fixed;
	width: 			   						100%;
	background-color: 				${theme.colors.accentAlt};
	color:      							${theme.colors.background};
	bottom: 									0;
	box-shadow: 							${theme.shadows.light};
	height: 									${theme.footerHeight};
	z-index: 									3;
	${theme.breakpoints.isMobileLarge`
		height: 								${theme.footerHeightMobileLarge};
	`}
	${flex.rown_sb_center}
`
export const Footer_Bar_Container_ = styled.div`
  display: 									flex;
  padding-left: 						15px;
  padding-right: 						15px;
  width: 										950px;
  margin: 									0 auto;
	${flex.rown_sb_center}
`
export const Arrow_ = styled.div`
	margin:										0 7px;
	flex:											0 0 20%;
	width: 			   						100%;
	height:			   						100%;
	cursor: 									pointer;
`
export const Arrow_Placeholder_ = styled.div`
	margin:										0 7px;
	flex:											0 0 20%;
	width: 			   						100%;
	height:			   						100%;
	cursor: 									pointer;
`
export const Footer_Button_ = styled.div`
	cursor: 									pointer;
  padding: 									7px;
	${flex.rown_sb_end}
`
export const Icon_Previous_ = styled.i`
	color:      							${theme.colors.background};
	font-size: 								1.5em;
	margin: 									auto;
	vertical-align: 					middle;
	${theme.breakpoints.isMobileLarge`
		padding-right: 					10px;
	`}
`
export const Icon_Next_ = styled.i`
	color:      							${theme.colors.background};
	font-size: 								1.5em;
	margin: 									auto;
	vertical-align: 					middle;
	${theme.breakpoints.isMobileLarge`
		padding-left: 					10px;
	`}
`
export const Footer_Menu_Item_ = styled.span`
	color:      							${theme.colors.background};
	display: 									none;
	margin: 									auto;
	${theme.breakpoints.isMobileLarge`
		display: 								block;
	`}
`
export const Middle_ = styled.div`
	flex:											1 1 0px;
	${flex.rown_sb_center}
`
export const State_ = styled.div`
	flex:											1;
	width: 			   						100%;
	height:			   						100%;
	margin: 									auto;
	${flex.coln_sa_center}
`
export const Icon_ = styled.i`
	color:      							${theme.colors.background};
	font-size: 								1.5em;
	margin: 									auto;
	vertical-align: 					middle;
`
// ====================================================================
