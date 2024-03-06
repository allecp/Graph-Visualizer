import React, { ChangeEvent } from 'react'
import {MouseEvent} from 'react';
import Option from './Option.tsx'
import {useState} from 'react';

type SelectAlgoProps = {
  setAlgorithm: (algo: string) => void;
  activeAlgorithm: string
}


const SelectAlgo = ({setAlgorithm, activeAlgorithm  }: SelectAlgoProps) => {

  function selectOptionHandler(e: ChangeEvent){
    const target = e.currentTarget as HTMLSelectElement;
    setAlgorithm(target.value);
  }

  return (
    <select value = {activeAlgorithm} 
      className = "bg-neutral-600 text-sm text-zinc-300 rounded-none w-44 cursor-pointer"
      onChange = {selectOptionHandler}
    >
        <Option value = "Djikstras"/>
        <Option value = "Bellman-Ford"/>
    </select>

  )
}

export default SelectAlgo;