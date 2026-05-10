# Architecture & Design Decisions

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   USER INTERFACE LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  WorkflowCanvas (React Flow)                                │
│  ├─ Nodes: ConversationNode, ConditionNode                  │
│  ├─ Edges: AnimatedEdge                                     │
│  ├─ Sidebar: FormEditor, LivePreview                        │
│  └─ Toolbar: Controls, Actions                              │
├─────────────────────────────────────────────────────────────┤
│                STATE MANAGEMENT LAYER                        │
│  Zustand Store                                              │
│  ├─ State: nodes, edges, selectedNodeId, activeEdges       │
│  ├─ Actions: addNode, updateNodeData, evaluateConditions   │
│  └─ Selectors: getSelectedNode                             │
├─────────────────────────────────────────────────────────────┤
│               UTILITY & HELPER LAYERS                        │
│  Types: TypeScript interfaces for type safety              │
│  Utils: Condition evaluation, edge generation              │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Core Design Principles

### 1. Single Source of Truth (Zustand)

- All state lives in one store
- Components read from store, trigger actions
- No prop drilling through multiple levels
- Easy to debug and track changes

### 2. Separation of Concerns

- **Canvas**: Handles React Flow integration
- **Nodes**: Individual node rendering
- **Sidebar**: Property editing
- **Store**: Business logic and state
- **Types**: Type definitions

### 3. Reactive Updates

- User action → Store update → Component re-render
- Automatic synchronization across components
- Real-time condition evaluation
- Live preview updates

### 4. Type Safety

- Full TypeScript strict mode
- Custom types for all data structures
- Compile-time error detection
- Better IDE autocomplete and hints

### 5. Scalability

- Easy to add new node types
- Modular component structure
- Store actions can be extended
- No tight coupling between components

---

## 📊 State Management Flow

```
Initial State:
{
  nodes: [],
  edges: [],
  selectedNodeId: null,
  sidebarOpen: false,
  activeEdges: []
}
       │
       ▼
User clicks "Add Message"
       │
       ▼
addNode('conversation', {x: 100, y: 100})
       │
       ▼
Store creates node object with ID
       │
       ▼
State updated: nodes = [...nodes, newNode]
       │
       ▼
All components subscribed to store update
       │
       ▼
WorkflowCanvas re-renders
Toolbar updates delete button state
Sidebar updates if node was selected
       │
       ▼
ReactFlow reflects new node visually
       │
       ▼
AnimatedEdge evaluates active state
       │
       ▼
Framer Motion animates entrance
       │
       ▼
Complete! Node visible and interactive
```

### State Independence Architecture

**Key Design**: `selectedNodeId` and `sidebarOpen` are **decoupled**:

```typescript
// These states are independent:
selectedNodeId: string | null // Node selection state
sidebarOpen: boolean // UI visibility state

// Recommended composite actions:
selectNode(id) // Sets both: selectedNodeId=id, sidebarOpen=true
deselectNode() // Clears both: selectedNodeId=null, sidebarOpen=false

// Independent sidebar actions:
closeSidebar() // Only: sidebarOpen=false (selection persists)
openSidebar() // Only: sidebarOpen=true (selection unchanged)
```

**Behavior Example**:

```
1. User clicks node
   → selectNode(id) → selectedNodeId=id, sidebarOpen=true

2. User closes sidebar by clicking "Done"
   → closeSidebar() → sidebarOpen=false, selectedNodeId unchanged
   → Node remains highlighted, can delete it

3. User clicks empty canvas
   → deselectNode() → selectedNodeId=null, sidebarOpen=false
```

---

## 🔄 Condition Evaluation System

### Algorithm

```
evaluateConditions() {
  1. Find all condition nodes
  2. For each condition node:
     a. Find incoming edge (previous node)
     b. Get source node data
     c. Extract numeric value from source
     d. Compare: value [operator] compareValue
     e. Store result (true/false)
  3. For each edge from condition:
     a. If result is true AND edge.sourceHandle === 'true':
        → Mark edge as active
     b. If result is false AND edge.sourceHandle === 'false':
        → Mark edge as active
  4. Update store.activeEdges
  5. UI components render with glow effect
}
```

### How It Works

The key to identifying true/false branches is the **sourceHandle** property:

- When user connects a Condition Node's "TRUE" handle (bottom) to another node, React Flow automatically sets `edge.sourceHandle = 'true'`
- When user connects a Condition Node's "FALSE" handle (right) to another node, React Flow automatically sets `edge.sourceHandle = 'false'`
- The `evaluateConditions()` function uses this sourceHandle to determine which edge should be active based on the condition result

### Example Evaluation

```
Input:
- Conversation Node: value = "25"
- Condition Node: operator = ">", compareValue = 18
- Edges:
  - Edge to node A: sourceHandle = 'true'
  - Edge to node B: sourceHandle = 'false'

Process:
1. Read value: 25
2. Evaluate: 25 > 18
3. Result: TRUE
4. For each edge from Condition Node:
   - Edge A: sourceHandle === 'true' && result === true → ACTIVATE
   - Edge B: sourceHandle === 'false' && result === false → SKIP

Visual Feedback:
- True edge (A): GREEN glow, pulsing animation
- False edge (B): RED, dimmed appearance
```

