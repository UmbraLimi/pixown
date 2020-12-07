// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Downloading_Agreements_Popup_, 
  No_Agreements_ 
}                          		  from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Portlet as Popup }     from  '/imports/client/ui/components/portlet/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Agreements_Popup extends React.Component {
	constructor(props) {
		super(props)
    const { store, daListManager } = props
  }

  handleNewButtonWasClicked = () => {
    //const { store } = this.props
    //const settings = {
    //  mode: 'NEW'
    //}
    //store.router.goTo(app_routes.vendor_sitting, settings, store, {})
  }

  handleRowWasClicked = (da_record) => {
    this.props.handlePopupReturnValue(da_record) // send back mongo_id for this
    this.props.toggle_show()
  }

  handleDeleteButtonWasClicked = (mongo_id) => {
    //const result = await Meteor.callPromise('DB.delete', "SITTINGS", mongo_id)
  }

  render() {
    const	{ ready, message, problem, daListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (daListManager.raManagerList.length === 0) { 
      return (<No_Agreements_> no agreements available </No_Agreements_>) 
    }
   	// -> -> -> -> //
    return (
      <Downloading_Agreements_Popup_   className='Downloading_Agreements_Popup_' >
        <Popup
            Manager={daListManager}
            title='Downloading_Agreements'
            icon={{name:'list', code: '\f03a'}}
            events={{handleRowWasClicked: this.handleRowWasClicked}}
            tools={{
              buttons: [
                {
                  title:    'Exit',
                  icon:     {name: 'sign-out', code: '\f08b'},
                  onClick:  this.handleExitButtonWasClicked
                }
              ]
            }}
        />
      </Downloading_Agreements_Popup_>
    )
	}
}
// ====================================================================

export { Downloading_Agreements_Popup }