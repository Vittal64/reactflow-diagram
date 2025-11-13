import {useState} from 'react'

const Sidebar = (props) => {
    const [id , changeId] = useState('')
    const [label , changeLabel] = useState('')
    const [source , changeSource] = useState('')
    const [target , changeTarget] = useState('')

    const {addNode , addEdge , deleteNode , deleteEdge , updateNodeLabel} = props 

    const onChangeId = (event) => {
            changeId(event.target.value)
        }

    const onChangeLabel = (event) => {
            changeLabel(event.target.value)
        }
        
    const onChangeSource = (event) => {
            changeSource(event.target.value)
        }

    const onChangeTarget = (event) => {
            changeTarget(event.target.value)
        }

    const addNodeButton = () => {
        addNode()
    }

    const addEdgeButton = (source , target) => {
        addEdge(source , target)
    }

    const deleteNodeButton = (id) => {
        deleteNode(id)
    }

    const updateNodeLabelButton = (id , label) => {
        updateNodeLabel(id , label)
    }

    const deleteEdgeButton = (id) => {
        deleteEdge(id)
    }
    
    return (
        <div className='sidebar'>
            <label for = 'id'>ID</label>
            <input type = 'text' placeholder="Please enter the id" id="id" value = {id} onChange = {onChangeId}/>
            <label for = 'label'>Lable</label>
            <input type = 'text' placeholder="please enter the Lable" id = 'label' value = {label} onChange={onChangeLabel}/>
            <label for = 'source'>Source</label>
            <input type = 'text' placeholder="please enter source" id="source" value = {source} onChange = {onChangeSource}/>
            <label for = 'target'>Target</label>
            <input type = 'text' placeholder="please enter target" id = 'target' target = {target} onChange = {onChangeTarget}/>
            <button type = 'button' onClick = {addNodeButton}>Add Node</button>
            <button type = 'button' onClick = {addEdgeButton}>Add Edge</button>
            <button type = 'button' onClick = {deleteNodeButton}>Delete Node</button>
            <button type = 'button' onClick = {updateNodeLabelButton}>Update Node</button>
            <button type = 'button' onClick = {deleteEdgeButton}>Delete Edge</button>
        </div>

    )

    
}

export default Sidebar