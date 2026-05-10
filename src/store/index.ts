import { create } from 'zustand'
import { WorkflowNode, WorkflowEdge, ConversationNodeData, ConditionNodeData } from '../types'

interface WorkflowStore {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNodeId: string | null
  sidebarOpen: boolean
  activeEdges: string[]

  addNode: (type: string, position: { x: number; y: number }) => void
  removeNode: (nodeId: string) => void
  updateNodeData: (nodeId: string, data: Partial<ConversationNodeData | ConditionNodeData>) => void

  // Independent selection actions
  selectNode: (nodeId: string) => void
  deselectNode: () => void

  // Independent sidebar actions
  openSidebar: () => void
  closeSidebar: () => void

  // Legacy function for compatibility
  setSelectedNode: (nodeId: string | null) => void
  setSidebarOpen: (open: boolean) => void

  addEdge: (edge: WorkflowEdge) => void
  removeEdge: (edgeId: string) => void
  setEdges: (edges: WorkflowEdge[]) => void
  setNodes: (nodes: WorkflowNode[]) => void
  evaluateConditions: () => void
  getSelectedNode: () => WorkflowNode | undefined
  reset: () => void
}

const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  sidebarOpen: false,
  activeEdges: [],
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  ...initialState,

  addNode: (type: string, position: { x: number; y: number }) => {
    const { nodes } = get()
    const id = `${type}-${Date.now()}`

    const newNode: WorkflowNode = {
      id,
      type,
      position,
      data:
        type === 'conversation'
          ? {
              label: 'Message',
              message: 'Enter your message here',
              text: '',
            }
          : {
              operator: '>',
              compareValue: 10,
              value: undefined,
            },
    }

    set({ nodes: [...nodes, newNode] })
  },

  removeNode: (nodeId: string) => {
    const { nodes, edges, selectedNodeId } = get()
    // If the deleted node was selected, clear selection and close sidebar
    const isDeletedNodeSelected = selectedNodeId === nodeId
    set({
      nodes: nodes.filter((n) => n.id !== nodeId),
      edges: edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: isDeletedNodeSelected ? null : selectedNodeId,
      sidebarOpen: false,
    })
  },

  updateNodeData: (nodeId: string, data: Partial<ConversationNodeData | ConditionNodeData>) => {
    const { nodes } = get()
    set({
      nodes: nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n)),
    })
    // Auto-evaluate conditions after any node data change
    setTimeout(() => get().evaluateConditions(), 0)
  },

  // Select a node and open the sidebar
  selectNode: (nodeId: string) => {
    set({
      selectedNodeId: nodeId,
      sidebarOpen: true,
    })
  },

  // Deselect the current node and close sidebar
  deselectNode: () => {
    set({
      selectedNodeId: null,
      sidebarOpen: false,
    })
  },

  // Open sidebar independently of selection
  openSidebar: () => {
    set({ sidebarOpen: true })
  },

  // Close sidebar independently of selection
  closeSidebar: () => {
    set({ sidebarOpen: false })
  },

  // Legacy function - now only changes selectedNodeId, doesn't affect sidebar
  setSelectedNode: (nodeId: string | null) => {
    set({ selectedNodeId: nodeId })
  },

  // Legacy function - directly controls sidebar visibility
  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open })
  },

  addEdge: (edge: WorkflowEdge) => {
    const { edges } = get()
    set({ edges: [...edges, edge] })
  },

  removeEdge: (edgeId: string) => {
    const { edges } = get()
    set({ edges: edges.filter((e) => e.id !== edgeId) })
  },

  setEdges: (edges: WorkflowEdge[]) => {
    set({ edges })
  },

  setNodes: (nodes: WorkflowNode[]) => {
    set({ nodes })
  },

  evaluateConditions: () => {
    const { nodes, edges } = get()

    const activeEdgesSet = new Set<string>()

    // Find all condition nodes and evaluate them
    nodes.forEach((node) => {
      if (node.type === 'condition') {
        const conditionData = node.data as ConditionNodeData
        const { operator, compareValue, value } = conditionData

        // Find incoming edges (connected previous nodes)
        const incomingEdge = edges.find((e) => e.target === node.id)

        if (incomingEdge) {
          const sourceNode = nodes.find((n) => n.id === incomingEdge.source)
          let nodeValue = value

          if (sourceNode?.type === 'conversation') {
            const conversationData = sourceNode.data as ConversationNodeData
            nodeValue = Number.parseInt(conversationData.text) || 0
          }

          // Evaluate the condition
          let result = false
          if (nodeValue !== undefined) {
            switch (operator) {
              case '>':
                result = nodeValue > compareValue
                break
              case '<':
                result = nodeValue < compareValue
                break
              case '==':
                result = nodeValue === compareValue
                break
              case '!=':
                result = nodeValue !== compareValue
                break
            }
          }

          // Activate appropriate outgoing edges based on condition result
          edges.forEach((e) => {
            if (e.source === node.id) {
              // Use sourceHandle to identify true/false branches
              const isTruePath = e.sourceHandle === 'true' && result === true
              const isFalsePath = e.sourceHandle === 'false' && result === false

              if (isTruePath || isFalsePath) {
                activeEdgesSet.add(e.id)
              }
            }
          })
        }
      }
    })

    set({ activeEdges: Array.from(activeEdgesSet) })
  },

  getSelectedNode: () => {
    const { nodes, selectedNodeId } = get()
    return nodes.find((n) => n.id === selectedNodeId)
  },

  reset: () => {
    set(initialState)
  },
}))
