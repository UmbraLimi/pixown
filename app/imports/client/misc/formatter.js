// ----node-packages----------------
import React                    from  'react'
import { _ as __ }              from  'lodash'
import numeral 									from  'numeral'
// ----styles-----------------------
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
export const booleanify = (_value, args) => {
	return _value===true
		? 'Yes'
		: _value===false
			? 'No'
			: ''
}
// ====================================================================
const isDate = (_value, fn) => {
	if (__.isDate(_value)) {
		return fn(_value)
	} else {
		console.warn(_value, 'is not a date/time')
		return _value
	}
}
// ====================================================================
export const datetimeify = (_value, args) => {
	return isDate(_value, (_value) => {
		return _value.toDateString() + ' at ' + _value.toTimeString()
	})
}
// ====================================================================
export const timeify = (_value, args) => {
	return isDate(_value, (_value) => {
		return _value.toTimeString()
	})
}
// ====================================================================
export const dateify = (_value, args) => {
	return isDate(_value, (_value) => {
		return _value.toDateString()
	})
}
// ====================================================================
export const stringify = (_value, args) => {
	return _value.toString()
}
// ====================================================================
export const uppercase = (_value, args) => {
	return __.isString(_value)
	? _value.toUpperCase()
	: _value
}
// ====================================================================
export const replace = (_value, args) => {
	const {before='', after=''} = args
	return _value.replace(before, after)
}
// ====================================================================
export const dollarify = (_value, args) => { // given an integer
	return `${numeral(_value/100).format('0.00')}`
}
// ====================================================================
export const imageify = (_value, args) => {
	const {width=undefined, height=undefined} = args
	return <img src={_value} width={width} height={height} />
}
// ====================================================================
export const format_from_array = (_value, _array) => {

	if (_array === undefined) { return _value }
	if (_value === undefined) { return _value }
	/* -> -> -> */
	let value = _value // to start
		
	__.map(_array, (item, i) => {
		let verb, args
		if (__.isObject(item)) {
			verb = item.verb
			args = item.args
		} else {
			verb = item
			args = undefined
		}

		switch (verb.toUpperCase()) {
			case 'BOOLEANIFY': 	value = booleanify(value, args); break
			case 'TIMEIFY': 	value = timeify(value, args); break
			case 'DATEIFY': 	value = dateify(value, args); break
			case 'STRINGIFY': value = stringify(value, args); break
			case 'REPLACE':   value = replace(value, args); break
			case 'UPPERCASE': value = uppercase(value, args); break
			case 'IMAGEIFY':  value = imageify(value, args); break
			case 'DOLLARIFY': value = dollarify(value, args); break
			//case 'IFY':  value = ify(value, args); break
	
			default: console.log('verb not found', {verb}, {args})
				return _value // return original value
		}
		//console.log({verb}, {args}, {value})
	})
	return value
}