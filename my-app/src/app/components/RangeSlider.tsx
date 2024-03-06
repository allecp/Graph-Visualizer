import React from 'react'

type RangeSliderProps = {
    type: string,
    value: string,
    step: string,
    min: string,
    max: string,
    name: string
}

const RangeSlider = ({ type, value, step, min, max, name}: RangeSliderProps) => {
  return (
    <input value = {value} type = {type} name = {name} step = {step} min = {min} max = {max}/>
  )
}

export default RangeSlider