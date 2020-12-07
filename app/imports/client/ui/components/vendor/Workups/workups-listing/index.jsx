// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
//import { observable, action, toJS } 	from  'mobx'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
  Listing_, Row_, Details_, 
  Header_, Header_Row_, NoWorkups_
} 			                        from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
import { Value_Types as vt_ }   from  '/imports/enums/value-types.js'
// ----collections------------------
// ----components-------------------
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Workups_Listing extends React.Component {
  
	render() {
		const { Manager:workupListManager, events } = this.props
    const { workupManagerList } = workupListManager

    if (workupManagerList.length === 0) { 
      return (<NoWorkups_> no workups available </NoWorkups_>) 
    }
   	// -> -> -> -> //

     return (
      <Listing_   className='Workups_Listing_' >
      {
        __.map(workupManagerList, (workupManager, num) => {
          const workup = workupManager.record
          
          return (
            <Row_ 
                className='Workup_Row_'
                workup={ workup } key={ num }
                onClick={() => events.handleRowWasClicked(workup)}
            >
              <Header_  className='Workup_Header_' >
                <Header_Row_>{workup._id}</Header_Row_>
                <Header_Row_>{workup.customer_code}</Header_Row_>
              </Header_>

              <Details_ className='Workup_Details_' >
                <Detail_Row   
                    id='state'
                    label="Status"
                    valueList={ [workup.state] }
                />
                <Detail_Row   
                    id='starting_image'
                    label="Starting Image"
                    compute={{
                      type: 'MANAGER',
                      manager: workupManager,
                      field_to_retrieve: 'url',
                      computed: '_imagesRecord_for_startingImage',
                      notfound: '/images/image-not-foundx100x100.png'
                    }}
                    fformat={[{verb:'imageify', args: {width:'80px'}}]}
                />
                <Detail_Row   
                    id='school_code'
                    label="School Name"
                    compute={{
                      type: 'MANAGER',
                      manager: workupManager,
                      field_to_retrieve: 'name',
                      computed: '_schoolsRecord'
                    }}
                />
                <Detail_Row   
                    id='order_id'
                    label="Order No"
                    compute={{
                      type: 'MANAGER',
                      manager: workupManager,
                      field_to_retrieve: '_id',
                      computed: '_ordersRecord'
                    }}
                />
                <Detail_Row   
                    id='order_date'
                    label="Order Date"
                    compute={{
                      type: 'MANAGER',
                      manager: workupManager,
                      field_to_retrieve: 'payment_datetime',
                      computed: '_ordersRecord'
                    }}
                    fformat={['stringify']}
                    />
              </Details_>
            </Row_>
          )
        })
      }
      </Listing_>
		)
	}
}
// ====================================================================

export { Workups_Listing }
