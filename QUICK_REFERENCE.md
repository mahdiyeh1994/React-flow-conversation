# Quick Reference Card

## 🎯 Getting Started in 60 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at http://localhost:5173
# 4. Start building!
```

---

## 🖱️ Basic Controls

| Action             | How                                       |
| ------------------ | ----------------------------------------- |
| Add Message Node   | Click "Add Message" button                |
| Add Condition Node | Click "Add Condition" button              |
| Select Node        | Click on node                             |
| Edit Node          | Click node → edit in sidebar              |
| Connect Nodes      | Drag from handle to handle                |
| Pan Canvas         | Right-click + drag (or hold Space + drag) |
| Zoom In/Out        | Mouse wheel up/down                       |
| Delete Node        | Select node + click "Delete Selected"     |
| Close Sidebar      | Click "Done" or click outside             |
| Reset Workflow     | Click "Reset All" (with confirmation)     |

---

## 🎨 Node Quick Reference

### Conversation Node

```
┌─────────────────────┐
│ 💬 Message          │
├─────────────────────┤
│ Enter your message  │
│ [Value: 25]         │
└─────────────────────┘
  ▲ (input)
  │
  └─ Connect FROM another node

  │ ▼ (output)
  └─ Connect TO condition or message
```

**Sidebar Fields:**

- Label: Short name
- Message: Full content
- Value: For conditions

### Condition Node

```
┌──────────────────┐
│ ▶ IF             │
├──────────────────┤
│ value > 10       │
│ ✓ TRUE  ✕ FALSE │
└──────────────────┘
  ▲ (input)
  │
  └─ FROM Conversation Node

  │ ▼ (true/false output)
  └─ TO next nodes
```

**Sidebar Fields:**

- Operator: >, <, ==, !=
- Compare Value: Number to check against

---

## 💡 Quick Workflows

### Simple Chain

```
Message 1 → Message 2 → Message 3
```

### Age Check

```
        ┌─ [Adult Path]
Age? ─→ IF > 18 ┤
        └─ [Minor Path]
```

### Complex Branching

```
                ┌─ [Premium]
Age Check ──────┤
        ┌─ Income Check ─┤
        │                └─ [Standard]
        │
        └─ [Child Path]
```

---

## 📋 Sidebar Sections

### Properties

- Edit node data
- Real-time synchronization
- Helpful tips included

### Preview

- See how it looks
- Chat bubble visualization
- Logic diagram for conditions

### Tips Box

- Context-sensitive help
- Feature explanations
- Usage examples

---

## 🔧 Zustand Store Quick API

```typescript
// Import
import { useWorkflowStore } from '@/store'

// Create nodes
const addNode = useWorkflowStore((state) => state.addNode)
addNode('conversation', { x: 100, y: 100 })
addNode('condition', { x: 100, y: 300 })

// Edit nodes
const updateNodeData = useWorkflowStore((state) => state.updateNodeData)
updateNodeData('node-id', { label: 'New Label' })

// Manage selection
const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode)
setSelectedNode('node-id')

// Get selected
const selectedNode = useWorkflowStore((state) => state.getSelectedNode())

// Edges
const addEdge = useWorkflowStore((state) => state.addEdge)
const removeEdge = useWorkflowStore((state) => state.removeEdge)

// Evaluation
const evaluateConditions = useWorkflowStore((state) => state.evaluateConditions)
evaluateConditions()

// Reset
const reset = useWorkflowStore((state) => state.reset)
reset()
```

---

## 🎬 Keyboard Shortcuts (Future)

| Shortcut | Action               |
| -------- | -------------------- |
| `Ctrl+Z` | Undo (not yet)       |
| `Ctrl+Y` | Redo (not yet)       |
| `Delete` | Delete selected      |
| `Ctrl+A` | Select all (not yet) |
| `Escape` | Deselect all         |

---

## 📊 Condition Operators Reference

| Operator     | Symbol | Example    | Result |
| ------------ | ------ | ---------- | ------ |
| Greater Than | `>`    | `25 > 18`  | TRUE   |
| Less Than    | `<`    | `15 < 20`  | TRUE   |
| Equal To     | `==`   | `10 == 10` | TRUE   |
| Not Equal    | `!=`   | `5 != 3`   | TRUE   |

---

## 🎨 Color Meanings

| Color      | Meaning                             |
| ---------- | ----------------------------------- |
| **Blue**   | Conversation nodes, primary actions |
| **Purple** | Condition nodes, logic branches     |
| **Green**  | TRUE path (condition met)           |
| **Red**    | FALSE path (condition not met)      |
| **Gray**   | Inactive edges, default state       |

---

## 📁 Important Files

| File                                       | Purpose            |
| ------------------------------------------ | ------------------ |
| `src/store/index.ts`                       | State management   |
| `src/types/index.ts`                       | TypeScript types   |
| `src/components/canvas/WorkflowCanvas.tsx` | Main canvas        |
| `src/components/nodes/*`                   | Node components    |
| `src/components/sidebar/*`                 | Property editor    |
| `README.md`                                | Full documentation |

---

## 🚀 Common Tasks

### Add Message Node

1. Click "Add Message"
2. Click node to select
3. Edit in sidebar:
   - Label: e.g., "Welcome"
   - Message: e.g., "Hello there!"
   - Value: e.g., "25" (for conditions)

### Create Condition

1. Click "Add Condition"
2. Click to select
3. Edit in sidebar:
   - Operator: choose from dropdown
   - Compare Value: enter number
4. Connect from Conversation node

### Connect Nodes

1. Find node's handle (small circle)
2. Drag to target node's handle
3. Release to connect
4. TRUE/FALSE labels appear on condition edges

### Delete Node

1. Click node to select
2. Click "Delete Selected"
3. Node and edges removed

### Clear Everything

1. Click "Reset All"
2. Confirm in dialog
3. Fresh canvas ready

---

## 🐛 Troubleshooting Quick Fixes

| Issue                    | Fix                                     |
| ------------------------ | --------------------------------------- |
| Can't see nodes          | Try zooming out (mouse wheel)           |
| Sidebar won't open       | Click node first to select              |
| Can't connect nodes      | Drag from handle to handle (not center) |
| Condition not evaluating | Verify numeric value in message node    |
| Slow performance         | Reduce number of nodes (>50 may lag)    |

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **SETUP.md** - Installation and setup
- **USAGE_GUIDE.md** - Complete features guide
- **PROJECT_STRUCTURE.md** - Code organization
- **QUICK_REFERENCE.md** - This file!

---

## 🌟 Feature Highlights

✅ Visual node editor with infinite canvas  
✅ Two custom node types with premium styling  
✅ Real-time condition evaluation  
✅ Animated edges with active path highlighting  
✅ Modern sidebar property editor  
✅ Live preview with mobile-style chat  
✅ Smooth Framer Motion animations  
✅ Full TypeScript type safety  
✅ Zustand state management  
✅ Tailwind CSS responsive design  
✅ Production-ready code quality

---

## 🔗 Resources

- [React Flow Docs](https://reactflow.dev/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Docs](https://react.dev/)

---

**Created with ❤️ for developers who want production-quality code**
