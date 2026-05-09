import { Node, Edge } from "reactflow";

export type ConversationNodeData = {
  label: string;
  message: string;
  text: string;
};

export type ConditionNodeData = {
  operator: ">" | "<" | "==" | "!=";
  compareValue: number;
  value?: number;
};

export type NodeData = ConversationNodeData | ConditionNodeData;

export interface ConversationNode extends Node<ConversationNodeData> {
  type: "conversation";
}

export interface ConditionNode extends Node<ConditionNodeData> {
  type: "condition";
}

export type WorkflowNode = ConversationNode | ConditionNode | Node;

export interface WorkflowEdge extends Edge {
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
}

export interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  sidebarOpen: boolean;
  activeEdges: string[];
}

export interface EvaluationContext {
  nodeId: string;
  previousValue?: number | string | boolean;
}
