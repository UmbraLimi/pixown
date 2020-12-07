// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
//import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export 	const Mailing_Address_Section_ = styled.div`
	width:										100%;
	padding:									10px;
	background-color:					#dee3e7;
	${flex.coln_start_center}
`
export const Mailing_Address_Title_ = styled.div`
	flex: 										0 0 7vh;
	width: 										100%;
	height: 									100%;
	font-size:								2.4vh;
	padding:									4px;
	background-color:					blue;
	color:										white;
	${flex.rown_sa_center}
`
export const Section_Separator_ = styled.div`
	flex:									0 1 auto;
	width:								100%;
	padding:         			5px 0 10px 0;
	color:           			#000080;
	border-color:					black;
	border-width:					1px;
	border-style:					solid none none none;
	font-weight:     			bold;
`
// ====================================================================
