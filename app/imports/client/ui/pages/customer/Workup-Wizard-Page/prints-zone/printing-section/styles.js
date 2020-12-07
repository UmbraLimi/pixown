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
export const Printing_Section_ = styled.div`
	width: 										100%;
  flex:											1;
	${flex.coln_start_start}
`
export const Section_Column_Titles_ = styled.div`
	width: 										100%;
  flex:											1;
	${flex.rown_start_start}
`
export const Section_Rows_ = styled.div`
	width:										100%;
`
export const Item_Row_ = styled.div`
	width:										100%;
	flex:											1;
	padding: 									8px 6px 6px 0;
	/*border:										1px solid red;*/
	${flex.coln_start_start}
	&:hover {
		background-color:      	paleturquoise;
	}
`
export const IsWanted_Checkbox_ = styled.input`
	${flex.rown_sa_center}
`
export const IsWanted_ = styled.div`
	flex: 										2;
	/*border:										1px solid gainsboro;*/
	${flex.rown_center_center}
`
export const Item_Row_Summary_ = styled.div`
	width:										100%;
	color:										white;
	background-color:					darkgray;
	${flex.rown_start_center}
`
export const Size_ = styled.div`
	flex:											5;
	/*border:										1px solid gainsboro;*/
	padding:									2px;
`
export const Qty_ = styled.div`
	flex:											3;
	/*border:										1px solid gainsboro;*/
	padding:									2px;
	text-align:								center;
`
export const Finish_ = styled.div`
	flex:											5;
	border:										1px solid gainsboro;
	padding:									2px;
`
export const Colour_ = styled.div`
	flex:											6;
	/*border:										1px solid gainsboro;*/
	padding:									2px;
`
export const Cost_ = styled.div`
	flex:											8;
	padding:									2px;
	text-align:								right;
	/*border:										1px solid gainsboro;*/
`
export const Delete_ = styled.div`
	flex:											1;
	padding:									5px;
	/*border:										1px solid gainsboro;*/
	${flex.rown_center_center}
`
export const Item_Row_Selects_ = styled.div`
	width:										100%;
	${flex.rown_start_start}
`
export const Selects_ = styled.div`
	background-color: 				white;
	flex:											10;
	padding:									10px;
	${flex.coln_start_start}
`
export const Parameter_Options_ = styled.div`
	width:										100%;
	padding:									0 0 10px 0;
	${flex.rown_start_start}
`
export const Radio_Container_ = styled.div`
	&:hover {
		background-color:      	gray;
		color:									white;
		cursor:									pointer;
	}
`
export const Dropdown_Label_ = styled.div`
	flex:											1;
`
export const Option_Label_ = styled.div`
	flex:											1;
`
export const Options_ = styled.div`
	flex:											4;
	${flex.row_start_start}
`
export const Add_Print_Button_ = styled.div`
	${flex.rown_start_center}
`
export const Icon_ = styled.i`
	font-size:								14px;
	cursor:										pointer;
`
export const Button_ = styled.div`
	border-radius:						4px;
	background-color:					${theme.colors.accentAlt};
	color:										${theme.colors.background};
	border:										1px black solid;
	padding:									5px;
	margin-left:							5px;
	opacity:									1;
	animation:           			${p => p.isAnimating ? `${bulge} 0.2s linear 0s 1` : false};
	&:hover {
		background-color:      	${theme.colors.background};
		opacity:								0.8;
		color:									${theme.colors.accentAlt};
		cursor:									pointer;
	}
`
export const Button_Row_ = styled.div`
	height: 									100%;
	width: 										100%;
	padding:									5px;
  flex:											1;
	${flex.row_start_center}
`