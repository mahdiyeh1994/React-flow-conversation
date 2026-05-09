# Interactive Workflow Builder

A production-quality, modern workflow builder application built with React, TypeScript, React Flow, Zustand, Tailwind CSS, and Framer Motion. Create visual workflows with custom nodes, conditional logic, and real-time evaluation.

![Workflow Builder](https://img.shields.io/badge/React-18.2-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?logo=typescript) ![React Flow](https://img.shields.io/badge/React%20Flow-11.10-purple) ![Zustand](https://img.shields.io/badge/Zustand-4.4-orange) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-cyan?logo=tailwindcss) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-pink)

## ✨ Features

### Core Functionality

- **Visual Node Editor**: Drag and drop nodes on an infinite canvas with zoom, pan, and minimap
- **Two Node Types**:
  - **Conversation Node**: Chat/message nodes with customizable labels and messages
  - **Condition (IF) Node**: Logic branching with operators (>, <, ==, !=)
- **Custom Edges**: Gradient-styled edges with smooth animations and active state highlighting
- **Condition Evaluation**: Real-time evaluation of conditional logic based on node values
- **Property Editor**: Animated sidebar for editing node properties with live updates
- **Live Preview**: Mobile-style preview of messages and condition logic

### User Experience

- **Smooth Animations**: Framer Motion-powered transitions and interactions
- **Real-time Synchronization**: All changes instantly reflect across the canvas and preview
- **Modern UI**: Premium design inspired by Linear, Vercel, and Notion
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Keyboard navigation and ARIA labels

### Architecture

- **Zustand Store**: Centralized state management with simple, clean actions
- **TypeScript**: Full type safety with custom types for nodes, edges, and data
- **Modular Components**: Reusable, well-organized component structure
- **Custom Hooks**: Helper hooks for common operations
- **Scalable Design**: Easy to extend with new node types or features

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will open at `http://localhost:5173` (or the next available port).

## 📚 Architecture

### Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   └── WorkflowCanvas.tsx          # Main canvas with React Flow
│   ├── nodes/
│   │   ├── ConversationNode.tsx        # Message node component
│   │   └── ConditionNode.tsx           # Logic/IF node component
│   ├── edges/
│   │   └── AnimatedEdge.tsx            # Custom animated edges
│   ├── sidebar/
│   │   ├── Sidebar.tsx                 # Property editor container
│   │   ├── FormEditor.tsx              # Form controls for node properties
│   │   └── LivePreview.tsx             # Message and logic preview
│   └── toolbar/
│       └── Toolbar.tsx                 # Node creation and canvas controls
├── store/
│   └── index.ts                        # Zustand workflow store
├── types/
│   └── index.ts                        # TypeScript interfaces
├── App.tsx                             # Root component
├── main.tsx                            # Entry point
└── index.css                           # Global styles
```

### Data Flow

```
User Interaction
       ↓
React Flow Events (onConnect, onNodesChange, etc.)
       ↓
Store Actions (addNode, updateNodeData, etc.)
       ↓
Zustand Store Updates
       ↓
Components Re-render
       ↓
UI Updates + Evaluations
```

## 🎨 Design System

### Colors

- **Primary**: Blue (#3b82f6) - Actions, highlighting
- **Secondary**: Purple (#8b5cf6) - Condition nodes
- **Success**: Emerald (#10b981) - True paths
- **Danger**: Red (#ef4444) - False paths
- **Neutral**: Slate shades - Text, borders, backgrounds

### Typography

- **Fonts**: System font stack (sans-serif)
- **Sizes**:
  - Headers: 2xl (28px), lg (18px)
  - Body: sm (14px), xs (12px)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing

- **Base unit**: 4px
- **Padding**: 2, 3, 4, 6 units
- **Gap**: 2, 3, 4, 6 units
- **Margin**: Consistent with padding

### Shadows

- **soft**: Light shadow for cards (0 2px 8px)
- **medium**: Medium shadow for hover states
- **glow**: Blue glow for active elements
- **glow-active**: Intense glow for selected items

## 🔄 Zustand Store API

### Store State

```typescript
interface WorkflowStore {
  nodes: WorkflowNode[] // All nodes in canvas
  edges: WorkflowEdge[] // All connections
  selectedNodeId: string | null // Currently selected node
  sidebarOpen: boolean // Sidebar visibility
  activeEdges: string[] // Edges with active condition paths
}
```

### Available Actions

#### Node Management

```typescript
// Add a new node (conversation or condition)
addNode(type: 'conversation' | 'condition', position: { x, y })

// Remove a node and connected edges
removeNode(nodeId: string)

// Update node data properties
updateNodeData(nodeId, data)

// Set which node is selected
setSelectedNode(nodeId: string | null)

// Get the currently selected node
getSelectedNode(): WorkflowNode | undefined

// Replace all nodes
setNodes(nodes)
```

#### Edge Management

```typescript
// Add an edge
addEdge(edge: WorkflowEdge)

// Remove an edge
removeEdge(edgeId: string)

// Replace all edges
setEdges(edges)
```

#### UI Control

```typescript
// Show/hide sidebar
setSidebarOpen(open: boolean)

// Reset entire workflow
reset()
```

#### Logic Evaluation

```typescript
// Evaluate all conditions and update active edges
evaluateConditions()
```

### Example Usage

```typescript
import { useWorkflowStore } from '@/store'

function MyComponent() {
  const addNode = useWorkflowStore(state => state.addNode)
  const selectedNode = useWorkflowStore(state => state.getSelectedNode())

  const handleAddMessage = () => {
    addNode('conversation', { x: 100, y: 100 })
  }

  return (
    <div>
      <button onClick={handleAddMessage}>Add Message</button>
      {selectedNode && <p>Selected: {selectedNode.id}</p>}
    </div>
  )
}
```

## 🧠 Condition Evaluation Logic

### How It Works

1. **User enters a value** in a Conversation Node's "Value" field
2. **User connects** a Conversation Node to a Condition Node
3. **Condition Node reads** the previous node's value
4. **Comparison is evaluated** using the selected operator
5. **Active edges update** - True path glows if condition is true, False path if false

### Example Scenario

```
Conversation Node (ID: conv-1)
  label: "What's your age?"
  message: "Please enter your age"
  text: "25"              ← User enters 25
         ↓ (connected to)
Condition Node (ID: cond-1)
  operator: ">"
  compareValue: 18

Evaluation:
  25 > 18 = TRUE ✓
  → True edge activates (glows blue)
  → Continues to next node on true path
  → False edge dims
```

### Supported Operators

| Operator     | Symbol | Example    | Result |
| ------------ | ------ | ---------- | ------ |
| Greater Than | `>`    | `25 > 18`  | true   |
| Less Than    | `<`    | `10 < 18`  | true   |
| Equal To     | `==`   | `20 == 20` | true   |
| Not Equal    | `!=`   | `15 != 10` | true   |

## 🎬 Animations & Interactions

### Framer Motion Effects

#### Node Animations

- **Initial Mount**: Scale from 0.8 to 1 with fade-in
- **Hover**: Scale up to 1.05 with shadow increase
- **Selection**: Glow effect with border color change
- **Drag**: Smooth position transitions

#### Edge Animations

- **Active Path**: Continuous glow effect (opacity pulse)
- **Creation**: Path length animation from 0 to 1
- **Color Transitions**: Smooth color changes on state updates

#### Sidebar Animations

- **Slide In**: 400px to 0 from right (spring damping)
- **Content**: Staggered fade-in with y-offset
- **Close**: Reverse animation with backdrop fade

### Tailwind Custom Animations

```css
/* Pulse glow effect for active elements */
animate-pulse-glow

/* Float animation for attention */
animate-float

/* Shimmer loading effect */
animate-shimmer
```

## 🎨 Component Gallery

### Conversation Node

- Rounded card with message bubble aesthetics
- Displays label, message preview, and value
- Input and output handles for connections
- Hover/selected state with smooth transitions

### Condition Node

- Premium diamond-like shape appearance
- Shows operator and comparison value
- Two output handles labeled "true" and "false"
- Gradient background with backdrop blur
- Active state with intense glow

### Animated Edges

- Smooth Bezier curves between nodes
- Gradient strokes matching node types
- Dashed style for logic edges
- Labels for condition branches (true/false)
- Active state with blue glow and animated path

### Sidebar Panel

- Slides in from right with spring animation
- Header with node type and ID
- Form fields for property editing
- Live preview section with mobile-style UI
- Smooth backdrop blur

### Toolbar

- Floating panel on top-left
- Large, friendly buttons with icons
- Colored buttons for different actions
- Helpful tip box with quick start guide
- Delete and reset functionality

## 🛠️ Extending the Application

### Adding a New Node Type

1. **Create node component** in `src/components/nodes/`:

```typescript
// src/components/nodes/CustomNode.tsx
import { Handle, Position, NodeProps } from 'reactflow'
import { useWorkflowStore } from '@/store'

interface CustomNodeData {
  customProp: string
}

export const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ id, data, selected }) => {
  const setSelectedNode = useWorkflowStore(state => state.setSelectedNode)

  return (
    <div onClick={() => setSelectedNode(id)}>
      <p>{data.customProp}</p>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
```

2. **Register in WorkflowCanvas**:

```typescript
const nodeTypes: NodeTypes = {
  conversation: ConversationNode,
  condition: ConditionNode,
  custom: CustomNode, // Add this
}
```

3. **Update types** in `src/types/index.ts`:

```typescript
export interface CustomNode extends Node<CustomNodeData> {
  type: 'custom'
}

export type WorkflowNode = ConversationNode | ConditionNode | CustomNode
```

4. **Add node creation** in Toolbar:

```typescript
<button onClick={() => onAddNode('custom')}>Add Custom</button>
```

### Implementing Custom Logic

Extend the condition evaluation in `src/store/index.ts`:

```typescript
evaluateConditions: () => {
  // Your custom logic here
  // Update activeEdges based on node states
}
```

## 📱 Responsive Design

The application is optimized for:

- **Desktop**: Full-featured interface with sidebar
- **Tablet**: Touch-friendly controls, optimized spacing
- **Mobile**: Simplified layout, collapsible panels

## 🎯 Best Practices

### Performance

- Use React Flow's built-in node and edge memoization
- Keep Zustand actions focused and atomic
- Throttle resize/scroll events if needed
- Lazy load heavy components with React.lazy()

### Code Quality

- Follow TypeScript strict mode
- Use custom hooks for repeated logic
- Keep components focused on single responsibility
- Document complex algorithms

### User Experience

- Provide clear feedback on actions
- Use animations purposefully, not excessively
- Include helpful tooltips and guides
- Test on various devices and browsers

## 🚀 Production Deployment

### Build Process

```bash
npm run build
```

Generates optimized production build in `dist/` directory.

### Optimization Tips

- Enable gzip compression on server
- Use CDN for static assets
- Implement lazy loading for heavy components
- Monitor Core Web Vitals

### Environment Variables

Create `.env` file if needed:

```
VITE_API_URL=https://api.example.com
```

## 📚 Dependencies

| Package       | Version | Purpose          |
| ------------- | ------- | ---------------- |
| react         | 18.2.0  | UI framework     |
| react-dom     | 18.2.0  | DOM rendering    |
| reactflow     | 11.10.0 | Flow canvas      |
| zustand       | 4.4.0   | State management |
| framer-motion | 10.16.0 | Animations       |
| lucide-react  | 0.303.0 | Icons            |
| tailwindcss   | 3.3.0   | Styling          |

## 🧪 Testing

Add testing with Vitest and React Testing Library:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import { WorkflowCanvas } from '@/components/canvas/WorkflowCanvas'

describe('WorkflowCanvas', () => {
  it('renders toolbar', () => {
    render(<WorkflowCanvas />)
    expect(screen.getByText('Workflow Builder')).toBeInTheDocument()
  })
})
```

## 📖 Documentation

Comprehensive documentation with examples available in the code comments.

- **Types**: See `src/types/index.ts` for all TypeScript interfaces
- **Store**: See `src/store/index.ts` for state management API
- **Components**: Each component includes JSDoc comments

## 🐛 Troubleshooting

### Nodes not appearing

- Ensure you're calling `addNode` with correct position
- Check browser console for errors
- Verify `nodeTypes` includes the node type

### Edges not connecting

- Make sure nodes have handles defined
- Check that source and target node IDs are correct
- Verify edge type is registered in `edgeTypes`

### State not syncing

- Check Zustand store actions are being called
- Verify useWorkflowStore hooks are in correct components
- Look for React StrictMode double-renders in development

### Animations lagging

- Reduce number of nodes/edges
- Enable hardware acceleration in CSS
- Check for expensive re-renders

## 📄 License

MIT License - Feel free to use in personal and commercial projects

## 🤝 Contributing

Contributions welcome! Please feel free to submit PRs or open issues.

## 🎓 Learning Resources

- [React Flow Documentation](https://reactflow.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

## 🌟 Future Enhancements

- [ ] Export/import workflows as JSON
- [ ] Undo/redo functionality
- [ ] Multiple outputs from Conversation nodes
- [ ] Advanced conditions (AND, OR operators)
- [ ] Variable system across nodes
- [ ] Workflow simulation/testing mode
- [ ] Collaborative editing
- [ ] Custom node templates
- [ ] Analytics and usage tracking

---

**Built with ❤️ using React, React Flow, Zustand, and Framer Motion**
