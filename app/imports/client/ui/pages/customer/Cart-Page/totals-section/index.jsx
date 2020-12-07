//import { Meteor }								from  'meteor/meteor'
// ----node-packages----------------
import React 										from  'react'
import { inject, observer } 		from  'mobx-react'
//import { _ as __ } 							from  'lodash'
import numeral 									from  'numeral'
// ----styles-----------------------
import { Totals_Section_, Section_Header_, Section_Sub_Item_,
	Section_Sub_Total_, Section_Insurance_, Section_Item_, 
	Section_Label_, Single_Underline_,
	Insurance_Label_, Total_Cost_, Checkbox_,
	Sub_Item_Cost_, Sub_Item_Label_, Sub_Item_Postdent_,
	Sub_Item_Total_Label_, Left_, Right_, SubTotal_Cost_
}															from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Totals_Section extends React.Component {

	handle_insuranceIsWantedChange = (newValue) => {
		const { cartStore } = this.props.store
		cartStore._toggle_insuranceIsWanted()
	}

	render() {
		const { store } = this.props
		const { cartStore } = store

		return (
			<Totals_Section_ >
				<Left_ />
				<Right_>
					<Products_Services__ />
					<Discounts__ />
					<Section_Insurance__ 
						label={ 'Insurance' } 
						cost={ cartStore.insurance_cost } 
						wanted={ cartStore.insurance_is_wanted }
						handleChange={ this.handle_insuranceIsWantedChange }
					/>
					<Section_Item__ label={ 'Postage & Handling' } cost={ cartStore.postage_handling_cost } />

					<Section_Item__ uborder={ true } label={ 'Sub Total' } cost={ cartStore.totalPrice_pre_hst } />
					<Section_Item__ label={ 'H.S.T.' } cost={ cartStore.hst } />
					<Section_Item__ uborder={ true } label={ 'Please Pay This Amount' } cost={ cartStore.total_cart_cost } />
				</Right_>
			</Totals_Section_ >
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Products_Services__ extends React.Component {

	render() {
		const { store } = this.props
		const { cartStore } = store

		return (
			<div>
				<Section_Header__ label={ 'Products and Services Selected' } />
				<Section_Sub_Item__ label={ 'Total of Retouching' } cost={ cartStore.totalPrice_for_retouches } />
				<Section_Sub_Item__ label={ 'Total of Prints' } cost={ cartStore.totalPrice_for_prints } />
				<Section_Sub_Item__ label={ 'Total of Downloads' } cost={ cartStore.totalPrice_for_downloads } />
				<Section_Sub_Total__ label={ 'Total of Products/Services' } cost={ cartStore.totalPrice_for_workups } />
			</div>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Discounts__ extends React.Component {

	render() {
		const { store } = this.props
		const { cartStore } = store
		const retouching_discount = cartStore.retouching_discount
		const flash_discount = cartStore.flash_sale_discount
		const volume_discount = cartStore.volume_discount
		const tot_discount = cartStore.totalPrice_for_discounts

		if (retouching_discount === 0 && flash_discount === 0 && volume_discount === 0) {
			return null
		}
		return (
			<div>
				<Section_Header__ label={ 'Discounts Earned' } />
				{	volume_discount !== 0 
					? <Section_Sub_Item__ label={ 'Volume Discount' } cost={ volume_discount } />
					: null
				}
				{ retouching_discount !== 0 
					? <Section_Sub_Item__ label={ 'Retouching Discount' } cost={ retouching_discount } />
					: null
				}
				{ flash_discount !== 0 
					? <Section_Sub_Item__ label={ 'Flash Sale Discount' } cost={ flash_discount } />
					: null
				}
				<Section_Sub_Total__ label={ 'Total of Discounts' } cost={ tot_discount } />
			</div>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Section_Sub_Total__ extends React.Component {

	render() {
		const { label, cost } = this.props

		return (
			<Section_Sub_Total_>
				<Sub_Item_Postdent_ />
				<Sub_Item_Total_Label_>{ label }</Sub_Item_Total_Label_>
				<SubTotal_Cost_>$&nbsp;
					{ `${numeral(cost/100).format('0.00')}` }
				</SubTotal_Cost_>
			</Section_Sub_Total_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Section_Insurance__ extends React.Component {

	render() {
		const { label, cost, wanted, handleChange } = this.props
		const cname = wanted
		? ' fa fa-check-square '
		: ' fa fa-square '

		return (
			<Section_Insurance_>
				<Insurance_Label_>{ label }</Insurance_Label_>
				<Checkbox_
								className={ cname }
								onClick={ () => { handleChange() } }
				/>
				<Total_Cost_>$&nbsp;
					{ `${numeral(cost/100).format('0.00')}` }
				</Total_Cost_>
			</Section_Insurance_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Section_Item__ extends React.Component {

	render() {
		const { label, cost, uborder } = this.props

		return (
			<div>
				{ uborder ? <Single_Underline_ /> : null }
				<Section_Item_>
					<Section_Label_>{ label }</Section_Label_>
					<Total_Cost_>$&nbsp;
						{ `${numeral(cost/100).format('0.00')}` }
					</Total_Cost_>
				</Section_Item_>
			</div>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Section_Sub_Item__ extends React.Component {

	render() {
		const { label, cost } = this.props

		return (
			<Section_Sub_Item_>
				<Sub_Item_Label_>{ label }</Sub_Item_Label_>
				<Sub_Item_Cost_>$&nbsp;
					{ `${numeral(cost/100).format('0.00')}` }
				</Sub_Item_Cost_>
				<Sub_Item_Postdent_ />
			</Section_Sub_Item_>
		)
	}
}
// ====================================================================
@inject('store')
@observer
class Section_Header__ extends React.Component {

	render() {
		const { label } = this.props

		return (
			<Section_Header_>
				<Section_Label_>{ label }</Section_Label_>
			</Section_Header_>
		)
	}
}
// ====================================================================

export { Totals_Section }