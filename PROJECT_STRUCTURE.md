# Project File Structure & Documentation

## 📋 Complete File Listing

### Configuration Files

```
├── package.json              - Dependencies and scripts
├── tsconfig.json            - TypeScript configuration
├── tsconfig.node.json       - TypeScript config for Vite
├── vite.config.ts           - Vite build configuration
├── tailwind.config.js       - Tailwind CSS theme configuration
├── postcss.config.js        - PostCSS plugins (Tailwind, Autoprefixer)
├── .eslintrc.cjs            - ESLint rules and configuration
├── .prettierrc               - Code formatting configuration
├── .gitignore               - Git ignore rules
└── index.html               - HTML entry point
```

### Source Files

#### Root Level

```
src/
├── main.tsx                 - React app entry point
├── App.tsx                  - Root component wrapper
├── index.css                - Global styles (Tailwind directives)
└── vite-env.d.ts           - Vite environment variable types
```

#### Components (`src/components/`)

**Canvas Component**

```
canvas/
└── WorkflowCanvas.tsx
    - Main React Flow canvas
    - Handles node/edge state management
    - Connects React Flow to Zustand store
    - Implements zoom, pan, minimap, controls
```

**Node Components** (`nodes/`)

```
nodes/
├── ConversationNode.tsx
│   - Message/chat node
│   - Displays label, message, value
│   - Input/output handles
│   - Selection & hover animations
│
└── ConditionNode.tsx
    - Logic/IF node
    - Shows operator and comparison value
    - True/False output handles
    - Premium gradient styling
```

**Edge Components** (`edges/`)

```
edges/
└── AnimatedEdge.tsx
    - Custom animated edges
    - Smooth Bezier curves
    - Active state glow effects
    - Label support (true/false)
    - Color-coded paths
```

**Sidebar Components** (`sidebar/`)

```
sidebar/
├── Sidebar.tsx
│   - Main sidebar container
│   - Slide-in animation
│   - Header with node info
│   - Content sections
│   - Backdrop with click-to-close
│
├── FormEditor.tsx
│   - Property editing forms
│   - Conversation node: label, message, value fields
│   - Condition node: operator, compare value fields
│   - Real-time sync with Zustand
│   - Validation & helpful tooltips
│
└── LivePreview.tsx
    - Real-time preview
    - Chat bubble UI for messages
    - Mobile-like preview container
    - Logic visualization for conditions
    - Helpful context tips
```

**Toolbar Component** (`toolbar/`)

```
toolbar/
└── Toolbar.tsx
    - Floating toolbar on top-left
    - Add Message button (blue gradient)
    - Add Condition button (purple gradient)
    - Delete Selected button (red, disabled if no selection)
    - Reset All button (slate)
    - Quick start info box
    - Button animations & interactions
```

#### Store (`src/store/`)

```
store/
└── index.ts
    - Zustand store creation
    - State interface definition
    - Actions:
      * Node management (add, remove, update, select)
      * Edge management (add, remove, set)
      * Sidebar control
      * Condition evaluation logic
      * Data retrieval helpers
    - Condition evaluation algorithm
    - Active edge tracking
```

#### Types (`src/types/`)

```
types/
└── index.ts
    - ConversationNodeData interface
    - ConditionNodeData interface
    - ConversationNode interface
    - ConditionNode interface
    - WorkflowNode union type
    - WorkflowEdge interface
    - WorkflowState interface
    - EvaluationContext interface
```

### Documentation Files

