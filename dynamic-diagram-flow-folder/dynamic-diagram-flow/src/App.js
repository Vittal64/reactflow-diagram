import {useState , useEffect , useCallback} from 'react';
import metadata from './metadata.json'
import ReactFlow, {ReactFlowProvider}from 'reactflow';
import {Background} from 'reactflow'
import {applyNodeChanges , applyEdgeChanges}  from 'reactflow';
import 'reactflow/dist/style.css'
import Sidebar  from './components/Sidebar';
import {v4 as uuidv4} from 'uuid'
import './App.css'

function App(){
  const [nodes , setNodes] = useState([])
  const [edges , setEdges] = useState([])

  useEffect(async () => {
    setNodes(metadata.nodes)
    setEdges(metadata.edges)
  }, []);

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
  }

  const addEdge = async (source , target) => {
    let newEdge = {
      'id' : 'e' + uuidv4(),
      'source' : source,
      'target' : target,
      "type": "smoothstep"
    }
    let newEdgeArray = [...edges , newEdge]
    setEdges(newEdgeArray)
  }

  const deleteNode = async (id) => {
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
    setEdges((edges) => edges.filter((e) => e.source !== id && e.target !== id));
  }

  const updateNodeLabel = async (id , newLabel) => {
    setNodes((nodes) =>
      nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, label : newLabel } } : n))
    );
  }

  const deleteEdge = async (id) => {
    setEdges((edges) => edges.filter((edge) => (edge.id !== id)))
  }

  return (
    <div className='container'>
    <Sidebar addNode = {addNode} addEdge = {addEdge} deleteNode = {deleteNode} updateNodeLabel = {updateNodeLabel} deleteEdge = {deleteEdge}/>
    <ReactFlowProvider>
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
    </ReactFlowProvider>
    </div>
  )
}

export default App;