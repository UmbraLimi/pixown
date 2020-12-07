import { Transactions } from '../collection.js'
import { Systems } from '/imports/enums/systems.js'
import { Transaction_Types } from '/imports/enums/transaction-types.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
	{
		_id:								'~TRANS-01',
		transaction_type:		Transaction_Types.SUCCESSFUL_ORDER.name,
		//payload:									
		customer_code:  		'Wendy',			
		//studio_code: 							
		//school_code: 							
		//sitting_code: 						
		//pose_code: 	  						
		//image_id: 	  						
		//upload_id: 	  						
		//vendor_code: 	  					
		//workup_id:								
		//retouching_agreement_code:
		//printing_agreement_code: 	
		order_id: 					'~ORDER-1',
		//comments:									
		//event_id:
		meteor_user_id:			'bogus meteor_user_id', //Meteor.userId(),
		schema_version:			1,
		//system:					Systems.CUSTOMER.name,
		createdOn: 					new Date()
	},
	{
		_id:								'~TRANS-99',
		transaction_type:		Transaction_Types.SUCCESSFUL_ORDER.name,
		//payload:									
		customer_code:  		'Wendy',			
		//studio_code: 							
		//school_code: 							
		//sitting_code: 						
		//pose_code: 	  						
		//image_id: 	  						
		//upload_id: 	  						
		//vendor_code: 	  					
		//workup_id:								
		//retouching_agreement_code:
		//printing_agreement_code: 	
		order_id: 					'~ORDER-2',
		//comments:									
		//event_id:									
		meteor_user_id:			'bogus meteor_user_id', //Meteor.userId(),
		schema_version:			1,
		//system:					Systems.CUSTOMER.name,
		createdOn: 					new Date()
	}
]
// ====================================================================
const insert_test_transactions = (clear_first=false) => {
	if (clear_first) { Transactions.remove({}) }
	insert_raw_test_records("TRANSACTIONS", raw_records)
}
// ====================================================================

export { insert_test_transactions }
