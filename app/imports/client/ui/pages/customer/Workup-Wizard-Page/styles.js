// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Pose_ = styled.div`
	flex: 										1;
	height: 									100%;
	width: 										100%;
	background-size: 					contain;
	background-repeat: 				no-repeat;
	background-position: 			center;
`
export const Overlay_ = styled.div`
    background-color: 			rgba(255,255,255,0.8);
    position:        				absolute;
    padding: 								1em;
    width: 									100%;
		height:									100%;
`
// ====================================================================
