import React from 'react'
import StartButton from './StartButton.tsx';
import ResetButton from './ResetButton.tsx'
import ForwardButton from './ForwardButton.jsx'
import BackwardButton from './BackwardButton.tsx';
import ChangeButton from './ChangeButton.tsx';
import Slider from './Slider.tsx'
import { start } from 'repl';
import { useState } from 'react'

type ToolbarProps = {
    startHandler: () => void;
    changeHandler: () => void;
    resetHandler: () => void,
    pauseHandler: () => void,
    setSpeed: (speed: string) => void,
    speed: string
    run: boolean
}


const Toolbar = ({speed,setSpeed,startHandler,changeHandler,resetHandler,pauseHandler,run} : ToolbarProps) => {

  return (
    <div className = "w-screen flex flex-row justify-center">
      <Slider speed = {speed} setSpeed = {setSpeed}/>
      <StartButton run = {run} handler = {!run ? startHandler : pauseHandler}/>
      <ChangeButton changeHandler = {changeHandler}/>
      <ResetButton resetHandler = {resetHandler}/>
    </div>
  )
}

/*
  <ToolBarButton func = {() => {
            changeGraph()
            setTimeout(() => reactFlow.fitView());
        }} text = "Change"/>
*/

export default Toolbar