import { Options } from 'next/dist/server/base-server';
import React from 'react'

type OptionProps = {
  value: string,

}

const Option = ({value}: OptionProps) => {
  return (
    <option className = "text-xs m-1 hover:bg-white" value = {value}>{value}</option>
  )
}

export default Option