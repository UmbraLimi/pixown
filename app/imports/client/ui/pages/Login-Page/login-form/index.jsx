//import { Meteor } 							from 	'meteor/meteor'
// ----node_modules-----------------
import React                    from  'react'
import { autorun, toJS }				from  'mobx'
import { observer, inject } 		from  'mobx-react'
import Yup 											from  'yup'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { 
	Section_, Login_Form_, Input_Wrapper_, 
	Input_Row_, Input_Cell_, Input_,
	Button_Wrapper_,
	Label_Row_, Label_Cell_, Label_,
	Error_Row_, Error_Cell_, Error_List_, Error_
}																from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Login_Form extends React.Component {
	constructor(props){
		super(props)
		const { loginFormStore } = this.props.store
		loginFormStore.initialize({
			starting_record: {
				email: '',
				password: ''
			}, 
			mode: undefined, 
			schema: Yup.object().shape({
				email: Yup.string()
					.email('Invalid email address')
					.required('Email is required'),
				password: Yup.string()
					.min(2, 'Password must be at least 2 characters')
					.required('Password is required'),
				}), 
			colleXion: undefined
		})
		loginFormStore.validateStartingRecord()
	}
	// ====================================================================
	disposer = autorun(
		() => {
			//const { app, loginFormStore } = this.props.store
			//console.log('isDirty', loginFormStore.isDirty)
			//console.log('is_saveable', toJS(loginFormStore.is_saveable))
			//console.log('ops', toJS(loginFormStore.ops))
		}
	)
	// ====================================================================
	componentWillUnMount() {
		this.disposer()
	}
	// ====================================================================
	handleSubmit = (event) => {
		const { loginFormStore, app } = this.props.store
		const { hasErrorsSomewhere } = loginFormStore
		if (!hasErrorsSomewhere) { // need this as 'button' is a div
			app.attempt_to_login({
				email: loginFormStore.values.email,
				password: loginFormStore.values.password
			})
		}
	}
	// ====================================================================
	/*handleBlur = (event) => {
		const { loginFormStore } = this.props.store
		const elem = event.target
		const fieldname = elem.id
		const newvalue = elem.value
		loginFormStore.handleTouch(fieldname)
		loginFormStore.handleBlur(fieldname)
		loginFormStore.handleValueChange(fieldname, newvalue, true)
	}*/
	// ====================================================================
	handleChange = (event) => {
		const { loginFormStore } = this.props.store
		const elem = event.target
		const fieldname = elem.id
		const newvalue = elem.value
		//loginFormStore.handleBlur(fieldname)
		loginFormStore.handleValueChange(fieldname, newvalue, true)
	}
	// ====================================================================
	handleFocus = (event) => {
		const { loginFormStore } = this.props.store
		const elem = event.target
		const fieldname = elem.id
		loginFormStore.handleTouch(fieldname)
	}
	// ====================================================================
	render() {
		// will ONLY reach here 
		// - if app.user is NOT set 
		// - AND they haven't tried too many times (app)

		const { store } = this.props
		const { app, loginFormStore } = store
		const { hasErrorsSomewhere } = loginFormStore
		const isChecking = app.isChecking

		const email = loginFormStore.getCurrentValueForTextbox('email')
		const password = loginFormStore.getCurrentValueForTextbox('password')

		const eml = {
			a: 'email',
			display: loginFormStore.getCurrentValueForTextbox('email'),
			dispsrc: loginFormStore.getCurrentSourceForTextbox('email'),
			value: loginFormStore.getCurrentValue('email'),
			errors: toJS(loginFormStore.getCurrentErrors('email')),
			starting: loginFormStore.getStartingValue('email'),
			isDirty: loginFormStore.getStartingValue('email') !== loginFormStore.getCurrentValueForTextbox('email')
		}
		const pwd = {
			a: 'password',
			display: loginFormStore.getCurrentValueForTextbox('password'),
			dispsrc: loginFormStore.getCurrentSourceForTextbox('password'),
			value: loginFormStore.getCurrentValue('password'),
			errors: toJS(loginFormStore.getCurrentErrors('password')),
			starting: loginFormStore.getStartingValue('password'),
			isDirty: loginFormStore.getStartingValue('password') !== loginFormStore.getCurrentValueForTextbox('password')
		}
		
		return (
			<Section_    					className='_Section' >
				<Login_Form_ 				className='_loginFormStore' >

					<Input_Wrapper_ 	className='Text_Input' >
						<Label_Section__ label="Email" dat={eml} />
						<Input_Row_ 		className='_Input_Row' >
							<Input_Cell_ 	className='_Input_Cell' >
								<Input_ 		className='_Input'
														id='email'
														tabIndex={1}
														type='text'
														value={email || ''} // managed
														onFocus={this.handleFocus}
														onChange={this.handleChange}
														//onBlur={this.handleBlur}  //unmanaged ??
								>
								</Input_>
							</Input_Cell_>
						</Input_Row_>
						<Error_Section__ dat={eml} />
					</Input_Wrapper_>

					<Input_Wrapper_ 	className='Text_Input' >
						<Label_Section__ label="Password" dat={pwd}/>
						<Input_Row_ 		className='_Input_Row' >
							<Input_Cell_ 	className='_Input_Cell' >
								<Input_ 		className='_Input'
														id='password'
														tabIndex={2}
														type='password'
														value={password || ''} // managed
														onFocus={this.handleFocus}
														onChange={this.handleChange}
														//onBlur={this.handleBlur}  //unmanaged ??
								>
								</Input_>
							</Input_Cell_>
						</Input_Row_>
						<Error_Section__ dat={pwd}/>
					</Input_Wrapper_>
					<Button_Wrapper_ >
						<Button 	
							onClick={this.handleSubmit} 
							bgColour={hasErrorsSomewhere || isChecking ? 'gainsboro' : '#08c' }
							cursor={hasErrorsSomewhere || isChecking ? 'not-allowed' : 'pointer'}
							title={isChecking ? 'Checking' : 'Login'}
							isDisabled={isChecking || hasErrorsSomewhere}
						/>
					</Button_Wrapper_>
				</Login_Form_>
			</Section_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Label_Section__ extends React.Component {

	render() {
		const { dat, label } = this.props
		const show_error = !!dat.errors && dat.isDirty

		return (
			<Label_Row_>
				<Label_Cell_				hasError={show_error}>
					<Label_ 					hasError={show_error}> 
						{label} 
					</Label_>
				</Label_Cell_>
			</Label_Row_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Error_Section__ extends React.Component {

	render() {
		const { dat } = this.props 
		/*if (!dat.errors || !dat.isDirty) {
			// show an empty row to reduce vertical jitter if error happens later
			return <Error_/>
		}*/ // -> -> -> -> //

		return (
			<Error_Row_>
				<Error_Cell_>
					<Error_List_>
						{
							dat.errors && dat.isDirty ? (
								__.map(dat.errors, (err, index) => {
									return (
										<Error_		key={index}>
											{err}
										</Error_>
									)
								})
							) : null
						}
					</Error_List_>
				</Error_Cell_>
			</Error_Row_>
		)
	}
}
// ====================================================================

export { Login_Form }
