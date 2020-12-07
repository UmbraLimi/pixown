// ----node-packages----------------
// ----styles-----------------------
// ----helpers----------------------
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { School_Masthead }         
						from  './connect.js'

// ====================================================================
export const School_Masthead_Spec = (manager) => {
	return {
		component: 	School_Masthead,
		title_field:	'title',
		code_field: 	'school_code',
		header: 'School Details',
		detail_fields: [
			{
				label: 'School Code',
				fieldname: 'school_code'
			},
			'---',
			{
				label: 'School Name',
				fieldname: 'name'
			},
			{
				label: 'City',
				fieldname: 'city'
			},
			{
				label: 'Province',
				fieldname: 'province_state'
			},
			{
				label: 'Country',
				fieldname: 'country'
			},
		]
	}
}
// ====================================================================