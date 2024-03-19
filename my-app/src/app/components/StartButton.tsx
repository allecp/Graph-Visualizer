import React from 'react'
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { IoMdPlayCircle } from "react-icons/io";
import { MdOutlinePlayArrow } from "react-icons/md";
import { IconContext } from 'react-icons';

type StartButtonProps = {
    run: boolean,
    handler: () => void;
}

const StartButton = ({run,handler} : StartButtonProps) => {
  return (
    <IconContext.Provider value = {{color: "white",size: !run ?  "2rem" : "2rem"}}>
      <button className = "mr-2" onClick = {handler}>
          {!run ? <MdOutlinePlayArrow /> : <CiPause1/>}
      </button>
    </IconContext.Provider>
  )
}

export default StartButton