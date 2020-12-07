// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
// ----helpers----------------------
import { flex } 								from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================

export const Icon_ = styled.i`
	-webkit-font-smoothing: 	antialiased; 
	font:             				normal normal normal 0.8em/1 FontAwesome; 
	text-rendering:   				auto;
	&:before {
		content: 								'${p => p.icon.code}';
	};
`
export const Button_ = styled.div`
	width:										${p => p.width};
	height:										${p => p.height};
	margin:										${p => p.margin};
	border-radius:						4px;
	background-color:					${p => p.bgColour};
	color:										${p => p.textColour};
	border-style:							solid;
	border-width:							1px;
	border-color:							${p => p.isSelected ? p.textColour : p.bgColour};
	padding:									${p => p.padding};
	animation:           			${p => p.isAnimating ? `${p.animation_name} 0.2s linear 0s 1` : false};
	&:hover {
		background-color:      	${p => p.hover_bgColour};
		color:									${p => p.hover_textColour};
		cursor:									${p => p.cursor};
	};
	${flex.coln_center_center}
`