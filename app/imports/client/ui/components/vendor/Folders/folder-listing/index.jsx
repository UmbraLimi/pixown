// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
//import { observable, action } 	from  'mobx'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
  Listing_, Row_, Details_, 
  Header_, Header_Row_, NoFolders_,
  LastScan_
} 			                        from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
import { dateify, datetimeify } from  '/imports/client/misc/formatter.js'
// ----collections------------------
// ----components-------------------
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Folder_Listing extends React.Component {

	render() {
		const { Manager:folderManager, events } = this.props
    const folder = folderManager.record
    return (
      <Listing_   className='Folder_Listing_' >
        <LastScan_ className='LastScan_'> Last Scanned: {datetimeify(folderManager.record.last_scan_time)} </LastScan_>
        <Row_ 
            className='Folder_Row_'
            folder={ folder }
            onClick={() => events.handleRowWasClicked(folder)}
        >
          <Header_  className='Folder_Header_' >
            <Header_Row_>{folder.foldername}</Header_Row_>
          </Header_>

          <Details_ className='Folder_Details_' >

            { folderManager.images_count > 0 
              ? <Detail_Row  
                  values_orientation='cols'
                  label={ "Images" }
                  valueList={ folderManager.image_urls }
                  truncate_count={3}
                  fformat={[{verb:'imageify', args: {width:'50px'}}]}
                />
              : null 
            }
            { folderManager.xls_count > 0 
              ? <Detail_Row  
                  values_orientation='rows'
                  label={ "XLS" }
                  valueList={ folderManager.xls_names }
                  truncate_count={2}
                />
              : null
            }
            { folderManager.csv_count > 0 
              ? <Detail_Row  
                  values_orientation='rows'
                  label={ "CSV" }
                  valueList={ folderManager.csv_names }
                  truncate_count={2}
                />
              : null
            }
            { folderManager.folders_count > 0 
              ? <Detail_Row  
                  values_orientation='rows'
                  label={ "Subfolders" }
                  valueList={ folderManager.folder_names }
                  truncate_count={5}
                />
              : null
            }

          </Details_>
        </Row_>
      </Listing_>
		)
	}
}
// ====================================================================

export { Folder_Listing }
