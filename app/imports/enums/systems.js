import {Enum} from 'enumify'

class Systems extends Enum {}
Systems.initEnum([
  'VENDOR',
  'CUSTOMER',
  'ADMIN',
  'ALL'
])

export { Systems }
