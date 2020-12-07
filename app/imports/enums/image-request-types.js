import { Enum } from 'enumify'

class Image_Request_Types extends Enum {}
Image_Request_Types.initEnum([
  'LORES_RETOUCHED',
  'HIRES_RETOUCHED',
  'LORES_ORIGINAL', // = original proof
  'HIRES_ORIGINAL',
  'HIRES_SIZED'  // not used as yet
])

export { Image_Request_Types }
