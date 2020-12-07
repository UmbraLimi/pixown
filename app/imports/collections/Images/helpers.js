// ----node-packages----------------
// ----helpers----------------------
// ----collections------------------
import { Images } 							from  './collection.js'
// ----components-------------------

// ====================================================================
export const get_url_for_image_id = (image_id) => {
	// only works if images are previosly subscribed and loaded elsewhere
	// i.e. they record must be in minimongo
	const image = Images.findOne({
		_id: image_id
	})
	return image.url
}
// ====================================================================
/*export const get_image_record_for_image_id = (image_id) => {
	// only works if images are previosly subscribed and loaded elsewhere
	// i.e. they record must be in minimongo
	const image = Images.findOne({
		_id: image_id
	})
	return image
}*/
// ====================================================================