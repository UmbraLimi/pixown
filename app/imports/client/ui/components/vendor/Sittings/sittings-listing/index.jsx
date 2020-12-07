// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
  Listing_, Row_, Details_,
  Header_, Header_Row_, NoSittings_
} 			                        from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
import { Value_Types }          from  '/imports/enums/value-types.js'
// ----collections------------------
// ----components-------------------
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Sittings_Listing extends React.Component {

	render() {
		const { Manager:sittingListManager, events } = this.props
    const { sittingManagerList } = sittingListManager
    
    if (sittingManagerList.length === 0) { 
      return (<NoSittings_> no sittings available </NoSittings_>) 
    }
   	// -> -> -> -> //

 		return (
      <Listing_   className='Sittings_Listing_' >
      {
        __.map(sittingManagerList, (sittingManager, num) => {
          const sitting = sittingManager.record
          // FIXME: implement this once sittingManager.populate_proofImageManagerList is implemented in SittingManager
          //const image_url = sittingManager.populate_proofImageManagerList[0]._imageURL
          //const image_urls = __.map(sittingManager.populate_proofImageManagerList, populate_proofImageManager => {
          //  return populate_proofImageManager._imageURL
          //})
          return (
            <Row_ 
                className='Sitting_Row_'
                sitting={ sitting } key={ num }
                onClick={() => events.handleRowWasClicked(sitting)}
            >
              <Header_  className='Sitting_Header_' >
                <Header_Row_>{sitting.studio_code}</Header_Row_>
                <Header_Row_>{sitting.school_code}</Header_Row_>
                <Header_Row_>{sitting.sitting_code}</Header_Row_>
                <Header_Row_>{sitting.customer_code}</Header_Row_>
              </Header_>

              <Details_ className='Sitting_Details_' >
                <Detail_Row   
                    label={ "Is a Retake?" }
                    valueList={ [sitting.is_retake] }
                />
                <Detail_Row   
                    label={ "Photographer" }
                    valueList={ [sitting.photographer] }
                />
                <Detail_Row   
                    label={ "Sitting Fee" }
                    valueList={ [sitting.sitting_fee] }
                />
                { sittingManager.hasProofImages
                  ? (
                    <Detail_Row   
                        label={ "1st Pose" }
                        valueList={ [sittingManager.first_image_url] }
                        fformat={[{verb:'imageify', args: {width:'80px'}}]}
                    />
                  )
                  : (<p>no proofs</p>)
                }
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

export { Sittings_Listing }
