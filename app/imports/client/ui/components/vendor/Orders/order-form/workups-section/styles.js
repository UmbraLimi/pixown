// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Workups_ = styled.div`
	flex: 										0 1 auto;
	width: 										100%;
	${flex.coln_start_start}
`
export const Workups_Title_ = styled.div`
  flex: 										0 0 7vh;
  width: 										100%;
	height: 									100%;
	font-size:								2.4vh;
	padding:									4px;
	background-color:					blue;
	color:										white;
	${flex.rown_center_center}
`
export const Workups_Section_ = styled.div`
  flex: 										1 1 auto;
  width: 										100%;
	height: 									100%;
	padding: 3px;
	${flex.coln_start_start}
`
// ====================================================================
