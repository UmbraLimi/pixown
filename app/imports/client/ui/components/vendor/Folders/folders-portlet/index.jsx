// ----node-packages----------------
import React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { toJS, computed } from 'mobx'
import { _ as __ } from 'lodash'
// ----styles-----------------------
import {
  Folders_Portlet_,
  NoFolders_,
  Message_Row_,
  Message_Title_,
  Checkbox_,
  Checkbox_Label_,
  Checkbox_Title_,
  Checkbox_Group_,
  CheckIcon_,
  Search_Title_,
  Filter_Section_,
  Search_Section_,
  Search_Input_
} from './styles.js'
// ----helpers----------------------
import { app_routes } from '/imports/client/routes/app-routes.js'
import { timeify } from '/imports/client/misc/formatter.js'
// ----collections------------------
// ----components-------------------
import { Portlet } from '/imports/client/ui/components/portlet/index.jsx'
import { Loading } from '/imports/client/ui/components/loading.jsx'
import { Modal } from '/imports/client/ui/components/modal/index.jsx'
import { Button } from '/imports/client/ui/components/button/index.jsx'

// ====================================================================
MessagesModal = ({ messages, toggle_show_messages }) => {
  // messages will always be defined.. check is made in render
  return (
    <Modal toggle_show={toggle_show_messages}>
      <Message_Title_>Messages</Message_Title_>
      {__.map(messages, (message, i) => {
        return (
          <Message_Row_ i={i} key={i}>
            {message}
          </Message_Row_>
        )
      })}
    </Modal>
  )
}
// ====================================================================
@inject('store')
@observer
class Filter_Section extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const checkedd = { name: 'check-square-o', code: '\f14a' }
    const uncheckedd = { name: 'square-o', code: '\f096' }
    const { Manager } = this.props
    const { jpg = false, xls = false, csv = false } = Manager
    const jpg_icon = jpg ? checkedd : uncheckedd
    const csv_icon = csv ? checkedd : uncheckedd
    const xls_icon = xls ? checkedd : uncheckedd
    return (
      <Filter_Section_>
        <Checkbox_Group_>
          <Checkbox_Title_>Include:</Checkbox_Title_>
          <CheckBox__
            Manager={Manager}
            name='JPG_Icon_'
            icon={jpg_icon}
            onclick={this.props.handleJPGCheckboxWasClicked}
            label='.jpg'
          />
          <CheckBox__
            Manager={Manager}
            name='CSV_Icon_'
            icon={csv_icon}
            onclick={this.props.handleCSVCheckboxWasClicked}
            label='.csv'
          />
          <CheckBox__
            Manager={Manager}
            name='XLS_Icon_'
            icon={xls_icon}
            onclick={this.props.handleXLSCheckboxWasClicked}
            label='.xlsx'
          />
        </Checkbox_Group_>
      </Filter_Section_>
    )
  }
}
// ====================================================================
@inject('store')
@observer
class CheckBox__ extends React.Component {
  render() {
    const { Manager, onclick, icon, name, label } = this.props
    return (
      <Checkbox_ onClick={onclick}>
        <CheckIcon_
          className={name}
          icon={icon}
          theme_colour={Manager.theme_colour}
        />
        <Checkbox_Label_ theme_colour={Manager.theme_colour}>
          {label}
        </Checkbox_Label_>
      </Checkbox_>
    )
  }
}

// ====================================================================
@inject('store')
@observer
class Search_Section extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSearchButtonWasClicked = (Manager) => {
    Manager.set_search_term(this.input.value)
  }

  render() {
    const { Manager } = this.props
    const button_width_height = '25px'
    return (
      <Search_Section_ theme_colour={Manager.theme_colour}>
        <Search_Title_>Search:</Search_Title_>
        {/* new styled-components 4 way */}
        <Search_Input_
          type='text'
          ref={(input) => {
            this.input = input
          }}
        />
        {/* old way <Search_Input_ type="text" innerRef={(input) => {this.input = input}} /> */}
        <Button
          width={button_width_height}
          height={button_width_height}
          margin={'10px'}
          type='ICON-ONLY'
          title={'Search'}
          icon={{ name: 'search', code: '\f002' }}
          onClick={() => this.handleSearchButtonWasClicked(Manager)}
          hover={{
            textColour: Manager.button_theme_colour.base,
            bgColour: Manager.button_theme_colour.font
          }}
          textColour={Manager.button_theme_colour.font}
          bgColour={Manager.button_theme_colour.base}
        />
      </Search_Section_>
    )
  }
}
// ====================================================================
@inject('store')
@observer
class Folders_Portlet extends React.Component {
  @observable messages = undefined
  @observable show_messages = true
  @action toggle_show_messages = () => {
    this.show_messages = !this.show_messages
  }

