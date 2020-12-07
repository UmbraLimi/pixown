// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action } 	from  'mobx'
// ----styles-----------------------
import { Button_, Icon_ } 			from  './styles.js'
import { theme }           			from  '/imports/client/ui/styles/theme.js'
// ----enums------------------------
// ----helpers----------------------
import { shake, bulge, pulsebright } 	from  '/imports/client/animations/keyframes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Button extends React.Component {

	@observable isAnimating = false
	@action stopAnimating = () => {this.isAnimating = false}
	@action startAnimating = () => {this.isAnimating = true}

	handleClick = () => {
		const { onClick, animation, isDisabled=false } = this.props
		if (!isDisabled) {
			this.startAnimating()
			const delay = animation 
				? animation.delay || 300
				: 300
			setTimeout(() => {
				this.stopAnimating()
				onClick()
			}, delay)
		}
	}

	render() {
		const _isAnimating = this.isAnimating
		const { 
			animation, title, hover, bgColour,
			width, height, type, icon, margin, padding,
			textColour, cursor, isSelected=false
		} = this.props
		const _animation_name = animation
			? animation.name
			: bulge

		const _hover_bgColour = hover
			? hover.bgColour==='none' 
				? 'transparent'
				: hover.bgColour
			: theme.colors.background

		const _hover_textColour = hover
			? hover.textColour==='none' 
				? 'transparent'
				: hover.textColour
			: theme.colors.accentAlt

		const _bgColour = bgColour
			? bgColour==='none' 
				? 'transparent'
				: bgColour
			: theme.colors.accentAlt

		const _textColour = textColour
			? textColour==='none' 
				? 'transparent'
				: textColour
			: theme.colors.background

		const _margin = margin
			? margin
			: '5px 3px 7px 3px'

		const _padding = padding
			? padding 
			: '10px'

		const _width = width
			? width 
			: '100%'

		const _height = height
			? height
			: '40px'

		const _cursor = cursor
			? cursor
			: 'pointer'

		const _type = icon && type ? type : 'LABEL-ONLY'

		return (
			<Button_	className={`Button_for_${title}`}
					onClick={this.handleClick}
					margin={_margin}
					width={_width}
					height={_height}
					isAnimating={_isAnimating}
					animation_name={_animation_name}
					textColour={_textColour}
					bgColour={_bgColour}
					hover_bgColour={_hover_bgColour}
					hover_textColour={_hover_textColour}
					cursor={_cursor}
					isSelected={isSelected}
			>
				{ _type!=='LABEL-ONLY' ? (
					<Icon_ 
							className='Icon_' 
							icon={icon} 
					/>
				)
				: null }
				{ _type!=='ICON-ONLY' ? title : null}
			</Button_>
		)
	}
}
// ====================================================================

export { Button }


