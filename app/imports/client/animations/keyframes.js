import styled, { keyframes } 		from  'styled-components'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
export const r360 = keyframes`
	from { transform: rotate(0deg);}
	to { transform: rotate(360deg);}
`
export const fade = keyframes`
	from {opacity: 0}
	to {opacity: 1}
`
export const pulsebright = keyframes`
	0% {opacity: .25}
	50% {opacity: .75}
	100% {opacity: 1}
`
export const bulge = keyframes`
	0% {transform: scale(1)}
	50% {transform: scale(1.2)}
	100% {transform: scale(1)}
`
export const shake = keyframes`
	0% {transform: translate3d(0,0,0)}
	25% {transform: translate3d(10px,0,0)}
	50% {transform: translate3d(-10px,0,0)}
	75% {transform: translate3d(10px,0,0)}
	100% {transform: translate3d(0,0,0)}
`
// ====================================================================