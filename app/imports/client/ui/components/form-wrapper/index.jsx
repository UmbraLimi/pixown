// ----node_modules-----------------
import React                    from  'react'
import { autorun, toJS }				from  'mobx'
import { observer, inject } 		from  'mobx-react'
// ----styles-----------------------
import { 
	Section_, Form_Wrapper_, Button_Wrapper_
}																from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Form_Wrapper extends React.Component {
	// ====================================================================
	constructor(props){
		super(props)
		const { store, Manager } = props
		const { source, record, notifyStore, colleXion } = Manager

		this.formStore = new store.factories.formFactory(store, {
			//mode: mode,
		})
		this.formStore.initialize({
			starting_record: record, 
			mode: source.parms.mode,
			schema: colleXion.schema, 
			colleXion: colleXion, 
			notifyStore: notifyStore, // allows errors to be sent to parent store (set_hasErros() and unset_hasErrors())
		})
		this.formStore.validateStartingRecord()
	}
	// ====================================================================
	disposer = autorun(
		() => {}
	)
	// ====================================================================
	componentWillUnMount() {
		this.disposer()
	}
	// ====================================================================
	handleSaveButton = (event) => {
		// even if errors, this method is called
		const { Manager } = this.props
		const { hasErrorsSomewhere } = this.formStore
		if (!hasErrorsSomewhere) { // need this as 'button' is a div
			this.formStore.SaveCurrentRecord() // Validation is done pre-save on server
			// do store-specifc post_save function (if there)
			if (Manager.postSave) {
				Manager.postSave(this.formStore.current_record)
			}
		}
	}
	// ====================================================================
	/*handleBlur = (event) => {} trasnferred to FormStore */
	// ====================================================================
	/*handleChange = (event) => {} trasnferred to FormStore */
	// ====================================================================
	/*handleFocus = (event) => {} trasnferred to FormStore */
	// ====================================================================
	render() {
		const { Manager } = this.props
		const { Form_Content } = Manager 
		const { hasErrorsSomewhere } = this.formStore
		const mode = this.formStore.mode
		const isDirty = this.formStore.isDirty
		const button_label=hasErrorsSomewhere
			? 'You have Errors'
			: isDirty 
				? mode==='EXISTING' 
					? "Save Changes" 
					: "Save"
				: "No Changes Yet"
		const button_isDisabled = hasErrorsSomewhere || (!hasErrorsSomewhere && !isDirty)

		return (
			<Section_  className='Section_' >
				<Form_Wrapper_ 	className='Form_Wrapper_' >
					<Form_Content  formStore={this.formStore} Manager={Manager}/>
					<Button_Wrapper_ >
						<Button
								onClick={this.handleSaveButton} 
								bgColour={button_isDisabled ? 'gainsboro' : '#08c'}
								cursor={button_isDisabled ? 'not-allowed' : 'pointer'}
								title={button_label}
								textColour={button_isDisabled ? 'black' : 'white'}
								isDisabled={button_isDisabled}
						/>
					</Button_Wrapper_ >
				</Form_Wrapper_>
			</Section_>
		)
	}
}
// ====================================================================

export { Form_Wrapper }
