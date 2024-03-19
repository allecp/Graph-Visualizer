import {Edge,Node} from 'reactflow';


const graphs: {nodes: Node[], edges: Edge[]}[] = [

    {
        nodes:
            [
                {id: '0', type: 'graphNode', position: {x:0, y: 0}, data : {value: '0', processed:false}},
                {id: '1', type: 'graphNode', position: {x:-50, y: 50}, data : {value: '?', processed:false}},
                {id: '2', type: 'graphNode', position: {x:50, y: 50}, data : {value: '?',processed:false}},
                {id: '3', type: 'graphNode', position: {x:50, y: 100}, data : {value: '?', processed:false}},
                {id: '4', type: 'graphNode', position: {x:-50, y: 100}, data : {value: '?', processed:false}}
            ]
        ,
        edges:
            [
                {id:"0",type: "customEdge", sourceHandle: "s", source: '0', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"1",type: "customEdge", sourceHandle: "s", source: '0', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
                {id:"2",type: "customEdge", sourceHandle: "s", source: '1',target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:20}},
                {id:"3",type: "customEdge", sourceHandle: "s", source: '2',target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:1}},
                {id:"4",type: "customEdge", sourceHandle: "s", source: '1',target: "4", targetHandle: "t", style: {stroke:"white"}, data:{weight:4}},
                {id:"5",type: "customEdge", sourceHandle: "s", source: '4',target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
                {id:"6",type: "customEdge", sourceHandle: "s", source: '4',target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:6}}
            ]
    },
    {
        nodes:
            [
                {id: '0', type: 'graphNode', position: {x:-50, y: 50}, data : {value: '0', processed:false}},
                {id: '1', type: 'graphNode', position: {x:0, y: 0}, data : {value: '?', processed:false}},
                {id: '2', type: 'graphNode', position: {x:0, y: 100}, data : {value: '?', processed:false}},
                {id: '3', type: 'graphNode', position: {x:-100, y: 100}, data : {value: '?', processed:false}},
                {id: '4', type: 'graphNode', position: {x:-100, y: 0}, data : {value: '?', processed:false}},
                {id: '5', type: 'graphNode', position: {x:50, y: 50}, data : {value: '?', processed:false}},
            ],
        edges:
            [
                {id:"0",type: "customEdge", sourceHandle: "s", source: '0', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"1",type: "customEdge", sourceHandle: "s", source: '0', target: "4", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"2",type: "customEdge", sourceHandle: "s", source: '0', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"3",type: "customEdge", sourceHandle: "s", source: '0', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"4",type: "customEdge", sourceHandle: "s", source: '0', target: "5", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"5",type: "customEdge", sourceHandle: "s", source: '4', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:6}},
                {id:"6",type: "customEdge", sourceHandle: "s", source: '4', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
                {id:"7",type: "customEdge", sourceHandle: "s", source: '3', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
                {id:"8",type: "customEdge", sourceHandle: "s", source: '2', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"9",type: "customEdge", sourceHandle: "s", source: '1', target: "5", targetHandle: "t", style: {stroke:"white"}, data:{weight:8}},
                {id:"10",type: "customEdge", sourceHandle: "s", source: '2', target: "5", targetHandle: "t", style: {stroke:"white"}, data:{weight:11}},
            ]
    },
    {
        nodes:
            [
                {id: '0', type: 'graphNode', position: {x:50, y: 50}, data : {value: '0', processed:false}},
                {id: '1', type: 'graphNode', position: {x:-50, y: -50}, data : {value: '?', processed:false}},
                {id: '2', type: 'graphNode', position: {x:-100, y: 0}, data : {value: '?', processed:false}},
                {id: '3', type: 'graphNode', position: {x:50, y: -50}, data : {value: '?', processed:false}},
                {id: '4', type: 'graphNode', position: {x:100, y: 0}, data : {value: '?', processed:false}},
                {id: '5', type: 'graphNode', position: {x:150, y: -50}, data : {value: '?', processed:false}},
                {id: '6', type: 'graphNode', position: {x:-50, y: 50}, data : {value: '?', processed:false}},
                {id: '7', type: 'graphNode', position: {x:0, y: 0}, data : {value: '?', processed:false}},
                {id: '8', type: 'graphNode', position: {x:150, y: 50}, data : {value: '?', processed:false}},
                {id: '9', type: 'graphNode', position: {x:0, y: 100}, data : {value: '?', processed:false}},
                {id: '10', type: 'graphNode', position: {x:100, y: 100}, data : {value: '?', processed:false}},
                {id: '11', type: 'graphNode', position: {x:-50, y: 150}, data : {value: '?', processed:false}},
                {id: '12', type: 'graphNode', position: {x:50, y: 150}, data : {value: '?', processed:false}},
                {id: '13', type: 'graphNode', position: {x:150, y: 150}, data : {value: '?', processed:false}},
            ],
        edges:
            [
                {id:"0",type: "customEdge", sourceHandle: "s", source: '0', target: "7", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
                {id:"1",type: "customEdge", sourceHandle: "s", source: '7', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:40}},
                {id:"2",type: "customEdge", sourceHandle: "s", source: '2', target: "1", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"3",type: "customEdge", sourceHandle: "s", source: '7', target: "2", targetHandle: "t", style: {stroke:"white"}, data:{weight:7}},
                {id:"4",type: "customEdge", sourceHandle: "s", source: '1', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
                {id:"5",type: "customEdge", sourceHandle: "s", source: '7', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
                {id:"6",type: "customEdge", sourceHandle: "s", source: '7', target: "4", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"7",type: "customEdge", sourceHandle: "s", source: '7', target: "6", targetHandle: "t", style: {stroke:"white"}, data:{weight:15}},
                {id:"8",type: "customEdge", sourceHandle: "s", source: '4', target: "3", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"9",type: "customEdge", sourceHandle: "s", source: '4', target: "5", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
                {id:"10",type: "customEdge", sourceHandle: "s", source: '4', target: "8", targetHandle: "t", style: {stroke:"white"}, data:{weight:10}},
                {id:"11",type: "customEdge", sourceHandle: "s", source: '3', target: "5", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
                {id:"12",type: "customEdge", sourceHandle: "s", source: '0', target: "4", targetHandle: "t", style: {stroke:"white"}, data:{weight:15}},
                {id:"13",type: "customEdge", sourceHandle: "s", source: '0', target: "8", targetHandle: "t", style: {stroke:"white"}, data:{weight:20}},
                {id:"14",type: "customEdge", sourceHandle: "s", source: '0', target: "6", targetHandle: "t", style: {stroke:"white"}, data:{weight:35}},
                {id:"15",type: "customEdge", sourceHandle: "s", source: '0', target: "9", targetHandle: "t", style: {stroke:"white"}, data:{weight:30}},
                {id:"16",type: "customEdge", sourceHandle: "s", source: '0', target: "10", targetHandle: "t", style: {stroke:"white"}, data:{weight:25}},
                {id:"17",type: "customEdge", sourceHandle: "s", source: '9', target: "11", targetHandle: "t", style: {stroke:"white"}, data:{weight:15}},
                {id:"18",type: "customEdge", sourceHandle: "s", source: '6', target: "9", targetHandle: "t", style: {stroke:"white"}, data:{weight:1}},
                {id:"19",type: "customEdge", sourceHandle: "s", source: '9', target: "12", targetHandle: "t", style: {stroke:"white"}, data:{weight:30}},
                {id:"20",type: "customEdge", sourceHandle: "s", source: '10', target: "12", targetHandle: "t", style: {stroke:"white"}, data:{weight:3}},
                {id:"21",type: "customEdge", sourceHandle: "s", source: '10', target: "13", targetHandle: "t", style: {stroke:"white"}, data:{weight:5}},
                {id:"22",type: "customEdge", sourceHandle: "s", source: '11', target: "12", targetHandle: "t", style: {stroke:"white"}, data:{weight:2}},
                {id:"23",type: "customEdge", sourceHandle: "s", source: '12', target: "13", targetHandle: "t", style: {stroke:"white"}, data:{weight:1}},
            ]
    }
]

export default graphs;