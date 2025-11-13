import {useState , useEffect , useCallback} from 'react';
import ReactFlow, {ReactFlowProvider}from 'reactflow';
import {Background} from 'reactflow'
import {applyNodeChanges , applyEdgeChanges}  from 'reactflow';
import 'reactflow/dist/style.css'
import Sidebar  from './components/Sidebar';
import {v4 as uuidv4} from 'uuid'
import './App.css'
import metadata from './metadata.json'

function App(){

  const [nodes, setNodes] = useState(() => {
    const tempNode = localStorage.getItem('Nodes')
    if (tempNode === null){
      return metadata.nodes 
    }
    else{
      return JSON.parse(tempNode)
    }
  });

  const [edges, setEdges] = useState(() => {
    const tempEdge = localStorage.getItem('Edges')
    if (tempEdge === null){
      return metadata.edges
    }
    else{
      return JSON.parse(tempEdge)
    }
  });

  useEffect(() => {
  localStorage.setItem('Nodes', JSON.stringify(nodes))
}, [nodes])

useEffect(() => {
  localStorage.setItem('Edges', JSON.stringify(edges))
}, [edges])


  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const addNode = () => {
    let newNode = {
      'id' : uuidv4(),
      'type' : 'default',
      'position' : {'x' :0 , 'y' : 0},
      "data": { "label": "Intermediate node" }
    }
    let newNodeArray = [...nodes, newNode]
    setNodes(newNodeArray)
    localStorage.setItem('Nodes',JSON.stringify(newNodeArray))
  }

  const addEdge = (source , target) => {
    let newEdge = {
      'id' : 'e' + uuidv4(),
      'source' : source,
      'target' : target,
      "type": "smoothstep"
    }
    let newEdgeArray = [...edges , newEdge]
    setEdges(newEdgeArray)
    localStorage.setItem('Edges', JSON.stringify(newEdgeArray))
  }

  const deleteNode = (id) => {
    let newNodeArray = nodes.filter((node) => node.id !== id)
    setNodes(newNodeArray)
    localStorage.setItem('Nodes',JSON.stringify(newNodeArray))
  }

  const deleteEdge = (id) => {
    let newEdgeArray = edges.filter((edge) => edge.id !== ('e' + id))
    setEdges(newEdgeArray)
    localStorage.setItem('Edges', JSON.stringify(newEdgeArray))
  }

  const updateNodeLabel = (id , newLabel) => {
    let updatedNodeArray = nodes.map((node) => {
      if (node.id === id){
        return {...node, data : {...node.data , label : newLabel}}
      }
      else{
        return node 
      }
    })
    setNodes(updatedNodeArray)
    localStorage.setItem('Nodes',JSON.stringify(updatedNodeArray))
  }

  return (
    <ReactFlowProvider>
    <div className='container'>
    <Sidebar addNode = {addNode} addEdge = {addEdge} deleteNode = {deleteNode} updateNodeLabel = {updateNodeLabel} deleteEdge = {deleteEdge}/>
      <div style={{height : '100vh', width : '100vw'}}>
      <ReactFlow
       nodes = {nodes} 
       edges = {edges} 
       onNodesChange={onNodesChange} 
       onEdgesChange={onEdgesChange} 
       fitView >
      <Background />
      </ReactFlow>
      </div>
    </div>
  </ReactFlowProvider>
  )
}

export default App;
