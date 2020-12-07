// ----node-packages----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Sittings_Portlet_, NoSittings_
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
class Sittings_Portlet extends React.Component {

  constructor(props) {
		super(props)
    const { store, sittingListManager } = props
    sittingListManager.handleRowWasClicked = this.handleRowWasClicked
  }

  handleRowWasClicked = (sitting_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: sitting_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_sitting, settings, store, {})
  }

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_sitting, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }

  render() {
    const	{ ready, message, problem, sittingListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (sittingListManager.sittingManagerList.length === 0) { 
      return (<NoSittings_> no sittings available </NoSittings_>) 
    }
   	// -> -> -> -> //

    return (
      <Sittings_Portlet_   className='Sittings_Portlet_' >
        <Portlet
            Manager={sittingListManager}
            title='Sittings Listing'
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
      </Sittings_Portlet_>
    )
	}
}
// ====================================================================

export { Sittings_Portlet }
