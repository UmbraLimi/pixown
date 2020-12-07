import { _ as __ } from 'lodash'
// ----helpers----------------------
// ----collections------------------
import { PUsers } from '../collection.js'
// ----components-------------------

// ====================================================================
Meteor.methods({
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  async 'PUSERS.get_logged_in_user_record'() {
    const __fn = 'PUSERS.get_logged_in_user_record()'
    const userr = Meteor.users.findOne({
      _id: Meteor.userId()
    })
    if (!userr) {
      throw new Meteor.Error(__fn, 'Cannot find currently logged-in user')
    }
    // -> -> -> -> //

    //return record.username
    const record = PUsers.findOne({
      meteor_username: userr.username
    })
    if (!record) {
      throw new Meteor.Error(
        __fn,
        `Cannot find a user record to match meteor_username: ${userr.username}`
      )
    }
    // -> -> -> -> //

    let newRecord = __.cloneDeep(record)
    delete newRecord.password
    //delete newRecord._id
    //delete newRecord.meteor_user_id  need to keep it to update PUser record from client
    return newRecord
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})
