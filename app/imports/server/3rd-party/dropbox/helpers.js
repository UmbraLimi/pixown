import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
// dropbbox-fs is needed but is loaded via a require
import { _ as __ } 							from  'lodash'
import { Dropbox } 							from  'dropbox'
import fetch										from  'isomorphic-fetch'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------


// ========================================================================
export const delete_vendor_folders = async (vendor_code) => {
	try {
		const delete_result = await Meteor.call('DB.deleteMany', 'FOLDERS', {vendor_code: vendor_code})
		return delete_result.wasDeleted
		? true
		: false
	} catch (error) {
		console.error('Error occurred while deleting vendor folder records', error)
		return false
	}
}
// ========================================================================
export const walk_dropbox = async (DAT, Cfolders, Messages) => {
	// if async used, return value is promisified, else throw error or returm Promise.reject({message: 'blah'})
	const starting_folder = ''
	const specs = {
		Messages: Messages,
		Cfolders: Cfolders,
		next_sequence: 0,
		dbox: new Dropbox({ accessToken:DAT, fetch:fetch }),
		dboxFS: require('dropbox-fs')({apiKey: DAT}) // don't know how to get this to work using import ...
	}
	//push_message_for_Sam('i', null, `starting ... (version uploaded: July 18, 2018)`)
	await recurse_folder(starting_folder, specs)  // error handling is inside recurse
	// TODO: why is specs updated? it is in call arguments and not explicitly returned
	// looks like JS is passing by reference and so the specs var is being updated down the chain
	//await process_folders()
	return
}
// ========================================================================
const recurse_folder = async (folder, specs) => {
	try {
		const [filenames, subfolders] = await get_dropbox_folder_contents(folder, specs)
		//const thumbnails = await get_thumbnails(folder, files, specs          )
		const fileObjs = await get_file_urls(folder, filenames, specs)
		
		const folderObj = {
			foldername: folder==='' ? '{dropbox root}' : folder,
			subfolders: subfolders,
			files: fileObjs,
			last_scan_time: new Date(),
			sequence: specs.next_sequence
		}
		specs.Cfolders.push(folderObj)
		specs.next_sequence += 1
		return await recurse_subfolders(folder, subfolders, specs)
	} catch(e) {
		console.error(e)
		debugger
	} 
}
// ====================================================================
const recurse_subfolders = async (folder, subfolders, specs) => {
	if (subfolders) {
		return await Promise.all(
			__.map(subfolders, async (subfolder) => {
				const next_folder = folder + '/' + subfolder
				await recurse_folder(next_folder, specs) // error handling is inside recurse
			})
		)
	}
}
// ====================================================================
const get_dropbox_folder_contents = (folder, specs) => {
	// returns a promise
	return new Promise( (resolve, reject) => {
		specs.dboxFS.readdir(folder, {mode:'stat'}, (err, resp) => {
			if (err) {
				debugger
				//push_message_for_Sam('e', err, `Error during readdir of folder ${folder}`)
				return reject({error: err, file: filepath})
			} else {
				const files = __.map(__.filter(resp, {'.tag': 'file'}), (x, i) => {return x.name})
				const folders = __.map(__.filter(resp, {'.tag': 'folder'}), (x, i) => {return x.name})
				return resolve([files, folders])
			}
		})
	})
}
// ====================================================================
const get_file_urls = async (folder, files, specs) => {
	return await Promise.all(
		__.map(files, (file, index) => {
			return new Promise( (resolve, reject) => {
				const filepath = folder + '/' + file
				specs.dbox.sharingCreateSharedLink({
					path: filepath,
					short_url: false
				})
				/*specs.dbox.sharingCreateSharedLinkWithSettings({
					path: filepath, 
					settings: {
						requested_visibility: "public"
					}
				})*/
				.then((response) => {
					resolve({
						name: file,
						url: response.url.split('?')[0]
					})
				})
				.catch((error) => {
					//console.error("get_file_urls error:", error)
					//specs.dbox.sharingGetFileMetadata({
					//	file: filepath 
					//})
					//.then((response) => {
					//	debugger
					//	resolve(response.url.split('?')[0]) // remove the ?dl=0
					//})
					//.catch((error) => {
						debugger
						resolve ({
							name: file,
							error: error
						})
					//})
				})
			})
		})
	)
}
// ====================================================================
const get_thumbnails = async (folder, files, specs) => {
	return await Promise.all(
		__.map(files, (file, index) => {
			return new Promise( (resolve, reject) => {
				const filepath = folder + '/' + file
				specs.dbox.filesGetThumbnail({
					path: filepath, 
					format: 'jpeg', 
					size: 'w64h64', 
					mode: 'strict'
				})
				.then((response) => {
					console.warn('thumbnail:', response.fileBinary.toString('utf8'))
					resolve(response.fileBinary)
				})
				.catch((error) => {
					console.error("get_thumbnail error:", error)
					resolve (false)
				})
			})
		})
	)
}
// ====================================================================