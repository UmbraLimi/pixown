// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export 	const Single_Underline_ = styled.div`
	flex: 										1;
	height:										1px;
	border:										1px solid #a1a1a7;
	${flex.coln_start_stretch}
`
export 	const Left_ = styled.div`
	flex: 										1;
	min-width:10px;
	${flex.coln_start_stretch}
`
export 	const Right_ = styled.div`
	flex: 										3;
	${flex.coln_start_stretch}
`
export 	const Checkbox_ = styled.i`
	flex:											1;
	font-size:								14px;
	cursor:										pointer;
	color: 										black;
`
export 	const Totals_Section_ = styled.div`
	width:										100%;
	font-size:								3.0vh;
	padding:									10px;
	background-color:					#a9c6df;
	${flex.rown_start_stretch}
`
export 	const Section_Sub_Total_ = styled.div`
	width:										100%;
	font-size:								1.5vh;
	border-top:								1px solid #a1a1a7;

	padding:									2px 5px;
	background-color:					#a9c6df;
	${flex.rown_start_center}
`
export 	const Section_Insurance_ = styled.div`
	width:										100%;
	font-size:								1.9vh;
	padding:									2px 5px;
	background-color:					#a9c6df;
	${flex.rown_start_center}
`
export 	const Section_Item_ = styled.div`
	width:										100%;
	font-size:								1.7vh;
	padding:									2px 5px;
	background-color:					#a9c6df;
	${flex.rown_start_center}
`
export 	const Section_Sub_Item_ = styled.div`
	width:										100%;
	font-size:								1.6vh;
	padding:									2px 5px;
	background-color:					#a9c6df;
	${flex.rown_start_center}
`
export 	const Section_Header_ = styled.div`
	width:										100%;
	font-size:								1.9vh;
	padding:									2px 5px;
	font-weight:							bold;
	background-color:					#a9c6df;
	${flex.rown_start_end}
`
export 	const Section_Label_ = styled.div`
	flex:											16;
	font-size:								1.9vh;
	font-weight:							bold;
	padding:									3px;
	color:										black;
`
export 	const Sub_Item_Postdent_ = styled.div`
	flex:											3;
`
export 	const Sub_Item_Total_Label_ = styled.div`
	flex:											12;
	font-size:								1.7vh;
	padding:									3px;
	font-weight:							bold;
	color:										black;
`
export 	const Sub_Item_Label_ = styled.div`
	flex:											12;
	padding:									3px;
	color:										black;
`
export 	const Insurance_Label_ = styled.div`
	flex:											15;
	font-weight:							bold;
	padding:									3px;
	color:										black;
`
export  const SubTotal_Cost_ = styled.div`
	flex: 										4;
	font-size:								1.7vh;
	width: 										100%;
	height: 									100%;
	${flex.rown_end_center}
`
export  const Total_Cost_ = styled.div`
	flex: 											4;
	font-size:									1.7vh;
	width: 											100%;
	height: 										100%;
	${flex.rown_end_center}
`
export  const Sub_Item_Cost_ = styled.div`
	flex: 											3;
	width: 											100%;
	height: 										100%;
	${flex.rown_end_center}
`