// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
import { observable, action, computed } 	from  'mobx'
import { _ as __ } 							from  'lodash'
import numeral 									from  'numeral'
// ----styles-----------------------
import { 
	Downloading_Section_, Item_Row_, 
	Section_Column_Titles_, Section_Rows_, 
	Item_Row_Summary_, IsWanted_Checkbox_, 
	Size_, IsWanted_, Colour_, Cost_,
	Delete_, Item_Row_Selects_, Selects_,  
	Icon_, Button_Row_,
	Dropdown_Label_
} 															from  './styles.js'
import { Select_Parameter_, Dropdown_, Select_Option_ } from './dropdown-styles.js'
// ----enums------------------------
// ----helpers----------------------
import { sizes } 								from  '/imports/client/ui/styles/breakpoints'
// ----collections------------------
// ----components-------------------
import { Button } 							from  '/imports/client/ui/components/button/index.jsx'

// ====================================================================
@inject('store')
@observer
class Downloading_Section extends React.Component {

	handle_focus = (option_code) => {
		// this sets the activeDownload row for all other row-based events
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_activeDownload_given_optionCode(option_code)
	}

	handle_addDownloadRowButtonClicked = () => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._append_blankDownload_to_downloads()
		workupWizardStore._set_activeDownload_to_last()
	}

	render() {
		const { store } = this.props
		const { workupWizardStore } = store
		const downloads_list = workupWizardStore.record.downloads_list
		return (
			<Downloading_Section_>
				<Item_Row_>
					<Section_Column_Titles_>
						<IsWanted_> ? </IsWanted_>
						<Size_> Size </Size_>
						<Colour_> Colour </Colour_>
						<Cost_> Cost </Cost_>
						<Delete_> . </Delete_>
					</Section_Column_Titles_>
				</Item_Row_>
				<Section_Rows_>
					{
						__.map(downloads_list, (download, index) => {
							const isActive = index === workupWizardStore.index_for_activeDownload
							//console.log(isActive, index, workupWizardStore.index_for_activeDownload)
							return (
								<Item_Row__		download={ download } isActive={ isActive } rowNo={ index }
															key={ `item_row_${download.option_code}` }
															style={{backgroundColor: isActive ? 'mediumseagreen' : 'white'}}
								/>
							)
						}, this)
					}
				</Section_Rows_>
				<Button_Row_ >
					<Button 						title='Add a Download'
															onClick={ this.handle_addDownloadRowButtonClicked }
					/>
				</Button_Row_>
			</Downloading_Section_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Item_Row__ extends React.Component {

	@observable  WiW = 0

	@computed get  
	isMobileSmall() {
		return WiW < size.isMobileMedium
	}
	@computed get  
	isMobileMedium() {
		return WiW >= sizes.isMobileMedium && WiW < sizes.isMobileLarge
	}
	@computed get  
	isMobileLarge() {
		return WiW >= sizes.isMobileLarge && WiW < sizes.isTablet
	}
	@computed get  
	isTablet() {
		return WiW >= sizes.isTablet && WiW < sizes.isDesktopSmall
	}
	@computed get  
	isDesktopSmall() {
		return WiW >= sizes.isDesktopSmall && WiW < sizes.isDesktopLarge
	}
	@computed get  
	isDesktopLarge() {
		return WiW >= sizes.isDesktopLarge
	}

	// ====================================================================
	update_WiW = () => {
		this.WiW = window.innerWidth
	}
	// ====================================================================
	componentDidMount() {
		this.update_WiW()
		window.addEventListener("resize", this.update_WiW)
	}
	// ====================================================================
	componentWillUnMount() {
		window.removeEventListener("resize", this.update_WiW)
	}
	// ====================================================================

	handle_isWantedChange = (option_code) => {
		const { workupWizardStore } = this.props.store
		// Not needed - already is via parent focus() // workupWizardStore._set_activeDownload_given_optionCode(option_code)
		workupWizardStore._toggle_wanted_for_activeDownload()
		workupWizardStore._save_workup_to_db()
	}

	handle_rowClicked = (option_code) => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_activeDownload_given_optionCode(option_code)
	}

	handle_sizeChange = (option_code, new_value) => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_activeDownload_given_optionCode(option_code)
		if (workupWizardStore._activeDownload.size !== new_value) {
			workupWizardStore._set_keyValue_for_activeDownload('size', new_value)
			if (workupWizardStore._activeDownload_is_complete) {
				workupWizardStore._save_workup_to_db()
			}
		}
	}
	
	handle_deleteClick = (e) => {
		const { workupWizardStore } = this.props.store
		const { download } = this.props
		workupWizardStore._set_activeDownload_given_optionCode(download.option_code)
		// do not delete any associated download_item
		// as once created, it is the users's baby
		workupWizardStore._remove_activeDownload()
		workupWizardStore._save_workup_to_db()
	}

	handle_colourChange = (option_code, new_value) => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_activeDownload_given_optionCode(option_code)
		if (workupWizardStore._activeDownload.colour !== new_value) {
			workupWizardStore._set_keyValue_for_activeDownload('colour', new_value)
			if (workupWizardStore._activeDownload_is_complete) {
				workupWizardStore._save_workup_to_db()
			}
		}
	}

	handle_focus = (option_code) => {
		const { workupWizardStore } = this.props.store
		workupWizardStore._set_activeDownload_given_optionCode(option_code)
	}

	handle_showSelectsClick = (e) => {
		const { workupWizardStore } = this.props.store
	}

	render() {
		const delim = '~'
		const { store, download, isActive, rowNo } = this.props
		const { workupWizardStore } = store

		const vendor_capability = workupWizardStore._vendorsRecord_for_studioCode.downloading

		const lookup_size_list = vendor_capability.size_list
		const lookup_colour_list = vendor_capability.colour_list

		// #TODO: size_list et al need to have labels added
		const {size:size_value, colour:colour_value} = download

		// get unique values from agreement
		const agreement_size_list = workupWizardStore._uniqueSizeOptionsInAgreement
		const agreement_colour_list = workupWizardStore._uniqueColourOptionsInAgreement_given_size(size_value)

		// get label lists
		const size_lookup_index = __.findIndex(lookup_size_list, {key: size_value})
		const show_size = size_lookup_index === -1
			? size_value 
				? size_value + '?'
				: '?'
			: lookup_size_list[size_lookup_index].label
		
		const colour_lookup_index = __.findIndex(lookup_colour_list, {key: colour_value})
		const show_colour = colour_lookup_index === -1
			? colour_value
				? colour_value + '?'
				: '?'
			: lookup_colour_list[colour_lookup_index].label


		const downloads_index = __.findIndex(workupWizardStore.record.downloads_list, {option_code: download.option_code})
		const price = workupWizardStore._defaultPrices_for_downloads[downloads_index]
		const show_price = __.isNumber(price)
			? numeral(price/100).format('$ 0.00')
			: price

		const passdown = {
			isActive, download, 
			handle_sizeChange: this.handle_sizeChange, 
			show_size, size_value, agreement_size_list, lookup_size_list,
			handle_colourChange: this.handle_colourChange, 
			show_colour, colour_value, agreement_colour_list, lookup_colour_list,
			handle_focus: this.handle_focus
		}

		return (
			<Item_Row_>
				<Item_Row_Summary_ onClick={ () => this.handle_rowClicked(download.option_code)}>
					<IsWanted_>
						<IsWanted_Checkbox_ 	type='checkbox'
														checked={ download.wanted }
														onChange={ () => { this.handle_isWantedChange(download.option_code) } }
						/>
					</IsWanted_>
					<Size_> { show_size } </Size_>
					<Colour_> { show_colour } </Colour_>
					<Cost_> { show_price } </Cost_>
					<Delete_   				onClick={ this.handle_deleteClick }>
						<Icon_ 					className={ 'fa fa-close' } ></Icon_>
					</Delete_>
				</Item_Row_Summary_>
				{ isActive 
					? <Row_with_Dropdowns__ {...passdown} />
					: null
				}
			</Item_Row_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Row_with_Dropdowns__ extends React.Component {

	render() {
		const { isActive, download, handle_focus } = this.props
		const { show_size, size_value, agreement_size_list, lookup_size_list } = this.props
		const { handle_sizeChange } = this.props
		const { show_colour, colour_value, agreement_colour_list, lookup_colour_list } = this.props
		const { handle_colourChange } = this.props

		const op = download.option_code
		return (
			<Item_Row_Selects_>
				<Selects_>
					<Dropdown__
								  	label={'Size'}  key={ `size_${op}` } parm={'size'}
										handle_change={ handle_sizeChange } 
										handle_focus={ handle_focus } 
										download={ download }
										value={ size_value }
										show={ show_size }
										agreement_list={ agreement_size_list }
										lookup_list={ lookup_size_list }
					/>
					<Dropdown__
								  	label={'Colour'}  key={ `colour_${op}` }  parm={'colour'}
										handle_change={ handle_colourChange } 
										handle_focus={ handle_focus } 
										download={ download }
										value={ colour_value }
										show={ show_colour }
										agreement_list={ agreement_colour_list }
										lookup_list={ lookup_colour_list }
					/>
				</Selects_>
			</Item_Row_Selects_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Dropdown__ extends React.Component {

	onChange = (e) => {
		const { workupWizardStore } = this.props.store
		const [option_code, new_value] = workupWizardStore._get_option_code_and_value_from_composite(e.target.value, workupWizardStore._dropdownDelim)
		this.props.handle_change(option_code, new_value)
	}

	render() {
		const { store, download, handle_focus, label, parm } = this.props
		const { show, value, agreement_list, lookup_list } = this.props
		const { workupWizardStore } = store
		
		// assemble key/label pairs for the dropdown
		const list = __.concat(
			[{key: workupWizardStore._defaultCompositeValueForDropDown, label: `Choose a ${label}`}],
			__.map(agreement_list, (item, index) => {
				const label = parameter_label(lookup_list, item)
				return {key:item, label:label}
			}) 
		)
		const option_value = workupWizardStore._assemble__selectValue(download.option_code, download[parm])
		if (__.isEmpty(agreement_list)) { return false}
		return (

			<Dropdown_>
				<Dropdown_Label_>{ label }:</Dropdown_Label_>
				<Select_Parameter_  disabled={ !download.wanted }
														value={ option_value }
														onChange={ this.onChange }
														onFocus={ () => { handle_focus(download.option_code) } }
				>
					{
						__.map(list, (item, index) =>  {
							const opvalue = workupWizardStore._assemble__selectValue(download.option_code, item.key)
							return (
								<Select_Option_
														key={ item.key }
														value={ opvalue }
								>
									{ item.label }
								</Select_Option_>
							)
						})
					}
				</Select_Parameter_>
			</Dropdown_>
		)
	}
}
// ====================================================================
const parameter_label = (lookup_list, lookup_value) => {
	const lookup_index = __.findIndex(lookup_list, {key: lookup_value})
	const label = lookup_index === -1
		? lookup_value 
			? lookup_value + '?'
			: '?'
		: lookup_list[lookup_index].label
	return label
}
// ====================================================================

export { Downloading_Section }


