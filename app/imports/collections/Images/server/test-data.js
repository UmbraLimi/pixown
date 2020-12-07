import { Images } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id: 								'~IMAGE-1',
		upload_code:       	'UPLOAD-1',
		filename:  					'DD0001-01.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0001',
		pose_code: 	  			'01',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'len2ty1lycptthghpp7f',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-1-BA',
		upload_code:       	'UPLOAD-2',
		filename:  					'DD0001-01.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0001',
		pose_code: 	  			'01',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'len2ty1lycptthghpp7f',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-1-BA-HIRES',
		upload_code:       	'UPLOAD-2',
		filename:  					'DD0001-01.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0001',
		pose_code: 	  			'01',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'len2ty1lycptthghpp7f',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-2',
		upload_code:       	'UPLOAD-1',
		filename:  					'DD0001-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0001',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'len2ty1lycptthghpp7f',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-3',
		upload_code:       	'UPLOAD-2',
		filename:  					'DD0002-01.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'01',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'len2ty1lycptthghpp7f',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-4',
		upload_code:        'UPLOAD-2',
		filename:  					'DD0002-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'len2ty1lycptthghpp7f',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/len2ty1lycptthghpp7f.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-5',
		upload_code:        'UPLOAD-2',
		filename:  					'DD0002-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-B_jf4kzr.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'BL1136-12-B_jf4kzr',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-B_jf4kzr.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-6',
		upload_code:        'UPLOAD-2',
		filename:  					'DD0002-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-A_z9fu9n.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'BL1136-12-A_z9fu9n',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-A_z9fu9n.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-7',
		upload_code:        'UPLOAD-2',
		filename:  					'DD0002-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-H_jryfta.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'BL1136-12-H_jryfta',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-H_jryfta.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-8',
		upload_code:        'UPLOAD-2',
		filename:  					'DD0002-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-T_mjfwiv.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'BL1136-12-T_mjfwiv',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-T_mjfwiv.jpg'
		}      
	},
	{
		_id: 								'~IMAGE-9',
		upload_code:        'UPLOAD-2',
		filename:  					'DD0002-02.jpg',
		//folder:  						'/images/luxarte/001/001/Proofs',
		file_datestamp: 	  new Date(),
		file_bytes:					21369,
		customer_code:  		'Wendy',
		studio_code: 				'luxarte',
		school_code: 				'001',
		sitting_code: 			'DD0002',
		pose_code: 	  			'02',
		url:                'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-G_mjpio4.jpg',
		width:              225,
		height:             312,
		cloudinary_sent: {
			resource_type:		'auto',
			uploaded_on:			 new Date(),
			tags:							['11','22','33'],
			context:          { school_code: '001', studio_code: 'luxarte'}
		},
		cloudinary_returned: {
			public_id: 'BL1136-12-G_mjpio4',
			url: 'http://res.cloudinary.com/pixown/image/upload/v1497727839/BL1136-12-G_mjpio4.jpg'
		}      
	}
]
// ====================================================================
const insert_test_images = (clear_first=false) => {
	if (clear_first) { Images.remove({}) }
	insert_raw_test_records("IMAGES", raw_records)
}
// ====================================================================

export { insert_test_images }
