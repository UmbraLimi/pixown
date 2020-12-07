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
export const Folders_Portlet_ = styled.div`
	width:							100%;
	margin:							0 auto;
	${flex.coln_sb_center}
`
export const NoFolders_ = styled.p`
	padding:						5px;
	width:							100%;
	margin:							0 auto;
`
export const Search_Section_ = styled.div`
	border-left:				1px solid ${p => p.theme_colour.base};
	${flex.rown_sb_start}
`
export const Search_Title_ = styled.div`
	margin-top:					2px;
	padding:						10px;
`
export const Search_Input_ = styled.input`
	flex:									${p => p.flex ? p.flex : 1};
	margin-top:						8px;
	display:							block;
	background-color: 		${p => p.disabled ? 'lightgrey' : 'white'};
	padding:         			0.25rem;
	font-size:       			1.0rem;
	border-radius:   			4px;
	transition: 					0.5s ease;
	border:          			1px solid #ccc;
	&:focus {
		border:           	#007eff 1px solid;
		box-shadow:       	inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
		background-color: 	aliceblue;
		outline:          	none;
	};
`
export const Filter_Section_ = styled.div`
`
export const Checkbox_Title_ = styled.div`
	padding:						10px;
`
export const CheckIcon_ = styled.i`
	vertical-align: 					middle;
	padding-right:						7px;
	color:            				${p => p.theme_colour.base};
	-webkit-font-smoothing: 	antialiased; 
	font:             				normal normal normal 1.1em/1 FontAwesome; 
	text-rendering:   				auto;
	&:before {
		content: 					'${p => p.icon.code}';
	};
`
export const Checkbox_Group_ = styled.div`
	${flex.row_sa_start}
`
export const Checkbox_Label_ = styled.label`
	background-color: 	transparent;
	color:            	${p => p.theme_colour.base};
`
export const Checkbox_ = styled.div`
	padding:						10px;
	&:hover {
		background-color: white;
		color:      			${theme.colors.base};
	}
`
export const Message_Row_ = styled.div`
	padding:						10px;
	&:hover {
		background-color: lightblue;
		color:      			${theme.colors.accentAlt};
	}
	background-color:		${p => p.i %2 === 0 ? 'aliceblue' : 'transparent'}
`
export const Message_Title_ = styled.div`
	height:							40px;
	font-size:					1.6em;
	background-color:		blue;
	color:							white;
	width:							100%;
	margin:							0 auto;
	${flex.coln_center_center}
`
