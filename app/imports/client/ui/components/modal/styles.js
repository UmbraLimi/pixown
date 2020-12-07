// ----node_modules-----------------
import styled, { keyframes } 		from  'styled-components'
// ----styles-----------------------
//import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex } 								from  '/imports/client/ui/styles/flex-styles.js'
//import { shake } 								from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
// The gray background
export const BackDrop_ = styled.div`
	position: 						fixed;
	top: 									0;
	bottom: 							0;
	left: 								0;
	right: 								0;
	background-color: 		rgba(0,0,0,0.3);
	padding: 							50px;
	${flex.rown_center_center};
`
// The modal "window"
export const Modal_ = styled.div`
	background-color: 		#fff;
	border-radius: 				5px;
	max-width: 						500px;
	max-height:						75vh;
	margin: 							0 auto;
	padding: 							3px;
	${flex.coln_normal_normal};
`
export const Button_Row_ = styled.div`
	margin: 							0 auto;
	width:								70%;
	padding: 							5px;
	${flex.rown_sa_center};
`
// ====================================================================