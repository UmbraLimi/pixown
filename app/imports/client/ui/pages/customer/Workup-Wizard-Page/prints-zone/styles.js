// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Section_Body_ = styled.div`
	width:										100%;
	height:										100%;
	padding:									4px;
	${flex.rown_start_start}
`
export const Total_Section_Cost_ = styled.div`
	width:										100%;
	flex:											1;
	height:										100%;
	${flex.rown_end_center}
`
export const Section_Title_ = styled.div`
	width:										100%;
	flex:											1;
	height:										100%;
	padding:									4px;
`
export const Section_Header_ = styled.div`
	flex:											0 0 auto;
	width:										100%;
	height:										30px;
	padding:									4px;
	color:										white;
	background-color:					blue; 
	cursor:										pointer;
	${flex.rown_sb_stretch}
`
export const Section_Row_ = styled.li`
	width:										100%;
	flex:											1;
	height:										100%;
	padding-top:							4px;
	${flex.coln_sb_stretch}
`
export const Main_ = styled.ul`
	width:										100%;
	flex:											3;
	height:										100%;
	padding:									10px;
	overflow-y:								auto;
	${flex.rown_sb_stretch}
`
export const Prints_Zone_ = styled.div`
	background-color: 				rgba(255,255,255,0.8);
	position:									absolute;
	padding: 									1em;
	width:										100%;
	flex:											1 1 auto;
	height:										100%;
	${flex.coln_sb_center}
`
// ====================================================================