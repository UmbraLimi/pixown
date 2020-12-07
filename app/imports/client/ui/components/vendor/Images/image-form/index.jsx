// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Section_Separator_ }		from  './styles.js'
// ----helpers----------------------
// ----enums------------------------
import { nextInteger }					from  '/imports/client/misc/misc.js'
import { Value_Types }          from  '/imports/enums/value-types.js'
// ----collections------------------
// ----components-------------------
import { Table } 								from  '/imports/client/ui/components/table/index.jsx'
import { Field } 								from  '/imports/client/ui/components/field/index.jsx'

// ====================================================================
@inject('store')
@observer
class Image_Form extends React.Component {
	constructor(props) {
		super(props)
		this.tabIndexGen = nextInteger() // initialize the tabIndex generator	
	}

	render() {
		const { Manager:imageManager, events, formStore } = this.props
		const pass_thru = {
			manager: imageManager, 
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
				<Section_Separator_ />

			</div>
    )
	}
}
// ====================================================================

export { Image_Form }
