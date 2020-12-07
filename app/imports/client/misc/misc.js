import { _ as __ }              from  'lodash'
import randomstring             from 'randomstring'
import { Value_Types }          from '/imports/enums/value-types.js'

// ====================================================================
export const get_value_type = (valueType, value) => {
	//const undefined
	//if (valueType === undefined) {return value}
	if (valueType === Value_Types.STRING.name) {
		if (__.isNull(value) || __.isUndefined(value) || value==='') {return '---'}
	}
	if (valueType === Value_Types.DATE.name) {
		return __.isNull(value) || __.isUndefined(value) || value===''
			? '---'
			: __.isDate(value)
				? value.toString()
				: 'not a date'
	}
	if (valueType === Value_Types.BOOLEAN.name) {
		if (__.isNull(value) || __.isUndefined(value) || value==='') {
			return 'No'
		} else {
			return 'Yes'
		}
	}
	if (valueType === Value_Types.INTEGER.name ) {
		if (__.isNull(value) || __.isUndefined(value)) {return '---'}
	}
	if (valueType === Value_Types.DECIMAL.name) {
		if (__.isNull(value) || __.isUndefined(value)) {return '---'}
	}
	if (valueType === Value_Types.IMAGE.name) {
		if (__.isNull(value) || __.isUndefined(value)) {return '---'} // else {return}
	}
	return value
}
// ====================================================================
export const log_error_details = async (labels, record, error) => { // label can be array or single vaue
	//const marker = ">>>>"
	const marker = `[${randomstring.generate(4)}] >>`
	console.warn(marker, '-----vvv----')
	console.log(marker, 'Error Details:', error.error, '|', error.errorType)
	if (__.isArray(labels)) {
		__.map(labels, (label, index) => {
			console.log(marker, label)	
		})
	} else {
		console.log(marker, labels)
	}
	console.log(marker , 'message :', error.message)	
	console.log(marker , 'reason  :', error.reason)	
	console.log(marker , 'record  :', record)	
	__.map(error.details.details, (detail, index) => {
		console.log(marker, index, detail.messages)
	})
	console.warn(marker, '-----^^^----')
}
// =======================================================
// =======================================================
export function* nextInteger() {
	let num = 0
	while(true) {yield num++}
}
// =======================================================
export const isInList = (list, fieldname) => {
	//debugger
	return __.isEmpty(list)
	? false
	: __.indexOf(list, fieldname) > -1
}
// =======================================================
