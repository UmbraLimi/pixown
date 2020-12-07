import { _ as __ }              from  'lodash'
import Yup 											from  'yup'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
export const validate_record = (schema, record) => {
	return new Promise( (resolve, reject) => {
		schema.validate(record, {abortEarly: false}) // must be false
			.then((result) => {
				resolve(result)
				return // force function to end
			})
			.catch((error) => {
				// get unique array of fieldnames to map over
				const unique_fieldnames = __.uniq(__.map(error.inner, 'path'))
				const validation_errors = _get_validation_errors_and_values(error.inner, unique_fieldnames)
				if (validation_errors.length === 0) {
					resolve('This record is fine')
					return // force function to end
				}
				reject(new Meteor.Error('validation error', 'record level', validation_errors))
				return // force function to end
			})
		// pseudo then/catch closing indent
	})
}
// ====================================================================
export const validate_field = (schema, fieldname, value) => {
	return new Promise( (resolve, reject) => {
		const x = {[fieldname]: value}
		// fieldname is either single (email) or compound (mailing_address.street)
		// reach gets a nested component in dot notation
		Yup.reach(schema, fieldname).validate(value) //schema.validate(x, {abortEarly: false}) // must be false, will treat other fields as missing and so trigger required which we ignore
		.then((result) => {
			resolve(result)
			return // force function to end
		})
		.catch((error) => {
			const validation_errors = [{
				fieldname: fieldname, 
				value: error.errors[0].value, // multiple (possible) messages in array all have the same value
				messages:  error.errors
			}]
			reject(new Meteor.Error('validation error', 'field level', validation_errors))
			return // force function to end
		})
	})
}
// ====================================================================
const _get_validation_errors_and_values = (error_array, fieldname_array) => {
	const validation_errors = []
	__.map(fieldname_array, (fieldname, index) => {
		const relevant_errors = _get_yup_field_errors(error_array, fieldname)
		const messages = []
		__.map(relevant_errors, (err, index) => {
			const message = _get_yup_error_mesages(err)
			messages.push(message)
		})
		if (relevant_errors.length !== 0) {
			validation_errors.push({
				fieldname: fieldname, 
				value: relevant_errors[0].value, // multiple (possible) messages in array all have the same value
				messages:  messages
			})
		}
	})
	return validation_errors
}
// ====================================================================
const _get_yup_field_errors = (error_array, fieldname) => {
	return __.filter(error_array, {path: fieldname})
}
// ====================================================================
const _get_yup_error_mesages = (err) => { // handle bizarre yup behaviour
	return __.isObject(err.message) 
		? err.message.message
		: err.message
}
// ====================================================================