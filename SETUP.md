# Workflow Builder - Setup Guide

## 🎯 Project Overview

This is a **production-quality Interactive Workflow Builder** with:

- Visual node editor (React Flow)
- Real-time state management (Zustand)
- Smooth animations (Framer Motion)
- Modern UI (Tailwind CSS, Lucide Icons)
- Full TypeScript support

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open browser at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## 📦 What's Included

### Components

- **WorkflowCanvas**: Main canvas with React Flow integration
- **ConversationNode**: Message/chat nodes
- **ConditionNode**: Logic/IF branching nodes
- **AnimatedEdge**: Custom edges with smooth animations
- **Sidebar**: Property editor with live preview
- **Toolbar**: Node creation and canvas controls

### State Management (Zustand)

- Centralized workflow store
- Actions for nodes, edges, conditions
- Real-time evaluation logic
- Easy to use hooks

### Styling

- Tailwind CSS with custom animations
- Framer Motion for smooth interactions
- Modern color palette (Blue, Purple, Slate)
- Responsive design

## 🚀 Getting Started

### Adding Your First Node

1. Click **"Add Message"** button in toolbar
2. A conversation node appears on canvas
3. Click the node to select it
4. Edit properties in the right sidebar
5. See live preview of your message

### Creating a Logic Flow

1. Add a Conversation node with value (e.g., "25")
2. Add a Condition node (IF)
3. Drag connection from Conversation to Condition
4. Edit condition: "value > 18"
5. True path glows if condition is true!

## 💡 Pro Tips

- **Zoom & Pan**: Use mouse wheel to zoom, right-click to pan
- **Real-time Sync**: All changes auto-sync between canvas and preview
- **Multiple Conditions**: Chain conditions together for complex logic
- **Mobile Preview**: See how messages look in the sidebar
- **Delete Nodes**: Select node and click "Delete Selected"

## 📁 Project Structure

```
src/
├── components/
│   ├── canvas/WorkflowCanvas.tsx
│   ├── nodes/
│   │   ├── ConversationNode.tsx
│   │   └── ConditionNode.tsx
│   ├── edges/AnimatedEdge.tsx
│   ├── sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── FormEditor.tsx
│   │   └── LivePreview.tsx
│   └── toolbar/Toolbar.tsx
├── store/index.ts
├── types/index.ts
├── App.tsx
└── index.css
```

## 🎨 Customization

### Adding Custom Node Types

See README.md for detailed guide on extending with new node types.

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'primary': '#your-color',
  'secondary': '#your-color',
}
```

### Modifying Animations

Edit Framer Motion configs in component files or update `tailwind.config.js` for CSS animations.

## 🐛 Common Issues

**Nodes not appearing?**

- Check browser console for errors
- Ensure npm dependencies installed

**Sidebar not opening?**

- Click on a node in the canvas

**Conditions not evaluating?**

- Make sure you've entered a numeric value in the node's "Value" field
- Connection must go FROM conversation node TO condition node

## 📚 Next Steps

1. Read `README.md` for detailed documentation
2. Explore component code - well-commented
3. Check `src/store/index.ts` for API
4. Experiment with adding/editing nodes
5. Extend with custom node types

## 🎯 Architecture Highlights

- **Scalable**: Easy to add new features
- **Type-safe**: Full TypeScript coverage
- **Performant**: Optimized React Flow usage
- **Maintainable**: Clean, modular code
- **Professional**: Production-ready quality

---

**Happy building! 🚀**
