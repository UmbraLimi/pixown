// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import {
	Section_Separator_, Insurance_Section_,
	HSpacer, Test_
} 															from  './styles.js'
// ----helpers----------------------
import { Customer_Masthead_Spec }
						from '/imports/client/ui/components/vendor/PUsers/customer-masthead/masthead-spec.js'
// ----enums------------------------
import { nextInteger }					from  '/imports/client/misc/misc.js'
import { Value_Types }          from  '/imports/enums/value-types.js'
// ----collections------------------
// ----components-------------------
import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'
import { Workups_Section }			from  './workups-section/index.jsx'

// ====================================================================
@inject('store')
@observer
class Order_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	render() {
		const { Manager:orderManager, events, formStore } = this.props
    //const { workupManagerList } = orderManager
		const pass_thru = {
			manager: orderManager, 
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
				<Field 	{...pass_thru}			
						id='customer_code'
						label="Customer Code"
						tabIndex={this.tabIndexGen.next().value}
						title={Customer_Masthead_Spec(orderManager)}
				/>
				<Field 	{...pass_thru} 					
						id='num_workups'
						label="Number of Workups"
						compute={{
							type:'MANAGER',
							computed: 'num_workups',
						}}
				/>
				<Field 	{...pass_thru} 					
						id='customer_name'
						label="Customer Name"
						compute={{
							type:'MANAGER',
							computed: '_customersRecord',
							field_to_retrieve: 'username'
						}}
				/>
				<Field 	{...pass_thru} 					
						id='payment_provider'
						label="Payment Provider"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='payment_datetime'
						label="Payment Date"
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ ><p>Stripe</p></Section_Separator_>
				<Field 	{...pass_thru} 					
					id='stripe_charge.amount'
					label="Charged to Stripe"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='stripe_charge.currency'
						label='Currency'
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='stripe_charge.source'
						label="Source"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='stripe_charge.description'
						label="Description of Charge"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='stripe_charge.receipt_email'
						label="Receipt Email"
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Field 	{...pass_thru}
						id='stripe_response'
						label="Stripe Response"
						//type='object-table'
						type='object-dump'
						rows={9}
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ ><p>Workups</p></Section_Separator_>
				<Workups_Section orderManager={orderManager} />

				<Section_Separator_ ><p>Studios</p></Section_Separator_>
				<Table 	{...pass_thru}
					id='studio_codes'
					cols={[
						{
							id: '--parent--', // means use the table's id Field 	{...pass_thru}
							label: "Studio Code",
							flex: '0 0 110px',
						},
						{
							id: 'studio_name',
							hidden: false,
							label: 'Studio Name',
							flex: '0 0 100px',
							compute: {
								type: 'LOOKUP',
								colleXion: 'VENDORS',
								findOne: true,
								field_to_retrieve: 'name',
								linked_fields: [{
									local: 'studio_codes[i]',
									foreign: 'vendor_code'
								}]
							}
						},
					]}
				/>

				<Section_Separator_ ><p>Insurance</p></Section_Separator_>
				<Insurance_Section_>
					<Field 	{...pass_thru} 		
						inputStyler={`
							margin-top: 10px;
							flex: 1;
						`}
						id='insurance.wanted'
						label="Wanted?"
						type='checkbox'
						tabIndex={this.tabIndexGen.next().value}
					/>
					<Field 	{...pass_thru} 
						labelStyler={`
							margin-left: 20px;
							width: 80px;
						`}					
						inputStyler={`
							flex: 4;
						`}					
						id='insurance.cost'
						label="Charge"
						fformat={['dollarify']}
						tabIndex={this.tabIndexGen.next().value}
					/>
				</Insurance_Section_>

				<Section_Separator_ ><p>Raw Costs</p></Section_Separator_>
				<Field 	{...pass_thru} 					
					id='raw_cost_totals.retouching'
					label="Retouching"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
					id='raw_cost_totals.prints'
					label="Prints"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
					id='raw_cost_totals.downloads'
					label="Downloads"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
					id='raw_cost_totals.total'
					label="Total"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ ><p>Discounts</p></Section_Separator_>
				<Field 	{...pass_thru} 					
					id='discounts.retouching'
					label="Retouching"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
					id='discounts.flash_sale'
					label="Flash Sale"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
					id='discounts.cost_threshold'
					label="Cost Threshold"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
					id='discounts.total'
					label="Total"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ />
				<Field 	{...pass_thru} 					
					id='postage_handling'
					label="Postage and Handling"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ />
				<Field 	{...pass_thru} 					
					id='pre_hst_total'
					label="Pre-HST Total"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ />
				<Field 	{...pass_thru} 					
					id='hst'
					label="HST"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ />
				
				<Field 	{...pass_thru} 					
					id='grand_total_cost'
					label="Grand Total"
					fformat={['dollarify']}
					tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='createdOn'
						label="Created"
						tabIndex={this.tabIndexGen.next().value}
				/>			
			</div>
    )
	}
}
// ====================================================================

export { Order_Form }
