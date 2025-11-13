# Dynamic Diagram Flow (React Flow)

Interactive diagram editor built with **React Flow**.  
Supports:

* Load initial graph from `metadata.json`
* Add / delete / edit nodes & edges
* Drag-and-drop, zoom, minimap
* Persists state in `localStorage`
* Fully responsive

## Setup

```bash
npx create-react-app dynamic-diagram-flow
cd dynamic-diagram-flow
npm install reactflow react-modal
# copy the files from the answer into src/
npm start
