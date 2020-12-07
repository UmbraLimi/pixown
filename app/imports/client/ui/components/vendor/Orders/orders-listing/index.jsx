// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
//import { observable, action, toJS } 	from  'mobx'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
  Listing_, Row_, Details_, 
  Header_, Header_Row_, NoOrders_
} 			                        from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Orders_Listing extends React.Component {
  
	render() {
		const { Manager:orderListManager, events } = this.props
    const { orderManagerList } = orderListManager

    if (orderManagerList.length === 0) { 
      return (<NoOrders_> no orders available </NoOrders_>) 
    }
   	// -> -> -> -> //

     return (
      <Listing_   className='Orders_Listing_' >
      {
        __.map(orderManagerList, (orderManager, num) => {
          const order = orderManager.record
          //const image_url = orderManager.workupManagerList[0]._latestImageURL
          const image_urls = __.map(orderManager.workupManagerList, workupManager => {
            return workupManager._latestImageURL
          })
          
          return (
            <Row_ 
                className='Order_Row_'
                order={ order } key={ num }
                onClick={() => events.handleRowWasClicked(order)}
            >
              <Header_  className='Order_Header_' >
                <Header_Row_>{order._id}</Header_Row_>
                <Header_Row_>{order.customer_code}</Header_Row_>
              </Header_>

              <Details_ className='Order_Details_' >
                <Detail_Row   
                    label={ "Payment Provider" }
                    valueList={ [order.payment_provider] }
                />
                <Detail_Row   
                    label={ "Total Charged" }
                    valueList={ [order.grand_total_cost] }
                    fformat={['dollarify']}
                />
                <Detail_Row   
                    id='num_workups'
                    label="Number of Workups"
                    compute={{
                      type: 'MANAGER',
                      manager: orderManager,
                      computed: 'num_workups'
                    }}
                />
                <Detail_Row   
                    id='customer_name'
                    label="Customer Name"
                    compute={{
                      type: 'MANAGER',
                      manager: orderManager,
                      computed: '_customersRecord',
                      field_to_retrieve: 'username'
                    }}
                        />
                <Detail_Row  
                    values_orientation='cols'
                    label={ "Images" }
                    valueList={ image_urls }
                    fformat={[{verb:'imageify', args: {width:'80px'}}]}
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

export { Orders_Listing }
