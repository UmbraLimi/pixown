// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Section_Separator_ }		from  './styles.js'
// ----helpers----------------------
import { nextInteger }					from  '/imports/client/misc/misc.js'
import { Printing_Agreement_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Printing-Agreements/printing-agreement-masthead/masthead-spec.js'
import { Retouching_Agreement_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreement-masthead/masthead-spec.js'
import { Downloading_Agreement_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreement-masthead/masthead-spec.js'
import { Customer_Masthead_Spec }
						from '/imports/client/ui/components/vendor/PUsers/customer-masthead/masthead-spec.js'
import { School_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Schools/school-masthead/masthead-spec.js'
import { Vendor_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Vendors/vendor-masthead/masthead-spec.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'

import { Pre_Popup as Schools_Popup }      	
					from  '/imports/client/ui/components/vendor/Schools/schools-popup/pre-popup.jsx'
import { Printing_Agreements_Popup }         
					from  '/imports/client/ui/components/vendor/Printing-Agreements/printing-agreements-popup/pre-popup.jsx'
import { Pre_Popup as Retouching_Agreements_Popup }         
					from  '/imports/client/ui/components/vendor/Retouching-Agreements/retouching-agreements-popup/pre-popup.jsx'
import { Downloading_Agreements_Popup }         
					from  '/imports/client/ui/components/vendor/Downloading-Agreements/downloading-agreements-popup/pre-popup.jsx'

// ====================================================================
@inject('store')
@observer
class Sitting_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	// ====================================================================
	handlePrintingAgreementCodeChange = (agreement_record) => {
		this.props.formStore.handleValueChange('printing_agreement_code', agreement_record.agreement_code)
	}
	// ====================================================================
	handleRetouchingAgreementCodeChange = (agreement_record) => {
		this.props.formStore.handleValueChange('retouching_agreement_code', agreement_record.agreement_code)
	}
	// ====================================================================
	handleSchoolCodeChange = (school_record) => {
		this.props.formStore.handleValueChange('school_code', school_record.school_code)
	}
	
	handleDownloadingAgreementCodeChange = (agreement_record) => {
		this.props.formStore.handleValueChange('downloading_agreement_code', agreement_record.agreement_code)
	}

	render() {
		const { Manager:sittingManager, events, formStore } = this.props
		const pass_thru = {
			manager: sittingManager, 
			formStore: formStore
		}

		return (
			<div>
				<Field 	{...pass_thru}
						id='_id'
						label="_id"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='studio_code'
						label="Studio Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Vendor_Masthead_Spec(sittingManager)}
				/>
				<Field 	{...pass_thru}
						id='school_code'
						label="School Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={School_Masthead_Spec(sittingManager)}
						popup = {{
							component:  Schools_Popup,
							select_params: {},
							handlePopupReturnValue: this.handleSchoolCodeChange,
						}}
				/>
				<Field 	{...pass_thru}
						id='sitting_code'
						label="Sitting Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title='This is the sitting code, pal'
				/>
				<Field 	{...pass_thru}
						id='upload_code'
						label="Upload Code"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='customer_code'
						label="Customer Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Customer_Masthead_Spec(sittingManager)}
				/>

				<Section_Separator_ >
					<p>Proofs</p>
					<Table  {...pass_thru}
							id='proofs_list'
							cols={[
								{
									id: 'pose_code',
									flex: '0 0 80px',
									label: "Pose Code",
									disabled: true
								},
								{
									id: 'image_id',
									hidden: true,
									label: "Image ID",
									flex: '0 0 70px',
								},
								{
									id: 'filename',
									hidden: false,
									label: 'File',
									flex: '0 0 100px',
									compute: {
										type: 'LOOKUP',
										colleXion: 'IMAGES',
										findOne: true,
										field_to_retrieve: 'filename',
										linked_fields: [{
											foreign: '_id',
											local: 'proofs_list[i].image_id'
										}]
									}
								},
								{
									id: 'pose_image',
									label: 'Pose',
									flex: '0 0 100px',
									compute: {
										type: 'LOOKUP',
										colleXion: 'IMAGES',
										findOne: true,
										field_to_retrieve: 'url',
										linked_fields: [{
											foreign: '_id',
											local: 'proofs_list[i].image_id'
										}],
										notfound: '/images/image-not-foundx100x100.png',
									},
									fformat: [{verb:'imageify', args: {width:'80px'}}]
								},
								{
									id: 'paid_retouching_list',
									table: true,
									flex: '1 1 auto',
									label: "Paid Retouching",
									cols:[
										{
											id: 'service_code',
											label: "Service Code",
											flex: '0 0 150px',
										},
										{
											id: 'delivery_state',
											label: "Delivery Status"
										},
									]
								},
							]}
					/>
				</Section_Separator_>

				<Section_Separator_ />

				<Field 	{...pass_thru}
						id='photographer'
						label="Photographer"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='is_retake'
						label="Retake?"
						type='checkbox'
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ >
					<p>Vendor Agreements</p>
				</Section_Separator_>

				<Field 	{...pass_thru}
						id='downloading_agreement_code'
						label="Downloading Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Downloading_Agreement_Masthead_Spec(sittingManager)}
						popup = {{
							component:  Downloading_Agreements_Popup,
							handlePopupReturnValue: this.handleDownloadingAgreementCodeChange,
							tempStore: this.props.store 
						}}
				/>
				<Field 	{...pass_thru}
						id='retouching_agreement_code'
						label="Retouching Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Retouching_Agreement_Masthead_Spec(sittingManager)}
						popup = {{
							component:   Retouching_Agreements_Popup,
							handlePopupReturnValue: this.handleRetouchingAgreementCodeChange,
							tempStore: this.props.store 
						}}
				/>
				<Field 	{...pass_thru}
						id='printing_agreement_code'
						label="Printing Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Printing_Agreement_Masthead_Spec(sittingManager)}
						popup = {{
							component:  Printing_Agreements_Popup,
							handlePopupReturnValue: this.handlePrintingAgreementCodeChange,
							tempStore: this.props.store 
						}}
				/>

				<Section_Separator_ >
					<p>Studio Data</p>
				</Section_Separator_>

				<Field 	{...pass_thru}
						id='studio_data.key'
						label="Key"
						manager={sittingManager}
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='last_updated'
						label="Last Updated"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						fformat={['dateify']}
				/>			
			</div>
    )
	}
}
// ====================================================================

export { Sitting_Form }
