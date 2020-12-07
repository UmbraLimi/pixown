import { _ as __ }              from  'lodash'

// ====================================================================
export const getNestedValue = (dotted_fieldname, obj) => { // dotted_obj = (for eample) mailing_address.city
	const levels = dotted_fieldname.split('.')
	const a0=levels[0]
	const a1=levels[1]
	const a2=levels[2]
	switch (levels.length) {
		case 1: 
			return obj[a0]
		case 2: 
			return obj[a0]
				? obj[a0][a1]
					? obj[a0][a1]
					: ''
				: ''
		case 3: 
			return obj[a0]
				? obj[a0][a1]
					? obj[a0][a1]
						? obj[a0][a1][a2]
							? obj[a0][a1][a2]
							: ''
						: ''
					: ''
				: ''
		
		default:
			console.error("too many field levels: " + dotted_fieldname)
			throw new Error("too many field levels: " + dotted_fieldname)
	}
}
// ====================================================================
export const deleteNestedValue = (dotted_fieldname, obj) => {
	const clone_obj = __.cloneDeep(obj)
	const levels = dotted_fieldname.split('.')
	switch (levels.length) {
		case 1: delete clone_obj[levels[0]]; break
		case 2: delete clone_obj[levels[0]][levels[1]]; break
		case 3: delete clone_obj[levels[0]][levels[1]][levels[2]]; break
		default:
		console.error("too many field levels: " + dotted_fieldname)
		throw new Error("too many field levels: " + dotted_fieldname)
	}
	return clone_obj
}
// ====================================================================
export const setNestedValue = (dotted_fieldname, obj, value) => {
	const clone_obj = __.cloneDeep(obj)
	const levels = dotted_fieldname.split('.')
	switch (levels.length) {
		case 1: clone_obj[levels[0]] = value; break
		case 2: clone_obj[levels[0]][levels[1]] = value; break
		case 3: clone_obj[levels[0]][levels[1]][levels[2]] = value; break
		default:
		console.error("too many field levels: " + dotted_fieldname)
		throw new Error("too many field levels: " + dotted_fieldname)
	}
	return clone_obj
}
// ====================================================================
const getNestedValue_OneLevelUp = (dotted_fieldname, obj) => { // dotted_obj = (for eample) mailing_address.city
	const levels = dotted_fieldname.split('.')
	switch (levels.length) {
		case 1: return undefined
		case 2: return obj[levels[0]]
		case 3: return obj[levels[0]][levels[1]]
		case 4: return obj[levels[0]][levels[1]][levels[2]]
		default:
		console.error("too many field levels: " + dotted_fieldname)
		throw new Error("too many field levels: " + dotted_fieldname)
	}
}
// ====================================================================
const getInnerFieldName = (dotted_fieldname, obj) => { // dotted_obj = (for eample) mailing_address.city
	const levels = dotted_fieldname.split('.')
	switch (levels.length) {
		case 1: return levels[0]
		case 2: return levels[1]
		case 3: return levels[2]
		case 4: return levels[3]
		default:
		console.error("too many field levels: " + dotted_fieldname)
		throw new Error("too many field levels: " + dotted_fieldname)
	}
}
// ====================================================================
export const resolve_dotted_fieldname = (dotted_fieldname, record, list_index) => {
	// override_temp is only used nested tables
	// first level tables and mastheads don't set it 
	const inner_fieldname = getInnerFieldName(dotted_fieldname)
	let temp = getNestedValue_OneLevelUp(dotted_fieldname, record)
	if (list_index!==undefined) {temp = temp[list_index]}
	return __.isArray(temp)
		? __.map(temp, inner_fieldname)
		: temp[inner_fieldname]
}
// ====================================================================
export const resolve_dotted_fieldname2 = (dotted_fieldname, manager, list_index) => {
	// override_temp is only used nested tables
	// first level tables and mastheads don't set it 
	const inner_fieldname = getInnerFieldName(dotted_fieldname)
	const outer_fieldname = dotted_fieldname.split('.')[0]
	const object = manager.record[outer_fieldname]
	? manager.record
	: manager
	let temp = getNestedValue_OneLevelUp(dotted_fieldname, record)
	if (list_index!==undefined) {temp = temp[list_index]}
	return __.isArray(temp)
		? __.map(temp, inner_fieldname)
		: temp[inner_fieldname]
}
// ====================================================================
