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
import { School_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Schools/school-masthead/masthead-spec.js'
import { Vendor_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Vendors/vendor-masthead/masthead-spec.js'
import { Customer_Masthead_Spec }
						from '/imports/client/ui/components/vendor/PUsers/customer-masthead/masthead-spec.js'
// ----enums------------------------
import { Value_Types }          from  '/imports/enums/value-types.js'
// ----collections------------------
// ----components-------------------
import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'

// ====================================================================
@inject('store')
@observer
class Workup_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	render() {
		const { Manager:workupManager, events, formStore } = this.props
		const pass_thru = {
			manager: workupManager, 
			formStore: formStore,
			disabled: true // acts as a default
		}

		return (
			<div>
				<Field 	{...pass_thru}
						id='_id'
						label="_id"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Section_Separator_ />
				<Field 	{...pass_thru}
						id='state'
						label="Status"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}			
						id='customer_code'
						label="Customer Code"
						tabIndex={this.tabIndexGen.next().value}
						title={Customer_Masthead_Spec(workupManager)}
				/>
				<Field 	{...pass_thru}
						id='studio_code'
						label="Studio Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Vendor_Masthead_Spec(workupManager)}
				/>
				<Field 	{...pass_thru}
						id='school_code'
						label="School Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={School_Masthead_Spec(workupManager)
						}
				/>
				<Field 	{...pass_thru}
						id='pose_code'
						label="Pase Code"
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
						title={Downloading_Agreement_Masthead_Spec(workupManager)}
				/>
				<Field 	{...pass_thru}
						id='retouching_agreement_code'
						label="Retouching Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Retouching_Agreement_Masthead_Spec(workupManager)}
				/>
				<Field 	{...pass_thru}
						id='printing_agreement_code'
						label="Printing Code"
						disabled={true}
						tabIndex={this.tabIndexGen.next().value}
						title={Printing_Agreement_Masthead_Spec(workupManager)}
				/>

				<Section_Separator_ />

				<Field 	{...pass_thru}
						id='last_updated'
						label="Last Updated"
						tabIndex={this.tabIndexGen.next().value}
				/>			

			</div>
    )
	}
}
// ====================================================================

export { Workup_Form }