---

## 🎨 Animation Architecture

### Framer Motion Usage

**Node Mount Animation**

```typescript
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}      // Starting state
  animate={{ scale: 1, opacity: 1 }}        // Animated to
  transition={{ duration: 0.2 }}             // How fast
/>
```

**Edge Active State**

```typescript
<motion.path
  animate={{
    opacity: isActive ? 1 : 0.6,
    strokeWidth: isActive ? 2.5 : 2,
  }}
  transition={{ duration: 0.3 }}
/>
```

**Sidebar Slide**

```typescript
<motion.div
  initial={{ x: 400, opacity: 0 }}          // Off-screen right
  animate={{ x: 0, opacity: 1 }}            // On-screen
  exit={{ x: 400, opacity: 0 }}             // Off-screen on close
  transition={{ type: 'spring', damping: 25 }}
/>
```

### Custom Tailwind Animations

```css
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shimmer {
  0% {
    backgroundposition: -1000px 0;
  }
  100% {
    backgroundposition: 1000px 0;
  }
}
```

---

## 🔌 Component Communication

```
WorkflowCanvas (Parent)
├── Listens: onNodesChange, onEdgesChange, onConnect, onPaneClick
├── Calls Store: selectNode, deselectNode, setNodes, setEdges, addEdge, evaluateConditions
│
├─ ConversationNode (Child)
│  └── Calls: selectNode(id) when clicked
│  └── Reads: selectedNodeId to show highlight/glow
│
├─ ConditionNode (Child)
│  └── Calls: selectNode(id) when clicked
│  └── Reads: selectedNodeId to show highlight/glow
│  └── Reads: activeEdges to show active paths
│
├─ AnimatedEdge (Child)
│  └── Reads: activeEdges to animate stroke
│  └── Renders: Color based on label (true=green, false=red)
│  └── Shows glow when edge is active
│
├─ Toolbar (Sibling)
│  └── Calls: addNode, removeNode, reset
│  └── Reads: selectedNodeId for delete button enabled state
│
└─ Sidebar (Sibling)
   ├─ Reads: selectedNodeId, sidebarOpen
   ├─ Calls: closeSidebar() on "Done" click
   │
   ├─ FormEditor (Child)
   │  └── Calls: updateNodeData, evaluateConditions
   │  └── Reads: selectedNode for form state
   │
   └─ LivePreview (Child)
      └── Reads: selectedNode data for preview rendering
```

**Selection Flow**:

1. User clicks node on canvas
2. React Flow's `onNodesChange` fires with `selected: true`
3. `handleNodesChange` calls `selectNode(id)`
4. Store sets: `selectedNodeId=id, sidebarOpen=true`
5. Components re-subscribe and re-render

**Deselection Flow**:

1. User clicks empty canvas
2. React Flow's `onPaneClick` fires
3. `handlePaneClick` calls `deselectNode()`
4. Store sets: `selectedNodeId=null, sidebarOpen=false`
5. Components update UI (node glow disappears, sidebar closes)

---

## 💾 Data Structure Design

### Node Structure

```typescript
{
  id: string,                          // Unique identifier
  type: 'conversation' | 'condition',  // Node type
  position: { x: number, y: number },  // Canvas position
  data: ConversationNodeData | ConditionNodeData
}
```

### Conversation Node Data

```typescript
{
  label: string,    // Display name
  message: string,  // Message content
  text: string      // Numeric/text value
}
```

### Condition Node Data

```typescript
{
  operator: '>' | '<' | '==' | '!=',  // Comparison operator
  compareValue: number,                // Value to compare against
  value?: number                       // Optional runtime value
}
```

### Edge Structure

```typescript
{
  id: string,              // Unique identifier
  source: string,          // Source node ID
  target: string,          // Target node ID
  sourceHandle?: string,   // Source handle ID ('true' or 'false' for conditions)
  targetHandle?: string,   // Target handle ID
  type: 'animated',        // Edge type (custom)
  animated?: boolean,      // Should animate
}
```

---

## 🎯 Key Implementation Details

### Why Zustand Over Redux?

1. **Simpler**: Less boilerplate, easier to understand
2. **Lighter**: Smaller bundle size
3. **Type-Safe**: Works great with TypeScript
4. **Direct Access**: No selectors needed (though supported)
5. **Flexible**: Not opinionated about structure

### Why React Flow Over Custom Canvas?

1. **Battle-tested**: Used in production apps
2. **Features**: Handles pan, zoom, minimap, controls
3. **Performance**: Optimized rendering
4. **Accessibility**: Built-in keyboard support
5. **Extensibility**: Custom nodes and edges

### Why Framer Motion Over CSS?

1. **Complex Animations**: Spring physics, stagger effects
2. **Coordinated Timing**: Multiple animations together
3. **Gesture Support**: Potential for drag/swipe
4. **Performance**: GPU-accelerated when possible
5. **Developer Experience**: Clean API

