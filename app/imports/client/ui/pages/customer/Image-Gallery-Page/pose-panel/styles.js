// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
//import { Link } 								from  'mobx-router'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
import { shake, bulge, pulsebright } 	from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Pose_Panel_ = styled.div`
	flex:     								1 1 auto;
	margin-right: 						10px;
	margin-top:								7px;
	${theme.breakpoints.isMobileLarge`
		margin-right:						15px;
	`}
	${flex.coln_start_start}
`
export const Pose_ = styled.div`
	flex:    									4;
	animation:           			${p => p.isAnimating ? `${bulge} 0.2s linear 0s 1` : false};
	cursor:										pointer;
	opacity:									1.0;
	&:hover {
		opacity: 			0.8;
	}
`
export const Pose_Label_Container_ = styled.div`
	flex:     								1;
	width:    								100%;
	height:    								100%;
	padding: 									7px;
	${flex.rown_center_end}
`
export const Pose_Label_ = styled.p`
	color:      							${theme.colors.foreground};
`
export const Pose_Image_ = styled.img`
	width:    								100%;
	max-width: 								100%;
	border:										1px solid white;
	height:   								auto;
	${theme.breakpoints.isMobileLarge`
		max-width:							140px;
	`}
`
export const State_Badge_Container_ = styled.div`
	position: 								absolute;
	top: 											-26px;
	left: 										10px;
	${theme.breakpoints.isDesktopSmall`
		top: 										-30px;
		left: 									12px;
	`}
`
// ====================================================================
export const Badge_ = styled.span`
	border-radius: 						50%;
	display: 									inline-block;
	font-size: 								10px;
	padding: 									2px 5px;
	text-align: 							center;
`
// ====================================================================
