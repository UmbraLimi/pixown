// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { 
	Mailing_Address_Section_,
	Mailing_Address_Title_,
	Section_Separator_
}																from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Form_Wrapper } 				from  '/imports/client/ui/components/form-wrapper/index.jsx'

// ====================================================================
@inject('store')
@observer
class Mailing_Section extends React.Component {

	render() {
		const { Manager:puserManager } = this.props
		return (
			<Mailing_Address_Section_ className={ 'Mailing_Address_Section_' } >
				<Mailing_Address_Title_ className={ 'Mailing_Address_Title_' }>
					Please confirm your mailing, billing and email addresses
				</Mailing_Address_Title_>
				<Form_Wrapper  Manager={puserManager} />
			</Mailing_Address_Section_>
		)
	}
}
// ====================================================================

export { Mailing_Section }