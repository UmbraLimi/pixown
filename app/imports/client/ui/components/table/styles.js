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
export const Table_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	padding:							5px;
	margin:          			0 auto;
	${flex.coln_center_center}
`
export const HeaderRow_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	background-color:			#007eff;
	font-size:						1.8vh;
	color:								white;
	margin:          			0 auto;
	${flex.rown_center_stretch}
`
export const HeaderCell_ = styled.div`
	flex: 								${p => p.flex};
	padding:							4px;
	width: 								100%;
	border:								1px solid blue;
	margin:          			0 auto;
	${flex.rown_center_stretch}
`
export const Row_ = styled.div`
	flex: 								1 1 auto;
	width: 								100%;
	margin:          			0 auto;
	font-size:						1.7vh;
	font-weight:					normal;
	${flex.rown_center_start}
`
export const Cell_ = styled.div`
	flex: 								${p => p.flex};
	word-break:						break-all;
	padding:							4px;
	width: 								100%;
	margin:          			0 auto;
	${flex.coln_start_start}
`
// ====================================================================
