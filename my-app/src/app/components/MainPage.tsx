'use client';
import React, { useCallback } from 'react';
import {useState} from 'react';
import SelectAlgo from './SelectAlgo.tsx';
import 'reactflow/dist/style.css';
import Djikstras from './Djikstras.tsx';

 



/*
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
 */


const MainPage = () => {
  const [activeAlgorithm,setAlgorithm] = useState('Select Algorithm');
  
  return (
    
    <div className = "h-screen p-4 flex flex-col items-center bg-neutral-600 min-w-56">
      
        <div className = "flex justify-start  w-full mb-2 font-semibold"> 
              <div className = "text-zinc-300">Algorithm Visualizer</div>
        </div>

        <SelectAlgo setAlgorithm={setAlgorithm} activeAlgorithm = {activeAlgorithm}/>
        <Djikstras/>
    </div>
  )
}

export default MainPage