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
export const Folder_Portlet_ = styled.div`
	width:							100%;
	margin:							0 auto;
	padding:         		5px;
	margin:         		0 auto;
	border:          		2px black solid;
	${flex.coln_sb_center}
`