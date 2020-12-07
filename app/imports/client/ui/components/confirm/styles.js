// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
// The gray background
export const BackDrop_ = styled.div`
	z-index:					99;
	position: 				fixed;
	top: 							0;
	bottom: 					0;
	left: 						0;
	right: 						0;
	background-color: rgba(0,0,0,0.3);
	padding: 					50px;
`
// The modal "window"
export const Modal_ = styled.div`
	background-color: #fff;
	border-radius: 		5px;
	max-width: 				500px;
	min-height: 			300px;
	margin: 					0 auto;
	padding: 					30px;
	${flex.coln_sa_center}
`
export const Button_Bar_ = styled.div`
	margin: 					0 auto;
	padding: 					30px;
	${flex.rown_sa_center}
`
export const Yes_Button_ = styled.div`
	background-color: green;
	color:						white;
	border-radius: 		5px;
	max-width: 				80px;
	min-height: 			40px;
	margin: 					0 20px 0 0;
	padding: 					5px;
	${flex.rown_center_center}
	`
export const No_Button_ = styled.div`
	background-color: grey;
	color:						white;
	border-radius: 		5px;
	max-width: 				80px;
	min-height: 			40px;
	margin: 					0 0 0 20px;
	padding: 					5px;
	${flex.rown_center_center}
	`
export const Question_ = styled.div`
	font-size:				1.8em;
	padding: 					20px;
`
export const Comment_ = styled.div`
	font-size:				1em;
	padding: 					20px;
`
// ====================================================================
