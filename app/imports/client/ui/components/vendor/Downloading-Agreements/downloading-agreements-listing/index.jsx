// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
//import { observable, action } 	from  'mobx'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { Listing_, Row_, Details_, 
  Header_, Header_Row_, NoAgreements_
} 			                        from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Agreements_Listing extends React.Component {
	render() {
		const { Manager:daListManager, events } = this.props
    const { daManagerList } = daListManager

    if (daManagerList.length === 0) { 
      return (<NoAgreements_> no agreements available </NoAgreements_>) 
    } // -> -> -> -> //

 		return (
      <Listing_   className='Downloading_Agreement_Listing_' >
      {
        __.map(daManagerList, (daManager, num) => {
          const agreement = daManager.record
          return (
            <Row_ 
                className='Row_'
                agreement={ agreement } key={ num }
                onClick={() => events.handleRowWasClicked(agreement)}
            >
              <Header_  className='Header_' >
                <Header_Row_>{agreement.agreement_code}</Header_Row_>
                <Header_Row_>{agreement.title}</Header_Row_>
              </Header_>

              <Details_ className='Agreement_Details_' >

                <Detail_Row   
                    label={ "Title" }
                    valueList={ [agreement.title] }
                />

                <Detail_Row   
                    label={ "Vendor Code" }
                    valueList={ [agreement.vendor_code] }
                />
                <Detail_Row   
                    label={ "Options" }
                    valueList={ [agreement.options_list.option_code] }
                />
                <Detail_Row   
                    label={ "Expires On" }
                    valueList={ [agreement.date_of_expiry] }
                    fformat={['dateify']}
                />
                <Detail_Row   
                    label={ "Active From" }
                    valueList={ [agreement.date_of_agreement] }
                    fformat={['dateify']}
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

export { Downloading_Agreements_Listing }
