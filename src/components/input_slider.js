import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

export default (props) => {
  return(
    <div className="mt-3">
      <InputRange
        maxValue={props.max}
        minValue={props.min}
        formatLabel={value => value + " " + props.label}
        value={props.value}
        onChange={value => props.handler(value)}
      />
  </div>
  )
}
