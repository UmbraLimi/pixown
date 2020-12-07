// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Printing_Agreements_Popup_, 
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
class Printing_Agreements_Popup extends React.Component {
	constructor(props) {
		super(props)
    const { store, paListManager } = props
  }

  handleNewButtonWasClicked = () => {
    //const { store } = this.props
    //const settings = {
    //  mode: 'NEW'
    //}
    //store.router.goTo(app_routes.vendor_sitting, settings, store, {})
  }

  handleRowWasClicked = (pa_record) => {
    this.props.handlePopupReturnValue(pa_record) // send back mongo_id for this
    this.props.toggle_show()
  }

  handleDeleteButtonWasClicked = (mongo_id) => {
    //const result = await Meteor.callPromise('DB.delete', "SITTINGS", mongo_id)
  }

  render() {
    const	{ ready, message, problem, paListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (paListManager.raManagerList.length === 0) { 
      return (<No_Agreements_> no agreements available </No_Agreements_>) 
    }
   	// -> -> -> -> //
    return (
      <Printing_Agreements_Popup_   className='Printing_Agreements_Popup_' >
        <Popup
            Manager={paListManager}
            title='Printing_Agreements'
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
      </Printing_Agreements_Popup_>
    )
	}
}
// ====================================================================

export { Printing_Agreements_Popup }