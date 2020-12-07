import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const Sittings = new Mongo.Collection('sittings')

Sittings.collection_name = "Sittings"

Sittings.schema = Yup.object().shape({
	studio_code: Yup.string().required(),
	school_code: Yup.string().required(),
	sitting_code: Yup.string().required(), // = client-key of luxarte
	upload_code: Yup.string().required(),
	customer_code: Yup.string().required(),  // = client-key for luxarte
	proofs_list: Yup.array().of(Yup.object().shape({
		pose_code: Yup.string().required(),
		image_id: Yup.string().required(),
		paid_retouching_list: Yup.array().of(Yup.object().shape({ // if this pose has had any retouching paid-for, it is listed here
			service_code: Yup.string(), // must be from same retouching_agreement_code
			delivery_state: Yup.string(), // enum Delivery_States.XXXX.name -- only shows the most recent state - other avail via transactions query
			delivery_transaction_id: Yup.string(), // matched delivery_state
			image_id: Yup.string(), // the image showing just this retouching done (compared to original proof)
			workup_id: Yup.string(), // the workup that paid for this service (no others can pay for it again) - will have an order_id on the wup
			non_pixown_order_id: Yup.string()  // if this retouching was done by the studio prior to coming to pixown
		})),
	})),
	sitting_fee: Yup.number().integer(),
	photographer: Yup.string(),
	is_retake: Yup.boolean().required(),
	downloading_agreement_code: Yup.string().required(), // default agreement
	retouching_agreement_code: Yup.string().required(), // default agreement
	printing_agreement_code: Yup.string().required(), // default agreement
	studio_data: Yup.object().shape({
		key: Yup.string(),  // used by studio for internal looks when I send back data to them
		other: Yup.object()   // contents can be empty or whatever the studio wants to see come back on return csv's
	}),
	last_updated: Yup.date(),
	createdOn: Yup.date()
})
// ====================================================================

export { Sittings }
