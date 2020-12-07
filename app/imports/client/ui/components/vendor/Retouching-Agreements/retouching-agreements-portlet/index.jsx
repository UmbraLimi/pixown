// ----node-packages----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Retouching_Agreements_Portlet_, No_Agreements_
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
class Retouching_Agreements_Portlet extends React.Component {

  constructor(props) {
		super(props)
    props.raListManager.handleRowWasClicked = this.handleRowWasClicked
  }

  handleRowWasClicked = (ra_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: ra_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_retouching_agreement, settings, store, {})
  }

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_retouching_agreement, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }

  render() {
    const	{ ready, message, problem, raListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (raListManager.raManagerList.length === 0) { 
      return (<No_Agreements_> no agreements available </No_Agreements_>) 
    }
   	// -> -> -> -> //

    return (
      <Retouching_Agreements_Portlet_   className='Retouching_Agreements_Portlet_' >
        <Portlet
            Manager={raListManager}
            title='Retouching Agreements Listing'
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
      </Retouching_Agreements_Portlet_>
    )
	}
}
// ====================================================================

export { Retouching_Agreements_Portlet }
