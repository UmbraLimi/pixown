// ----node-packages----------------
// ----styles-----------------------
// ----helpers----------------------
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Retouching_Agreement_Masthead }         
						from  './connect.js'

// ====================================================================
export const Retouching_Agreement_Masthead_Spec = (manager) => {
	return {
		component: 	Retouching_Agreement_Masthead,
		title_field:	'title',
		code_field: 	'agreement_code',
		header: 'Retouching Agreement Details',
		detail_fields: [
			{
				label: 'Agreement Code',
				fieldname: 'agreement_code'
			},
			'---',
			{
				label: 'Vendor Name',
				manager: manager,
				compute: {
					type: 'LOOKUP',
					colleXion: 'VENDORS',
					findOne: true,
					field_to_retrieve: 'name',
					linked_fields: [{
						foreign: 'vendor_code',
						local: 'studio_code'  // FIXME: local should come from manager, as it is manager-specific
					}],
					manager: manager
				},
			},
			{
				label: 'Title',
				fieldname: 'title'
			},
			{
				label: 'Active From',
				fieldname: 'date_of_agreement',
				fformat: ['dateify']
			},
			{
				label: 'Expires On',
				fieldname: 'date_of_expiry',
				fformat: ['dateify']
			},
			{
				label: 'Retouching Services',
				fieldname: 'services_list.service_code'
			}
		]
	}
}
// ====================================================================