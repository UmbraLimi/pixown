// ----node-packages----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Downloading_Agreements_Portlet_, NoDownloading_Agreements_
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
class Downloading_Agreements_Portlet extends React.Component {

  constructor(props) {
		super(props)
    props.daListManager.handleRowWasClicked = this.handleRowWasClicked
  }

  handleRowWasClicked = (da_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: da_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_downloading_agreement, settings, store, {})
  }

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_downloading_agreement, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }

  render() {
    const	{ ready, message, problem, daListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (daListManager.daManagerList.length === 0) { 
      return (<No_Agreements_> no agreements available </No_Agreements_>) 
    }
   	// -> -> -> -> //

    return (
      <Downloading_Agreements_Portlet_   className='Downloading_Agreements_Portlet_' >
        <Portlet
            Manager={daListManager}
            title='Downloading Agreements Listing'
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
      </Downloading_Agreements_Portlet_>
    )
	}
}
// ====================================================================

export { Downloading_Agreements_Portlet }
