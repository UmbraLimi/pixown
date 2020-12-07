// ----node-packages----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Workups_Portlet_, NoWorkups_
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
class Workups_Portlet extends React.Component {

  constructor(props) {
    super(props)
  }

  handleRowWasClicked = (workup_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: workup_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_workup, settings, store, {})
  }

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_workup, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }

  render() {
    const	{ ready, message, problem, workupListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (workupListManager.workupManagerList.length === 0) { 
      return (<NoWorkups_> no workups available </NoWorkups_>) 
    }
    // -> -> -> -> //

    return (
      <Workups_Portlet_   className='Workups_Portlet_' >
        <Portlet
            Manager={workupListManager}
            title='Workups Listing'
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
      </Workups_Portlet_>
    )
	}
}
// ====================================================================

export { Workups_Portlet }
