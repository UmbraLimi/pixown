// ----node-packages----------------
import React 										from 	'react'
import { observable, action, toJS } 	from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@observer
class DynamicImport extends React.Component {
	@observable ccomponent = null
	@observable classToUse = null

	@action
	_set_dynamic_stuff = (component, classToUse) => {
		this.classToUse = classToUse
		this.ccomponent = component.default 
			? component.default 
			: component
}

	componentDidMount() {
    this.props.load()
		.then((component) => {
			this._set_dynamic_stuff(component, this.props.classToUse)
		})
		.catch((error) => {
			debugger
		})
	}

  render() {
		const Comp = this.ccomponent 
			? this.ccomponent[this.classToUse] 
			: null
		
		/*const Comp = this.state.component 
			? this.state.component.Pre_Connect 
				? this.state.component.Pre_Connect // in case there is a pre_Connect.jsx
				: this.state.component
			: null
		*/

		//return Comp ? <Comp /> : null // works!
		return this.props.children(Comp) // works!
  }
}
// ========================================================================

export { DynamicImport }