### Why Tailwind Over Other CSS Solutions?

1. **Utility-First**: Fast development, consistent styling
2. **Customizable**: Easy theme modifications
3. **Performance**: Only includes used classes
4. **Mobile-First**: Built-in responsive design
5. **Documentation**: Excellent docs and community

---

## 🔐 Type Safety Strategy

### Custom Types Instead of `any`

```typescript
// ✅ Good
interface ConversationNodeData {
  label: string
  message: string
  text: string
}

const data: ConversationNodeData = { ... }

// ❌ Avoid
const data: any = { ... }
```

### Union Types for Flexibility

```typescript
// ✅ Allows both types, type-safe
type NodeData = ConversationNodeData | ConditionNodeData

// Narrowing
if (node.type === 'conversation') {
  const data: ConversationNodeData = node.data
}
```

### Readonly Where Appropriate

```typescript
interface State {
  readonly nodes: WorkflowNode[]  // Prevents direct mutation
}

// Must use actions to update
store.addNode(...)
```

---

## 🚀 Performance Considerations

### Optimization Techniques

1. **React Flow Memoization**
   - Nodes are memoized by default
   - Edges re-render only on change
   - Prevents unnecessary DOM updates

2. **Store Selectors**

   ```typescript
   const selectedNode = useWorkflowStore((state) => state.getSelectedNode())
   // Only re-renders when selectedNode changes
   ```

3. **useCallback Hooks**

   ```typescript
   const handleConnect = useCallback((connection) => {
     // Function instance never changes unless dependencies change
   }, [])
   ```

4. **Conditional Rendering**
   ```typescript
   {sidebarOpen && selectedNode && <Sidebar />}
   // Sidebar not in DOM if not needed
   ```

### Scaling to Large Workflows

- Current: Handles 50-100 nodes comfortably
- With optimization: Could handle 200+ nodes
- Strategies:
  - Virtualized canvas for many nodes
  - Lazy load node content
  - Worker thread for condition evaluation
  - Canvas region limiting

---

## 🔄 Extension Points

### Adding New Node Type

```
1. Create component: src/components/nodes/CustomNode.tsx
2. Update types: Add CustomNode interface
3. Register: Add to nodeTypes in WorkflowCanvas
4. Toolbar: Add button to create new type
5. Store: Handle custom data in actions
```

### Custom Edge Type

```
1. Create component: src/components/edges/CustomEdge.tsx
2. Register: Add to edgeTypes in WorkflowCanvas
3. Store: Update edge creation logic
4. Styling: Add custom colors/animations
```

### New Evaluation Logic

```
1. Update evaluateConditions in store
2. Add new operator support
3. Update UI to show new operators
4. Test with various values
```

---

## 📈 Metrics & Monitoring

### Key Metrics to Track

- Workflow complexity (node count)
- Average evaluation time
- Animation frame rate (FPS)
- Store update frequency
- Component render count

### Development Tools

- React DevTools: Component tree, props, state
- Redux DevTools: (Can be used with Zustand)
- Framer Motion debugger
- Chrome DevTools Performance tab

---

## 🔒 Security Considerations

### Current Implementation

- No external API calls (self-contained)
- TypeScript type checking
- No code execution (evaluation is mathematical)
- No file system access

### Future Security Needs

- Input validation on node data
- Sanitize if exporting/importing JSON
- Rate limiting if adding backend
- Authentication if sharing workflows

---

## 📝 Code Quality Standards

### TypeScript Strict Mode ✅

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

### Component Guidelines

- Single responsibility
- Props interface defined
- Proper TypeScript types
- Error boundaries (future)
- Memoization where needed

### Naming Conventions

- Components: PascalCase (ConversationNode)
- Functions: camelCase (handleAddNode)
- Constants: UPPER_SNAKE_CASE (MAX_NODES)
- Files: Match component name (ConversationNode.tsx)

---

## 🎓 Learning Path

### Beginner

1. Understand node types
2. Learn basic connections
3. Try condition evaluation
4. Explore sidebar editing

### Intermediate

1. Read store code
2. Understand animation flow
3. Customize node appearance
4. Add custom node type

### Advanced

1. Extend condition logic
2. Implement undo/redo
3. Add persistence
4. Build collaborative features

---

## 🎯 Future Roadmap

### Phase 1: Core Enhancements

- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts
- [ ] Multi-select nodes
- [ ] Node groups

### Phase 2: Persistence

- [ ] Save workflows (JSON export)
- [ ] Load workflows (JSON import)
- [ ] Local storage backup
- [ ] Cloud sync

### Phase 3: Advanced Features

- [ ] Variable system
- [ ] Function nodes
- [ ] Advanced operators (AND, OR)
- [ ] Workflow simulation

### Phase 4: Collaboration

- [ ] Real-time sync (WebSocket)
- [ ] Multi-user editing
- [ ] Comments/annotations
- [ ] Version history

---

**This architecture is designed to be maintainable, scalable, and a joy to work with! 🎨**
