import {Enum} from 'enumify'

class Value_Types extends Enum {}
Value_Types.initEnum([
  'INTEGER',
  'STRING',
  'DECIMAL',
  'BOOLEAN',
  'DATE',
  'IMAGE',
  'DOLLARS',
  //'ARRAY',
  //'OBJECT'
])

export { Value_Types }