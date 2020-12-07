import { _ as __ }            from 'lodash'

// ====================================================================
export const checkForChangesInPropsState = ({ label, context, nextProps, nextState, logg=0, props_to_ignore_array=[], states_to_ignore_array=[]}) => {
	console.log( '++++', label, 'shouldComponentUpdate', '++++')
	const props_have_changed  = !isShallowEqual('Props', context.props, nextProps, logg, props_to_ignore_array)  // !__.isEqual(context.props, nextProps)
	const states_have_changed = !isShallowEqual('State', context.state, nextState, logg, states_to_ignore_array) // !__.isEqual(context.state, nextState)
	//console.log("Props isShallowEqual", isShallowEqual('Props', context.props, nextProps) )
	//console.log("State isShallowEqual", isShallowEqual('State', context.state, nextState) )
	const do_update = props_have_changed || states_have_changed 
	//console.log('++++', 'props_have_changed?', props_have_changed)
	//console.log('++++', 'states_have_changed?', states_have_changed)
	//console.log('++++', 'will update?', do_update)
	return do_update
}
// ====================================================================
export const isShallowEqual = (label, currentX, nextX, logg=2, ignore_array=[]) => {
	// logg = 0 means show no logs
	if (currentX === nextX) {
		return true
	}

	if (typeof currentX !== 'object' || currentX === null ) {
		if (logg >= 1) {console.log('>', `current ${label} - is not an object or is null`)}
    if (logg === 2) {console.log('>>>', typeof(currentX))}
		return false
	}
	if (typeof nextX !== 'object' || nextX === null) {
    if (logg >= 1) {console.log('>', `next ${label} - is not an object or is null`)}
    if (logg === 2) {console.log('>>>', typeof(nextX))}
		return false
	}

	// remove any key in ignore_array
	const keysCurrent = __.difference(Object.keys(currentX), [...ignore_array])
	const keysNext    = __.difference(Object.keys(nextX), [...ignore_array])
	let changed = false
	let deepchanged = false

	if (keysCurrent.length > keysNext.length) {
    if (logg >= 1) console.log('>', `current ${label} has more keys than next ${label}`)
    if (logg === 2) {
      console.log('>>>', 'current-has', keysCurrent.length, 'keys')
      console.log('>>>', 'next----has', keysNext.length, 'keys')
    }
		changed = true //return false
	}
	if (keysCurrent.length < keysNext.length) {
		if (logg >= 1) {console.log('>', `next ${label} has more keys than current ${label}`)}
    if (logg === 2) {
      console.log('>>>', 'current-has', keysCurrent.length, 'keys')
      console.log('>>>', 'next----has', keysNext.length, 'keys')
    }
		changed = true //return false
	}

	// Test for Current's keys different from Next's keys
	const Next_HasOwnProperty = hasOwnProperty.bind(nextX)
	__.map(keysCurrent, (keyCurrent, index) => {
		if (!Next_HasOwnProperty(keyCurrent)) {
			if (logg >= 1) {console.log('>', `next ${label} key: ${keyCurrent} was removed`)}
      if (logg === 2) {
        console.log('>>>', 'current-is', keyCurrent, ':', currentX[keyCurrent])
        //console.log('>>>', 'next-will-be', keysNext[i], ':', '--missing--')
      }
    	changed = true //return false
		} else {
			if (currentX[keyCurrent] !== nextX[keyCurrent]) {
				//if (logg >= 1) console.log('>', `${label} key: ${keyCurrent} has changed`)
				//if (logg === 2) {
				//	console.log('>>>', 'current---is', keyCurrent, ':', currentX[keyCurrent])
				//	console.log('>>>', 'next-will-be', keysNext[index], ':', nextX[keysNext[index]])
				//}
				if (_.isObject(currentX[keyCurrent]) && _.isObject(nextX[keyCurrent])) {
					deepchanged = false
	//debugger
					__.map(currentX[keyCurrent], (value, key) => {
						const nvalue = nextX[keyCurrent][key]
						if (_.isObject(value) && _.isObject(nvalue)) {
							__.map(value, (subvalue, subkey) => {
								const nsubvalue = nextX[keyCurrent][key][subkey]
								if (_.isObject(subvalue) && _.isObject(nsubvalue)) {
									__.map(subvalue, (subsubvalue, subsubkey) => {
										const nsubsubvalue = nextX[keyCurrent][key][subkey][subsubkey]
										if (subsubvalue !== nsubsubvalue) {
											deepchanged = true
											console.log('>>>===>>>===', 'current---is', subsubkey, ':', subsubvalue)
											console.log('>>>===>>>===', 'next-will-be', subsubkey, ':', nsubsubvalue)
										}
									})
								} else {
									if (subvalue !== nsubvalue) {
										deepchanged = true
										console.log('>>>===>>>', 'current---is', subkey, ':', subvalue)
										console.log('>>>===>>>', 'next-will-be', subkey, ':', nsubvalue)
									}
								}
							})
						} else {
							if (value !== nextX[keyCurrent][key]) {
								deepchanged = true
								console.log('>>>===', 'current---is', key, ':', value)
								console.log('>>>===', 'next-will-be', key, ':', nvalue)
							}
						}
					})
					changed = deepchanged
				} else {
					changed = true //return false
				}
			}
		}
	})
	const Current_HasOwnProperty = hasOwnProperty.bind(currentX)
	__.map(keysNext, (keyNext) => {
		if (!Current_HasOwnProperty(keyNext)) {
			if (logg >= 1) {console.log('>', `current ${label} key: ${keyNext} was added`)}
      if (logg === 2) {
        //console.log('>>>', 'current-is', keysCurrent[i], ':', '-- missing --')
        console.log('>>>', 'next-will-be', keyNext, ':', nextX[keyNext])
      }
    	changed = true //return false
		}
		// no need to do the keys in common again
	})
	if (changed) { return false }

	return true
}
// ====================================================================
export const dev_connect_error = (message, value='') => {
	const show = value === undefined
		? 'undefined'
		: value === null
			? 'null'
			: value.toString()
	const dev_message = `${message} ${show}`
	console.log('Connect Error', dev_message)
	return {connect_error: true, message: dev_message}
}
// ====================================================================