// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
//import { observable, action } 	from  'mobx'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
  Listing_, Row_, Details_, 
  Header_, Header_Row_, NoSchools_
} 			                        from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Schools_Listing extends React.Component {
	render() {
		const { Manager:schoolListManager, events } = this.props
    const { schoolManagerList } = schoolListManager

    if (schoolManagerList.length === 0) { 
      return (<NoSchools_> no schools available </NoSchools_>) 
    } // -> -> -> -> //
     
 		return (
      <Listing_   className='Schools_Listing_' >
      {
        __.map(schoolManagerList, (schoolManager, num) => {
          const school = schoolManager.record
          return (
            <Row_ 
                className='School_Row_'
                school={ school } key={ num }
                onClick={() => events.handleRowWasClicked(school)}
            >
              <Header_  className='School_Header_' >
                <Header_Row_>{school.school_code}</Header_Row_>
                <Header_Row_>{school.name}</Header_Row_>
              </Header_>

              <Details_ className='School_Details_' >

                <Detail_Row   
                    label={ "Title" }
                    valueList={ [school.title] }
                />

                <Detail_Row  
                    values_orientation='cols'
                    label={ "Image" }
                    valueList={ [school.image_url] }
                    fformat={[{verb:'imageify', args: {width:'200px'}}]}
                />

                <Detail_Row   
                    label={ "City" }
                    valueList={ [school.city] }
                />
                <Detail_Row   
                    label={ "Province" }
                    valueList={ [school.province_state] }
                />
                <Detail_Row   
                    label={ "Country" }
                    valueList={ [school.country] }
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

export { Schools_Listing }
