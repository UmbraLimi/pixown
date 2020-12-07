import { Meteor } 							from  'meteor/meteor'
import React 										from  'react'
import styled, { keyframes } 		from  'styled-components'
// ----helpers----------------------
import { theme } 								from   '/imports/client/ui/styles/theme.js'
import { flex } 								from   '/imports/client/ui/styles/flex-styles.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
export const Loading = ({ message, problem }) => {
	const _Wrapper = styled.div`
		width:           				100%;
		padding:         				5px;
		margin:          				0 auto;
		border:          				1px black solid;
		font-size:       				0.8em;
		/*font-weight:     				600;*/
		color: 									${message ? 'blue' : 'red'};
		background-color: 			white;
		${flex.coln_start_start}
	`
	return (
		<_Wrapper 							className={'(Loading)'} >
			<svg 
				version="1.1" 
				id="Layer_1" 
				xmlns="http://www.w3.org/2000/svg" 
				x="0px" 
				y="0px"
				width="50px" 
				height="50px" 
				viewBox="0 0 50 50" 
				enableBackground="new 0 0 50 50" 
			>
				<rect x="0" y="0" width="4" height="7" fill="#FF6200">
					<animateTransform attributeType="xml"
						attributeName="transform" type="scale"
						values="1,1; 1,3; 1,1"
						begin="0s" dur="0.6s" repeatCount="indefinite" 
					/>
				</rect>

				<rect x="10" y="0" width="4" height="7" fill="#FF6200">
					<animateTransform attributeType="xml"
						attributeName="transform" type="scale"
						values="1,1; 1,3; 1,1"
						begin="0.2s" dur="0.6s" repeatCount="indefinite" 
					/>
				</rect>
				<rect x="20" y="0" width="4" height="7" fill="#FF6200">
					<animateTransform attributeType="xml"
						attributeName="transform" type="scale"
						values="1,1; 1,3; 1,1"
						begin="0.4s" dur="0.6s" repeatCount="indefinite" 
					/>
				</rect>
			</svg>
			{ message || problem ?
				<ul>
					{ problem ? <li>{`ERROR: ${problem}`}</li> : null }
					{ message ? <li>{message}</li> : null }
				</ul>
			: null }
		</_Wrapper>
	)
}
// ====================================================================
