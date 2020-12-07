// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
import { shake, bulge, pulsebright } 	from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Image_Label_ = styled.span`
	position:									fixed;
	left:											300px;
	top: 											300px;
	font-size: 								30px;
`
export const Free_If_ = styled.span`
	font-size: 								12px;
`
export const Free_Why_ = styled.span`
	font-size: 								12px;
	cursor:										pointer;
	text-decoration: 					underline;
`
export const Free_Label_ = styled.span`
	font-size: 								18px;
`
export const Free_Container_ = styled.div`
	color: 										${theme.colors.accentAlt};
	${flex.coln_sa_center}
`
export const Free_Container = styled.div`
	color: 										${theme.colors.accentAlt};
	${flex.coln_sa_center}
`
export const Cost_Container_ = styled.div`
	padding: 									10px;
	flex:											1;
	height: 									100%;
	width:										100%;
	${flex.coln_sa_center}
`
export const Cost_ = styled.span`
	color: 										${theme.colors.accentAlt};
	white-space: 							nowrap;
`
export const Button_ = styled.div`
	height: 									50px;
	width:										100%;
	background-color:					${p => p.is_selected ? theme.colors.accentAlt : theme.colors.background};
	color:										${p => p.is_selected ? theme.colors.background : theme.colors.foreground};
	animation:           			${p => p.isAnimating ? `${bulge} 0.2s linear 0s 1` : false};
	border-style:							none;
	border-color:							${p => p.is_selected ? theme.colors.background : theme.colors.accentAlt};
	${flex.coln_center_center}
	&:hover {
		opacity:								${p => p.is_selected ? 0.8 : 1.0};
		border-style:						solid;		
	}
`
export const YesNo_Block_ = styled.div`
	margin: 									1em;
	width:										100%;
	${flex.rown_sb_center}
`
export const Retouching_Zone_ = styled.div`
	background-color: 				rgba(255,255,255,0.8);
	position:									absolute;
	padding: 									1em;
	width:										100%;
	flex:											1 1 auto;
	height:										100%;
	${flex.coln_sb_center}
`
// ====================================================================
