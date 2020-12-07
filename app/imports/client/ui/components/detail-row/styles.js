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
export const Unshown_ = styled.div`
	align-self: 						${p => p.orientation==='cols' ? 'center' : 'normal'};
	padding-left:						5px;
`
export const Detail_Row_ = styled.div`
	flex:										0 1 auto;
	width:									100%;
  ${flex.rown_start_stretch}
`
export const Label_ = styled.div`
	flex:										1;
	width:									100%;
	word-break:							break-word;
	background-color:   		aliceblue;
  border-radius:      		4px;
  padding:            		3px 1em 3px 3px;
  margin:             		4px 0 0 0;
  text-align:         		right;
`
export const Values_ = styled.div`
	flex:										2;
	width:									100%;
	border-radius:      		4px;
  padding:            		3px 3px 3px 1em;
	margin:             		4px 1em 0 0;
	${p => p.values_orientation==='rows' 
		? flex.col_start_start 
		: flex.row_start_start
	}
`
export const Value_ = styled.div`
	flex:             			0 0 auto;
	word-break:							break-all;
`
export const Image_ = styled.img`
	height:									80px;
	padding:								2px;
`
