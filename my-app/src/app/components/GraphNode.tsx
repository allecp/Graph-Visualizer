import React from 'react'
import { useCallback } from 'react';
import {Handle, Position} from 'reactflow';

type GraphNodeProps = {
  data: {value: string,processed: boolean}
}


const GraphNode = ({data}: GraphNodeProps) => {

    const bgColor = data.processed ? "bg-orange-500" : "bg-neutral-600";
  
    return (
    <div className = {`py-1 h-7 w-7 border-white rounded-full relative ${bgColor} text-white border-2 text-center text-xs`}>
        {data.value}
        <Handle  
          style = {{position:"absolute", top:"50%", right: "50%", transform: "translate(50%,-50%)", visibility: "hidden" }} 
          type="target" 
          position={Position.Right} 
          id = "t"  
        />
        <Handle  
          style = {{position:"absolute", top:"50%", right: "50%", transform: "translate(50%,-50%)", visibility: "hidden"}} 
          type="source" 
          position={Position.Right} 
          id = "s"  
        />
    </div>
  )
}

export default GraphNode