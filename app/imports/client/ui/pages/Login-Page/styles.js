// ----node_modules-----------------
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
// ----helpers----------------------
import { flex }              		from  '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Footer_Bar_ = styled.div`
	height: 								7vh;
	width: 									100%;
	padding:        				3px;
	background-color: 			gainsboro;
	${flex.rown_sb_center}
`
export const Info_ = styled.div`
	flex: 									1;
	height: 								90%;
	width: 									100%;
	background-image:    		url('/images/info.png');
	background-size:     		contain;
	background-repeat:   		no-repeat;
	background-position: 		center;
	cursor:         				pointer;
	&:hover {
		background-color: 		aliceblue;
	};
`
export const Page_Marker_ = styled.div`
	flex: 									1;
	height: 								90%;
	width: 									100%;
	text-align:     				center;
	font-size:      				2.0vmin;
	${flex.coln_sa_center}
`
// ====================================================================
