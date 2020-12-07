import { Enum } from 'enumify'

class User_Roles extends Enum {}
User_Roles.initEnum([
  'CUSTOMER',
  'VENDOR',
  'ADMIN'
])

export { User_Roles }
