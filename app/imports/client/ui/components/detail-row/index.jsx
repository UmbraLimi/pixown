// ----node-packages----------------
import React                    from  'react'
import { inject, observer } 		from  'mobx-react'
import { _ as __ }              from  'lodash'
// ----styles-----------------------
import { 
  Detail_Row_, Label_, Values_, 
  Value_, Image_, Unshown_
 } 															from  './styles.js'
// ----helpers----------------------
import { format_from_array } 		from  '/imports/client/misc/formatter.js'
import { computor }             from  '/imports/client/misc/computor.js'
// ----enums------------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
@inject('store')
@observer
class Detail_Row extends React.Component {
	render() {
    const {
      label='- missing label -', 
      id,
      width,
      truncate_count, 
      compute,
      valueList=['- missing value(s) -'], 
      values_orientation='rows', 
      fformat
    } = this.props
  
    // computes come from listings
    const __valueList = compute
      ? [computor({...compute})]
      : valueList

      const num_items = __valueList.length

      const _valueList = truncate_count
      ? num_items===0
        ? []
        : num_items <= truncate_count
          ? __valueList
          : __valueList.slice(0, truncate_count)
      : __valueList
      
    const num_unshown_items = num_items - _valueList.length

    return (
      <Detail_Row_  className={`Detail_Row_${label}`} 
      >
        <Label_ className={`Label_${label}`}>
          {label}
        </Label_>
        <Values_ values_orientation={values_orientation} >
          {__.map(_valueList, (value, i) => {
            const _value = format_from_array(value, fformat)
            return (
              <Value_  key={ i } >
                {_value}
              </Value_>
            )
          })}
          { num_unshown_items>0 ? (
            <Unshown_ orientation={values_orientation}>
              {`+ ${num_unshown_items} more`}
            </Unshown_>
          ) : false}
        </Values_>
      </Detail_Row_>
    )
  }
}
// ====================================================================

export { Detail_Row }