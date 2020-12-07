// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Section_Separator_ }		from  './styles.js'
// ----helpers----------------------
import { nextInteger }					from  '/imports/client/misc/misc.js'
import { Vendor_Masthead_Spec }
						from '/imports/client/ui/components/vendor/Vendors/vendor-masthead/masthead-spec.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Agreement_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	render() {
		const { Manager:daManager, events, formStore } = this.props
		const pass_thru = {
			manager: daManager, 
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
						id='agreement_code'
						label="Agreement Code"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='vendor_code'
						label="Studio"
						tabIndex={this.tabIndexGen.next().value}
						title={Vendor_Masthead_Spec(daManager)}
				/>
				<Field 	{...pass_thru} 					
						id='title'
						label="Title"
						tabIndex={this.tabIndexGen.next().value}
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

export { Downloading_Agreement_Form }
