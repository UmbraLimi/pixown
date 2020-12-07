// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Sitting_Portlet_ } 		from  './styles.js'
// ----helpers----------------------
import { app_routes } 					from  '/imports/client/routes/app-routes.js'
// ----collections------------------
// ----components-------------------
import { Portlet }              from  '/imports/client/ui/components/portlet/index.jsx'
import { Loading }              from  '/imports/client/ui/components/loading.jsx'

// ====================================================================
@inject('store')
@observer
class Sitting_Portlet extends React.Component {

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
  
  handleDeleteButtonWasClicked = (mongo_id) => {
    //const result = await Meteor.callPromise('DB.delete', "SITTINGS", mongo_id)
  }

  render() {
    const	{ ready, message, problem, sittingManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

    return (
      <Sitting_Portlet_   className='Sitting_Portlet_' >
        <Portlet
            Manager={sittingManager}
            title='Sitting Details'
            icon={{name:'pencil', code: '\f040'}}
            start_collapsed={false}
            //events={{}}
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
      </Sitting_Portlet_>
    )
	}
}
// ====================================================================

export { Sitting_Portlet }
