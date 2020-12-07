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
export const Insurance_Section_ = styled.div`
  flex: 										1 1 auto;
  width: 										100%;
	padding: 3px;
	${flex.rown_start_start}
`
export const HSpacer = styled.div`
	flex:									${p => p.flex ? p.flex : 1};
`
