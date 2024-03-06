import React from 'react'
import { MouseEvent } from 'react'


type NoBorderButtonProps = {
    handleButtonClick: (e: MouseEvent) => void,
    value: string
}

const NoBorderButton = ({handleButtonClick,value} : NoBorderButtonProps) => {
  return (
    <button value = {value} onClick = {handleButtonClick} className = "mr-4  text-white text-sm text-zinc-300 hover:text-white">{value}</button>
  )
}

export default NoBorderButton