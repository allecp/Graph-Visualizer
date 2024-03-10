
import React, { useCallback, useState, useEffect, useRef } from 'react';
import 'reactflow/dist/style.css';
import GraphNode from './GraphNode.tsx';
import {ModeType, NodeInfo,AdjInfo} from '../types.ts'
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
import next from 'next';

// intialize graph
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
  {id:"3",type: "customEdge", sourceHandle: "s", source: '2', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:1}},
  {id:"4",type: "customEdge", sourceHandle: "s", source: '1', target: "4", targetHandle: "t", style: {stroke:"white"}, data:{weight:4}},
  {id:"5",type: "customEdge", sourceHandle: "s", source: '4', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
  {id:"6",type: "customEdge", sourceHandle: "s", source: '4', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:6}}
];

// create adjacency list from intial edges
// map<key = source node, value = [{targetNode,sourceToTargetWeight},....]>
let adjList = new Map<string,AdjInfo[]>();
initialEdges.forEach((edge) => {
   
    const edgeInfo = {target: edge.target,weight: edge.data.weight, id: edge.id};
  
    if (!adjList.has(edge.source)){
      adjList.set(edge.source,[edgeInfo]);
    }
    else{
      adjList.get(edge.source)?.push(edgeInfo);
    }
})

/*
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};


const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
 */

// set node and edge types to the custom nodes/edges
const nodeTypes = { graphNode: GraphNode }
const edgeTypes = {
  customEdge: CustomEdge
}

// hides reactflow icon
const proOptions = { hideAttribution: true };

function initCostArr(): NodeInfo[]{

  let arr: NodeInfo[] = [];
  
  for (let i = 0; i < initialNodes.length; i++){
    const temp: NodeInfo = {id: initialNodes[i].id, cost: initialNodes[i].id === '0' ? 0 : Number.MAX_SAFE_INTEGER, used: false};
    arr.push(temp);
  }

  return arr;
}

const Djikstras = () => {

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [costArr,setCostArr] = useState<NodeInfo[]>(initCostArr());
  const [currentNode,setCurrentNode] = useState<{id: string, isActive: boolean}>({id: '0',isActive: false});
  const intervalId = useRef<string | number | undefined | NodeJS.Timeout>(undefined);
  const runAlgo = useRef<boolean>(false);

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

  // useEffect is triggered only when the activeEdgesOrNodes changes or on initial trigger (start button). not when component mounts
  // clicking the start button intially triggers the useEffect function
  // cleanup function clears the interval set by the iteration function. interval id is set/stored between renders using useRef
  useEffect(() => {
    if (runAlgo.current){
      iteration()
      return () => clearInterval(intervalId.current);
    }
  },[currentNode])

  function handleNode(){
    let min = Number.MAX_SAFE_INTEGER, minId = '-1';

    costArr.forEach((nodeInfo) => { 
      if (nodeInfo.cost < min && !nodeInfo.used){
        min = nodeInfo.cost;
        minId = nodeInfo.id;
      }
    });


  if (!currentNode.isActive){
      let newCostArr = costArr.map((nodeInfo) => nodeInfo.id !== minId ? {...nodeInfo} : {...nodeInfo,used:true})
      let newNodes = nodes.map((node) => node.id !== minId ? {...node} : {...node,data: {...node.data, processed:true}});
      let newEdges = edges.map((edge) => ({...edge,style:{stroke: 'white'}}));

      intervalId.current = setInterval(() => {
        setNodes(newNodes);
        setCostArr(newCostArr);
        setEdges(newEdges);
        setCurrentNode({isActive: true, id: minId});
      },1000)
  }
  }

  function handleEdges(){
    let nextEdgeIndex = -1;
        for (let j = 0; j < edges.length; j++){
            if (edges[j].style?.stroke !== 'orange' && (edges[j].source === currentNode.id || edges[j].target === currentNode.id)){
              nextEdgeIndex = j;
              break;
            }
        }

      // all adjacent edges are highlighted, therefore switch state to isActive to switch back to processing a new node
      if (nextEdgeIndex === -1){
        intervalId.current = setInterval(()=>{
          setCurrentNode({id: currentNode.id,isActive:false})
        },1000)

        return;
      };

      const nextEdgeWeight = edges[nextEdgeIndex].data.weight;

      let newEdgeArr = edges.map((edge) => nextEdgeIndex.toString() === edge.id ? {...edge,style: {stroke: "orange"}} : {...edge});

      // string id of target node from src->target
      const targetId = edges[nextEdgeIndex].target, sourceId = currentNode.id;
      const newCostArr = costArr.map((element) => {

        const totalCost = costArr[parseInt(sourceId)].cost + nextEdgeWeight;
        if (element.id === targetId && totalCost < costArr[parseInt(targetId)].cost){
            return {...element,cost:totalCost}
        }
        return {...element};
      });

      const newNodes = nodes.map((node,index) => {
        const newValue = newCostArr[index].cost === Number.MAX_SAFE_INTEGER ? "inf" : newCostArr[index].cost.toString();
        return {...node,data: {...node.data, value: newValue}};
      });

      intervalId.current = setInterval(() => {
        setNodes(newNodes);
        setCostArr(newCostArr);
        setEdges(newEdgeArr);
        setCurrentNode({...currentNode});
      },500)
  }

  // dictates the state of each iteration of djikstra algorithm
  // controls the nodes that change colors and edges as the algorithm executes based off state
  function iteration(){

    console.log("fuarrrk");
    
    let processedNodes = 0

    nodes.forEach((node) => {
      if (node.data.processed){
        processedNodes++;
      }
    });

    if (processedNodes === nodes.length){
      return;
    }

    
    
    
    if (!currentNode.isActive)
      handleNode()
    else{
      handleEdges()
    }
}

  // kick off the algorithm after the user clicks the start button
  // trigger the useEffect function by calling the setActiveEdgeOrNode with the initial state
  // set runAlgo.current = true 
  function startAlgo(){
    setCurrentNode({id: '0',isActive: false});
    runAlgo.current = true;
  }  

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
              <button onClick = {() => startAlgo()}>Start</button>
        </div>
    </div>
  )
}


export default Djikstras;