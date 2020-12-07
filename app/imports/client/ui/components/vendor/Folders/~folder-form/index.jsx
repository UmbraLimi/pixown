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
class Folder_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	render() {
		const { Manager:folderManager, events, formStore } = this.props
		const pass_thru = {
			manager: folderManager, 
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
						id='name'
						label="Name"
						tabIndex={this.tabIndexGen.next().value}
				/>
				<Field 	{...pass_thru} 					
						id='sequence'
						label="Sequence"
						tabIndex={this.tabIndexGen.next().value}
				/>
			</div>
    )
	}
}
// ====================================================================

export { Folder_Form }
