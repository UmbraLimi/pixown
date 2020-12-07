// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Message_ = styled.span`
	color: 										${theme.colors.accentAlt};
`
export const Message_Container_ = styled.div`
	width:										100%;
	flex:											1;
	height:										100%;
	${flex.coln_sa_center}
`
export const Add_To_Cart_Zone_ = styled.div`
	background-color: 				rgba(255,255,255,0.8);
	position:									absolute;
	padding: 									1em;
	width:										100%;
	flex:											1 1 auto;
	height:										100%;
	${flex.coln_sb_center}
`
export const YesNo_Block_ = styled.div`
	margin: 									1em;
	width:										100%;
	${flex.rown_sb_center}
`
