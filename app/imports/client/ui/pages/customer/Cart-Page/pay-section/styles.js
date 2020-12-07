// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
//import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
import { shake, bulge, pulsebright } 	from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export 	const Pay_Button_ = styled.div`
	flex:											1;
	height: 									80px;
	padding:									5px 12px;
	visibility:								${p => p.cantSave ? 'hidden' : 'visible'};
	background-color:					#1275ff;
	color:										white;
	aaa-background-image: 				linear-gradient(#7dc5ee, #008cdd, #30a2e4);
	animation:           			${p => p.isAnimating ? `${bulge} 0.2s linear 0s 1` : false};
	font-weight:      				bold;
	font-family:      				"Helvetica Nueue",Arial, sans-serif;
	text-shadow:      				0 -1px 0 rgba(0,0,0,0.25);
	box-shadow:       				inset 0 1px 0 rgba(255,255,255,0.25);
	border-radius:    				4px;
	${flex.coln_center_center}
	&:hover {
		background-color: 			#81b0f0;
	}
`
export 	const Pay_Section_ = styled.div`
	width:										100%;
	text-align:								center;
	font-size:								3.0vh;
	padding:									15px;
	background-color:					#dee3e7;
	${flex.coln_start_center}
`
// ====================================================================
