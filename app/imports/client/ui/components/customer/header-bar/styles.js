// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
import { Link } 								from  'mobx-router'
// ----styles-----------------------
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
import { theme } 								from  '/imports/client/ui/styles/theme.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Header_Bar_ = styled.div`
	position: 								fixed;
	height: 									${theme.headerHeight};
	width: 										100%;
	background-color: 				${theme.colors.headerbar_background};
	box-shadow: 							${theme.shadows.light};
	z-index:									3;
	${flex.rown_center_center}
`
export const Inner_ = styled.div`
	width: 										950px;
	padding-left: 						15px;
	padding-right: 						15px;
	${theme.breakpoints.isDesktopSmall`
		margin: 								0 auto;
	`}
	${flex.rown_sb_center}
`
export const Link_ = styled(Link) `
	cursor: 									pointer;
	width:										auto;
	height: 									100%;
	${flex.rown_center_center}
`
export const Logo_ = styled.img`
	height: 									auto;
	width: 										100px;
	${theme.breakpoints.isTablet`
		height:									25px;
		width: 									auto;
	`}
`
export const Expander_ = styled.div`
	flex:											1 1 auto;
`
// ====================================================================
export const Menu_Item_ = styled.li`
	color: 										${theme.colors.foreground};
	display: 									inline-block;
	padding: 									15px;
	font-size:								12px;
	${theme.breakpoints.isDesktopSmall`
		font-size: 							14px;
	`}
`
// ====================================================================
export const Login_Link_ = styled(Link) `
	cursor: 									pointer;
	&:hover {
		background-color: 			${theme.colors.background};
		color:      						${theme.colors.accentAlt};
	}
	${flex.row_center_center}
`
// ====================================================================
export const Icon_ = styled.i`
	font-size:  							1.5em;
	vertical-align: 					middle;
`
export const Span_ = styled.span`
	margin:     							0 7px;
`
export const Submenu_ = styled.ul`
	display:									${p => p.isOpen ? 'block' : 'none' };
	position: 								absolute;
	background-color: 				${theme.colors.background};
	top:											20px;
	${theme.breakpoints.isDesktopSmall`
		font-size: 							10px;
	`}
	box-shadow: 							0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 5px 0 rgba(0,0,0,0.06);
	width: 										100%;
`
export const Submenu_Item_ = styled.li`
	color: 										${theme.colors.foreground};
	padding: 									15px;
	&:hover {
		background-color: 			${theme.colors.accentAlt};
		color: 									${theme.colors.background};
	}
`
export const Toggle_ = styled.a`
	text-align: 							center;
	cursor: 									pointer;
	&:hover {
		background-color: 			${theme.colors.background};
		color:    							${theme.colors.accentAlt};
	}
`
export const Submenu_Link_ = styled.div`
	cursor: 									pointer;
	color:    								${theme.colors.accentAlt};
`
// ====================================================================
export const Outer_ = styled.div`
	position: 								relative;
`
export const Cart_Link_ = styled(Link) `
	cursor: 									pointer;
	&:hover {
		background-color: 			${theme.colors.background};
		color:      						${theme.colors.accentAlt};
	}
`
export const Badge_Container_ = styled.div`
	position: 								absolute;
	top: 											-26px;
	left: 										10px;
	${theme.breakpoints.isDesktopSmall`
		top: 										-30px;
		left: 									12px;
	`}
`
export const Badge_ = styled.span`
	color: 										white;
	background-color: 				#f44336;
	border-radius: 						50%;
	display: 									inline-block;
	font-size: 								10px;
	padding: 									2px 5px;
	text-align: 							center;
`
export const Cart_Icon_ = styled.i`
	font-size:  							1.5em;
	vertical-align: 					middle;
`
