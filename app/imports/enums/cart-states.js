import { Enum } from 'enumify'

class Cart_States extends Enum {}
Cart_States.initEnum([
  'START',
  'HAS_ERRORS', // any error that prevents user form completing order
  'READY_for_PAYING',
  'PAYMENT_in_PROGRESS',
  'ORDER_COMPLETE' // Payment made and successful
])

export { Cart_States }
