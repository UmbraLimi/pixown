// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
import { Link } 								from  'mobx-router'
// ----styles-----------------------
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
import { theme } 								from  '/imports/client/ui/styles/theme.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Masthead_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	${flex.coln_start_start}
`
export 	const Masthead_Row_ = styled.div`
	flex:									1;
	width:								100%;
	height:								100%;
	padding:          		2px;
	background-color: 		white;
	border:           		2px solid gainsboro;
	${flex.coln_start_start};
	&:hover {
		background-color: 	aliceblue;
	};
`
export const Header_ = styled.div`
	flex:									1;
	width:								100%;
	height:								100%;
	padding:          		10px;
	font-size:        		2.7vh;
	background-color: 		#d7e2ec;
	color:								blue;
	border:								1px solid blue;
	${flex.row_center_center};
`
export const Row_ = styled.div`
	flex:             		0 0 auto;
	padding:          		1px;
	color:            		black;
	overflow:         		hidden;
	min-height:       		20px;
`
export const Details_ = styled.ul`
	flex:									0 0 auto;
	height:								100%;
	width:								100%;
	margin:           		0 auto;
	padding:          		10px;
	overflow-y:       		auto;
	${flex.coln_start_start};
`
export const Detail_Row_ = styled.div`
	flex:									0 1 auto;
	width:								100%;
	${flex.rown_start_stretch};
`
export const Label_ = styled.div`
	flex:									1;
	width:								100%;
	height:								100%;
	background-color:   	aliceblue;
	border-radius:      	4px;
	padding:            	3px 1em 3px 3px;
	margin:             	4px 0 0 0;
	text-align:         	right;
`
export const Value_ = styled.div`
	flex:									2;
	width:								100%;
	height:								100%;
	border-radius:      	4px;
	padding:            	3px 3px 3px 1em;
	margin:             	4px 1em 0 0;
	${flex.coln_start_start};
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
export const Title_Row_ = styled.div`
	flex:									1 1 auto;
	width:								100%;
	color:								blue;
	font-size:						1.2vh;
	background-color:   	aliceblue;
	border-radius:      	4px;
	text-align:         	left;
	${flex.rown_sb_center}
	&:hover {
		text-decoration: 		underline;
		cursor:							pointer;
	}
`
