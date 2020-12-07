import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action } 	from  'mobx'
import numeral 									from  'numeral'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { Title_Block_, Outer_, Title_, Image_, Question_, VSpacer_,
	Question_Container_, Explanation_, Explain_Item_,
	Icon_Container_, Icon_, Explain_
} 															from  '../zone-styles.js'
import { Download_Zone_, Main_, Section_Row_,
	Section_Header_, Section_Body_, Section_Title_,
	Total_Section_Cost_
} 															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Downloading_Section }   	from  './downloading-section/index.jsx'

// ====================================================================
@inject('store')
@observer
class Download_Zone extends React.Component {

	render() {

		const { store } = this.props
		const { workupWizardStore } = store

		const image_to_show = workupWizardStore._activePage.image_filename
		const lines_in_title = workupWizardStore._activePage.title.split("|")
		const question = workupWizardStore._activePage.question
		const explain = workupWizardStore._activePage.explain
		////changePanel={this.changePanel}
		////currentPanel={this.state.active_panel}
		const pricing_ok = workupWizardStore._totalPriceForDownloads_is_ok
		const price = workupWizardStore._totalPrice_for_downloads
		const show_price = `${numeral(price/100).format('$ 0.00')}${pricing_ok ? '' : '?'}`

		return (
			<Download_Zone_ 			style={{ zIndex: workupWizardStore.eyeMode_is_active ? -1 : 1 }}>
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
				<Image_ 					src={ image_to_show }
				/>
			</Title_Block_>
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
				<Main_>
					<Section_Row_>
						<Section_Header_ >
							<Section_Title_	> { 'Downloads' } </Section_Title_>
							<Total_Section_Cost_> 
								{ `Total: ${show_price}` }
							</Total_Section_Cost_>
						</Section_Header_>

						<Section_Body_>
							<Downloading_Section />
						</Section_Body_>

					</Section_Row_>
				</Main_>

		</Download_Zone_>
		)
	}
}
// ====================================================================

export { Download_Zone }


