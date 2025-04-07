import React, { useCallback, useState } from "react";
import {
  ReactFlow, addEdge, Background, Controls, MiniMap,
  applyEdgeChanges, applyNodeChanges,
  Handle,
  Position
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import Header from "./Header";
import SequenceStartNode from "./SequenceStartNode";
import LeadSourceNode from "./LeadSourceNode";
import addNode from "./addNode";
import HtmlNode from "./components/HtmlNode";


const nodeTypes = {
  source: HtmlNode,
  sequenceStart: SequenceStartNode,
  leadSource: LeadSourceNode,
  addNode: addNode,
};

const initialNodes = [
  {
    id: "start-node",
    type: "sequenceStart",
    position: { x: 500, y: 300 },
    data: {},
  },
  {
    id: "lead-source-node",
    type: "leadSource",
    position: { x: 165, y: 50 },
    data: {
      label: "Add Lead Source",
      subLabel: "Click to add leads from list or CRM",
    },
  },
  {
    id: "add-node",
    type: "addNode",
    position: { x: 570, y: 530 },
    data: {},
  }
];

const initialEdges = [
  {
    id: "e1-2",
    source: "",
    target: "lead-source-node",
    type: "default",
  },
  {
    id: "e2-3",
    source: "start-node",
    target: "add-node",
    type: "default"
  }
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleInsertNode = (labelHtml, emailsArray, icon, color) => {
    const newId = `node_${Date.now()}`;
    const sourceNodes = nodes.filter((n) => n.type === "source");
    const lastNode = sourceNodes[sourceNodes.length - 1];
    let lastY = lastNode ? lastNode.position.y - 120 : 0;
    lastY = sourceNodes.length ? 240 : lastY;
    const newY = lastY + 150;
    const newNode = {
      id: newId,
      type: "source",
      position: { x: 470, y: newY },
      data: { labelHtml, emailsArray, icon, color },
    };


    const newEdge = {
      id: `edge_${Date.now()}`,
      source: "start-node",
      target: newId,
      type: "source",
    };

    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, newEdge]);
  };



  const nodesWithInsert = nodes.map((node) => {
    return ["leadSource", "addNode"].includes(node.type)
      ? { ...node, data: { ...node.data, onInsert: handleInsertNode } }
      : node;
  });

  return (
    <div>
      <Header />

      <div style={{ height: "calc(100vh - 85px)", width: "100%" }}>
        <ReactFlow
          nodes={nodesWithInsert}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={{ x: 0, y: 0, zoom: 1.0 }}
        >
          <Controls />
          <Background bgColor="#D3D3D3" />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
