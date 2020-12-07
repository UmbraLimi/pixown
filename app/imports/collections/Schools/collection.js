import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Schools = new Mongo.Collection('schools')

Schools.collection_name = "Schools"

Schools.schema = Yup.object().shape({
	school_code: Yup.string().required(),
	name: Yup.string().required(),
	image_url: Yup.string(), // cloudianry
	title: Yup.string().required(),
	city: Yup.string().required(),
	province_state: Yup.string().required().default(() => 'Ontario'),
	country: Yup.string().required().default(() => 'Canada'),
	vendor_code_list: Yup.array().of(Yup.string()),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})

// ====================================================================

export { Schools }