import React from 'react'
import { BaseEdge, getStraightPath, EdgeLabelRenderer } from 'reactflow';

type CustomEdgeProps = {
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    id: string,
    style?: React.CSSProperties,
    data?: {weight: number}
    //label: string
}

const CustomEdge = ({sourceX,sourceY,targetX,targetY,id,style,data}: CustomEdgeProps) => {
    
    const [edgePath,labelX,labelY] = getStraightPath({sourceX,sourceY,targetX,targetY});

    return (
    <>
        <BaseEdge id={id} path={edgePath} style ={style}/>
        <EdgeLabelRenderer>
          <div 
            style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
            className = "text-xs">{data?.weight}
          </div>
        </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge