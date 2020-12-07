// ----node-packages----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Schools_Portlet_, NoSchools_
} 															from  './styles.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
import { Portlet }              from  '/imports/client/ui/components/portlet/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Schools_Portlet extends React.Component {

  constructor(props) {
		super(props)
    const { store, schoolListManager } = props
    schoolListManager.handleRowWasClicked = this.handleRowWasClicked
  }

  handleRowWasClicked = (school_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: school_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_school, settings, store, {})
  }

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_school, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
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
      <Schools_Portlet_   className='Schools_Portlet_' >
        <Portlet
            Manager={schoolListManager}
            title='Schools Listing'
            icon={{name:'list', code: '\f03a'}}
            start_collapsed={false}
            events={{handleRowWasClicked: this.handleRowWasClicked}}
            options={{
              button_title: 'Options',
              buttons: [
                {
                  title:    'New',
                  icon:     {name: 'plus-circle', code: '\f0fe'},
                  onClick:  this.handleNewButtonWasClicked
                },
                {
                  title:    'Exit',
                  icon:     {name: 'sign-out', code: '\f08b'},
                  onClick:  this.handleExitButtonWasClicked
                }
              ]
            }}
            tools={{
              buttons: [
                {
                  title:    'New',
                  icon:     {name: 'plus-circle', code: '\f0fe'},
                  onClick:  this.handleNewButtonWasClicked
                },
                {
                  title:    'Exit',
                  icon:     {name: 'sign-out', code: '\f08b'},
                  onClick:  this.handleExitButtonWasClicked
                }
              ]
            }}
        />
      </Schools_Portlet_>
    )
	}
}
// ====================================================================

export { Schools_Portlet }
