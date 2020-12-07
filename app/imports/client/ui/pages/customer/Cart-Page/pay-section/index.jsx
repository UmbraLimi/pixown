// ----node-packages----------------
import React 										from  'react'
import { observable, action }		from  'mobx'
import { inject, observer } 		from  'mobx-react'
// ----styles-----------------------
import { Pay_Section_, Pay_Button_
}																from  './styles.js'
// ----enums------------------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Pay_Section extends React.Component {

	@observable isAnimating = false
	@action stopAnimating = () => {this.isAnimating = false}
	@action startAnimating = () => {this.isAnimating = true}

	handlePayButtonClick = () => {
		const { cartStore } = this.props.store
		this.startAnimating()
		setTimeout(() => {
			this.stopAnimating()
			//cartStore.test_stripe_checkout()
			cartStore.stripe_checkout()
		}, 1000)
	}

	componentDidMount() {
		const { cartStore, app } = this.props.store
		cartStore.setup_stripe_handler()
	}

	componentWillUnmount() {
		const { cartStore, app } = this.props.store
		cartStore.teardown_stripe_handler()
	}

	render() {
		const { store } = this.props
		const { cartStore } = store
		const hasErrors = cartStore.hasErrors
		const isDirty = cartStore.isDirty
		const total_cart_cost = cartStore.total_cart_cost
		const cantSave = isDirty || hasErrors || total_cart_cost <= 0// does not apply to insurance checkbiox as it is ok whatever it is
		const isAnimating = this.isAnimating
console.warn(isDirty, hasErrors, total_cart_cost)
		return (
			<Pay_Section_				onClick={ this.handlePayButtonClick }
			>
				<Pay_Button_ 			cantSave={cantSave}
													isAnimating={isAnimating}
				>
					<span>Pay with Card</span>
				</Pay_Button_>
			</Pay_Section_>
		)
	}
}
// ====================================================================

export { Pay_Section }