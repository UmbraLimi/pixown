import { Meteor }               from 'meteor/meteor'
import os                       from 'os'
import fs 											from 'fs'
import parse 										from 'csv-parse/lib/sync'
import { _ as __ } 							from 'lodash'
import stringify								from 'csv-stringify/lib/sync'
import XLSX											from 'xlsx'
// dropbbox-fs is needed but is loaded via a require
import tempfile 								from 'tempfile'
import { promisify } 						from 'util'

const batch_root = '_order_batch.xls'
const upload_root = '_order_upload.xls'
const orders_pending_csv = 'orders_pending.csv'
const pre_root = 'Pre'
const dropbox_access_token = Meteor.settings.private.dropbox_access_tokens.development
const Messages = []
const parse_options = {
	delimiter: ',', 
	columns: true, 
	auto_parse: true, 
	skip_lines_with_empty_values: true, 
	escape:'\\'
}
let mess_gen = sequential_message_generator()
let dbx // will be object that eventually holds dropbox-fs (see walk_dropbox())
const Cfolders = [] // this will store all info about the folders looked at

// ===========================================================================================
const run_dropbox_conversion = async () => { // adds old luxarte site's exports after Sam has done some work
	console.log('===', 'starting run_dropbox_conversion' )
	Messages.length = 0 // to clear the global
	try {
		await walk_dropbox()
		console.log('===', 'ending run_dropbox_conversion', 'success' )
	} catch(e) {
		push_message_for_Sam('e', e, 'Unexpected Failure')
		console.log('===', 'ending run_dropbox_conversion', 'failure' )
	} finally {
		push_message_for_Sam('i', null, 'ending run_dropbox_conversion')
		return Messages
	}
}
// ====================================================================
function* sequential_message_generator() {
	let num = 0
	while(true) {yield num++}
}
// ===========================================================================================
const push_message_for_Sam = (mtype, error, message) => {
	Messages.push({
		mtype: mtype,
		message: message,
		error: error
	})
	const num = mess_gen.next().value
	if (mtype === 'e') {
		console.error('Error >>>', num, '<<<')
		console.log(message)
		console.log(error)
	} else if (mtype==='w') {
		console.warn('Warning >>>', num, '<<<')
		console.log(message)
	} else {
		console.info('Info >>>', num, '<<<', ' mtype', mtype)
		console.log(message)
	}
}
// ====================================================================
const removeDuplicatedContent = (value) => {
	if (!value) {return value}
	const temp = value.split(',')
	return temp.length>1 && temp[0]===temp[1]
		? temp[0]
		: value
}
// ====================================================================
const fixOntario = (value) => {
	return value === 'ON' || value === 'ONT'
		? "ONTARIO"
		: value
}
// ====================================================================
const fixCountry = (value) => {
	return value === 'CAN'
		? "CANADA"
		: value
}
// ====================================================================
const upper = (value) => {
	return __.isString(value)
		? value.toUpperCase()
		: value
}
// ====================================================================
const fixPC = (value) => {
	if (typeof value === 'string') {
		const temp = value.replace(' ', '')
		return temp.length === 6
			? temp.slice(0,3) + ' ' + temp.slice(3)
			: value
	} else {
		return value
	}
}
// ====================================================================
const myTrim = (value) => {
	return __.isString(value) 
		? value.trim()
		: value
}
// ====================================================================
const change0ToBlank = (value) => {
	return value === '0' || value === 0
		? ''
		: value
}
// ====================================================================
const removeTrailingComma = (value) => {
	return __.isString(value) 
		? value.slice(-1) === ',' 
			? value.slice(0, -1)
			: value
		: value
}
// ====================================================================
const P_import_spreadsheetlike_thing_to_array_of_objects = (folder, file, dropboxFilecontents, is_HTML=false) => {
	console.log('++', 'P_import_spreadsheetlike_thing_to_array_of_objects', 'async' )
	let step
	return new Promise( (resolve, reject) => {
		const filepath = folder + '/' + file
		const is_CSV = file.toUpperCase().endsWith('.CSV')
		try {
			step = 'reading'
			let workbook
			if (dropboxFilecontents) { // this is from dropbox
				if (is_HTML) {
					workbook = XLSX.readFile(file) // NOT filepath
				} else if (is_CSV) {
					workbook = XLSX.read(dropboxFilecontents, {type:"buffer", cellText:false, cellDates:true, dateNF: 'yyyy-MM-dd hh:mm:ss'}) // to get times in dates
				} else {
					workbook = XLSX.read(dropboxFilecontents, {type:"binary"}) 
				}
			} else { // this if from os and is a file
				workbook = is_CSV
					? XLSX.readFile(filepath, {cellText:false, cellDates:true}) // to get times in dates)
					: XLSX.readFile(filepath)
			}

			step = 'converting worksheet to CSV'
			const sheetname = workbook.SheetNames[0] // will only ever be one sheet
			// save as csv (but preserve dates)
			const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetname], {dateNF: 'dd/MMMM/yyyy hh:mm:ss AM/PM'})
			// use parse to get row objects

			step = 'parsing'
			const output = parse(csv, parse_options) // synchronous form

			return resolve({data:output, file:filepath})

		} catch (e) {
			push_message_for_Sam('e', e, `Error ${step} ${file} ${filepath}`)
			return reject({error: e, filepath: filepath, file: file})
		}
	})
}
// ====================================================================
function* sequential_num_generator() {
	let num = 0
	while(true) {yield num++}
}
// ====================================================================
const load_new_dropbox_data = async (dbx, folder, batch_xls, upload_xls, orders_pending_csv) => {
	console.log('++', 'load_new_dropbox_data', 'async' )
	let step
	try {
		const batch_path = folder==='' ? batch_xls : folder + '/' + batch_xls
		step = 'batch_contents'
		const batch_contents = await P_read_dropbox_file(dbx, batch_path)
		step = 'batches'
		const batches = await P_import_spreadsheetlike_thing_to_array_of_objects(folder, batch_xls, batch_contents)
		const upload_path = folder==='' ? upload_xls : folder + '/' + upload_xls
	
		step = 'upload_contents'
		const upload_contents = await P_read_dropbox_file(dbx, upload_path)
		step = 'uploads'
		const uploads = await P_import_spreadsheetlike_thing_to_array_of_objects(folder, upload_xls, upload_contents)
		const order_path = folder==='' ? orders_pending_csv : folder + '/' + orders_pending_csv
		step = 'order_contents'
		const order_contents = await P_read_dropbox_file(dbx, order_path)
		step = 'orders'
		const orders = await P_import_spreadsheetlike_thing_to_array_of_objects(folder, orders_pending_csv, order_contents)
		return [batches, uploads, orders]
	} catch(e) {
		push_message_for_Sam('e', e, `from -- load_new_dropbox_data() at Step ${step}`)
		throw e
	}
}
// ====================================================================
const load_old_dropbox_data = async (dbx, folder, PRE_xls) => {
	console.log('++', 'load_old_dropbox_data', 'async' )
	let step, temp_filename, PREs
	try {
		const PRE_path = folder==='' ? PRE_xls : folder + '/' + PRE_xls
		step = 'PRE_contents'
		const PRE_contents = await P_read_dropbox_file(dbx, PRE_path)
		if (PRE_contents.indexOf("<table ") === -1) {
			// XLS
			step = 'modifying XLS??'
			step = 'PREs' // Sam has edited the origibal xls (in HTML foirmat) in Excel and saved as .xls so I must assume he dealt with the 2 Collages columns
			PREs = await P_import_spreadsheetlike_thing_to_array_of_objects(folder, PRE_xls, PRE_contents)
		} else {
			// HTML
			step = 'modifying HTML'
			const temp1 = PRE_contents.replace(/th scope="col"/g, 'td' )
			const temp2 = temp1.replace(/th>/g, 'td>' )
			const temp3 = temp2.replace(/Collages/, "Note") // temp rename the first Collage col
			//const temp4 = temp3.replace(/Collages/, "Note")
			//const newFilecontents = temp4.replace(/xqw/, "Collages")
			const temp_filename = tempfile('.xls') 
			//fs.writeFileSync(temp_filename, newFilecontents)
			fs.writeFileSync(temp_filename, temp3)
			step = 'PREs'
			PREs = await P_import_spreadsheetlike_thing_to_array_of_objects(folder, temp_filename, newFilecontents, true)
		}
		return [PREs]
	} catch(e) {
		push_message_for_Sam('e', e, `Error while load_old_dropbox_data at Step: ${step}`)
		throw e
	}
}
// ====================================================================
const init_field = (gen, title, value=undefined) => {

	return {
		col_no: gen.next().value,
		title: title,
		value: value,
		output: undefined
	}
}
// ====================================================================
const init_output_object = () => {

	let gen = sequential_num_generator() // initialize and pass the current value to the fields

	return {
		ERRORS: init_field(gen, "Errors",[]),
		SOURCE: init_field(gen, "Source"),
		ORDER_NUMBER: init_field(gen, "Order Number"),
		ITEMS_SUBTOTAL: init_field(gen, "Items Purchased"),
		CD_TOTAL: init_field(gen, "CD Total"),
		INSURANCE: init_field(gen, "Insurance"),
		POSTAGE: init_field(gen, "Postage"),
		TAX: init_field(gen, "Tax"),
		TOTAL: init_field(gen, "Sale"),
		CLIENT_KEY: init_field(gen, "Client Key"),
		//_SITTING_NUMBER_ALL: init_field(gen, "Sitting_Number_ALL",[]),
		_SITTING_NUMBER: init_field(gen, "Proof to Print",[]),
		_POSE_COUNT: init_field(gen, "Units"),
		_RETOUCHES: init_field(gen, "Retouch",[]),
		_PERS_WALLETS: init_field(gen, "PW",[]),
		_COLLAGES: init_field(gen, "Note",[]),
		_SHEETS_11x14: init_field(gen, "11x14",[]),
		_SHEETS_8x10: init_field(gen, "8x10",[]),
		_SHEETS_5x7: init_field(gen, "5x7",[]),
		_SHEETS_4x5: init_field(gen, "4x5",[]),
		_SHEETS_WALLETS: init_field(gen, "Wallets",[]),
		_SHEETS_16x20: init_field(gen, "16x20",[]),
		FRAMES_8x10: init_field(gen, "8x10 Frame"),
		FRAMES_11x14: init_field(gen, "11x14 Frame"),
		FRAMES_16x20: init_field(gen, "16x20 Frame"),
		FRAMES_YESNO: init_field(gen, "Frames"),
		MOUNTS_4x5: init_field(gen, "4x5 Mounts"),
		MOUNTS_5x7: init_field(gen, "5x7 Mounts"),
		MOUNTS_8x10: init_field(gen, "8x10 Mounts"),
		MOUNTS_YESNO: init_field(gen, "Mounts"),
		CD_YESNO: init_field(gen, "CD"),
		ALL_FINISHES: init_field(gen, "Finish"),
		MAILING_ADDRESS: init_field(gen, "Mailing Address"),
		MAILING_CITY: init_field(gen, "Mailing City"),
		MAILING_PROVINCE: init_field(gen, "Mailing Province"),
		MAILING_POSTAL_CODE: init_field(gen, "Mailing Postal Code"),
		MAILING_COUNTRY: init_field(gen, "Mailing Country"),
		ORDER_PHONE: init_field(gen, "Mailing Phone"),
		ORDER_EMAIL: init_field(gen, "Mailing Email"),
		__ORDER_DATE: init_field(gen, "Order Date"),
		__PROCESS_DATE: init_field(gen, "Process Date"),
		__APPROVED_NUMBER: init_field(gen, "Approved Number"),
		__DOWNLOAD_DATE: init_field(gen, "Downloaded Date"),
	}
}
// ====================================================================
const walk_dropbox = async () => {
	// if async used, return value is promisified, else throw error or returm Promise.reject({message: 'blah'})
	dbx = require('dropbox-fs')({apiKey: dropbox_access_token}) // don't know how to get this to work using import ...
	const starting_folder = ''
	push_message_for_Sam('i', null, `starting ... (version uploaded: July 18, 2018)`)
	await recurse_folder(starting_folder)  // error handling is inside recurse
	await process_folders()
	return [Cfolders, Messages]
}
// ====================================================================
const recurse_folder = async (folder) => {
	console.log('++', 'recurse_folder' )
	let step = '~'

	push_message_for_Sam('i', null, `logging dropbox folder: ${folder}`)
	try {
		step = 'folder'
		const [files, subfolders] = await P_get_dropbox_folder_contents(dbx, folder)
		folderObj = {
			folder: folder,
			ubfolders: subfolders,
			files: files
		}
		Cfolders.push(folderObj)

		step = 'subfolders'
		await recurse_subfolders(folder, subfolders)
	} catch(e) {
		push_message_for_Sam('e', e, `error inside recurse_folder at Step: ${step}`)
	} 

}
// ====================================================================
const recurse_subfolders = async (folder, subfolders) => {
	if (subfolders) {
		const xyz = await Promise.all(
			__.map(subfolders, async (subfolder) => {
				const next_folder = folder + '/' + subfolder
				await recurse_folder(next_folder) // error handling is inside recurse
			})
		)
	}
}
// ====================================================================
const process_folders = async () => {
	console.log('+++', 'process_folders' )
	const xyz = await Promise.all(
		__.map(Cfolders, (folderObj) => {
			return process_folder(folderObj)  // should we await here?
		})
	)
}
// ====================================================================
const process_folder = async (folderObj) => {
	console.log('++', 'process_folder' )
	let CSV_data = ''
	let num_recs = 0
	let step = '~'

	const {files, folder} = folderObj
	push_message_for_Sam('i', null, `scanning dropbox folder: ${folder}`)
	//console.log({folderObj})

	try {
		step = 'checking for necessary files'
		const batch_xls = __.find(files, (o) => {return o.endsWith(batch_root)})
		const upload_xls = __.find(files, (o) => {return o.endsWith(upload_root)})
		const this_orders_pending_csv = __.find(files, (o) => {return o === orders_pending_csv})
		const has_orders_pending_csv = this_orders_pending_csv !== undefined
		const PRE_xls = __.find(files, (o) => {return o.toUpperCase().includes(pre_root.toUpperCase())}) // is filename or undefined
		const output_xls = __.find(files, (o) => {return o.endsWith('output.xlsx')}) 

		const already_has_output = output_xls !== undefined
		const proceed_with_old = PRE_xls !== undefined
		let NEW_required_files_count = 0
		if (batch_xls) { NEW_required_files_count++ }
		if (upload_xls) { NEW_required_files_count++ }
		if (has_orders_pending_csv) { NEW_required_files_count++ }
		const proceed_with_new = NEW_required_files_count===3
		if (already_has_output) {
			// nothing to do - skip
			push_message_for_Sam('i', null, `...there already is an output.xlsx`)
		} else {
			// hasn't yet been processed
			if (NEW_required_files_count===1 || NEW_required_files_count===2) { // error - missing files
				batch_xls ? null : push_message_for_Sam('w', null, `...missing batch file`)
				upload_xls ? null : push_message_for_Sam('w', null, `...missing upload file`)
				has_orders_pending_csv ? null : push_message_for_Sam('w', null, `...missing orders_pending file`)
				const fileInfo = [
					[ 'New Site', '(all missing files at once is ok)' ],
					[''],
					['', 'Batch XLS:', '', batch_xls ? batch_xls : 'missing'],
					['', 'Upload XLS:', '', upload_xls ? upload_xls : 'missing'],
					['', 'Orders CSV:', '', has_orders_pending_csv ? orders_pending_csv : 'missing'],
					[''],
					[''],
					['Old Site'],
					[''],
					['','Orders_Report XLS:', '', PRE_xls ? PRE_xls : 'missing, but optional']
				]
				CSV_data = stringify(fileInfo, { 
					header: false,
					quoted: true,
					quotedEmpty: false
				})
				await write_output_file_to_dropbox(dbx, folder, 'output.xlsx', 'XLSX', CSV_data, num_recs)
			} else {
				if (!proceed_with_new && !proceed_with_old) { // nothing to do
					// - skip this folder
					push_message_for_Sam('i', null, `...no files (OLD or NEW sites) needing processing`)
				} else {
					if (!proceed_with_new) {
						push_message_for_Sam('i', null, `...no NEW site files needing processing`)
					} else {
						push_message_for_Sam('i', null, `*** found NEW site files to convert (see later in log)`)
						step = 'load_new_dropbox_data'
						const [batches, uploads, orders] 
								= await load_new_dropbox_data(dbx, folder, batch_xls, upload_xls, orders_pending_csv)

						step = 'process_folder_for_new_luxarte_exports'
						const [new_CSV_data, new_num_recs] 
								= process_folder_for_new_luxarte_exports(folder, batches, uploads, orders)
						CSV_data += new_CSV_data
						num_recs += new_num_recs
					}
					if (!proceed_with_old) {
						push_message_for_Sam('i', null, `...no OLD site files needing processing`)
					} else {
						push_message_for_Sam('i', null, `*** found OLD site files to convert (see later in log)`)
						step = 'load_old_dropbox_data'
						const [PREs] = await load_old_dropbox_data(dbx, folder, PRE_xls)

						step = 'process_folder_for_old_luxarte_exports'
						const [old_CSV_data, old_num_recs] = process_folder_for_old_luxarte_exports(folder, PREs)
						CSV_data += old_CSV_data
						num_recs += old_num_recs
					}
					step = 'write_output_file_to_dropbox'
					await write_output_file_to_dropbox(dbx, folder, 'output.xlsx', 'XLSX', CSV_data, num_recs)
				}
			}
		}
	} catch (e1) {
		push_message_for_Sam('e', e1, `Error during processing of folder ${folder} at Step: ${step} inside process_folder()`)
	}
}
// ====================================================================
const P_get_dropbox_folder_contents = (dbx, folder) => {
	console.log('++', 'P_get_dropbox_folder_contents', 'promise' )
	console.log('... looking at dropbox folder', "'"+folder+'"')
	return new Promise( (resolve, reject) => {
		dbx.readdir(folder, {mode:'stat'}, (err, resp) => {
			if (err) {
				push_message_for_Sam('e', err, `Error during readdir of folder ${folder}`)
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
const process_folder_for_new_luxarte_exports = (folder, batches, uploads, orders) => {
	console.log('++', 'process_folder_for_new_luxarte_exports' )
	push_message_for_Sam('i', null, `processing (NEW site) dropbox folder: ${folder} `)

	try {
		const batches_data = []
		// first, append PW to Client Key if there are personalized wallets
		let index = -1
		__.forEach(batches.data, (batch) => {
			try {
				index ++
				const client_key = batch['Client Key']
				if (myTrim(batch.PW) !== '' && myTrim(batch['Client Key']).slice(0,1) !== '-') { // be sure that the Cient Key column isn't of the form -00Brown
					batch['Client Key'] += 'PW'
					console.log('-- added PW to Client Key-Pose Number', client_key)
				}
			} catch(e) {
				push_message_for_Sam('e', e, `... Error - Missing 'Client Key' or 'PW' data on batch line ${index}`)
				//throw e
			}
			batches_data.push(batch)
		})

		const uploads_data = uploads.data
		const orders_data = orders.data
		
		console.log('batches', batches_data.length)
		console.log('uploads', uploads_data.length)
		console.log('orders', orders_data.length)

		const Rows = []

		let this_error = ''
		let headerRow
		let od_index = -1
		__.forEach(orders_data, (order) => {
			od_index ++
			let oObj = init_output_object()

			if (od_index===0) {
				headerRow = __.map(oObj, (field) => {
					return field.title
				})
			}
			/* column titles
			orders:  OrderNumber,ClientNumber,OrderDate,ProcessedDate,ApprovedNumber,
									DownloadedDate,HighResTotal,InsuranceTotal,PostageTotal,SubTotal,
									Tax,Total,Phone,Email
			*/
			oObj.SOURCE.value = 'Luxarte.ca'
			oObj.ORDER_NUMBER.value =  myTrim(order.OrderNumber)
			oObj.ITEMS_SUBTOTAL.value = myTrim(order.SubTotal)
			oObj.CD_TOTAL.value = myTrim(order.HighResTotal)
			oObj.INSURANCE.value = myTrim(order.InsuranceTotal)
			oObj.POSTAGE.value = myTrim(order.PostageTotal)
			oObj.TAX.value = myTrim(order.Tax)
			//oObj.TOTAL.value = myTrim(order.Total)
			oObj.CLIENT_KEY.value = myTrim(order.ClientNumber)
			oObj.ORDER_PHONE.value = myTrim(order.Phone)
			oObj.ORDER_EMAIL.value = myTrim(order.Email)
			oObj.__ORDER_DATE.value = myTrim(order.OrderDate)
			oObj.__PROCESS_DATE.value = myTrim(order.ProcessedDate)
			oObj.__APPROVED_NUMBER.value = myTrim(order.ApprovedNumber)
			oObj.__DOWNLOAD_DATE.value = myTrim(order.DownloadedDate)

			if (oObj.__APPROVED_NUMBER.value === '') {
				this_error = 'Not Approved'
				console.error(this_error)
				oObj.ERRORS.value.push(this_error)
			}

			const uploads_rows = __.filter(uploads_data, {"Order Number": order.OrderNumber})
			if (uploads_rows.length > 1) {
				this_error = `Problem 2 - Uploads has more than 1 row (= ${uploads_rows.length}) for order_number ${order.OrderNumber}`
				console.error(this_error)
				oObj.ERRORS.value.push(this_error)

			} else if (uploads_rows.length === 0) {
				this_error = `Problem 1 - There are no Uploads rows for order_number ${order.OrderNumber}`
				console.error(this_error)
				oObj.ERRORS.value.push(this_error)

			} else {
				const upload = uploads_rows[0]
				//uploads:  First Name,Last Name,Client Key,Mailing Apartment,Mailing Address,
				//						Mailing City,Mailing Province,Mailing Postal Code,Country,
				//						Order Number,Sale,Frames 8x10,Frames 11x14,Frames 16x20,
				//						Mounts 4x5,Mounts 5x7,Mounts 8x10,CD,Econo Lustre
				oObj.TOTAL.value = myTrim(upload.Sale)
				oObj.FRAMES_8x10.value = myTrim(upload["Frames 8x10"])
				oObj.FRAMES_11x14.value = myTrim(upload["Frames 11x14"])
				oObj.FRAMES_16x20.value = myTrim(upload["Frames 16x20"])
				oObj.FRAMES_YESNO.value = (myTrim(upload["Frames 8x10"]) + myTrim(upload["Frames 11x14"]) + myTrim(upload["Frames 16x20"])) === "" ? "" : "YES"
				oObj.MOUNTS_4x5.value = myTrim(upload["Mounts 4x5"])
				oObj.MOUNTS_5x7.value = myTrim(upload["Mounts 5x7"])
				oObj.MOUNTS_8x10.value = myTrim(upload["Mounts 8x10"])
				oObj.MOUNTS_YESNO.value = (myTrim(upload["Mounts 4x5"]) + myTrim(upload["Mounts 5x7"]) + myTrim(upload["Mounts 8x10"])) === "" ? "" : "YES"
				oObj.CD_YESNO.value = myTrim(upload.CD) === "NO" ? "" : "YES"
				oObj.ALL_FINISHES.value = myTrim(upload["Econo Lustre"])

				oObj.MAILING_ADDRESS.value = myTrim(upload["Mailing Address"])
				if (myTrim(upload["Mailing Apartment"]) !== '') {oObj.MAILING_ADDRESS.value = "#" + myTrim(upload["Mailing Apartment"]) + " " + oObj.MAILING_ADDRESS.value}
				oObj.MAILING_CITY.value = myTrim(upload["Mailing City"])
				oObj.MAILING_PROVINCE.value = fixOntario(upper(myTrim(upload["Mailing Province"])))
				oObj.MAILING_POSTAL_CODE.value = fixPC(upper(myTrim(upload["Mailing Postal Code"])))
				oObj.MAILING_COUNTRY.value = fixCountry(upper((myTrim(upload["Country"]))))
				if (oObj.MAILING_COUNTRY.value !== 'CANADA') {
					this_error = `Warning - Tracking Required: Country is ${upload["Country"]}`
					console.warn(this_error)
					oObj.ERRORS.value.push(this_error)
				}
			}
			
			const batch_rows = __.filter(batches_data, {"OrderNumber": order.OrderNumber})
			if (batch_rows.length === 0 ) {
				this_error = `Problem 3 - There are no batch rows for order_number ${order.OrderNumber}`
				console.warn(this_error)
				oObj.ERRORS.value.push(this_error)
				sendRow(oObj, Rows)
			} else {
				// get the unique sitting_numbers from this Order Number (already filtered)
				const uAllBatchRows = __.uniqBy(batch_rows, 'Client Key') // 'Client Key' column contains sitting info too, e.g. LB5088-10
				const uBatchRows = []
				__.forEach(uAllBatchRows, (sitting) => {
					const batch_client_key = myTrim(sitting['Client Key'])
					
					if (typeof batch_client_key === 'number' && batch_client_key === 0) {
						// handle weird case where -00 is in the batch but is converted to -0 which is seen as a number of 0
						console.log('Removed Batches.xls row with Client Key:', batch_client_key, 'for order Number:', order.OrderNumber, 'possibly Mounts-only artefact')
					} else if (batch_client_key && batch_client_key.slice(0,1) === '-' ) {
							console.log('Removed Batches.xls row with Client Key:', batch_client_key, 'for order Number:', order.OrderNumber, 'possibly Frames-only artefact')
							// skip rows where Client Key column contains things like '-00Brown'
					} else {
						uBatchRows.push(sitting)
					}
				})
				
				__.forEach(uBatchRows, (sitting) => {
					const batch_client_key = myTrim(sitting['Client Key'])
					oObj._SITTING_NUMBER.value = []
					oObj._RETOUCHES.value = []
					oObj._PERS_WALLETS.value = []
					oObj._COLLAGES.value = []
					oObj._SHEETS_11x14.value = []
					oObj._SHEETS_8x10.value = []
					oObj._SHEETS_5x7.value = []
					oObj._SHEETS_4x5.value = []
					oObj._SHEETS_WALLETS.value = []
					oObj._SHEETS_16x20.value = []

					const sitting_rows = __.filter(batches_data, {
						'OrderNumber': order.OrderNumber, 
						'Client Key': batch_client_key
					})
					oObj._POSE_COUNT.value = sitting_rows.length
					let index = -1
					__.forEach(sitting_rows, (batch) => {
						index ++
						//batches:  Client Key,R,PW,Collages,1 - 8x10,2 - 5x7,4 - 4x5,8 - Wallets,
						//						1 - 11x14,1 - 16x20,OrderNumber
						const SitNum =  myTrim(batch['Client Key'])
						if (SitNum.indexOf("COL") != -1 || SitNum.indexOf("SEP") != -1 || SitNum.indexOf("BW") != -1) {
							batch.Collages = '[Collage?] ' + myTrim(batch.Collages)
						}
						oObj._SITTING_NUMBER.value[index] = SitNum
						oObj._RETOUCHES.value[index] = myTrim(batch.R)
						oObj._PERS_WALLETS.value[index] = myTrim(batch.PW)
						oObj._COLLAGES.value[index] = myTrim(batch.Collages)
						oObj._SHEETS_11x14.value[index] = myTrim(batch['1 - 11x14'])
						oObj._SHEETS_8x10.value[index] = myTrim(batch['1 - 8x10'])
						oObj._SHEETS_5x7.value[index] = myTrim(batch['2 - 5x7'])
						oObj._SHEETS_4x5.value[index] = myTrim(batch['4 - 4x5'])
						oObj._SHEETS_WALLETS.value[index] = myTrim(batch['8 - Wallets'])
						oObj._SHEETS_16x20.value[index] = myTrim(batch['1 - 16x20'])
					})
					oObj._SITTING_NUMBER.output = oObj._SITTING_NUMBER.value[0] // all are the same

					//oObj._SITTING_NUMBER_ALL.output = oObj._SITTING_NUMBER.value.join("/")
					oObj._RETOUCHES.output = condenseMulti(oObj._RETOUCHES) //.value.join("/")
					oObj._PERS_WALLETS.output =  condenseMulti(oObj._PERS_WALLETS) //.value.join("/")
					oObj._COLLAGES.output =  condenseMulti(oObj._COLLAGES) //.value.join("/")
					oObj._SHEETS_11x14.output = getTotal(oObj._SHEETS_11x14) 
					oObj._SHEETS_8x10.output = getTotal(oObj._SHEETS_8x10)
					oObj._SHEETS_5x7.output = getTotal(oObj._SHEETS_5x7)
					oObj._SHEETS_4x5.output = getTotal(oObj._SHEETS_4x5)
					oObj._SHEETS_WALLETS.output = getTotal(oObj._SHEETS_WALLETS)
					oObj._SHEETS_16x20.output = getTotal(oObj._SHEETS_16x20)
					sendRow(oObj, Rows)
				})
			}
			oObj = null
		})

		let oObj = init_output_object()
		const sorted_by_Sitting_Rows = __.sortBy(Rows, function(o) {
			return o[oObj._SITTING_NUMBER.col_no]
		})

		// generate the CSV
		const CSV_data = stringify(sorted_by_Sitting_Rows, { 
			columns: headerRow,
			header: true,
			//quoted: true,
			quotedEmpty: false
		})

		return [CSV_data, Rows.length]
	} catch(e) {
		push_message_for_Sam('e', e, "...Unexpected error during process_folder_for_new_luxarte_exports()")
		//throw e
	}
}
// ====================================================================
const process_folder_for_old_luxarte_exports = (folder, PREs) => {
	console.log('++', 'process_folder_for_old_luxarte_exports' )
	push_message_for_Sam('i', null, `processing (OLD site) dropbox folder: ${folder} `)
	try {
		const PREs_data = PREs.data
		console.log('PREs', PREs_data.length)

		const Rows = []

		let this_error = ''
		let headerRow
		__.map(PREs_data, (order, index) => {

			let oObj = init_output_object()
			if (index===0) {
				headerRow = __.map(oObj, (field) => {
					return field.title
				})
			}
			oObj.SOURCE.value = 'pre.Luxarte.ca'
			oObj.ORDER_NUMBER.value =  myTrim(order['Order Number'])
			oObj.ITEMS_SUBTOTAL.value = myTrim(order['Items Purchased'])
			oObj.INSURANCE.value = myTrim(order.Insurance)
			oObj.POSTAGE.value = myTrim(order.Postage)
			oObj.TAX.value = myTrim(order.Tax)
			oObj.TOTAL.value = myTrim(order.Sale)

			const SN = upper(myTrim(order['Proof To Print']))
				if (typeof SN === 'number' || SN.indexOf("-") === -1) {
				oObj.CLIENT_KEY.value = SN.toString() // e.g. 123457
			} else {
				const temp1 = SN.split('-')
				oObj.CLIENT_KEY.value = temp1[0]
			}
			oObj._SITTING_NUMBER.value = SN

			if (myTrim(order.PW) !== '') {
				oObj.CLIENT_KEY.value += 'PW'
			}
			oObj._RETOUCHES.value = myTrim(order.Retouch)
			oObj._PERS_WALLETS.value = myTrim(order.PW)

			oObj._COLLAGES.value = myTrim(order.Collages)// + ' ' + order.Note)
			
			oObj._SHEETS_11x14.value = change0ToBlank(myTrim(order.ElevenByFourteen))
			oObj._SHEETS_8x10.value = change0ToBlank(myTrim(order.EightByTen))
			oObj._SHEETS_5x7.value = change0ToBlank(myTrim(order.FiveBySeven))
			oObj._SHEETS_4x5.value = change0ToBlank(myTrim(order.FourByFive))
			oObj._SHEETS_WALLETS.value = change0ToBlank(myTrim(order.Wallets))
			oObj._SHEETS_16x20.value = change0ToBlank(myTrim(order.SixteenByTwenty))

			oObj.FRAMES_8x10.value = change0ToBlank(myTrim(order.FramesEightByTen))
			oObj.FRAMES_11x14.value = change0ToBlank(myTrim(order.FramesElevenByFourteen))
			oObj.FRAMES_16x20.value = change0ToBlank(myTrim(order.FramesSixteenByTwenty))
			oObj.FRAMES_YESNO.value = (change0ToBlank(myTrim(order.FramesQuantity)) + myTrim(order.FramesEightByTen) + myTrim(order.FramesElevenByFourteen) + myTrim(order.FramesSixteenByTwenty)) === "" ? "" : "YES"
			//oObj.FRAMES_YESNO.value = myTrim(order.FramesQuantity) === 0 ? "" : "YES"

			oObj.MOUNTS_4x5.value = change0ToBlank(myTrim(order.MountsFourByFive))
			oObj.MOUNTS_5x7.value = change0ToBlank(myTrim(order.MountsFiveBySeven))
			oObj.MOUNTS_8x10.value = change0ToBlank(myTrim(order.MountsEightByTen))
			oObj.MOUNTS_YESNO.value = (myTrim(order.MountsFourByFive) + myTrim(order.MountsFiveBySeven) + myTrim(order.MountsEightByTen)) === 0 ? "" : "YES"

			oObj.CD_YESNO.value = myTrim(order['HighRes CD']) === 0 ? "" : "YES"

			oObj.ALL_FINISHES.value = myTrim(order.Finish)

			oObj.MAILING_ADDRESS.value = removeDuplicatedContent(removeTrailingComma(myTrim(order.Address)))
			oObj.MAILING_CITY.value = removeDuplicatedContent(removeTrailingComma(myTrim(order.City)))
			oObj.MAILING_PROVINCE.value = fixOntario(upper(removeDuplicatedContent(removeTrailingComma(myTrim(order.Province)))))
			oObj.MAILING_POSTAL_CODE.value = fixPC(upper(removeDuplicatedContent(removeTrailingComma(upper(myTrim(order['Postal Code']))))))
			oObj.MAILING_COUNTRY.value = fixCountry(upper(removeDuplicatedContent(removeTrailingComma(myTrim(order.Country)))))
			if (oObj.MAILING_COUNTRY.value !== 'CANADA') {
				this_error = `Warning - Tracking Required: Country is ${order.Country}`
				console.warn(this_error)
				oObj.ERRORS.value.push(this_error)
			}
		
			sendRow(oObj, Rows)
			oObj = null
		})

		let oObj = init_output_object()
		const sorted_by_Sitting_Rows = __.sortBy(Rows, function(o) {
			return o[oObj._SITTING_NUMBER.col_no]
		})

		// generate the CSV
		const CSV_data = stringify(sorted_by_Sitting_Rows, { 
			columns: headerRow,
			header: true,
			//quoted: true,
			quotedEmpty: false
		})

		return [CSV_data, Rows.length]
	} catch(e) {
		push_message_for_Sam('e', e, "...Unexpected error during process_folder_for_old_luxarte_exports()")
		//throw e
	}
}
// ====================================================================
const write_output_file_to_os = (folder, filename, filetype, data, num_recs) => {
	console.log('++', 'write_output_file_to_os' )
	const temp = folder.split('/')
	const folder_only = temp[temp.length-1]
	const data_filename = `${folder}/${folder_only}_${filename}`
	if (filetype === 'XLSX') {
		const workbook = XLSX.read(data, {type:"buffer"})
		XLSX.writeFile(workbook, data_filename)
	} else {
		fs.writeFile(data_filename, data, (e) => {
			if (e) {
				push_message_for_Sam('e', e, "Error writing to os", data_filename)
				throw new Error(e)
			} else {
				console.log('Successful write to os!', os.platform(), data_filename)
				console.log(num_recs, `records written to ${filetype} file:`, data_filename)
				push_message_for_Sam('i', null, `... successfully wrote ${num_recs} records to ${data_filename} to os folder: ${folder}`)
			}
		})
	}
}
// ====================================================================
const write_output_file_to_dropbox = async (dbx, folder, filename, filetype, data, num_recs) => {
	console.log('++', 'write_output_file_to_dropbox' )
	console.log('------------------------------ write_output_file_to_dropbox')
	const temp = folder.split('/')
	const folder_only = temp[temp.length-1]
	const data_filename = `${folder}/${folder_only}_${filename}`
	let workbook, data_to_send, step

	if (filetype === 'XLSX') {
		// create temp file and write as .xlsx
		const temp_filename = tempfile('.xlsx')
		try {
			//read the file and write it locally to a temp file
			step = 'XLSX.read()'
			workbook = XLSX.read(data, {type:"buffer", cellText:false, cellDates:true, dateNF: 'yyyy-MM-dd hh:mm:ss'}) // to get times in dates
			console.log('------------------------------ after XLSX.read')

			step = 'XLSX.writeFile()'
			await XLSX.writeFile(workbook, temp_filename)// synchronous temp_filename
			console.log('------------------------------ after XLSX.writeFile')
		} catch(e) {
			push_message_for_Sam(e, `Error during ${step} of write_output_file_to_dropbox()`)
		}

		// read the .xlsx and write it to dropbox
		const readFileAsync = promisify(fs.readFile)

		try {
			const data_to_send = await readFileAsync(temp_filename)
			console.log('------------------------------ after XLSX.readFile')
			await P_write_dropbox_file(dbx, data_filename, data_to_send, num_recs, folder) //synchronous
		} catch (err1) {
			push_message_for_Sam('e', err1, `Error reading file ${temp_filename} from os`)
		}
	} else {
		await P_write_dropbox_file(dbx, data, data_to_send, num_recs, folder)
	}
}
// ====================================================================
const P_write_dropbox_file = async (dbx, data_filename, data_to_send, num_recs, folder) => {
	console.log('------------------------------ P_write_dropbox_file -------------------------------------')
	return new Promise( (resolve, reject) => {
		dbx.writeFile(data_filename, data_to_send, {encoding: 'utf8', overwrite: true}, (err2, stat) => {
			if (err2) {
				push_message_for_Sam('e', err2, `Error writing ${data_filename} to dropbox`)
				return reject({error: err2, file: data_filename})
			} else {
				console.log('Successful write to dropbox!')
				push_message_for_Sam('i', null, `... successfully wrote ${num_recs} records to ${data_filename} to dropbox folder: ${folder}`)
				console.log(`${num_recs} records written to file: ${data_filename}`)
				return resolve(true)
			}
		})
	})
}
// ====================================================================
const P_read_dropbox_file = (dbx, filename) => {
	console.log('++', 'P_read_dropbox_file', 'promise' )
	return new Promise( (resolve, reject) => {
		// reads file to a buffer
		dbx.readFile(filename, (err, result) => {
			if (err) {
				push_message_for_Sam('e', err, 'from -- P_read_dropbox_file()')
				return reject({error: err, file: filename})
			} else {
				const contents = result.toString('utf8') // now is the contents of the file
				return resolve(contents)
			}
		})
	})
}
// ====================================================================
const sendRow = (oObj, Rows) => {
	oObj.ERRORS.output = oObj.ERRORS.value.join('/')
	const Row = __.map(oObj, (field) => {
		return field.output===undefined ? field.value : field.output
	})
	Rows.push(Row)
}
// ====================================================================
const condenseMulti = (obj) => {
	const uniq = __.uniq(obj.value)
	return uniq.length === 1
		? obj.value[0]
		: obj.value.join('/')
}
// ====================================================================
const getTotal = (obj) => {
	const total = obj.value.reduce((total, amount) => {
		if (amount === '') {
			return total
		}
		return total + parseInt(amount)
	} , 0)
	return total === 0 ? '' : total
}
// ====================================================================
export { run_dropbox_conversion }