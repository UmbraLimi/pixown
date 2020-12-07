// ----node_modules-----------------
import styled, { keyframes } 		from  'styled-components'
// ----styles-----------------------
//import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex } 								from  '/imports/client/ui/styles/flex-styles.js'
import { shake, bulge, pulsebright } 	from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Button_Wrapper_ = styled.div`
	width:								80%;
	margin: 							10px;
	padding:  						10px;
`
export const Section_ = styled.div`
	flex: 								1;
	padding: 10px;
	width: 90%;
	border: 1px solid green;

	${flex.coln_sa_stretch}
`
export const Login_Form_ = styled.div`
	flex: 								1 1 auto;
	width: 								80%;
	padding:         			5px;
	max-width: 			 			500px;
	min-height:      			400px;
	margin:          			0 auto;
	${flex.coln_center_center}
`
export const Input_Wrapper_ = styled.div`
	width:								100%;
	padding:         			3px;
	margin-bottom:   			1.5rem;
	${flex.coln_sa_start}
`
export const Input_Row_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	margin:          			0 auto;
	${flex.rown_normal_normal}
`
export const Input_Cell_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	margin:          			0 auto;
	${flex.coln_normal_normal}
`
export const Input_ = styled.input`
	flex: 								1 1 auto;
	width: 								100%;
	padding:         			0.5rem;
	font-size:       			16px;
	border-radius:   			4px;
	transition: 					0.5s ease;
	margin:          			0 auto;
	border:          			1px solid #ccc;
	&:focus {
		border:           	#007eff 1px solid;
		box-shadow:       	inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
		background-color: 	aliceblue;
		outline:          	none;
	};
`
// ====================================================================
export const Label_Row_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	margin:          			0 auto;
	${flex.rown_start_center}
`
export const Label_Cell_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	padding:         			0 0 0 5px;
	margin:          			0 auto;
	${flex.coln_sa_start};
`
export const Label_ = styled.label`
	flex:									1 1 auto;
	width:								100%;
	padding:         			0 0 5px 0;
	color:           			${p => p.hasError ? 'red' : '#000080'};
	font-weight:     			bold;
`
// ====================================================================
export const Error_Row_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	line-height: 					0.8;
	font-size:						0.8em;
	margin:          			0 auto;
	${flex.coln_normal_normal}
`
export const Error_Cell_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	padding:         			5px;
	margin:          			0 auto;
	${flex.coln_normal_normal}
`
export const Error_List_ = styled.ul`
	flex:									1 1 auto;
	width:								100%;
	color:           			#0070ff;
	${flex.coln_normal_normal}
`
export const Error_ = styled.li`
	display:							inline-block;
	width:								90%;
	flex: 1 1 auto;
	overflow-wrap:				break-word;
	word-wrap:						break-word;
`
// ====================================================================