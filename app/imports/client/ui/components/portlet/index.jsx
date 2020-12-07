// ----node_modules-----------------
import React                    from  'react'
//import { autorun, toJS }				from  'mobx'
import { observer, inject } 		from  'mobx-react'
import { observable, action, computed } 	from  'mobx'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
	Portlet_, Portlet_Header_, Title_,
	Portlet_Body_, Icon_, Action_Section_,
	Summary_Section_, Tool_Section_, 
	Options_Section_, Options_Title_,
	Options_Body_, Title_Section_,
	Search_Section_, Filter_Section_,
	Search_Filter_Zone_
}																from  './styles.js'
// ----helpers----------------------
//import { get_theme_from_name }  from  '/imports/client/colours/colours.js'

// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Portlet extends React.Component {

	@observable summary = null
	@observable collapsed = false
	@observable options_in_view = false
	@action toggle_collapse = () => {this.collapsed = !this.collapsed}
	@action toggle_options_in_view = () => {this.options_in_view = !this.options_in_view}
	@action set_collapse_to = (cstate) => {this.collapsed = cstate}
	@action set_options_in_view_to = (cstate) => {this.options_in_view = cstate}

	constructor(props) {
		super(props)
		this.set_collapse_to(props.start_collapsed)
		this.set_options_in_view_to(props.start_options_in_view)
	}

	render() {
		const {
			actions, options, tools, title, icon, Manager, search, filter, events={},
			...rest // just to check nothing of interest in here
		} = this.props
		// set the icons
		const option_icon = {name:'bars', code:'\f0c9'}
		const title_icon = icon ? icon : {name:'gift', code:'\f06b'}
		const collapse_icon = this.collapsed
			? {name:'chevron-down', code:'\f078'}
			: {name:'chevron-up'  , code:'\f077'}

		const show_collapse = tools && tools.collapse==='SHOW'
		return (
			<Portlet_   							
					className='Portlet_'
					theme_colour={Manager.theme_colour}
				>
				<Portlet_Header_
						className='Portlet_Header_'
						theme_colour={Manager.theme_colour}
				>
					<Title_Section_    		
							className='Title_Section_'
							theme_colour={Manager.theme_colour}
					>
						<Icon_ 	
								className='Icon_' 
								icon={title_icon} 
								theme_colour={Manager.theme_colour}
						/>
						<Title_ className='Title_'>
							{title}
						</Title_>
					</Title_Section_>

					{ actions && !this.collapsed ? (
						<Action_Section_   	
								className='Action_Section_'
								theme_colour={Manager.theme_colour}
						>
							{__.map(actions.buttons, (button, index) => {
								return (
									<Action_Option_Button__
											type='LABEL-ONLY'
											key={button.title}
											title={button.title}
											icon={button.icon}
											onClick={button.onClick}
											button_theme_colour={Manager.button_theme_colour}
											button_hover_theme_colour={Manager.button_hover_theme_colour}
									/>
								)
							})}
						</Action_Section_>
					): null}

					{ Manager.summary ? (
						<Summary_Section_  	
								className='Summary_Section_'
								theme_colour={Manager.theme_colour}
						>
							{Manager.summary}
						</Summary_Section_>
					): null}

					{ tools || options ? (
						<Tool_Section_  			
								className='Tool_Section_'
								theme_colour={Manager.theme_colour}
						>
							{ options && !this.collapsed ? (
								<Tool_Button__
										title={options.button_title}
										icon={option_icon}
										onClick={this.toggle_options_in_view}
										button_theme_colour={Manager.button_theme_colour}
										button_hover_theme_colour={Manager.button_hover_theme_colour}
								/>
							): null}
							{ show_collapse && !this.collapsed ? (
								<Tool_Button__
										title='Collapse'
										icon={collapse_icon}
										onClick={this.toggle_collapse}
										button_theme_colour={Manager.button_theme_colour}
										button_hover_theme_colour={Manager.button_hover_theme_colour}
								/>
							): null}
							{ tools && !this.collapsed ? (
								__.map(tools.buttons, (button, index) => {
									return (
										<Tool_Button__
												key={button.title}
												title={button.title}
												icon={button.icon}
												onClick={button.onClick}
												button_theme_colour={Manager.button_theme_colour}
												button_hover_theme_colour={Manager.button_hover_theme_colour}
										/>
									)
								})
							): null}
						</Tool_Section_>
					): null }
				</Portlet_Header_>

				{ search || filter ? (
					<Search_Filter_Zone_ 
							className='Search_Filter_Zone_'
							theme_colour={Manager.theme_colour}
					>
						{ filter ? (
							<Filter_Section_
									className='Filter_Section_'
									theme_colour={Manager.theme_colour}
							>
								{filter}
							</Filter_Section_>
						): null}
						{ search ? (
							<Search_Section_
									className='Search_Section_'
									theme_colour={Manager.theme_colour}
							>
								{search}
							</Search_Section_>
							): null}
						</Search_Filter_Zone_>
				): null}
				
				{ !this.collapsed ? (
					<Portlet_Body_   				
							className='Portlet_Body_'
							theme_colour={Manager.theme_colour}
					>

						{ React.createElement( Manager.content, {Manager, events}, null ) }

						{this.options_in_view ? (
							<Options_Section_ 	
									className='Options_Section_'
									theme_colour={Manager.theme_colour}
							>
								<Options_Title_ 	
										className='Options_Title_' 
										theme_colour={Manager.theme_colour}
								>
									{options.button_title}
								</Options_Title_>
								{ !this.collapsed ? (
									<Options_Body_  
											className='Options_Body_'
											theme_colour={Manager.theme_colour}
									>
										{__.map(options.buttons, (button, index) => {
											return (
												<Action_Option_Button__
														type='ICON+LABEL'
														key={button.title}
														title={button.title}
														icon={button.icon}
														onClick={button.onClick}
														button_theme_colour={Manager.button_theme_colour}
														button_hover_theme_colour={Manager.button_hover_theme_colour}
												/>
											)
										})}
									</Options_Body_>
								) : null}
							</Options_Section_ >
						): null}

					</Portlet_Body_>
				): null}

			</Portlet_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Tool_Button__ extends React.Component {
	render() {
    const	{ title, icon, onClick } = this.props
		const { button_theme_colour, button_hover_theme_colour } = this.props
		return (
			<Button
					type='ICON-ONLY'
					title={title}
					icon={icon}
					textColour={button_theme_colour.font}
					bgColour='transparent'
					hover={{
						textColour: button_theme_colour.font,
						bgColour: button_theme_colour.base
					}}
					width='16px'
					height='16px'
					onClick={onClick}
			/>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Action_Option_Button__ extends React.Component {
	render() {
    const	{ title, type, icon, onClick } = this.props
		const { button_theme_colour, button_hover_theme_colour } = this.props
    return (
			<Button
					type={type}
					title={title}
					icon={icon}
					textColour={button_theme_colour.font}
					bgColour={button_theme_colour.base}
					hover={{
						textColour: button_theme_colour.base,
						bgColour: button_theme_colour.font
					}}
					onClick={onClick}
			/>
		)
	}
}
// ====================================================================

export { Portlet }