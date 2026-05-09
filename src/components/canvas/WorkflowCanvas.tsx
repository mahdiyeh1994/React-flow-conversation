import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "../../store";
import { ConversationNode } from "../nodes/ConversationNode";
import { ConditionNode } from "../nodes/ConditionNode";
import { AnimatedEdge } from "../edges/AnimatedEdge";
import { Toolbar } from "../toolbar/Toolbar";
import { Sidebar } from "../sidebar/Sidebar";
import { WorkflowNode, WorkflowEdge } from "../../types";

const nodeTypes: NodeTypes = {
  conversation: ConversationNode,
  condition: ConditionNode,
};

const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
};

export const WorkflowCanvas: React.FC = () => {
  const storeNodes = useWorkflowStore((state) => state.nodes);
  const storeEdges = useWorkflowStore((state) => state.edges);
  const addNode = useWorkflowStore((state) => state.addNode);
  const addEdge_ = useWorkflowStore((state) => state.addEdge);
  const setNodes = useWorkflowStore((state) => state.setNodes);
  const setEdges = useWorkflowStore((state) => state.setEdges);
  const evaluateConditions = useWorkflowStore(
    (state) => state.evaluateConditions,
  );

  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges);

  // Sync with Zustand store
  useEffect(() => {
    setNodesState(storeNodes);
  }, [storeNodes, setNodesState]);

  useEffect(() => {
    setEdgesState(storeEdges.map((e) => ({ ...e, type: "animated" })));
  }, [storeEdges, setEdgesState]);

  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      const updatedNodes = changes.reduce(
        (acc: WorkflowNode[], change: any) => {
          const node = nodes.find((n) => n.id === change.id);
          if (node) {
            if (change.position) {
              return [...acc, { ...node, position: change.position }];
            }
            if (change.selected !== undefined) {
              return [...acc, { ...node, selected: change.selected }];
            }
          }
          return acc;
        },
        nodes,
      );

      if (updatedNodes.length > 0) {
        setNodes(updatedNodes.length > 0 ? updatedNodes : nodes);
      }
    },
    [onNodesChange, nodes, setNodes],
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      const updatedEdges = changes.reduce(
        (acc: WorkflowEdge[], change: any) => {
          if (change.type === "remove") {
            return acc.filter((e) => e.id !== change.id);
          }
          if (change.type === "select") {
            return acc.map((e) =>
              e.id === change.id ? { ...e, selected: change.selected } : e,
            );
          }
          return acc;
        },
        edges,
      );

      if (updatedEdges.length !== edges.length) {
        setEdges(updatedEdges);
      }
    },
    [onEdgesChange, edges, setEdges],
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      const newEdge: WorkflowEdge = {
        id: `${connection.source}-${connection.target}-${Date.now()}`,
        source: connection.source || "",
        target: connection.target || "",
        type: "animated",
        animated: true,
        // Add label for condition edges
        label:
          connection.sourceHandle === "true"
            ? "true"
            : connection.sourceHandle === "false"
              ? "false"
              : undefined,
      };

      addEdge_(newEdge);
      setEdgesState((eds) => addEdge(connection, eds) as any);

      // Evaluate conditions after connection
      setTimeout(() => evaluateConditions(), 0);
    },
    [addEdge_, setEdgesState, evaluateConditions],
  );

  const handleAddNode = useCallback(
    (type: string) => {
      addNode(type, {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      });
    },
    [addNode],
  );

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="bg-gradient-to-br from-slate-50 to-slate-100"
        />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === "conversation") return "#3b82f6";
            if (node.type === "condition") return "#8b5cf6";
            return "#cbd5e1";
          }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        />
      </ReactFlow>

      <Toolbar onAddNode={handleAddNode} />
      <Sidebar />
    </div>
  );
};
