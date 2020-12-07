// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
// ----helpers----------------------
import { flex } 								from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================

export const NoAgreements_ = styled.p`
	padding:								5px;
	width:									100%;
	margin:									0 auto;
`
export const Listing_ = styled.div`
	flex:										1;
	padding:         				5px;
	margin:          				0 auto;
	overflow-y:      				scroll;
	${flex.coln_start_start}
`
export const Row_ = styled.div`
	flex:										1 1 auto;
	width:									100%;
	padding:          			2px;
  background-color: 			white;
  ${flex.coln_start_start}
  &:hover {
  	background-color: 		aliceblue;
  };
`
export const Header_ = styled.div`
	flex:										0 0 auto;
	width:									100%;
	padding:          			3px;
	font-size:        			2vh;
  background-color: 			#a5c9e8;
  ${flex.row_sb_center}
`
export const Header_Row_ = styled.div`
	flex:             			0 0 auto;
	padding:          			1px;
	color:            			black;
	overflow:         			hidden;
	min-height:       			20px;
`
export const Details_ = styled.div`
	flex:										1 1 auto;
	width:									100%;
	margin:          				0 auto;
  padding:          			10px;
  overflow-y:       			auto;
  ${flex.coln_start_start};
`