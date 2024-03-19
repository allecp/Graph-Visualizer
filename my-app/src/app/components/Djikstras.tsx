
import React, { useCallback, useState, useEffect, useRef } from 'react';
import 'reactflow/dist/style.css';
import GraphNode from './GraphNode.tsx';
import Toolbar from './Toolbar.tsx'
import {ModeType, NodeInfo,AdjInfo} from '../types.ts'
import CustomEdge from './CustomEdge.tsx';
import Graphs from '../graphs.ts'

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
  EdgeTypesWrapped,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import next from 'next';



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
const initialNodes = Graphs[2].nodes;
const initialEdges = Graphs[2].edges;

function initCostArr(graphNum: number){
  return Graphs[graphNum].nodes.map((node) => ({id: node.id, cost: node.data.value === '0' ? 0 : Number.MAX_SAFE_INTEGER,used: false}));
}

const Djikstras = () => {


  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [costArr,setCostArr] = useState<NodeInfo[]>(initCostArr(2));
  const [graph,setGraph] = useState<number>(2)
  const [currentNode,setCurrentNode] = useState<{id: string, isActive: boolean}>({id: '0',isActive: false});
  const intervalId = useRef<string | number | undefined | NodeJS.Timeout>(undefined);
  const [run,setRun] = useState(false);
  const [speed,setSpeed] = useState('500')

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

  useEffect(() => {
    if (run){
      iteration();
    }
    return () => clearInterval(intervalId.current);
  },[currentNode,run])



  function handleNode(){
    let min = Number.MAX_SAFE_INTEGER, minId = '-1';

    costArr.forEach((nodeInfo) => { 
      if (nodeInfo.cost < min && !nodeInfo.used){
        min = nodeInfo.cost;
        minId = nodeInfo.id;
      }
    });

    let newCostArr = costArr.map((nodeInfo) => nodeInfo.id !== minId ? {...nodeInfo} : {...nodeInfo,used:true})
    let newNodes = nodes.map((node) => node.id !== minId ? {...node} : {...node,data: {...node.data, processed:true}});
    let newEdges = edges.map((edge) => ({...edge,style:{stroke: 'white'}}));

    intervalId.current = setInterval(() => {
      setNodes(newNodes);
      setCostArr(newCostArr);
      setEdges(newEdges);
      setCurrentNode({isActive: true, id: minId});
    },1000 - parseInt(speed))
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
        },1000 - parseInt(speed));

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
        const newValue = newCostArr[index].cost === Number.MAX_SAFE_INTEGER ? "?" : newCostArr[index].cost.toString();
        return {...node,data: {...node.data, value: newValue}};
      });

      intervalId.current = setInterval(() => {
        setNodes(newNodes);
        setCostArr(newCostArr);
        setEdges(newEdgeArr);
        setCurrentNode({...currentNode});
      },1000 - parseInt(speed))
  }

  // dictates the state of each iteration of djikstra algorithm
  // controls the nodes that change colors and edges as the algorithm executes based off state
  function iteration(){

    let processedNodes = 0

    nodes.forEach((node) => {
      if (node.data.processed){
        processedNodes++;
      }
    });

    if (processedNodes === nodes.length){
      return;
    }
    else if (!currentNode.isActive){
      handleNode()
    }
    else{
      handleEdges()
    }
}

  // kick off the algorithm after the user clicks the start button
  // trigger the useEffect function by calling the setActiveEdgeOrNode with the initial state
  // set runAlgo.current = true 
  function startHandler(){
    setRun(true);
    setCurrentNode({...currentNode});
  }  

  // stop animation
  // reset nodes and edges to desired nodes/edges
  function changeGraphHandler(){
    setRun(false);
    const nextGraph = (graph + 1) % Graphs.length;
    setGraph(nextGraph);
    setNodes(Graphs[nextGraph].nodes.map((node) => ({...node})));
    setEdges(Graphs[nextGraph].edges.map((edge) => ({...edge})));
    setCostArr(initCostArr(nextGraph));
    setCurrentNode({id: '0', isActive: false})

  }

  function resetHandler(){
    setRun(false);
    setNodes(Graphs[graph].nodes.map((node) => ({...node})));
    setEdges(Graphs[graph].edges.map((edge) => ({...edge})));
    setCostArr(initCostArr(graph));
    setCurrentNode({id: '0', isActive: false})
  }

  function pauseHandler(){
    setRun(false);
  }

  return (
      <div className = "w-screen h-5/6 flex-col items-center">
        <ReactFlowProvider>
          <ReactFlow
            nodes = {nodes}
            edges = {edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            proOptions = {proOptions}
            //onConnect={onConnect}
            nodeTypes = {nodeTypes}
            edgeTypes={edgeTypes}
            onInit={(instance) => instance.fitView()}
          />
        <Toolbar 
          startHandler = {startHandler} 
          changeHandler = {changeGraphHandler} 
          resetHandler = {resetHandler}
          pauseHandler = {pauseHandler}
          run = {run}
          speed = {speed}
          setSpeed = {setSpeed}
        />
        </ReactFlowProvider>
    </div>
  )
}


export default Djikstras;