//server only code
import './browser-policy.js'
import { reset_to_test_data } from './utilities.js'
import { Picker }  from 'meteor/meteorhacks:picker'
import { _ as __ }              from  'lodash'
//import '/imports/server/cron/methods.js'
//import { cronJobs } from '/imports/server/cron/jobs.js'

// add in publications (server only) -- as these attach to Meteor via Meteor.publish
import '/imports/collections/PUsers/server/publications.js'
import '/imports/collections/Workups/server/publications.js'
import '/imports/collections/Sittings/server/publications.js'
import '/imports/collections/Images/server/publications.js'
import '/imports/collections/Orders/server/publications.js'
import '/imports/collections/Vendors/server/publications.js'
import '/imports/collections/Schools/server/publications.js'
import '/imports/collections/Printing-Options/server/publications.js'
import '/imports/collections/Printing-Agreements/server/publications.js'
import '/imports/collections/Retouching-Services/server/publications.js'
import '/imports/collections/Retouching-Agreements/server/publications.js'
import '/imports/collections/Downloading-Options/server/publications.js'
import '/imports/collections/Downloading-Agreements/server/publications.js'
import '/imports/collections/Uploads/server/publications.js'
import '/imports/collections/Transactions/server/publications.js'
import '/imports/collections/Events/server/publications.js'
import '/imports/collections/Folders/server/publications.js'

// add in methods (both client and server) -- as these attach to Meteor via Meteor.methods
import '/imports/server/db/methods.js'
import '/imports/collections/PUsers/server/methods.js'
import '/imports/collections/Workups/server/methods.js'
import '/imports/collections/Sittings/server/methods.js'
import '/imports/collections/Images/server/methods.js'
import '/imports/collections/Orders/server/methods.js'
import '/imports/collections/Vendors/server/methods.js'
import '/imports/collections/Schools/server/methods.js'
import '/imports/collections/Printing-Agreements/server/methods.js'
import '/imports/collections/Printing-Options/server/methods.js'
import '/imports/collections/Retouching-Agreements/server/methods.js'
import '/imports/collections/Retouching-Services/server/methods.js'
import '/imports/collections/Downloading-Options/server/methods.js'
import '/imports/collections/Downloading-Agreements/server/methods.js'
import '/imports/collections/Uploads/server/methods.js'
import '/imports/collections/Transactions/server/methods.js'
import '/imports/collections/Events/server/methods.js'
import '/imports/collections/Folders/server/methods.js'

import '/imports/server/3rd-party/dropbox/methods.js'

// makes "Stripe" global on server
import '/imports/server/3rd-party/stripe/methods.js'

import { run_dropbox_conversion } from '/imports/server/vendor-custom/Luxarte/lbc.js'

// ===========================================================================================
Meteor.startup(() => {
	console.log("|-- start [server] Meteor.startup()")
	
	// start processing jobs
	//cronJobs.start();

	// TODO: only allow this if in DEVELOPMENT mode
	Picker.route('/reset_to_test_data', async (params, req, res, next) => {
		res.writeHead(200, {'Content-Type': 'text/plain'})  // or 'text/html'
		const result = await reset_to_test_data()
		res.end(result)
	})
	
	Picker.route('/run_dropbox_conversion', async (params, req, res, next) => {
		let style
		res.writeHead(200, {'Content-Type': 'text/html'})  // or 'text/html'
		res.write('<div style="background-color:aliceblue; font-family:sans-serif">')
		res.write("<h2>Starting conversion ...</h2>")
		const messages = await run_dropbox_conversion(res)
		res.write("<p>Messages from Conversion</p>")
		res.write("<ol>")
		__.forEach(messages, message => {
			style = message.mtype==='e'
				? 'color:red;background-color:black;'
				: message.mtype==='w'
					? 'color:yellow;background-color:black;'
					: 'color:black;'
			res.write(`<li style="${style}"> ${message.message} </li>`)
			if (message.mtype==='e') {
				res.write(`<li style="${style}"> --> ${message.error.message||'~~'} </li>`)
				res.write(`<li style="${style}"> --> ${message.message||'~~'} </li>`)
			}
		})
		res.write("</ol>")
		res.write("<h2>Conversion complete</h2>")
		res.end('</div>')
	})

	console.log("|-- end   [server] Meteor.startup()")
})
