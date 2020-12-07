import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
import numeral 									from  'numeral'
// ----styles-----------------------
import { Workup_Panel_, Workup_Header_, Sitting_Code_,
					Spacer_, Id_, Workup_, Selections_,
					Section_Summary_, Section_Header_,
					Section_Label_, Total_Section_Cost_,
					Section_Selections_, Service_Code_,
					Option_Code_, Total_Summary_, 
					Total_Header_, Total_Cost_, Pose_Panel_,
					Pose_, Pose_Image_, Pose_Label_, Pose_Code_,
					Item_, Icon_
}															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Workup_Panel extends React.Component {

	handleWorkupClick = () => {
		// load the wup into the store: workup then go to it
		const { store, wup_store } = this.props
		const wup = wup_store.record
		const { app, router } = store
		const { workupWizardStore } = store
		workupWizardStore._initialize_from_dbRecord(wup)
		// start user on first available service in their agreement
		const service_code = wup_store._retouchAgreementRecordWithServiceDetails.services_list[0].service_code
		router.goTo(app_routes.workup_wizard, { page: service_code }, store)
	}

	render() {
		const { store, wup_store } = this.props
		//const { cart } = store
		const wup = wup_store.record
		const trc = wup_store._totalPrice_for_retouches
		const tpc = wup_store._totalPrice_for_prints
		const tdc = wup_store._totalPrice_for_downloads
		const tot = trc + tpc + tdc

		const wanted_retouch_items = wup_store._wantedRetouches
		const wanted_print_items = wup_store._wantedPrints
		const wanted_download_items = wup_store._wantedDownloads
		const image_url = wup_store._latestImageURL_for_workup
		//const image_url = wup_store._closestImageURL_for_pose

		return (
			<Workup_Panel_>
				<Workup_Header_>
					<Sitting_Code_ > { wup_store.record.sitting_code } </Sitting_Code_>
					<Spacer_ />
					<Id_ > { wup._id } </Id_>
				</Workup_Header_>
				<Workup_>
					<Pose_Panel_>
						<Pose_						onClick={ this.handleWorkupClick }
						>
							<Pose_Image_ 		src={ image_url }/>
						</Pose_>
						<Pose_Label_>
							<Pose_Code_ >	{ 'Pose ' + wup.pose_code } </Pose_Code_>
						</Pose_Label_>
					</Pose_Panel_>

					<Selections_>
						<Section_Summary_>
							<Section_Header_>
								<Section_Label_>Retouching </Section_Label_>
								<Total_Section_Cost_>
									{ 'Total: ' + numeral(trc/100).format('$ 0.00') }
								</Total_Section_Cost_>
							</Section_Header_>
							<Section_Selections_>
								<Option_Code_ 	className={'fa-ul'}>
									{ wanted_retouch_items.length === 0 ? (
										<Item_>
											<Icon_ 			className={'fa fa-li fa-circle'} />
											{ 'no retouching selected' }
										</Item_>
									) : (
										__.map(wanted_retouch_items, (item,i) => {
											return (
												<Item_ key={item.service_code} >
													<Icon_ 			className={'fa fa-li fa-check'} />
													{ `(${item.service_code})` }
												</Item_>
											)
										})
									)}
								</Option_Code_>
							</Section_Selections_>
						</Section_Summary_>

						<Section_Summary_>
							<Section_Header_>
								<Section_Label_ > Printing </Section_Label_>
								<Total_Section_Cost_>
									{ 'Total: ' + numeral(tpc/100).format('$ 0.00') }
								</Total_Section_Cost_>
							</Section_Header_>
							<Section_Selections_>
								<Option_Code_ 	className={'fa-ul'}>
									{ wanted_print_items.length === 0 ? (
										<Item_>
											<Icon_ 			className={'fa fa-li fa-circle'} />
											{ 'no prints selected' }
										</Item_>
									) : (
										__.map(wanted_print_items, (item,i) => {
											return (
												<Item_ key={item.option_code} >
													<Icon_ 			className={'fa fa-li fa-check'} />
													{ `(${item.qty}) ${item.size} in ${item.colour}/${item.finish}` }
												</Item_>
											)
										})
									)}
								</Option_Code_>
							</Section_Selections_>
						</Section_Summary_>
						
						<Section_Summary_>
							<Section_Header_>
								<Section_Label_ > Downloading </Section_Label_>
								<Total_Section_Cost_>
									{ 'Total: ' + numeral(tdc/100).format('$ 0.00') }
								</Total_Section_Cost_>
							</Section_Header_>
							<Section_Selections_>
								<Option_Code_ 	className={'fa-ul'}>
									{ wanted_download_items.length === 0 ? (
										<Item_>
											<Icon_ 			className={'fa fa-li fa-circle'} />
											{ 'no prints selected' }
										</Item_>
									) : (
										__.map(wanted_download_items, (item,i) => {
											return (
												<Item_ key={item.option_code} >
													<Icon_ 			className={'fa fa-li fa-check'} />
													{ `${item.size} in ${item.colour}` }
												</Item_>
											)
										})
									)}
								</Option_Code_>
							</Section_Selections_>
						</Section_Summary_>

						<Total_Summary_>
							<Total_Header_>
								<div> Total Cost </div>
								<Total_Cost_>
									{ 'Total: ' + numeral(tot/100).format('$ 0.00') }
								</Total_Cost_>
							</Total_Header_>
						</Total_Summary_>
					</Selections_>
				</Workup_>

			</Workup_Panel_>
		)
	}
}
// ====================================================================

export { Workup_Panel }