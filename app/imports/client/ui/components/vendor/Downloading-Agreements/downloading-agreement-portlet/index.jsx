// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Downloading_Agreement_Portlet_ } 		from  './styles.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
import { Portlet }              from  '/imports/client/ui/components/portlet/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Agreement_Portlet extends React.Component {

  handleNewButtonWasClicked = () => {
    const { store } = this.props
    const settings = {
      mode: 'NEW'
    }
    store.router.goTo(app_routes.vendor_downloadingagreement, settings, store, {})
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }
  
  handleDeleteButtonWasClicked = (mongo_id) => {
    //const result = await Meteor.callPromise('DB.delete', "SITTINGS", mongo_id)
  }

  render() {
    const	{ ready, message, problem, daManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    return (
      <Downloading_Agreement_Portlet_   className='Downloading_Agreement_Portlet_' >
        <Portlet
            Manager={daManager}
            title='Downloading Agreement Details'
            icon={{name:'pencil', code: '\f040'}}
            start_collapsed={false}
            //events={{}}
            junk={daManager.record}
            options={{
              button_title: 'Options',
              buttons: [
                {
                  title:    'New',
                  icon:     {name: 'plus-circle', code: '\f0fe'},
                  onClick:  this.handleNewButtonWasClicked
                },
                {
                  title:    'Delete',
                  icon:     {name: 'times-circle', code: '\f057'},
                  onClick:  this.handleDeleteButtonWasClicked
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
                  title:    'Delete',
                  icon:     {name: 'times-circle', code: '\f057'},
                  onClick:  this.handleDeleteButtonWasClicked
                },
                {
                  title:    'Exit',
                  icon:     {name: 'sign-out', code: '\f08b'},
                  onClick:  this.handleExitButtonWasClicked
                }
              ]
            }}
        />
      </Downloading_Agreement_Portlet_>
    )
	}
}
// ====================================================================

export { Downloading_Agreement_Portlet }
