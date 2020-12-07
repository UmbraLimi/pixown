// ----node-packages----------------
import { _ as __ } 							from  'lodash'
import { toJS }									from  'mobx'
// ----helpers----------------------
import { find_records_on_client }	from  '/imports/client/db/collection-helpers.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
export const computor = ({type, ...args}) => {
	switch (type.toUpperCase()) {
		case 'MANAGER': return _do_manager(args)
		case 'LOOKUP': return _do_lookup(args)
		case 'RECORD': return _do_record(args)
		default: console.Error('Unknown type', type)
	}
	return null
}
// ========================================================================
const _get_local_args_using_object = (args) => {
	/*const { object, linked_fields, ordinal, manager } = args

	if (__.isObject(param)) {
		local_args[param.name] = param.value
	} else {
		if (__.includes(param, ':')) {
			const xyz = param.split(':')
			// foreign field is not same as local field
			local_args[xyz[0]] = local_object[xyz[1]]
		} else {
			// local field and foreigh field have same name
			local_args[param] = local_object[param]
		}
	}

	const local_object = object
		? object
		: manager.record

	const local_args = {}
	__.map(linked_fields, (linked_field, i) => {
		const local_field_sections = linked_field.local.split('.')
		let local_object = manager.record
		__.map(local_field_sections, section => {
			const temp = section.split('[')
			local_object = temp.length > 1
				? local_object[temp[0]][ordinal] // current field is a list and we want the ordinal value of it
				: local_object[section]
		})
		local_args[linked_field.foreign] = local_object
	})*/
	return local_args
}
// ========================================================================
const _get_local_args_using_record = (args) => {
	const { object, linked_fields, ordinal, manager } = args
	// object // is only set if from a table and it is the subvalue of a multivalued field
	// here we ignore it and go for the full field and gets its value at the ordinal-1 position
	const local_args = {}
	__.map(linked_fields, (linked_field, i) => {
		const local_field_sections = linked_field.local.split('.')
		let local_object = manager.record
		__.map(local_field_sections, section => {
			const temp = section.split('[')
			local_object = temp.length > 1
				? toJS(local_object[temp[0]][ordinal]) // current field is a list and we want the ordinal value of it
				: toJS(local_object[section])
		})
		local_args[linked_field.foreign] = local_object
	})
	return local_args
}
// ========================================================================
const _do_lookup = (args) => {
	// this is a LOOKUP that uses the manager.record
	const { colleXion, 
		findOne=false, notfound='-- not found --',
		field_to_retrieve } = args

	const local_args = _get_local_args_using_record(args)
	const spec = {
		colleXion: colleXion.toUpperCase(),
		type: findOne ? 'single' : 'list',
		args: local_args
	}

	const raw_value = find_records_on_client(spec) 
	if (raw_value === undefined) {return notfound }
	/* -> -> -> -> */

	return raw_value[field_to_retrieve]
}
// ========================================================================
const _do_manager = (args) => {
	const { manager, computed, 
		notfound='-- not found --',
		field_to_retrieve } = args

	const local_args = _get_local_args_using_record(args)
	const raw_value = __.isEmpty(local_args)
			? manager[computed] // for computeds
			: manager[computed](local_args) // for non-computeds (i.e. have args)

	if (raw_value === undefined) {return notfound }
	/* -> -> -> -> */

	return field_to_retrieve
		?	raw_value[field_to_retrieve]
		: raw_value
}
// ========================================================================
const _do_record = (args) => {
	const { manager, 
		notfound='-- not found --',
		field_to_retrieve } = args
 
	const value = manager.record[field_to_retrieve]
	if (value === undefined) {return notfound }

	return value
}
// ========================================================================
