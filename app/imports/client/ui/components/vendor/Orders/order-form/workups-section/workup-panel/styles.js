// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Pose_Code_ = styled.p`
	color: 										${theme.colors.foreground};
`
export const Pose_Label_ = styled.div`
	flex: 										1;
	width: 										100%;
	height: 									100%;
  padding: 									7px;
	${flex.coln_center_end}
`
export const Pose_Image_ = styled.img`
	border: 									1px solid white;
  height: 									auto;
  max-width: 								100px;
  width: 										100%;
	${theme.breakpoints.isMobileLarge`
		max-width: 							140px;
	`}
`
export const Pose_ = styled.div`
	flex: 										4;
	cursor:										pointer;
`
export const Total_Cost_ = styled.div`
	flex: 										1;
	width: 										100%;
	${flex.rown_end_center}
`
export const Total_Header_ = styled.div`
	flex: 										1 1 auto;
	padding:									2px;
	font-size:								1.8vh;
	${flex.rown_start_center}
`
export const Total_Summary_ = styled.div`
	flex: 										1;
	${flex.coln_start_stretch}
`
export const Option_Code_ = styled.ul`
	font-size:								1em;
	padding:									1px;
`
export const Item_ = styled.li`
`
export const Icon_ = styled.i`
`
export const Service_Code_ = styled.div`
	flex: 										0 0 auto;
	padding:									1px;
	color:										black;
`
export const Section_Selections_ = styled.div`
	flex: 										6 1 auto;
	font-size:								1.4vh;
	padding:									2px;
	background-color:					ghostwhite;
	color:										black;
	${flex.coln_start_start}
`
export const Total_Section_Cost_ = styled.div`
	flex: 1;
	width: 										100%;
	height: 									100%;
	${flex.rown_end_center}
`
export const Section_Label_ = styled.div`
	flex: 1;
`
export const Section_Header_ = styled.div`
	flex: 										1 1 auto;
	font-size:								1.5vh;
	padding:									2px;
	background-color:					gainsboro;
	color:										black;
	${flex.coln_start_center}
`
export const Section_Status_ = styled.div`
	flex: 										1 1 auto;
	font-size:								1.5vh;
	padding:									2px;
	background-color:					lightgreen;
	color:										black;
	word-break:								break-all;
	${flex.coln_start_center}
`
export const Section_Summary_ = styled.div`
	flex: 										1;
	height:										100%;
	padding:									3px;
	border:										1px solid slategrey;
	${flex.coln_start_stretch}
`
export const Selections_Panel_ = styled.div`
	flex: 										6;
	width:										100%;
	${flex.rown_start_start}
`
export const Total_Panel_ = styled.div`
	flex: 										1;
	width:										100%;
	padding:									3px;
	${flex.rown_start_center}
`
export const Summary_Panel_ = styled.div`
	flex: 										5;
	padding:									3px;
	${flex.coln_start_start}
`
export const Pose_Panel_ = styled.div`
	flex: 										1;
	margin-right: 						10px;
  margin-top: 							7px;
	${theme.breakpoints.isMobileLarge`
		margin-right: 					15px;
	`}
	${flex.coln_start_start}
`
export const Workup_ = styled.div`
	flex: 										0 0 auto;
	width: 										100%;
	height: 									100%;
	padding:									3px;
	${flex.rown_start_stretch}
`
export const Sitting_Code_ = styled.div`
	flex: 										0 0 auto;
`
export const Spacer_ = styled.div`
	flex: 										1 0 auto;
`
export const Id_ = styled.div`
	flex: 										0 0 auto;
`
export const Workup_Header_ = styled.div`
	flex: 										1;
	width: 										100%;
	height: 									100%;
	padding:									3px;
	font-size:								2vh;
	${flex.row_sb_center}
`
export const Workup_Panel_ = styled.div`
	flex: 										1 1 auto;
	width: 										100%;
	padding:									2px;
	color:										black;
	${flex.coln_start_start}
	&:hover {
		background-color:      	lightblue;
	}
`
// ====================================================================
