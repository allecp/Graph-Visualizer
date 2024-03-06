import React from 'react'
import {MouseEvent} from 'react';
// inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" <--- active

type ButtonProps = {
  handleAlgoClick: (event: MouseEvent) => void,
  isActive: boolean,
  value: string
}



const AlgoButton = ({value,handleAlgoClick,isActive}: ButtonProps) => {

  const style = (isActive) ? "inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white mr-2" :  "text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4 mr-2"


  return (
    <button value = {value} className = {style} onClick = {handleAlgoClick}>{value}</button>
  )
}

export default AlgoButton