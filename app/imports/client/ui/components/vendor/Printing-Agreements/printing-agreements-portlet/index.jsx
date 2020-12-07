// ----node-packages----------------
import React                    from  'react'
//import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Printing_Agreements_Portlet_, NoPrinting_Agreements_
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
class Printing_Agreements_Portlet extends React.Component {

  constructor(props) {
		super(props)
    props.paListManager.handleRowWasClicked = this.handleRowWasClicked
  }

  handleRowWasClicked = (pa_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: pa_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_printing_agreement, settings, store, {})
  }

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_printing_agreement, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }

  render() {
    const	{ ready, message, problem, paListManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    if (paListManager.paManagerList.length === 0) { 
      return (<NoPrinting_Agreements_> no agreements available </NoPrinting_Agreements_>) 
    }
   	// -> -> -> -> //

    return (
      <Printing_Agreements_Portlet_   className='Printing_Agreements_Portlet_' >
        <Portlet
            Manager={paListManager}
            title='Printing Agreements Listing'
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
      </Printing_Agreements_Portlet_>
    )
	}
}
// ====================================================================

export { Printing_Agreements_Portlet }
