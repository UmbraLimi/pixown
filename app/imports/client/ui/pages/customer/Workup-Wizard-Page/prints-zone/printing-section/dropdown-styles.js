// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Select_Parameter_ = styled.select`
	flex:											3;
	${flex.rown_sa_center}
`
export const Select_Option_ = styled.option`
`
export const Dropdown_ = styled.div`
	width:										100%;
	padding:									0 0 10px 0;
	${flex.rown_start_start}
`