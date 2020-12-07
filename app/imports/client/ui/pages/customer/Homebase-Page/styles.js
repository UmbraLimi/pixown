// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
import { shake, bulge, pulsebright } 	from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Button_Section_ = styled.div`
	display:							flex;
	background-color: 		${theme.colors.background};
	margin: 							5px;
	padding: 							15px;
	${flex.coln_start_stretch}
`
export const Button_ = styled.div`
	display:							flex;
	animation:           	${p => p.isAnimating ? `${bulge} 0.2s linear 0s 1` : false};
	flex-direction: 			column;
	cursor: 							pointer;
	background-color: 		${theme.colors.accent};
	color:      					${theme.colors.backgroundAlt};
	font-size: 						14px;
	margin: 							5px;
	padding: 							15px;
	border-radius:				5px;
	${flex.coln_sa_center}
	&:hover {
		background-color: 			#fd7b83;
	}
`
// ====================================================================
