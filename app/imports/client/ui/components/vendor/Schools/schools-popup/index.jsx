// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Schools_Popup_, NoSchools_ 
}                          		  from  './styles.js'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Portlet as Popup }     from  '/imports/client/ui/components/portlet/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Schools_Popup extends React.Component {
	constructor(props) {
		super(props)
    const { store, schoolListManager } = props
  }

  handleNewButtonWasClicked = () => {
    //const { store } = this.props
    //const settings = {
    //  mode: 'NEW'
    //}
    //store.router.goTo(app_routes.vendor_sitting, settings, store, {})
  }

  handleRowWasClicked = (school_record) => {
    this.props.handlePopupReturnValue(school_record) // send back mongo_id for this
    this.props.toggle_show()
  }

  handleDeleteButtonWasClicked = (mongo_id) => {
    //const result = await Meteor.callPromise('DB.delete', "SITTINGS", mongo_id)
  }

  handleNewButtonWasClicked = () => {
    alert('Hi New')
  }

  render() {
    const	{ ready, message, problem, schoolListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (schoolListManager.schoolManagerList.length === 0) { 
      return (<NoSchools_> no schools available </NoSchools_>) 
    }
   	// -> -> -> -> //
    return (
      <Schools_Popup_   className='Schools_Popup_' >
        <Popup
            Manager={schoolListManager}
            title='Schools'
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
      </Schools_Popup_>
    )
	}
}
// ====================================================================

export { Schools_Popup }