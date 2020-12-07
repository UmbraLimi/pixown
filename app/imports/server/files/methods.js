import { check }        				    from 'meteor/check'
import walk from 'walk'
import os from 'os'
import parse from 'csv-parse'
import fs from 'fs'
//import { _ as __ } from 'lodash'
//import moment from 'moment'

// ====================================================================
Meteor.methods({
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	'FILES.Promise__find_folder_via_walk'( file ) {
		return new Promise( (resolve, reject) => {
			try {
				check(file, String) // this is all you need, but offers little protection
				const starting_folder = os.type() === "Linux"
					? '/home/fraser/Dropbox'
					: 'D:\\Dropbox\\fraser-at-bsa\\Dropbox\\Pixown and Fraser'

				const walker = walk.walk(starting_folder, {})

				walker.on('directories', (thepath, dirStatsArray, next) => {
					//console.log('in', thepath)
					//console.log('dirStatsArray', dirStatsArray)
					next() // just proceed to next file or folder in here
				})

				walker.on('file', (thepath, filestats, next) => {
					//console.log(filestats.name)
					if (filestats.name === file) {
						console.log('*** path', thepath, file)
						resolve(thepath)
					} else {
						next()
					}
				})

				walker.on("errors", (root, nodeStatsArray, next) => {
					console.log('walker error')
					next()
				})
	
				walker.on("end", function () {
					console.log("all done - not found")
					reject(new Meteor.Error('FILES.find_via_walk', 'file not found', file))
				})
			}
			catch (error) {
				console.log( '~~MM~~', 'FILES.find_via_walk', '~~~~','catch','--', error)
				reject(new Meteor.Error('FILES.find_via_walk', 'unexpected error', error.details))
			}
		})
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	'FILES.Promise__convert_csv_to_array_of_objects'( file ) {
		return new Promise( (resolve, reject) => {
			try {
				check(file, String)
				let parser = parse({delimiter: ',', columns: true, auto_parse: true, escape:'\\'}, function(err, data){
					if (err) {
						return reject(err)
					} else {
						return resolve(data)
					}
				})
				fs.createReadStream(file).pipe(parser)
			}
			catch (error) {
				console.log( '~~MM~~~', 'FILES.Promise__convert_csv_to_array_of_objects', '~~~','catch','--', error)
				reject(new Meteor.Error('FILES.Promise__convert_csv_to_array_of_objects', 'unexpected error', error.details))
			}
		})
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	'FILES.Promise__find_images_with_starting_string'( starting_string, folder, search_subfolders=false, extensions=['jpg'] ) {
		return new Promise( (resolve, reject) => {
			try {
				check(starting_string, String)
				check(folder, String)
				check(search_subfolders, Boolean)
				check(extensions, Array)
	
				const image_files = []
				const walker = walk.walk(folder, {})
				starting_string = starting_string.toLowerCase()
	
				walker.on('directories', (thepath, dirStatsArray, next) => {
					if (search_subfolders) {next()}  // keep going
				})
	
				walker.on('file', (thepath, filestats, next) => {
					const filename = filestats.name.toLowerCase()
					if (filename.substr(0, starting_string.length) === starting_string) {
						const ext = filename.split('.')[1]
						if (_.contains(extensions, ext)) {
							image_files.push({file: filestats, folder: thepath})
						}
					}
					next()  // keep going
				})
	
				walker.on("errors", (root, nodeStatsArray, next) => {
					console.log('walker error')
					next() // keep going
				})
	
				walker.on("end", function () {
					//console.log("all done", image_files.length, 'images found')
					resolve(image_files)
				})
			}
			catch (error) {
				console.log( '~~MM~~~', 'FILES.Promise__find_images_with_starting_string', '~~~','catch','--', error)
				reject(new Meteor.Error('FILES.Promise__find_images_with_starting_string', 'unexpected error', error.details))
			}
		})
	},
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
})