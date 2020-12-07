// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const VSpacer_ = styled.div`
	padding-top:							20px;
	width:										100%;
`
export const Question_Container_ = styled.div`
	margin: 									1em;
	${flex.coln_start_center}
`
export const Question_ = styled.p`
	text-align: 							left;
	margin-bottom:						10px;
	font-size:								20px;
`
export const Explain_ = styled.ul`
	display: 									flex;
	height: 									100%;
	width:										100%;
	${flex.coln_center_start}
`
export const Explain_Item_ = styled.li`
	font-size: 								10px;
	padding: 									3px;
	width:										100%;
	list-style-type:					none;
`
export const Icon_Container_ = styled.div`
	flex:											1;
	height:										100%;
	width:										100%;
	font-size: 								1.5em;
	vertical-align: 					top;
	&:hover {
		color:      						orange !important;
	}
	${flex.rown_start_center}
`
export const Icon_ = styled.i`
	font-size: 								20px;
`
export const Explanation_ = styled.p`
	padding:									10px;
	font-size:								15px;
`
export const Image_for_Retouch_ = styled.img`
	width:										50%;
	height: 									100%;
`
export const Image_ = styled.img`
	width:										25%;
	height: 									100%;
`
export const Title_ = styled.ul`
	width:										50%%;
	flex:											1;
	font-family: 							${theme.typography.display};
	text-transform: 					uppercase;
	${flex.coln_sb_start}
`
export const Outer_ = styled.div`
	width:										100%;
	max-width:								400px;
	${flex.coln_sb_center}
`
export const Title_Block_ = styled.div`
	width:										100%;
	max-width:								400px;
	${flex.rown_sa_center}
`
// ====================================================================
