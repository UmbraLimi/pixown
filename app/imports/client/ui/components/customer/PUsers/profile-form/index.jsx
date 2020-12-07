// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Section_Separator_ } 	from  './styles.js'
// ----helpers----------------------
import { nextInteger }					from  '/imports/client/misc/misc.js'
// ----collections------------------
// ----components-------------------
//import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'

// ====================================================================
@inject('store')
@observer
class Profile_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

  render() {
		const { Manager:puserManager, events, formStore } = this.props
		const pass_thru = {
			manager: puserManager, 
			formStore: formStore,
			disabled: false // acts as a default
		}

		return (
			<div>
				<Field 	{...pass_thru}
						id='username'
						label="Username"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='surname'
						label="Surname"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='other_names'
						label="Other Names"
						rows={2}
						multiline={true}
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ >
					<p>Mailing Address</p>
				</Section_Separator_>

				<Field 	{...pass_thru}
						id='mailing_address.street'
						label="Street Address"
						rows={3}
						multiline={true}
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='mailing_address.province'
						label="Province"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='mailing_address.postal_code'
						label="Postal Code"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='mailing_address.country'
						label="Country"
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ >
					<p>Billing Address</p>
				</Section_Separator_>

				<Field 	{...pass_thru}
						id='billing_address.street'
						label="Street Address"
						rows={3}
						multiline={true}
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='billing_address.province'
						label="Province"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='billing_address.postal_code'
						label="Postal Code"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='billing_address.country'
						label="Country"
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Section_Separator_ />

				<Field 	{...pass_thru}
						id='email'
						label="Email"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru}
						id='phone'
						label="Phone"
						tabIndex={this.tabIndexGen.next().value}
				/>
			</div>
    )
	}
}
// ====================================================================

export { Profile_Form }
