import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Images = new Mongo.Collection('images')

Images.collection_name = "Images"

Images.schema = Yup.object().shape({
	upload_code: Yup.string().required(),
	filename: Yup.string().required(), // original import-from file
	//folder:  							Yup.string().required(), // original import-from location
	file_datestamp: Yup.date(),
	file_bytes: Yup.number().integer().positive(),
	customer_code: Yup.string().required(),
	studio_code: Yup.string().required(),
	school_code: Yup.string().required(),
	sitting_code: Yup.string().required(),
	pose_code: Yup.string().required(),
	url: Yup.string().required(),
	width: Yup.number().integer().positive(), // 874
	height: Yup.number().integer().positive(), // 576
	cloudinary_sent: Yup.object(), // so this can change - cloudinary controls this so just store what I sent to them
	cloudinary_returned: Yup.object(), // so this can change - cloudinary controls this so just store what they send back
	last_updated: Yup.date(),
	createdOn: Yup.date()
})
// ====================================================================
/*cloudinary_sent:		Yup.object().shape({
	public_id:				Yup.string(),
	resource_type:		Yup.string(),
	uploaded_on:			Yup.date(), // not sent but concerns when sent
	tags:							Yup.array().of(Yup.string()),
	faces:						Yup.boolean(),
	use_filename:			Yup.boolean(),
	image_metadata:		Yup.boolean(),
	colours:					Yup.boolean(),
	exif:							Yup.boolean(),
	invalidate:				Yup.boolean()
})*/

/*cloudinary_returned:		Yup.object().shape({
	public_id:					Yup.string(),  // e.g. 'cr4mxeqx5zb8rlakpfkg',
	version:						Yup.number().integer(),  // 1473597073
	signature:					Yup.string(),  // '63bfbca643baa9c86b7d2921d776628ac83a1b6e',
	width:							Yup.number().integer().positive(), // 874
	height:							Yup.number().integer().positive(), // 576
	access_mode:				Yup.string(),  // 'public'
	format:							Yup.string(),  // 'jpg'
	resource_type:			Yup.string(),  // image
	created_at: 				Yup.date(),  // "2017-08-11T12:31:13Z"
	tags:								Yup.array().of(Yup.string()),
	type:								Yup.string(),  // 'upload'
	etag:								Yup.string(),  // "5297bd123ad4ddad723483c176e35f6e"
	url:								Yup.string(),  // "http://res.cloudinary.com/demo/image/upload/v1473597073/grand_canyon.jpg"
	secureurl:					Yup.string(),  // "https://res.cloudinary.com/demo/image/upload/v1473597073/grand_canyon.jpg"	
	original_filename:	Yup.string(),
	eager:							Yup.array().of(Yup.object()),
	bytes:							Yup.number().integer().positive(), // 1414789
})*/

// ====================================================================

export { Images }