// ----node-packages----------------
import React                    from  'react'
import { observable, action } 	from  'mobx'
import { inject, observer } 		from  'mobx-react'
import { toJS } 								from  'mobx'
import { _ as __ }         			from  'lodash'
// ----styles-----------------------
import { 
	Masthead_, Title_Row_,
	Masthead_Row_, Header_, Details_,
	Section_Separator_
 } 															from  './styles.js'
// ----helpers----------------------
import { format_from_array } 		from  '/imports/client/misc/formatter.js'
import { resolve_dotted_fieldname
} 					from '/imports/client/misc/nesteds.js'
import { computor }              from  '/imports/client/misc/computor.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------
import { Loading }              from  '/imports/client/ui/components/loading.jsx'
import { Modal }              	from  '/imports/client/ui/components/modal/index.jsx'
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'
import { Detail_Row }           from  '/imports/client/ui/components/detail-row/index.jsx'

// ====================================================================
@inject('store')
@observer
class Masthead extends React.Component {

	@observable show_masthead = false
	@action toggle_masthead = () => {this.show_masthead = !this.show_masthead}
	// ====================================================================

	render() {
		const	{ store, ready, message, problem, title, code, record } = this.props
		//const { vendor_record, storeManager } = this.props
		if (!ready) { return <Loading  message={message} problem={problem}/> }
   	// -> -> -> -> //

		if (!title) { return null}
   	// -> -> -> -> //

		if (!record)  { return null}
   	// -> -> -> -> //
		
		const _title = record[title.title_field]
		const icon = {name: 'info-circle', code: '\f05a'}

    return (
			<Masthead_  className='Masthead_'>
				{_title ? (
					<Title_Row_  className='Title_Row_'
						onClick={this.toggle_masthead}
					>
						{_title}
						{false? (
							<Button
								type='ICON-ONLY'
								title='Details'
								icon={icon}
								textColour='blue'
								bgColour='transparent'
								hover={{
									textColour: 'white',
									bgColour: 'blue'
								}}
								width='16px'
								height='16px'
								onClick={this.toggle_masthead}
							/>
						): null}
					</Title_Row_>
				): null}

				{record && this.show_masthead ? (
					<Modal	toggle_show={this.toggle_masthead}>
						<Masthead_Row_  className='Masthead_Row_'>
							<Header_  className='Header_'>
								{title.header}
							</Header_>
							<Details_  className='Details_'>
								{__.map(title.detail_fields, (field, index) => {
									if (field === '---') {
										return (<Section_Separator_ key={index}/>)
									} /* -> -> -> */
									const _label = field.label || '- missing label -'
									const value = field.compute
										? computor({...field.compute})
										: field.fieldname
											? field.fieldname.indexOf('.') === -1
												? record[field.fieldname]
												: resolve_dotted_fieldname(field.fieldname, record)
											: '-- missing fieldname or compute --'
									const valueList = __.isArray(value) 
										? value 
										: [value]

										return (
										<Detail_Row   
											key={ index }
											label={_label}
											valueList={ valueList }
											fformat={ field.fformat }
										/>
									)
								})}	
							</Details_>
						</Masthead_Row_>
					</Modal>
				) : null}
			</Masthead_>
		)
	}
}
// ====================================================================

export { Masthead }
