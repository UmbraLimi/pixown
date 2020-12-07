// ----node-packages----------------
// ----styles-----------------------
// ----helpers----------------------
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Vendor_Masthead }         
						from  './connect.js'

// ====================================================================
export const Vendor_Masthead_Spec = (manager) => {
	return {
		component: 	Vendor_Masthead,
		title_field:	'name',
		code_field: 	'vendor_code',
		header: 'Vendor Details',
		detail_fields: [
			{
				label: 'Vendor Code',
				fieldname: 'vendor_code'
			},
			'---',
			{
				label: 'Name',
				fieldname: 'name'
			},
			{
				label: 'Is a Studio?',
				fieldname: 'is_studio',
				fformat: ['booleanify']
			},
			{
				label: 'Does Photography?',
				fieldname: 'photography.value',
				fformat: ['booleanify']
			},
			{
				label: 'Does Retouching?',
				fieldname: 'retouching.value',
				fformat: ['booleanify']
			},
			{
				label: 'Does Printing?',
				fieldname: 'printing.value',
				fformat: ['booleanify']
			},
		]
	}
}
// ====================================================================