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
export const Button_Wrapper_ = styled.div`
	width:								80%;
	margin: 							10px;
	padding:  						10px;
`
export const Form_Wrapper_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	padding:         			5px;
	max-width: 			 			600px;
	min-height:      			400px;
	margin:          			0 auto;
	${flex.coln_start_stretch}
`
export const Section_ = styled.div`
	flex: 								1;
	padding:  						3px;
	${flex.coln_sa_stretch}
`
// ====================================================================