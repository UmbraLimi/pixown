// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
import { Link } 								from  'mobx-router'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Abc_ = styled.div`
	color:      							${theme.colors.accent};
	font-size: 								1.5em;
	margin: 									5px;
	padding: 									15px;
	text-align: 							center;
	${flex.coln_start_center}
`
// ====================================================================
export const Vendors_ = styled.p`
	color:      							black;
	font-size: 								0.5em;
`
// ====================================================================
