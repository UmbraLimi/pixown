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
export const Portlet_ = styled.div`
	flex:											1 1 auto;
	width: 										100%;
	border:          					1px solid ${p => p.theme_colour.base};
	padding:									0;
	margin:										5px;
	${flex.coln_start_start}
`
export const Search_Filter_Zone_ = styled.div`
	flex:											0 1 50px;
	width: 										100%;
	min-height:       				41px;
	background-color: 				#efd6d6;
	color:            				${p => p.theme_colour.base};
	padding:          				2px 10px 2px 10px;
	margin-bottom:    				0;
	border:			    					1px solid ${p => p.theme_colour.base};
	${flex.rown_normal_normal}
`
export const Filter_Section_ = styled.div`
	flex:											1;
	max-width:        				100%;
	color:            				${p => p.theme_colour.font};
	font-size:        				18px;
	overflow:         				hidden;
	text-overflow:    				ellipsis;
	white-space:      				nowrap;
	${flex.rown_start_center}
`
export const Search_Section_ = styled.div`
	max-width:        				100%;
	color:            				${p => p.theme_colour.font};
	font-size:        				18px;
	overflow:         				hidden;
	text-overflow:    				ellipsis;
	white-space:      				nowrap;
	${flex.rown_start_center}
	`
export const Portlet_Header_ = styled.div`
	flex:											0 1 50px;
	width: 										100%;
	min-height:       				41px;
	background-color: 				${p => p.theme_colour.base};
	color:            				${p => p.theme_colour.font};
	padding:          				2px 10px 2px 10px;
	margin-bottom:    				0;
	border-bottom:    				0;
	${flex.rown_sb_center}
`
export const Title_Section_ = styled.div`
	max-width:        				100%;
	color:            				${p => p.theme_colour.font};
	font-size:        				18px;
	overflow:         				hidden;
	text-overflow:    				ellipsis;
	white-space:      				nowrap;
	${flex.rown_start_center}
`
export const Title_ = styled.div`
	padding-left:							10px;
	${flex.rown_start_center}
`
export const Icon_ = styled.i`
	color:            				${p => p.theme_colour.font};
	-webkit-font-smoothing: 	antialiased; 
	font:             				normal normal normal 14px/1 FontAwesome; 
	text-rendering:   				auto;
	&:before {
		content: 								'${p => p.icon.code}';
	};
`
export const Action_Section_ = styled.div`
	height:										100%
	color:            				${p => p.theme_colour.font};
	padding:          				7px 2px 5px;
	margin:           				3px;
	${flex.rown_sb_center}
`
export const Summary_Section_ = styled.div`
	color:            				${p => p.theme_colour.font};
	padding:          				7px 4px 5px;
	margin:           				4px;
	font-size:        				18px;
	border:           				1px solid ${p => p.theme_colour.font};
	${flex.rown_sa_center}
`
export const Tool_Section_ = styled.div`
	color:            				${p => p.theme_colour.font};
	font-size:        				18px;
	border:           				1px solid white;
	${flex.rown_sa_center}
`
export const Portlet_Body_ = styled.div`
	flex:											1 1 auto;
	width:										100%;
	background-color: 				aliceblue;
	${flex.rown_sb_stretch}
`
export const Options_Section_ = styled.div`
	flex:											0 1 100px;
	text-align:       				center;
	padding:          				5px;
	margin:           				0 auto;
	border:           				1px solid ${p => p.theme_colour.base};
	background-color: 				${p => p.theme_colour.font};
	${flex.coln_start_stretch}
`
export const Options_Title_ = styled.div`
	height:										25px;
	font-size:        				2.0vh;
	background-color: 				transparent;
	color:           					${p => p.theme_colour.base};
	border:           				1px solid ${p => p.theme_colour.font};
	margin:           				2px;
	${flex.coln_sa_center}
`
export const Options_Body_ = styled.div`
	flex:											1;	
	background-color: 				transparent;
	padding:          				7px 2px 5px 2px;
	${flex.coln_start_center}
`
