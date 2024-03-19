import React from 'react'
import { GrPowerReset } from "react-icons/gr";
import { IconContext } from 'react-icons';

type ResetButtonProps = {
    resetHandler: () => void;
}

const ResetButton = ({resetHandler} : ResetButtonProps) => {
  return (
    <IconContext.Provider value = {{color: "white", size:"1.5rem"}}>
      <button className = "mr-2 text-white" onClick = {resetHandler}>
        <GrPowerReset />
      </button>
    </IconContext.Provider>
  )
}

export default ResetButton