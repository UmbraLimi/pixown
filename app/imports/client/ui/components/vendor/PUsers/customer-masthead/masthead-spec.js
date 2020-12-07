// ----node-packages----------------
// ----styles-----------------------
// ----helpers----------------------
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Customer_Masthead }         
						from  './connect.js'

// ====================================================================
export const Customer_Masthead_Spec = (manager) => {
	return {
		component: 	Customer_Masthead,
		title_field:	'username',
		code_field: 	'meteor_username',
		header: 'Customer Details',
		detail_fields: [
			{
				label: 'Username',
				fieldname: 'username'
			},
			'---',
			{
				label: 'Name(s)',
				fieldname: 'other_names'
			},
			{
				label: 'Surname',
				fieldname: 'surname'
			},
			{
				label: 'Street Address',
				fieldname: 'mailing_address.street'
			},
			{
				label: 'Province',
				fieldname: 'mailing_address.province'
			},
			{
				label: 'Email',
				fieldname: 'email'
			},
			{
				label: 'Phone',
				fieldname: 'phone'
			},
		]
	}
}
// ====================================================================