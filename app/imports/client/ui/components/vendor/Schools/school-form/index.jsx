// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Section_Separator_ }		from  './styles.js'
// ----helpers----------------------
import { nextInteger }					from  '/imports/client/misc/misc.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'

// ====================================================================
@inject('store')
@observer
class School_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	render() {
		const { Manager:schoolManager, events, formStore } = this.props
		const pass_thru = {
			manager: schoolManager, 
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
						id='school_code'
						label="School Code"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='name'
						label="Name"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='image_url'
						label="Image"
						disabled={false}
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 	
						id='image_url'
						label="Image"
						disabled={false}
						compute={{
							type: 'RECORD',
							field_to_retrieve: 'image_url',
							notfound: '/images/image-not-foundx100x100.png',
						}}
						fformat={[{verb:'imageify', args: {width:'200px'}}]}
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='title'
						label="Title"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='city'
						label="City"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='province_state'
						label="Province"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='country'
						label="Country"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='vendor_code_list'
						label="Studios"
						tabIndex={this.tabIndexGen.next().value}
				/>

				<Table 	{...pass_thru}
					id='vendor_code_list'
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
									local: 'vendor_code_list[i]',
									foreign: 'vendor_code'
								}]
							}
						},
					]}
				/>

				<Field 	{...pass_thru} 					
						id='last_updated'
						label="Updated"
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

export { School_Form }
