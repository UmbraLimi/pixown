// ----node-packages----------------
import { _ as __ }          		from  'lodash'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ========================================================================
const shortforms = {
	sa:      'space-around',
	sb:      'space-between',
	row:     'row wrap',
	rown:    'row nowrap',
	col:     'column wrap',
	coln:    'column nowrap',
	start:   'flex-start',
	end:     'flex-end',
	stretch: 'stretch',
	center:  'center',
	baseline:'baseline',
	normal:  'normal'
}

const cssify = (rcn, justify, align) => {
	let arr = []
	arr.push("display: flex")
	arr.push("flex-flow: " + shortforms[rcn])
	arr.push("justify-content: " + shortforms[justify])
	if (rcn.charAt(rcn.length-1).toLowerCase() !== 'n') {
		arr.push("align-content: " + shortforms[align])
	} else {
		arr.push("align-items: " + shortforms[align])
	}
	arr.push('') // to get trailing ;
	return arr.join(';')
}

const colrow_list = ['col','coln','row','rown'];
const just_list   = ['start','end','center','sb','sa','normal'];
const align_list  = ['start','end','center','stretch','baseline','normal']

let flex = {}
__.map(colrow_list, (colrow) => {
	__.map(just_list, (just) => {
		__.map(align_list, (align) => {
			flex[colrow + '_' + just + '_' + align] = cssify(colrow, just, align)
		})
	})
})

// ========================================================================
export { flex }