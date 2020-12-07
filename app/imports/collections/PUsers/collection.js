import { Mongo }       					from  'meteor/mongo'
// ----node-packages----------------
import Yup             					from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
const PUsers = new Mongo.Collection('PUsers')

PUsers.collection_name = "PUsers"

PUsers.schema = Yup.object().shape({
	// this is the _id of the users table where this user was created
	meteor_user_id: 		Yup.string().required(),

	// this is the same as customer_code in pix-customer (possible vendor_code in pix-vendor)
	// this is also the username recorded inside users collection when user is created by meteor
	meteor_username: 		Yup.string().required(), 

	username: 					Yup.string().required(), // for display in header and possible corespondence
	role:       				Yup.string(),  // enum User_Roles.XXXX.name
	vendor_code: 				Yup.string(),  // applies only to pix-vendor
	surname: 	    			Yup.string().required(),
	other_names: 				Yup.string(),
	mailing_address:  	Yup.object().shape({
		street:       			Yup.string().required(),
		city:         			Yup.string().required(),
		province:     			Yup.string().required(),
		postal_code:  			Yup.string().required(),
		country:						Yup.string().required(),
	}),
	billing_address:  	Yup.object().shape({
		street:       			Yup.string().required(),
		city:         			Yup.string().required(),
		province:     			Yup.string().required(),
		postal_code:  			Yup.string().required(),
		country:						Yup.string().required(),
	}),
	email: 	        		Yup.string().email().required(), // used as email when user is created by meteor
	phone: 	        		Yup.string(),
	last_updated: 			Yup.date(),
	createdOn: 					Yup.date()
})
// ====================================================================
	//Login Credentials*
	//Orders*
	//UserName (public)
	//Social media addresses*
	//Photographer Person identifier
	//PUsers Allowed to see/purchase my pictures*
	//Payment Method details*
	//Account State*
	//Subscription History*
// ====================================================================

export { PUsers }
