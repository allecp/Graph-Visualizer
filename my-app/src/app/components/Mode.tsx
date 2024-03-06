import React from 'react';
import {useState} from 'react';
import { MouseEvent } from 'react';
import NoBorderButton from './NoBorderButton';
import { ModeType } from '../types';



type ModeProps = {
    setMode: (e: ModeType) => void
}


const Mode = ({setMode} : ModeProps) => {

function handleButtonClick(e: MouseEvent){
    const target = e.currentTarget as HTMLButtonElement;
    console.log(target.value);
    setMode(target.value as ModeType);
}



  return (
    <div className = "flex-row">
        
        <NoBorderButton  value = "generate" handleButtonClick={handleButtonClick}/>
        <NoBorderButton  value = "build" handleButtonClick={handleButtonClick}/>

    </div>
  )
}

export default Mode