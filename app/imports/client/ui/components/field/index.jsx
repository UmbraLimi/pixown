// ----node-packages----------------
import React                    from  'react'
import { autorun, toJS }				from  'mobx'
import { observable, action } 	from  'mobx'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
import numeral 									from  'numeral'
import styled, { keyframes }    from  'styled-components'
// ----styles-----------------------
import { 
	Form_Group_2, Label_2, Input_2, 
	Error_List_2, Error_2, 
	InputWithError_, TextArea_2, 
	Input_Row_, Title_Row_,
	SubObject_, Cell_2
}																from  './styles.js'
// ----helpers----------------------
import { format_from_array } 		from  '/imports/client/misc/formatter.js'
import { computor }             from  '/imports/client/misc/computor.js'
// ----collections------------------
// ----components-------------------
import { Modal } 								from  '/imports/client/ui/components/modal/index.jsx'
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Field extends React.Component {

	@observable  show_popup = false

	@action toggle_show_popup = () => {this.show_popup = !this.show_popup }

		/* Field defaults and options
			id={id} // required
			inputStyler={flex:1; margin:4px;} // if present, overrides styles on 
			                 TextArea_, Textarea_2, CheckBox_, Input_2
			labelStyler={color:green; width:110px;} // if present, overrides styles on <Label_2>
			manager={sittingManager} // required
			label='~label' // or supplied label
			disabled=false // true will display but cannot be edited
			multiline=false // if true then TEXTAREA and uses rows=
			tabIndex=0 // or whatever integer is supplied
			rows=false // 3, 4 etc. Valid only when multiline=true
			type='text' // checkbox, OBJECT-DUMP, 'OBJECT-TABLE'
			title=false // text or {object} that shows as r/o HTML in modal
			popup=false // {object} that displays a popup for selecting a value in a list
			configuration='single' // so far only 'SINGLE'
			compute=false // {object} which is a @computed in the manager
		*/

	render() {
		const { manager:field_manager, store, formStore } = this.props
		const { labelStyler, inputStyler, compute, fformat } = this.props
		const { id, label='~~label', tabIndex=0, type='text' } = this.props
		const { multiline=false, disabled=false, rows=false } = this.props
		const { title=false, popup=false, configuration='single' } = this.props
		
		const { theme_colour, button_theme_colour, button_hover_theme_colour} = field_manager

		const current_value_for_textbox = formStore.getCurrentValueForTextbox(id)
		const starting_value = formStore.getStartingValue(id)
		const current_value = formStore.getCurrentValue(id)
		const data = {
			a: 				id,
			display: 	current_value_for_textbox,
			dispsrc: 	formStore.getCurrentSourceForTextbox(id),
			value: 		current_value,
			errors: 	toJS(formStore.getCurrentErrors(id)),
			starting: starting_value,
			isDirty: 	starting_value !== current_value // current_value_for_textbox
		}

		const title_to_use = title
			? typeof title === 'object'
				? React.createElement(title.component, {
						tempStore: store,
						title: title,
						[title.code_field]: current_value_for_textbox, // e.g school_code: <<its current value in form>>
					})
				: (<Title_Row_>{title}</Title_Row_>)
			: undefined

		return (
			<Form_Group_2 >
				<Label_Section__ 
						label={label} 
						dat={data}
						labelStyler={labelStyler}
				/>
				<InputWithError_>
					<Input_Section__ 
							manager={field_manager}
							inputStyler={inputStyler}
							formStore={formStore}
							id={id}
							fformat={fformat}
							compute={compute}
							tabIndex={tabIndex}
							type={type}
							value={current_value_for_textbox || ''}
							multiline={multiline}
							disabled={disabled}
							rows={rows}
							current_value_for_textbox={current_value_for_textbox}
							popup={popup}
							toggle_show_popup={this.toggle_show_popup}
							theme_colour={theme_colour}
							button_theme_colour={button_theme_colour}
							button_hover_theme_colour={button_hover_theme_colour}
							configuration={configuration}
					/>

					{title_to_use ? title_to_use : null}

					<Error_Section__ dat={data}/>
				</InputWithError_>

				<Popup_Section__ 
						popup={popup} 
						formStore={formStore}
						show_popup={this.show_popup} 
						toggle_show_popup={this.toggle_show_popup}
				/>
			</Form_Group_2>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Input_Section__ extends React.Component {

	render() {
		const { id, type:_type, multiline, compute } = this.props
		const { configuration:_configuration='single' } = this.props

		if (compute) {
			return (<Compute__ {...this.props} />)
		}

		if (multiline) { 
			return (<TextArea__ {...this.props} />) 
		} 

		const type = _type.toUpperCase()
		const configuration = _configuration.toUpperCase()

		if (configuration==='SINGLE') {
			if (__.includes(['TEXT','DOLLARS'], type)) {
				return (<SingleTextBox__ {...this.props} />) 
			}
			if (type==='OBJECT-DUMP') {
				return (<Object_Dump__ {...this.props} />)
			}
			if (type==='OBJECT-TABLE') {
				return (<Object_Table__ {...this.props} />)
			}
			if (type==='CHECKBOX') {
				return (<Checkbox__ {...this.props } />)
			}
		}

		// catch anything leftover
		return (<TextArea__ {...this.props} 
			multiline={true} rows={3} unhandled_input={true}/>
		) 

	}
}
// ====================================================================
@inject('store')
@observer
class Compute__ extends React.Component {
	render() {
		const { id, type, manager, compute, fformat } = this.props
		const { theme_colour, button_theme_colour, button_hover_theme_colour } = this.props
		const { inputStyler } = this.props

		const value = computor({manager:manager,...compute})
		const _value = format_from_array(value, fformat)
	
		const Styler = inputStyler
			? styled(Cell_2)`${inputStyler}`
			: Cell_2

		return (
			<Styler 		className={`Compute__${id}`} >
				{_value} 
			</Styler>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Checkbox__ extends React.Component {
	onChange = (event) => {
		const { formStore } = this.props
		// need to convert strings to booleans before passing on the formStore
		const elem = event.target
		const fieldname = elem.id
		const newvalue = elem.checked
		formStore.handleValueChange(fieldname, newvalue, true)
	}

	render() {
		const { id, tabIndex, type, current_value_for_textbox } = this.props
		const { formStore, disabled=false, fformat} = this.props
		const { theme_colour, button_theme_colour, button_hover_theme_colour } = this.props
		const { inputStyler } = this.props
		const value = current_value_for_textbox || false

		const Styler = inputStyler
			? styled(Input_2)`${inputStyler}`
			: Input_2

		return (
			<Styler 		className='Checkbox__'
					id={id}
					tabIndex={tabIndex}
					checked={value}
					disabled={disabled}
					onFocus={formStore.onFocus}
					onChange={this.onChange}
					//onBlur={formStore.onBlur}  //unmanaged ??
			/>
		)
	}
}
// ====================================================================
const detail_row = (key, value) => {
	const valueList = __.isArray(value) 
		? value 
		: [value]
	return (
		<Detail_Row   
			key={ key }
			label={key + ':'}
			valueList={ valueList }
			//fformat={ undefined } // this is not knowable here
		/>
	)
}
// ====================================================================
const row = (obj, level=0) => {
	const _level = level +1
	const key_list = __.toPairs(obj)
	const rows = []
	__.map(key_list, ([key, _value]) => {
		let value = _value===null ? 'null' : _value
		if (__.isBoolean(value)) { value = value.toString()}
		if (__.isArray(value) && __.isEmpty(value)) { value = '[]'}
		if (__.isObject(value) && __.isEmpty(value)) { value = '{}'}
		if (typeof value === 'object') {
			rows.push(detail_row(key, '-- see below --'))
			rows.push(
				<SubObject  key={key+'-'+level} indent={level*10}>
				{ row(value, level) }
				</SubObject>
			)
		} else {
			rows.push(detail_row(key, value))
		}
	})
	return rows
}
// ====================================================================
@inject('store')
@observer
class Object_Table__ extends React.Component {

	render() {
		const { id, label, tabIndex, type, multiline, configuration='single', current_value_for_textbox } = this.props
		const { rows, formStore, popup, toggle_show_popup, disabled=false, fformat} = this.props
		const { theme_colour, button_theme_colour, button_hover_theme_colour } = this.props

		const obj = current_value_for_textbox || {}
		return row(obj)
	}
}
// ====================================================================
const stringify = (key, value, level) => {
	const xyz = __.repeat("->", level-1) 
	const abc = " [" + level + "] " + key + " : " + value
	//console.log(xyz)
	return xyz + abc
}
// ====================================================================
const dump = (obj, level=0) => {
	const _level = level + 1
	const key_list = __.toPairs(obj)
	const values = []
	__.map(key_list, ([key, _value]) => {
		try {
			let xyz
			let value = _value===null ? 'null' : _value
			if (__.isArray(value) && __.isEmpty(value)) { value = '[]'}
			if (__.isObject(value) && __.isEmpty(value)) { value = '{}'}
			if (typeof value === 'object') {
				values.push(stringify(key, '{', _level))
				values.push(dump(value, _level))
				values.push('}')
			} else {
				values.push(stringify(key, value, _level))
			}
		} catch(e) {
			debugger
		}
	})
	return values.join('\n')
}
// ====================================================================
@inject('store')
@observer
class Object_Dump__ extends React.Component {

	render() {
		const { id, tabIndex, type, current_value_for_textbox } = this.props
		const { rows, formStore, disabled=false, fformat } = this.props
		const { theme_colour, button_theme_colour, button_hover_theme_colour } = this.props
		const { unhandled_input, inputStyler } = this.props

		const obj = current_value_for_textbox || {}
		const value = dump(obj)
		const Styler = inputStyler
			? styled(TextArea_2)`${inputStyler}`
			: TextArea_2

		return (
			<Styler 		className='TextArea_2'
					id={id}
					tabIndex={tabIndex}
					value={value}
					disabled={disabled}
					rows={rows}
					onFocus={formStore.onFocus}
					onChange={formStore.onChange}
					//onBlur={formStore.onBlur}  //unmanaged ??
					unhandled_input={unhandled_input}
					>
			</Styler>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class SingleTextBox__ extends React.Component {

	render() {
		const { id, tabIndex, type, current_value_for_textbox, fformat } = this.props
		const { formStore, popup, toggle_show_popup, disabled=false} = this.props
		const { theme_colour, button_theme_colour, button_hover_theme_colour } = this.props
		const { inputStyler } = this.props

		const value = disabled
			? format_from_array(current_value_for_textbox || '', fformat)
			: current_value_for_textbox || ''

		const Styler = inputStyler
			? styled(Input_2)`${inputStyler}`
			: Input_2

			return (
			<Input_Row_>
				<Styler 		className='Input_2'
						id={id}
						tabIndex={tabIndex}
						value={value}
						disabled={disabled}
						onFocus={formStore.onFocus}
						onChange={formStore.onChange}
						//onBlur={formStore.onBlur}  //unmanaged ??
				/>
				<Popup_Button_Section__ 
						popup={popup}
						toggle_show_popup={toggle_show_popup}
						button_theme_colour={button_theme_colour}
						button_hover_theme_colour={button_hover_theme_colour}
				/>
			</Input_Row_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class TextArea__ extends React.Component {

	render() {
		const { id, tabIndex, type, current_value_for_textbox } = this.props
		const { rows, formStore, disabled=false, fformat} = this.props
		const { theme_colour, button_theme_colour, button_hover_theme_colour } = this.props
		const { unhandled_input, inputStyler } = this.props

		const _value = disabled
			? format_from_array(current_value_for_textbox || '', fformat)
			: current_value_for_textbox || ''

		const Styler = inputStyler
			? styled(TextArea_2)`${inputStyler}`
			: TextArea_2

		return (
			<Styler 		className='TextArea_2'
					id={id}
					tabIndex={tabIndex}
					value={_value}
					disabled={disabled}
					rows={rows}
					onFocus={formStore.onFocus}
					onChange={formStore.onChange}
					//onBlur={formStore.onBlur}  //unmanaged ??
					unhandled_input={unhandled_input}
					>
			</Styler>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Popup_Section__ extends React.Component {

	render() {

		const { popup, show_popup, toggle_show_popup, formStore } = this.props
		if (!popup || !show_popup) {return null}
		return (
			<Modal 						toggle_show={toggle_show_popup} >
				<Popup_Select__	{ ...popup}
						formStore={formStore}
						toggle_show={toggle_show_popup}
				/>
			</Modal>
		)
	}
}
// ====================================================================
const Popup_Select__ = ({ component, ...props }) => {
	return (
		React.createElement(
			component, {
				...props,
			}
		)
	)
}
// ====================================================================
@inject('store')
@observer
class Popup_Button_Section__ extends React.Component {

	@observable dropdown = false
	@action toggle_dropdown = () => {this.dropdown = !this.dropdown}

	onClick = () => {
		const { toggle_show_popup } = this.props
		//this.toggle_dropdown()
		toggle_show_popup()
	}

	render() {
		const { popup, theme_colour } = this.props
		const	{ button_theme_colour, button_hover_theme_colour } = this.props

		if (!popup) {return null} 

		const icon = {name:'caret-down', code:'\f0d7'}
		//const icon = this.dropdown
		//	? {name:'caret-down', code:'\f0d7'}
		//	: {name:'caret-up'  , code:'\f0d8'}

		return (
			<Button
					type='ICON-ONLY'
					title='Change'
					icon={icon}
					textColour={button_theme_colour.base} // black
					bgColour='transparent'
					hover={{
						textColour: button_theme_colour.font, //white
						bgColour: button_theme_colour.base //blue
					}}
					isSelected={true}
					width='16px'
					height='16px'
					onClick={this.onClick}
			/>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Label_Section__ extends React.Component {

	render() {
		const { dat, label, labelStyler } = this.props
		const show_error = !!dat.errors && dat.isDirty
		
		const Styler = labelStyler
		? styled(Label_2)`${labelStyler}`
		: Label_2
		return (
			<Styler 
				hasError={show_error}
			>
				{ label }
			</Styler>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Error_Section__ extends React.Component {

	render() {
		const { dat } = this.props 
		if (!dat.errors || !dat.isDirty) {
			// show an empty row to reduce vertical jitter if error happens later
			return <Error_2/>
		  // -> -> -> -> //
		} 

		return (
			<Error_List_2>
				{
					__.map(dat.errors, (err, index) => {
						return (
							<Error_2		key={index}>
								{err}
							</Error_2>
						)
					})
				}
			</Error_List_2>
		)
	}
}
// ====================================================================

export { Field }