```
├── README.md                - Comprehensive project documentation
├── SETUP.md                - Quick setup & getting started guide
└── PROJECT_STRUCTURE.md    - This file
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER INTERACTION                            │
│         (Click node, type in form, drag edge, etc.)              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REACT FLOW EVENTS                              │
│  (onConnect, onNodesChange, onEdgesChange, onNodeClick, etc.)   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               ZUSTAND STORE ACTIONS                              │
│    (addNode, updateNodeData, addEdge, evaluateConditions, etc.) │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STORE STATE UPDATE                             │
│   (nodes, edges, selectedNodeId, sidebarOpen, activeEdges)      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              COMPONENT RE-RENDERS                                │
│  (Canvas, Nodes, Edges, Sidebar, Toolbar with new state)        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UI UPDATES                                    │
│  (Animations, styling, layout changes via Framer Motion/Tailwind)│
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│            LIVE PREVIEW SYNCHRONIZATION                          │
│       (Sidebar shows updates in real-time)                       │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Components Overview

### WorkflowCanvas

- Entry point for React Flow
- Manages node and edge state through Zustand
- Handles connections and disconnections
- Evaluates conditions on changes
- Provides node types and edge types

### Conversation Node

- Displays message content
- Input/output handles for connectivity
- Click to select and open sidebar
- Shows preview of value in node
- Hover effects with scale animation

### Condition Node

- Displays logic expression (value > 10)
- Two separate output handles (true/false)
- Premium styling with gradient background
- Shows both possible outcomes visually
- Active state indicates selected node

### Animated Edge

- Smooth Bezier paths
- Active state: glowing blue with pulse
- True path: green dashed line
- False path: red dashed line
- Labels for branch identification

### Sidebar

- Slides in from right (spring animation)
- Dark header with node ID
- Close button and backdrop
- Form editor section with input fields
- Live preview section below
- Auto-closes when deselecting node

### Toolbar

- Fixed position top-left
- Add Message button → creates conversation nodes
- Add Condition button → creates IF nodes
- Delete Selected → removes selected node
- Reset All → clears entire workflow
- Info box with quick tips

## 🔧 Store Actions Detailed

### Node Management

```typescript
addNode(type, position) // Create new node
removeNode(nodeId) // Delete node + edges
updateNodeData(nodeId, data) // Edit node properties
setSelectedNode(nodeId) // Set active node
getSelectedNode() // Get currently selected
setNodes(nodes) // Replace all nodes
```

### Edge Management

```typescript
addEdge(edge) // Create connection
removeEdge(edgeId) // Delete connection
setEdges(edges) // Replace all edges
```

### Evaluation & UI

```typescript
evaluateConditions() // Check all IF conditions
setSidebarOpen(open) // Control sidebar visibility
reset() // Clear everything
```

## 🎨 Styling System

### Tailwind Classes

- `rounded-xl`, `rounded-2xl` - Border radius
- `shadow-soft`, `shadow-medium`, `shadow-glow` - Custom shadows
- `bg-gradient-to-r`, `bg-gradient-to-br` - Gradients
- `text-xs`, `text-sm`, `text-lg` - Typography
- `px-3`, `py-2`, `gap-3` - Spacing
- `transition-all`, `duration-300` - Smooth transitions
- `hover:`, `focus:`, `active:` - State variants

### Custom Animations

- `animate-pulse-glow` - Pulsing glow effect
- `animate-float` - Floating movement
- `animate-shimmer` - Shimmer effect

### Colors

- Blue (#3b82f6) - Primary, active states
- Purple (#8b5cf6) - Secondary, condition nodes
- Emerald (#10b981) - Success, true paths
- Red (#ef4444) - Danger, false paths
- Slate - Neutral text, borders, backgrounds

## 📦 Dependencies Map

```
react (18.2.0)
└─ react-dom (18.2.0)
   └─ reactflow (11.10.0)
      ├─ zustand (4.4.0) - State management
      ├─ framer-motion (10.16.0) - Animations
      ├─ lucide-react (0.303.0) - Icons
      └─ tailwindcss (3.3.0) - Styling
         ├─ autoprefixer (10.4.14)
         └─ postcss (8.4.27)
```

## ✅ Development Workflow

1. **Development**: `npm run dev`
   - Starts Vite dev server
   - Hot module replacement enabled
   - Fast refresh for React changes

2. **Type Checking**: `npm run build` (includes `tsc`)
   - TypeScript compilation
   - Type error detection

3. **Linting**: `npm run lint`
   - ESLint rules enforcement
   - Code quality checks

4. **Production**: `npm run build`
   - Optimized bundle in `dist/`
   - Ready for deployment

5. **Preview**: `npm run preview`
   - Test production build locally

## 🚀 Extension Points

### Adding New Node Types

1. Create component in `src/components/nodes/`
2. Register in `WorkflowCanvas.tsx` nodeTypes
3. Add to types in `src/types/index.ts`
4. Update store if needed
5. Add button in Toolbar

### Custom Logic

- Edit `evaluateConditions()` in store
- Add new edge types in `edgeTypes`
- Create custom animations in components

### UI Customization

- Modify colors in `tailwind.config.js`
- Update Framer Motion configs in components
- Extend custom CSS in `src/index.css`

---

**This is a production-quality, fully-typed, scalable architecture ready for expansion! 🎉**
