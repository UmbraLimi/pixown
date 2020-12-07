import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Vendors = new Mongo.Collection('vendors')

Vendors.collection_name = "Vendors"

Vendors.schema = Yup.object().shape({
	vendor_code: Yup.string().required(),
	name: Yup.string().required(),
	is_studio: Yup.boolean().required(), // have their own clients and they are in charge of the departments?
	photography: Yup.object().required().shape({
		value: Yup.boolean().required(),
	}),
	retouching: Yup.object().required().shape({
		value: Yup.boolean().required(),
	}),
	printing: Yup.object().required().shape({
		value: Yup.boolean().required(),
		finish_list: Yup.array().of(Yup.object().shape({
			key: Yup.string().required(),
			label: Yup.string().required()
		})),
		colour_list: Yup.array().of(Yup.object().shape({
			key: Yup.string().required(),
			label: Yup.string().required()
		})),
		size_list: Yup.array().of(Yup.object().shape({
			key: Yup.string().required(),
			label: Yup.string().required(),
			up: Yup.number().integer().positive().required(),
			max_qty: Yup.number().integer().positive().required()
		})),
	}),
	downloading: Yup.object().required().shape({
		value: Yup.boolean().required(),
		colour_list: Yup.array().of(Yup.object().shape({
			key: Yup.string().required(),
			label: Yup.string().required()
		})),
		size_list: Yup.array().of(Yup.object().shape({
			key: Yup.string().required(),
			label: Yup.string().required(),
			up: Yup.number().integer().positive().required(),
			max_qty: Yup.number().integer().positive().required()
		})),
	}),
	dropbox: Yup.object().shape({
		dat_key: Yup.string(),
		filemaker_export: Yup.string(),
		image_export: Yup.string(),
	}),
	//url_to_watch: 	Yup.string().url(),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Vendors }