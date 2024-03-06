
import React, { useCallback } from 'react';
import {useState} from 'react';
import 'reactflow/dist/style.css';
import GraphNode from './GraphNode.tsx';
import {ModeType} from '../types.ts'
import CustomEdge from './CustomEdge.tsx';

import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  EdgeTypesWrapped
} from 'reactflow';
 
//import CustomNode from './CustomNode';


const initialNodes: Node[] = [
  {id: '0', type: 'graphNode', position: {x:0, y: 0}, data : {value: '0', processed:false}},
   {id: '1', type: 'graphNode', position: {x:-50, y: 50}, data : {value: 'inf', processed:false}},
   {id: '2', type: 'graphNode', position: {x:50, y: 50}, data : {value: 'inf',processed:false}},
   {id: '3', type: 'graphNode', position: {x:50, y: 100}, data : {value: 'inf', processed:false}},
   {id: '4', type: 'graphNode', position: {x:-50, y: 100}, data : {value: 'inf', processed:false}}
];
 

const initialEdges: Edge[] = [
  {id:"0",type: "customEdge", sourceHandle: "s", source: '0', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
  {id:"1",type: "customEdge", sourceHandle: "s", source: '0', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
  {id:"2",type: "customEdge", sourceHandle: "s", source: '1', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:20}},
  {id:"3",type: "customEdge", sourceHandle: "s", source: '1', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:15}},
  {id:"4",type: "customEdge", sourceHandle: "s", source: '2', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:1}},
  {id:"5",type: "customEdge", sourceHandle: "s", source: '1', target: "4", targetHandle: "t", style: {stroke:"white"}, data:{weight:4}},
  {id:"6",type: "customEdge", sourceHandle: "s", source: '4', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
  {id:"7",type: "customEdge", sourceHandle: "s", source: '4', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:6}}
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

/*
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
 */

const nodeTypes = { graphNode: GraphNode }
const edgeTypes = {
  customEdge: CustomEdge
}

const proOptions = { hideAttribution: true };

const Djikstras = () => {

  function initCostArr(): number[]{

    let costArr = new Array(nodes.length).fill(Number.MAX_SAFE_INTEGER);
    costArr[0] = 0;

    return costArr;
  }

  let intervalId;
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [costArr,updateCostArr] = useState<number[]>(initCostArr())
  const [currentNode,setCurrentNode] = useState('0');
  
  const [mode,setMode] = useState<ModeType>('');
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  



  

  return (
      <div className = "w-screen h-5/6 flex-col items-center">
        <ReactFlow
          nodes = {nodes}
          edges = {edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          proOptions = {proOptions}
          //onConnect={onConnect}
          nodeTypes = {nodeTypes}
          edgeTypes={edgeTypes}
          fitView = {true}
        />
        <div className = "w-screen flex flex-row justify-center">
              <button>Hello ruby</button>
        </div>
    </div>
  )
}

export default Djikstras