import { create } from "zustand";
import { Node, Edge } from "reactflow";
import {
  WorkflowNode,
  WorkflowEdge,
  ConversationNodeData,
  ConditionNodeData,
} from "../types";

interface WorkflowStore {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  sidebarOpen: boolean;
  activeEdges: string[];

  addNode: (type: string, position: { x: number; y: number }) => void;
  removeNode: (nodeId: string) => void;
  updateNodeData: (
    nodeId: string,
    data: Partial<ConversationNodeData | ConditionNodeData>,
  ) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  addEdge: (edge: WorkflowEdge) => void;
  removeEdge: (edgeId: string) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  evaluateConditions: () => void;
  getSelectedNode: () => WorkflowNode | undefined;
  reset: () => void;
}

const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  sidebarOpen: false,
  activeEdges: [],
};

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  ...initialState,

  addNode: (type: string, position: { x: number; y: number }) => {
    const { nodes } = get();
    const id = `${type}-${Date.now()}`;

    const newNode: WorkflowNode = {
      id,
      type,
      position,
      data:
        type === "conversation"
          ? {
              label: "Message",
              message: "Enter your message here",
              text: "",
            }
          : {
              operator: ">",
              compareValue: 10,
              value: undefined,
            },
    };

    set({ nodes: [...nodes, newNode] });
  },

  removeNode: (nodeId: string) => {
    const { nodes, edges } = get();
    set({
      nodes: nodes.filter((n) => n.id !== nodeId),
      edges: edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: null,
      sidebarOpen: false,
    });
  },

  updateNodeData: (
    nodeId: string,
    data: Partial<ConversationNodeData | ConditionNodeData>,
  ) => {
    const { nodes } = get();
    set({
      nodes: nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    });
  },

  setSelectedNode: (nodeId: string | null) => {
    set({
      selectedNodeId: nodeId,
      sidebarOpen: !!nodeId,
    });
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  addEdge: (edge: WorkflowEdge) => {
    const { edges } = get();
    set({ edges: [...edges, edge] });
  },

  removeEdge: (edgeId: string) => {
    const { edges } = get();
    set({ edges: edges.filter((e) => e.id !== edgeId) });
  },

  setEdges: (edges: WorkflowEdge[]) => {
    set({ edges });
  },

  setNodes: (nodes: WorkflowNode[]) => {
    set({ nodes });
  },

  evaluateConditions: () => {
    const { nodes, edges } = get();

    const activeEdgesSet = new Set<string>();

    // Find all condition nodes and evaluate them
    nodes.forEach((node) => {
      if (node.type === "condition") {
        const conditionData = node.data as ConditionNodeData;
        const { operator, compareValue, value } = conditionData;

        // Find incoming edges (connected previous nodes)
        const incomingEdge = edges.find((e) => e.target === node.id);

        if (incomingEdge) {
          const sourceNode = nodes.find((n) => n.id === incomingEdge.source);
          let nodeValue = value;

          if (sourceNode && sourceNode.type === "conversation") {
            const conversationData = sourceNode.data as ConversationNodeData;
            nodeValue = parseInt(conversationData.text) || 0;
          }

          // Evaluate the condition
          let result = false;
          if (nodeValue !== undefined) {
            switch (operator) {
              case ">":
                result = nodeValue > compareValue;
                break;
              case "<":
                result = nodeValue < compareValue;
                break;
              case "==":
                result = nodeValue === compareValue;
                break;
              case "!=":
                result = nodeValue !== compareValue;
                break;
            }
          }

          // Activate appropriate outgoing edges
          edges.forEach((e) => {
            if (e.source === node.id) {
              const isTrue = result && e.label === "true";
              const isFalse = !result && e.label === "false";

              if (isTrue || isFalse) {
                activeEdgesSet.add(e.id);
              }
            }
          });
        }
      }
    });

    set({ activeEdges: Array.from(activeEdgesSet) });
  },

  getSelectedNode: () => {
    const { nodes, selectedNodeId } = get();
    return nodes.find((n) => n.id === selectedNodeId);
  },

  reset: () => {
    set(initialState);
  },
}));
