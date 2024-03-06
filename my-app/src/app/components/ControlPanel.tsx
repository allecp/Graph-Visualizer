import React, { ChangeEvent } from 'react'
import {useState} from 'react'
import {ModeType} from '../types'
import RangeSlider from './RangeSlider'
import {Node,Edge} from 'reactflow'


type ControlPanelProps = {
  activeAlgorithm: string,
  mode: ModeType,
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void
}

console.log("control panel has been mounted");

const ControlPanel = ({activeAlgorithm,mode,setNodes,setEdges}: ControlPanelProps) => {

  const[value,setValue] = useState('');

  return (
    <button>Play</button>
  )
}

export default ControlPanel