  @action
  set_messages = (messages) => {
    this.messages = messages
  }

  constructor(props) {
    super(props)
    const { folderListManager } = props
    folderListManager.handleRowWasClicked = this.handleRowWasClicked
  }

  handleRowWasClicked = (folder_record) => {
    const { store } = this.props
    const settings = {
      mongo_id: folder_record._id,
      mode: 'EXISTING'
    }
    store.router.goTo(app_routes.vendor_folder, settings, store, {})
  }

  handleCheckNowButtonWasClicked = async () => {
    //const { store } = this.props
    const args = {}
    const result = await Meteor.callPromise('check_dropbox', args)

    console.log('check_dropBox() was last run', timeify(result.time_of_scan))
    console.log({ result })
    this.set_messages(result.messages)
    //this.set_messages(['There was a lot more to do than this. SOmebody said, "Run!" and we ran like the devil himself was on our heels.', 'b', 'c'])
  }

  handleExitButtonWasClicked = () => {
    const { store } = this.props
    store.router.goTo(app_routes.vendor_homebase, {}, store, {})
  }

  handleJPGCheckboxWasClicked = (Manager) => {
    Manager.toggle_jpg()
  }
  handleCSVCheckboxWasClicked = (Manager) => {
    Manager.toggle_csv()
  }
  handleXLSCheckboxWasClicked = (Manager) => {
    Manager.toggle_xls()
  }

  render() {
    const { ready, message, problem, folderListManager, details } = this.props
    if (!ready) {
      return <Loading message={message} problem={problem} />
    }
    // -> -> -> -> //

    // allow folderListManager.folderManagerList.length===0 to pass through and be caught in portlet
    // so that the user can click the "Scan" button there in the portlet options
    const options_buttons = []
    options_buttons.push({
      title: 'Scan',
      icon: { name: 'folder-o', code: '\f114' },
      onClick: this.handleCheckNowButtonWasClicked
    })
    if (this.messages) {
      options_buttons.push({
        title: 'Messages',
        icon: { name: 'comment-o', code: '\f0e5' },
        onClick: this.toggle_show_messages
      })
    }
    options_buttons.push({
      title: 'Exit',
      icon: { name: 'sign-out', code: '\f08b' },
      onClick: this.handleExitButtonWasClicked
    })

    return (
      <Folders_Portlet_ className='Folders_Portlet_'>
        {this.messages && this.messages.length > 0 && this.show_messages ? (
          <MessagesModal
            messages={this.messages}
            toggle_show_messages={this.toggle_show_messages}
          />
        ) : null}
        <Portlet
          Manager={folderListManager}
          title='Folders Listing'
          icon={{ name: 'list', code: '\f03a' }}
          start_collapsed={false}
          start_options_in_view={true}
          search={<Search_Section Manager={folderListManager} />}
          filter={
            <Filter_Section
              jpg={folderListManager.jpg}
              xls={folderListManager.xls}
              csv={folderListManager.csv}
              Manager={folderListManager}
              handleJPGCheckboxWasClicked={() =>
                this.handleJPGCheckboxWasClicked(folderListManager)
              }
              handleCSVCheckboxWasClicked={() =>
                this.handleCSVCheckboxWasClicked(folderListManager)
              }
              handleXLSCheckboxWasClicked={() =>
                this.handleXLSCheckboxWasClicked(folderListManager)
              }
            />
          }
          activeList={this.activeList}
          events={{ handleRowWasClicked: this.handleRowWasClicked }}
          options={{
            button_title: 'Options',
            buttons: options_buttons
          }}
          tools={{
            buttons: [
              {
                title: 'Exit',
                icon: { name: 'sign-out', code: '\f08b' },
                onClick: this.handleExitButtonWasClicked
              }
            ]
          }}
        />
      </Folders_Portlet_>
    )
  }
}
// ====================================================================

export { Folders_Portlet }
