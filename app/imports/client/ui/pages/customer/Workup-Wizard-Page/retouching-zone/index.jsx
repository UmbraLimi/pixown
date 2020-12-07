// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action } 	from  'mobx'
import { _ as __ } 							from  'lodash'
import { toast } 								from  'react-toastify'
import numeral 									from  'numeral'
// ----styles-----------------------
//import { theme }           			from  '/imports/client/ui/styles/theme.js'
import { 
	Title_Block_, Title_, Image_for_Retouch_, 
	Question_, VSpacer_, Explain_Item_,
	Question_Container_, Explanation_, 
	Icon_Container_, Icon_, Explain_
} 															from  '../zone-styles.js'
import { 
	Retouching_Zone_, YesNo_Block_,
	Cost_, Free_Label_, 
	Cost_Container_, Free_Container_, 
	Free_Why_, Free_If_, Image_Label_
} 															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Retouching_Zone extends React.Component {
	
	@observable  before_or_after = 'after'

	@action
	toggle_before_or_after = () => {
		this.before_or_after = this.before_or_after === 'after' ? 'before' : 'after'
	}
	
	@action
	handleYesClick = () => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_keyValue_for_activeRetouch('wanted', true)
		workupWizardStore._save_workup_to_db()
	}

	handleNoClick = () => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_keyValue_for_activeRetouch('wanted', false)
		workupWizardStore._save_workup_to_db()
	}

	handleFreeWhyClick = () => {
		toast.info("This service is free because you have previously paid for it in another order of this pose.")
	}

	render() {

		const { store } = this.props
		const { workupWizardStore } = store
		
		const { _serviceDetails_for_activeRetouch: service } = workupWizardStore
		const image_to_show = this.before_or_after === 'after'
			? service._service_code_details.image_filename
			: service._service_code_details.image_before_filename
		const label_to_show = this.before_or_after === 'after'
			? 'After'
			: 'Before'
		const lines_in_title = service._service_code_details.title.split("|")
		const question = service._service_code_details.question
		const explain = service._service_code_details.explain
		const is_wanted = workupWizardStore._wanted_for_activeRetouch
		const No_button_isDisabled = false
		const Yes_button_isDisabled = false

		return (
			<Retouching_Zone_ 		style={{ zIndex: workupWizardStore.eyeMode_is_active ? -1 : 1 }}>
				<Title_Block_>
					<Title_>
						{
							__.map(lines_in_title, (line, i) => {
								return (
									<li 			key={i}
										style={{
											fontSize:   i + 1 === lines_in_title.length ? '1.5em' : '2em',
											fontWeight: i + 1 === lines_in_title.length ? '400'   : '700',
										}}
									>
										{line}
									</li>
								)
							})
						}
					</Title_>
					<Image_for_Retouch_	src={image_to_show}
															onClick={this.toggle_before_or_after}
					/>
					<Image_Label_>{label_to_show}</Image_Label_>
				</Title_Block_>
				<VSpacer_ />
				<Question_Container_>
					<Question_ >
						{ question }
					</Question_>
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
						bgColour={!is_wanted ? '#08c' : '#93c8e2'}
						cursor={No_button_isDisabled ? 'not-allowed' : 'pointer'}
						title='No'
						textColour='white'
						isDisabled={No_button_isDisabled}
					/>
					<Cost_Container_ >
						<span>COST</span>
						<Cost_>{ workupWizardStore._finalPixownPrice_for_activeRetouch === 0
							? <Free_Container_>
								<Free_Label_> 
									It's Free! 
								</Free_Label_>
								{ is_wanted === false 
									? <Free_If_>
											(if you want it)
										</Free_If_> 
									: null 
								}
								<Free_Why_	onClick={ this.handleFreeWhyClick }> 
									why? 
								</Free_Why_>
							</Free_Container_>
							: numeral(workupWizardStore._finalPixownPrice_for_activeRetouch / 100).format('$ 0.00')}
						</Cost_>
					</Cost_Container_>
					<Button 	
						onClick={this.handleYesClick} 
						bgColour={is_wanted ? '#08c' : '#93c8e2'}
						cursor={Yes_button_isDisabled ? 'not-allowed' : 'pointer'}
						title='Yes'
						textColour='white'
						isDisabled={Yes_button_isDisabled}
					/>
				</YesNo_Block_ >
			</Retouching_Zone_>
		)
	}
}
// ====================================================================

export { Retouching_Zone }


