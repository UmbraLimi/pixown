import { check }        				    from 'meteor/check'
import os from 'os'
import fs from 'fs'
import { Images }     	from '/imports/px-common/collections/Images/collection.js'
import moment from 'moment'
import randomstring            from 'randomstring'
import { User_Roles }     from '/imports/px-common/enums/user-roles.js'
import { _ as __ }              from 'lodash'

import { Promise__save_image_to_cloudinary } from '/imports/3rd-party/cloudinary/helpers.js'
// ====================================================================
const _extract_valid_images_from_array = ( raw_images ) => {
	if (raw_images.length === 0) {return []}
	const images = __.filter(raw_images, (image) => {
		//return true
		const [nom, ext] = image.file.name.split('.')
		//console.log(nom, ext)
		if (nom.length === 9) { // for now will only accept XX0000-00 as the nom format and length
			const [client_key, pose_code] = nom.split('-')
			//console.log(client_key, pose_code)
			return pose_code.length !== 0 && client_key.length !== 0
		}
	})
	//console.log(images)
	return images
}
// ====================================================================
const _assemble_image_record = ( 
	filename, folder, file_mtime, file_size, 
	cloudinary_response, cloudinary_options,
	customer_code, studio_code, upload_code, school_code, sitting_code, pose_code
 	) => {
	const image_record = {
		upload_code:          upload_code,
		filename:  						filename,
		folder:  							folder,
		file_datestamp: 	  	new Date(moment(file_mtime).format("MM/DD/YYYY hh:mm:ss")),
		file_bytes:						file_size,
		customer_code:  			customer_code,
		studio_code: 					studio_code,
		school_code: 					school_code,
		sitting_code: 				sitting_code,
		pose_code: 	  				pose_code,
		cloudinary_sent: 			cloudinary_options,
		cloudinary_returned: 	cloudinary_response,
		url:									cloudinary_response.url, // cloudinary_response.secure_url
		width:								cloudinary_response.width,
		height:								cloudinary_response.height,
		last_updated: 				new Date(),
		createdOn: 						new Date(),
	}
	return image_record
}
// ====================================================================
const _assemble_customer_record = ( studio_code, school_code, sitting_code, customer_code, first_name, last_name, email, row ) => {
	const customer_record = {
		meteor_username: 	customer_code,
		password:      		sitting_code, // will NOT be stored in PUsers Table
		username:      		`${last_name}, ${first_name}`,
		role:          		User_Roles.CUSTOMER.name,
		surname:       		last_name,
		other_names:   		first_name,
		mailing_address: {
			street: 			row['Street'],
			city: 				row['City'],
			province: 		row['Province'],
			postal_code: 	row['Postal Code']
		},
		email: 						email,
		phone: 						row['Phone'],
		last_updated: 		new Date(),
		createdOn: 				new Date()
	}
	const retake1 = row['Client Key First']
	if (retake1 !== '') {customer_record.sitting_code_list.push(retake)}
	const retake2 = row['Client Key Retake Paste']
	if (retake2 !== '') {customer_record.sitting_code_list.push(retake)}

	return customer_record
}
// ====================================================================
const _assemble_upload_record = ( 
	upload_code, studio_code, upload_type, filename, mtime, filesize, folder, comment, total_sittings_written
 	) => {
	const upload_record = {
		upload_code:				upload_code,
		studio_code: 				studio_code,
		upload_type:        upload_type,
		csv: {
			filename:     		filename,
			datestamp: 	  		new Date(moment(mtime).format("MM/DD/YYYY hh:mm:ss")),
			bytes:						filesize,
			folder:  					folder,
		},
		comment:						comment,
		num_sittings:				total_sittings_written,
		createdOn: 					new Date()
	}

	return upload_record
}
// ====================================================================
const _assemble_sitting_record = ( 
	upload_code, customer_code, studio_code, school_code, sitting_code, proofs_list, row
 	) => {
	const sitting_record = {
		upload_code: upload_code,
		studio_code:			studio_code,
		school_code:			school_code,
		sitting_code:			sitting_code,
		customer_code:		customer_code,
		proofs_list: 			proofs_list,
		sitting_fee:			row['Sitting Fee'],
		photographer:			row['Photographer'],
		retouching_agreement_code:	'001',
		printing_agreement_code:		'003',
		is_retake: 				false,
		studio_data: {
			key: sitting_code,
			other: {
				customer_id: row['Customer ID'],
				bar_code: row['Bar Code'],
			}
		},
		last_updated: 		new Date(),
		createdOn: 				new Date()
	}
	row['Delete Record'] !== ''
		? sitting_record.studio_data.other.push({delete_record: row['Delete Record']})
		: null

	return sitting_record
}
// ====================================================================
const _Promise__createUser = async (meteor_username, email, sitting_code) => {
	try {
		const mongo_id = Accounts.createUser({
			username: meteor_username,
			email:    email,
			password: sitting_code
		})
		return mongo_id
	} catch (error) {
		console.log("CreateUser Error:", error)
		throw error //(new Meteor.Error('LUXARTE.xxx', 'unexpected error', error.details))
	}
}
// ====================================================================
const get_pixown_school_code = (luxarte_code) => {
	codes = {
		"BROCK": '001',
		"CN": '002',
		"UC": '003'
	}
	return codes[luxarte_code].toUpperCase()
}
// ====================================================================
Meteor.methods({
	async 'LUXARTE.import_location'( record, studio_code ) {
		try {
			check(record, Object)
			check(studio_code, String)
			const delim = os.type() === "Linux" ? '/' : '\\'

			// reserve an Upload record
			const upload_code = randomstring.generate({
				length: 10,
				charset: 'alphanumeric',
			})

			let total_sittings_written = 0

			const fullpath = record.csv_folder + delim + record.csv_file

			const csv_filestats = fs.statSync(fullpath)
			//console.log('=== WW')
			const csv_rows = await Meteor.call('FILES.Promise__convert_csv_to_array_of_objects', fullpath)
			//console.log('=== XX')
			
			await Promise.all(_.map(csv_rows, async (row, index) => {
				const sitting_code = row['Client Key']

				//console.log('=== A', index)
				const raw_images = await Meteor.call('FILES.Promise__find_images_with_starting_string', sitting_code, record.csv_folder)
				//console.log('=== B', index, sitting_code, raw_images.length)

				const images = _extract_valid_images_from_array(raw_images)
				//console.log('=== C', index, images.length)

				if (images.length > 0) {
					// proceed with importing customer, etc. data and uploading these image files
					const email = row['EMail']
					const last_name = row['Last Name']
					const first_name = row['First Name']
					const luxarte_school_code = row['School Code'] 
					const school_code = get_pixown_school_code(luxarte_school_code) // may need to look up these for luxarte to pixown conversion
					const customer_code = randomstring.generate({
						length: 10,
						charset: 'alphanumeric',
					}) // also in Meteor.PUsers.findOne() as "meteor_username"

					// assemble PUsers customer record
					const customer_record = _assemble_customer_record( 
						studio_code, school_code, sitting_code, customer_code, first_name, last_name, email, row
					)
					//console.log('=== D', index)
					const user_mongo_id = await _Promise__createUser(customer_record.meteor_username, email, sitting_code)
					//console.log('=== E', index, user_mongo_id)
					customer_record.meteor_user_id = user_mongo_id
					const user_id = await Meteor.call('PUSERS.insert', customer_record)
					//console.log('=== F', index, user_id)
					
					const proofs_list = []
					await Promise.all(_.map(images, async (image, indexx) => {
						// upload images to cloudinary and save images record
						const [nom, ext] = image.file.name.split('.')
						const pose_code = nom.split('-')[1]
				
						//console.log('=== G', index, indexx)
						const [cloudinary_response, cloudinary_options] = await Promise__save_image_to_cloudinary(
							image.file.name, delim, image.folder, studio_code, upload_code, school_code, sitting_code, pose_code
						)
						//console.log('=== H', index, indexx)
						
						// assemble image record
						const image_record = _assemble_image_record (
							image.file.name, image.folder, image.file.mtime, image.file.size, 
							cloudinary_response, cloudinary_options,
							customer_code, studio_code, upload_code, school_code, sitting_code, pose_code
						)
						//console.log('=== I', index, indexx)
						
						// write the image record
						const image_id = await Meteor.call('IMAGES.insert', image_record)
						//console.log('=== J', index, indexx, image_id)
						proofs_list.push({pose_code: pose_code, image_id: image_id })

						// delete the image from the folder
						//fs.unlink(image_record.folder + delim + image_record.filename, (error) => {
						//	if (error) {throw error}
						//})
						//console.log('=== DEL')
						
					})) // end of map images

					//console.log('=== K', index)

					// assemble sittings record
					const sitting_record = _assemble_sitting_record ( 
						upload_code, customer_code, studio_code, school_code, sitting_code, proofs_list, row
					)
					//console.log('=== L', index)
					const sitting_id = await Meteor.call('SITTINGS.insert', sitting_record)
					total_sittings_written += 1
					//console.log('=== M', index, sitting_id)
					
					//throw new Meteor.Error("A","B","C")
				} // end of images found > 0
			})) // end of map csv_rows
			
			//console.log('=== YY', total_sittings_written)
			
			if (total_sittings_written > 0) {
				upload_record = _assemble_upload_record (
					upload_code, studio_code, record.upload_type, record.csv_file, csv_filestats.mtime, 
					csv_filestats.size, record.csv_folder, record.comment, total_sittings_written
				)
				//console.log('=== ZZ-A')
				const upload_id = await Meteor.call('UPLOADS.insert', upload_record)
				//console.log('=== ZZ-B', upload_id)
			}

			console.log('=== QQ', total_sittings_written)
		} catch (error) {
			console.log('=== CATCH ERROR')
			console.log( 'LUXARTE.import_location', '~~~~','catch','--', error)
			throw error // (new Meteor.Error('LUXARTE.xxx', 'unexpected error', error.details))
		}
		//console.log('=== RR')
		
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	async 'LUXARTE.import_batch'( ) {
		//			const sitting_code = row['Client Key']
		//			const last_name = row['Last Name']
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})
