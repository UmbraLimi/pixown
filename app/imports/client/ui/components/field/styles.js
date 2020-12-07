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
export const Input_Row_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	margin:          			0 auto;
	${flex.rown_center_center}
`
export const Title_Cell_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	margin:          			0 auto;
	${flex.coln_normal_normal}
`
export const Title_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	padding:         			5px;
	margin:          			0 auto;
	${flex.coln_normal_normal}
`
export const Change_Cell_ = styled.div`
	flex:									0;
	margin:          			0 auto;
	${flex.coln_normal_normal}
`
export const Change_Button_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	padding:              1px 3px 1px 3px;
	font-size:            .8em;
	background-color:     aliceblue;
	color:                black;
	cursor:              	pointer;
	${flex.coln_sa_center}
	&:hover {
		background-color: 	black; //aliceblue
		color:           		white;
	};
`
export const Form_Group_2 = styled.div`
	display: 							${p => p.hidden ? 'none' : 'flex'};
	flex-direction:				row;
	${theme.breakpoints.isMobileMedium`
		flex-direction:			column;
	`}
`
export const Label_2 = styled.label`
	flex:									none;
	display:							block;
	width:								125px;
	padding:         			12px 0 5px 0;
	color:           			${p => p.hasError ? 'red' :'#000080'};
	animation:           	${p => p.hasError ? `${shake} 0.2s linear 0s 1` : false};
	font-size:						1em;
	${theme.breakpoints.isTablet`
		width:							200px;
	`}
`
export const InputWithError_ = styled.div`
	flex: 								1 1 auto;
	display:							flex;
	padding:         			4px;
	margin:          			2px -4px 10px 0;
	${flex.coln_normal_normal}
	${theme.breakpoints.isMobileMedium`
		margin:          		-4px 8px 10px 0;
	`}
`
export const SubObject_ = styled.div`
	background-color:			#cedded;
	border-radius:				6px;
	padding:							5px;
`
export const Cell_2 = styled.div`
	flex:									${p => p.flex ? p.flex : 1};
	display:							block;
	padding:         			0.25rem;
	font-size:       			1.0rem;
	border-radius:   			4px;
	transition: 					0.5s ease;
	border:          			1px solid #ccc;
`
export const Input_2 = styled.input`
	flex:									${p => p.flex ? p.flex : 1};
	display:							block;
	background-color: 		${p => p.disabled ? 'lightgrey' : 'white'};
	padding:         			0.25rem;
	font-size:       			1.0rem;
	border-radius:   			4px;
	transition: 					0.5s ease;
	border:          			1px solid #ccc;
	&:focus {
		border:           	#007eff 1px solid;
		box-shadow:       	inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
		background-color: 	aliceblue;
		outline:          	none;
	};
`
export const TextArea_2 = styled.textarea`
	flex:									${p => p.flex ? p.flex : 1};
	display:							block;
	color:								${p => p.unhandled_input ? 'orangered' : 'black'};
	background-color: 		${p => p.disabled ? 'lightgrey' : 'white'};
	padding:         			0.25rem;
	font-size:       			1.0rem;
	border-radius:   			4px;
	transition: 					0.5s ease;
	border:          			1px solid #ccc;
	&:focus {
		border:           	#007eff 1px solid;
		box-shadow:       	inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
		background-color: 	aliceblue;
		outline:          	none;
	};
`
export const Error_List_2 = styled.ul`
	flex:									1 1 auto;
	width:								100%;
	color:           			#0070ff;
	${flex.coln_normal_normal}
`
export const Error_2 = styled.li`
	display:							inline-block;
	width:								90%;
	font-size:						0.8em;
	overflow-wrap:				break-word;
	word-wrap:						break-word;
`
export const Title_Row_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	color:								black;
	padding-top:					2px;
	font-size:						1.7vh;
	background-color:   	aliceblue;
	border-radius:      	4px;
	text-align:         	left;
	${flex.rown_sb_start}
`// ====================================================================
