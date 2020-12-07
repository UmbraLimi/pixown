// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Sitting_Panel_ = styled.div`
	flex:     								1 1 auto;
	width:    								100%;
	height:   								100%;
	background-color:					${theme.colors.background};
	box-shadow: 							${theme.shadows.light};
	margin-bottom: 						1em;
	padding: 									7px;
	transition: 							all 0.3s cubic-bezier(.25,.8,.25,1);
	&:hover {
		box-shadow: 						${theme.shadows.heavy};
	}
	&:last-child {
		margin-bottom: 					0px;
	}
	${theme.breakpoints.isMobileLarge`
		padding: 								15px;
	`}
	${flex.coln_start_start}
`
export const Sittings_Title_ = styled.h3`
	color:      							${theme.colors.backgroundAlt};
	font-family: 							${theme.typography.display};
	font-weight: 							normal;
	text-transform: 					uppercase;
`
export const Sittings_Title_Container_ = styled.div`
	background-color:  				${theme.colors.accentAlt};
	padding: 									15px;
	width:										100%;
	${flex.rown_start_center}
`
export const Sitting_ = styled.div`
	display: 									flex;
	flex-flow: 								row wrap;
`
export const Proof_ = styled.div`
	flex:     								0 0 auto;
	height:   								100%;
	${flex.rown_start_stretch}
`
// ====================================================================
