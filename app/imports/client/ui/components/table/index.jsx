// ----node-packages----------------
import React                    from  'react'
import { autorun, toJS }				from  'mobx'
//import { observable, action } 	from  'mobx'
import { inject, observer } 		from  'mobx-react'
import { _ as __ } 							from  'lodash'
// ----styles-----------------------
import { 
	Table_, HeaderRow_, Row_, 
	HeaderCell_, Cell_
}																from  './styles.js'
// ----helpers----------------------
import { format_from_array } 		from  '/imports/client/misc/formatter.js'
import { resolve_dotted_fieldname 
} 				from '/imports/client/misc/nesteds.js'
import { computor }              from  '/imports/client/misc/computor.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Table extends React.Component {

	/* Table defaults and options
		id={id} // required
		manager={sittingManager} // required
		cols=[] // list of {objects} really this is required
			id = {id} // required // '--parent--', // means use the table's id field
			flex = '1 1 auto' // anything here that flex css can make sense of
			label = '~label'
			disabled = TODO: not implemented yet
			hidden = false // will not even paint it if true
			compute = false // {object} 
				name = 'studio_name__given__studio_code' // required which is a @computed in the manager
				params = [] // list of other computes of record field name
				manager = table's Manager // else {sittingManager} // where computes is found
				notfound = '--where is it? --'
				fformat = [,] // sequential list of operations to perform prior to display *see formatter.js)


		list_index=undefined // used only for sub-tables (calls to Table from within Table)
		tabIndex // not implemented // doesn't make sense if table celss aren't editable
		rows=false = TODO: not implemented yet // 3, 4 etc. intention is that's how many rows 
						of the table display with the rest either as pagination 
						or inside a scrollable region

		title=false = TODO: not implemented yet // text  in modal
	*/

	render() {
		const { manager:table_manager, store, formStore } = this.props
		const { id:list_id, cols=[], list_index, disabled=false } = this.props
		const { tabIndex=0, title=false, rows=false } = this.props

		const { theme_colour, button_theme_colour, button_hover_theme_colour} = table_manager

		let multivalue, temp
		if (list_id.indexOf('.') === -1) {
			multivalue = formStore.getCurrentValueForTextbox(list_id)
			if (list_index!==undefined) {multivalue[list_index]}
		} else {
			multivalue = resolve_dotted_fieldname(list_id, formStore.current_record, list_index)
		}

		return (
			<Table_ >
				<HeaderRow_>
					{
						__.map(cols, ({id:col_id, label='~label', hidden=false, flex='1 1 auto'}, index) => {
							if (!hidden) {
								return (
									<HeaderCell_ key={col_id} flex={flex}>
										{label}
									</HeaderCell_ >
								)
							}
						})
					}
				</HeaderRow_>
				{
					__.map(multivalue, (subvalue, i) => {
						return (
							<Row_ key={i}>
								{
									__.map(cols, ({ id:col_id, fformat, compute=false, hidden=false, table, flex='1 1 auto', cols:_cols, label:_label }) => {
										
										if (table) {
											return (
												<Table key={list_id+'-'+col_id}
														list_index={i}
														id={list_id+'.'+col_id}
														cols={_cols}
														label={_label}
														manager={table_manager}
														formStore={formStore}
														store={store}
												/>
											)
										}
										if (compute && !hidden) {
											const cvalue = computor({
												manager:table_manager, // will be overwritten if in compute
												...compute,
												object: subvalue,
												ordinal: i,
												parent: {
													id: list_id,
													value: subvalue
												}
											})
											const _cvalue = format_from_array(cvalue, fformat)

											return (
												<Cell_ key={list_id+'-'+col_id+'-'+i} flex={flex}>
													{ _cvalue }
												</Cell_>
											)
											
										}
										
										let value
										if (!hidden) {
											if (subvalue===undefined) {
												value = ''
											} else {
												if (col_id==='--parent--'){
													value = subvalue
												} else {
													if (__.isArray(subvalue)) {
														value = __.map(subvalue, col_id)
													} else {
														value = subvalue[col_id]
													}
												}
											}
											const values = __.isArray(value)
											? value
											: [value]
											return (
												<Cell_ key={list_id+'-'+col_id+'-'+i} flex={flex}>
													{__.map(values, (_value,j) => {
														return (
															<p key={j} flex={flex}>
																{ _value }
															</p>
														)
													})}
												</Cell_>
											)
										}
										return null
									})
								}
							</Row_>
						)
					})
				}
			</Table_>
		)
	}
}
// ====================================================================

export { Table }
