import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import { SyncedCron as cronJobs } from 'meteor/littledata:synced-cron'

// ========================================================================
cronJobs.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 2 minutes');
  },
  job: function() {
		const numbersCrunched = Meteor.call('crushSomeNumbers', "parm1", "parm2")
    return numbersCrunched
  }
})
// ========================================================================

export { cronJobs }