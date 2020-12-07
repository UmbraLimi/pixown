// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action } 	from  'mobx'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { theme }           			from  '/imports/client/ui/styles/theme.js'
import { 
	Title_Block_, Outer_, Title_, Image_, 
	Question_, VSpacer_, 
	Question_Container_, Explanation_, 
	Explain_Item_,
	Icon_Container_, Icon_, Explain_
} 															from  '../zone-styles.js'
import { 
	Add_To_Cart_Zone_, YesNo_Block_,
	Message_Container_, Message_
} 															from  './styles.js'
// ----enums------------------------
import { Workup_States } 				from  '/imports/enums/workup-states.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Add_To_Cart_Zone extends React.Component {

	@observable  yes_or_no = 'yes'

	@action
	toggle_yes_or_no = () => {
		this.yes_or_no = this.yes_or_no === 'yes' ? 'no'  : 'yes'
	}

	handleYesClick = () => {
		this.toggle_yes_or_no()
		const { workupWizardStore } = this.props.store
		workupWizardStore._add_workup_to_cart()
	}

	handleNoClick = () => {
		this.toggle_yes_or_no()
	}

	render() {
		const { store } = this.props
		const { workupWizardStore } = store

		const image_to_show = workupWizardStore._activePage.image_filename
		const lines_in_title = workupWizardStore._activePage.title.split("|")
		const question = workupWizardStore._activePage.question
		const explain = workupWizardStore._activePage.explain
		const state = workupWizardStore.record.state
		const is_NEW_or_SAVED = __.includes([Workup_States.NEW.name, Workup_States.SAVED.name], state)
		const is_In_CART = state === Workup_States.IN_CART.name
		const is_ORDERED = state === Workup_States.ORDERED.name
		const cant_Add = !workupWizardStore._workup_is_cartable || is_ORDERED || is_In_CART
		const message = cant_Add
			? is_ORDERED
				? 'This workup has already been ordered' 
				: is_In_CART
					? 'This workup is already in the CART'
					: 'You need to add at least one print or a digital download to move this workup to the CART. If you remember adding either of these, then check the downloads (or prints) areas and see if you left any selections excluded (i.e. check that at least one checkbox is checked and that the selections are complete)'
			: undefined

		return (
			<Add_To_Cart_Zone_		style={{ zIndex: workupWizardStore.eyeMode_is_active ? -1 : 1 }}>
				<Title_Block_>
					<Title_>
						{
							__.map(lines_in_title, (line, i) => {
								return (
									<li key={i}
										style={{
											fontSize: i + 1 === lines_in_title.length ? '1.5em' : '2em',
											fontWeight: i + 1 === lines_in_title.length ? '400' : '700',
										}}
									>
										{line}
									</li>
								)
							})
						}
					</Title_>
					<Image_ 							src={ image_to_show }	/>
				</Title_Block_>

					{ cant_Add
					? ( 
						<Outer_>
							<YesNo_Block_>
									<Message_Container_ >
										<Message_> { message } </Message_>
									</Message_Container_>
							</YesNo_Block_ >
						</Outer_>
						) 

					: (  // user must authorize moving workup into the cart
						<Outer_>
							<VSpacer_ />
							<Question_Container_>
								<Question_ > { question } </Question_>
								{
									explain.length > 0 ? (
										<Explain_>
											{
												__.map(explain, (line, i) => {
													return (
														<Explain_Item_ key={i} >
															<Icon_Container_>
																<Icon_ className='fa fa-check-circle' />
																<Explanation_ key={i}> { line } </Explanation_>
															</Icon_Container_>
														</Explain_Item_>
													)
												})
											}
										</Explain_>) : null
								}

							</Question_Container_>
							<VSpacer_ />
							<YesNo_Block_>
								<Button 	
									onClick={this.handleNoClick} 
									bgColour={this.yes_or_no === 'no' ? '#08c' : '#93c8e2'}
									cursor={cant_Add ? 'not-allowed' : 'pointer'}
									title='No'
									textColour='white'
									isDisabled={cant_Add}
								/>

								<Button 	
									onClick={this.handleYesClick} 
									bgColour={this.yes_or_no === 'yes' ? '#08c' : '#93c8e2'}
									cursor={cant_Add ? 'not-allowed' : 'pointer'}
									title='Yes'
									textColour='white'
									isDisabled={cant_Add}
								/>
							</YesNo_Block_ >
						</Outer_>
					) }

			</Add_To_Cart_Zone_>
		)
	}
}
// ====================================================================

export { Add_To_Cart_Zone }


