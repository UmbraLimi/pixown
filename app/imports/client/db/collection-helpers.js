import { Meteor }      					from  'meteor/meteor'
// ----node-packages----------------
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
import { get_collection_from_name } from '/imports/common/db/collection-from-name.js'
// ----enums------------------------
//import { Value_Types }          from  '/imports/enums/value-types.js'
// ========================================================================
export const do_subscription2 = (spec, subs_cache) => {
	if (subs_cache[spec.name]) {
		console.log('- used cache for:', spec.name)
		return [true, subs_cache[spec.name]]
	}
	// -> -> -> -> //
	const handle = subscribe(spec)
	if (!handle.ready()) { return [false, `waiting for subscription '${spec.name}' to return`] }
	// -> -> -> -> //
	console.log(spec.name, 'subscription is ready')
	const recs = find_records_on_client(spec)
	subs_cache[spec.name] = recs
	return [true, recs]
}
// ========================================================================
export const do_subscription = (spec) => {
	const handle = subscribe(spec)
	if (!handle.ready()) { return [false, waiting_for_subscription(spec)] }
	// -> -> -> -> //
	return [true, find_records_on_client(spec)]
}
// ========================================================================
export const waiting_for_subscription = (spec) => {
	return {
		ready: false, 
		message: `waiting for subscription '${spec.name}' to return` 
	}
}
// ========================================================================
export const subscribe = (spec) => {
	return Meteor.subscribe(
		spec.name,
		spec.args
	)
}
// ========================================================================
export const subscription_is_ready =(spec) => {
	return find_records_on_client(spec)
}
// ========================================================================
export const find_ALL_records_on_client = (colleXion, _spec) => {
	const spec = {..._spec, ...{
		type: 'list',
		colleXion: colleXion
	}}
	return find_records_on_client(spec)
}
// ========================================================================
export const find_ONE_record_on_client = (colleXion, _spec) => {
	const spec = {..._spec, ...{
		type: 'single',
		colleXion: colleXion
	}}
	return find_records_on_client(spec)
}
	// ========================================================================
export const find_records_on_client = (spec) => { // returns records in a list
	/*spec = {
		colleXion: uppercase collection name, e.g. ORDERS
		type: 'list' or 'single'
		args: object {
			vendor_code: "luxarte",
			customer_code: 'Wendy'
		}
		options: null or object {
			sort: {
				agreement_code: 1
			}
		}
	}*/
	const colleXion = get_collection_from_name(spec.colleXion)
	if (spec.type === 'single') {
		return colleXion.findOne(
			spec.args
		)
	} else {
		return colleXion.find(
			spec.args,
			spec.options || {}
		).fetch()
	}
}
// ========================================================================
export const xlate = (args) => {
	const { name, params=[], manager, ordinal } = args
	const { notfound='-- not found --', object, parent } = args
	// manager is a single record manager e.g. SittingManager or OrderManaer
	// name is either computed in manager -or-
	//      function (with parameters) in manager
	// parent (id: xxx, value: yyy} allows for tables to use their parent value
	//        needed for Table data where params: ['--parent--']
	// params are fields in the object or manager.record whose value will be plucked
	//    elements can be
	//								'strings' which are interpreted as fieldname
	//								{
	//	type: ValueTYpes.INTEGER.name, 
	//	name: 'named parameter' from compute.name,
	//	value: literal value to use in the type of .type
	//								}
	// format: [] array of methods and shortform to 
	// perform on the value that results for this compute so it can be specifically displayed
	// object, if present is used as source for local_args resolution 
	const spec = {}

	//if (name === '*.VENDORS.single.name'){debugger}

	const name_sections =  name.split('.')
	let xlate_type = 'MANAGER'
	if (name_sections[0]==='*') {
		xlate_type = 'LOOKUP'
		// this is a LOOKUP w/o using the manager
		spec.colleXion = name_sections[1].toUpperCase()
		spec.type = name_sections[2].toLowerCase()
	}	

	// step 1: whether local_args and if so, whether dynamic
	const local_object = object
		? object
		: manager.record

	const local_args = {}
	__.map(params, (param, i) => {
		if (param==='--parent--') {
			local_args[parent.id] = parent.value
		} else {
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
		}
	})
	spec.args = local_args
	
	//console.log('--connection-helpers.js--')
	//console.log({manager}, {args}, {params})

	const isDotted = name_sections.length > 1
	const _name = xlate_type==='MANAGER'
		? isDotted
			? name_sections[0] // use outer name
			: name
		: name_sections.slice(-1) // use last item

	let value = xlate_type==='MANAGER'
		? __.isEmpty(local_args)
			? manager[_name] // for computeds
			: manager[_name](local_args) // for non-computeds
		: find_records_on_client(spec) 

	if (value === undefined) {return notfound }

	if (ordinal) { 
		value = value[ordinal]
	}
	/* -> -> -> -> */
	return isDotted
		?	value[name_sections.slice(-1)] // now take inner name
		: value
}
// ========================================================================
