# Interactive Workflow Builder - Complete Usage Guide

## 🎯 Features Overview

### 1. Visual Canvas Editor

- **Infinite Canvas**: Drag, zoom, pan freely
- **Minimap**: See overview of entire workflow
- **Grid Background**: Visual reference for node placement
- **Controls Panel**: Zoom, home, lock, fit-to-view buttons
- **Smooth Interactions**: All interactions are animated and responsive

### 2. Node Types

#### Conversation Node (Blue)

**Purpose**: Represents a message or chat interaction

**Creating:**

1. Click "Add Message" button in toolbar
2. Node appears at random position
3. Click to select and edit

**Editing:**

- **Label**: Short name for the node (e.g., "Welcome", "Ask Name")
- **Message**: The actual message content displayed
- **Value**: Numeric or text value for condition evaluation

**Example:**

```
Label: "Age Question"
Message: "How old are you?"
Value: "25"  ← This can be evaluated by conditions
```

**Connections:**

- **Input Handle**: Top - receives from other nodes
- **Output Handle**: Bottom - sends to other nodes

#### Condition Node (Purple)

**Purpose**: Creates branching logic based on conditions

**Creating:**

1. Click "Add Condition" button in toolbar
2. Select and configure

**Editing:**

- **Operator**: Choose comparison type (>, <, ==, !=)
- **Compare Value**: The number to compare against

**Example Configuration:**

```
Operator: > (Greater Than)
Compare Value: 18

What it does:
If incoming value > 18 → TRUE path activates
If incoming value ≤ 18 → FALSE path activates
```

**Connections:**

- **Input Handle**: Top - receives value from Conversation node
- **Output Handle (Top/Right)**:
  - TRUE: Activates when condition is true
  - FALSE: Activates when condition is false

### 3. Edge System

#### Automatic Edges

- Create by dragging from node handle to another node's handle
- Automatically detected as true/false on condition nodes
- Show relationship between nodes

#### Edge States

- **Inactive**: Gray, dimmed (not in active path)
- **Active (True)**: Green dashed line with glow
- **Active (False)**: Red dashed line with glow
- **Highlighted**: Blue glow when condition evaluates to true path

#### Edge Removal

- Click edge to select
- Press Delete or click delete button
- Or remove source/target node (cascade delete)

### 4. Sidebar Properties Editor

#### Opening the Sidebar

- Click any node on canvas
- Sidebar slides in from right
- Shows node type and ID

#### Closing the Sidebar

- Click "Done" button → Sidebar closes, **node stays selected**
- Click empty canvas → Sidebar closes AND node deselects
- Select a different node → Sidebar updates to show new node's properties

**Important**: Closing the sidebar does NOT deselect the node. The Delete button remains enabled until you explicitly deselect by clicking on empty canvas area.

#### Content Sections

**Properties** - Edit node-specific fields

- Conversation: label, message, value
- Condition: operator, compare value

**Preview** - See real-time rendering

- Conversation: chat bubble appearance
- Condition: logic visualization

**Helpful Tips** - Context-sensitive guidance

### 5. Real-Time Evaluation

#### How Condition Evaluation Works

```
Step 1: User enters value in Conversation Node
        "Age Question" node → Value: "25"
                    ↓
Step 2: Connect to Condition Node
        Conversation Node → Condition Node
                    ↓
Step 3: System evaluates condition
        Condition: value > 18
        25 > 18? → TRUE ✓
                    ↓
Step 4: Activate appropriate path
        TRUE edge glows blue and becomes active
        FALSE edge dims (not taken)
                    ↓
Step 5: Connected nodes receive signal
        Next node in TRUE path becomes active
```

#### Testing Conditions

1. Add Conversation node
2. Enter a numeric value in "Value" field
3. Add Condition node below
4. Connect Conversation → Condition
5. Set condition (e.g., > 10)
6. Change value and watch paths update!

### 6. Toolbar Functions

**Add Message Button**

- Creates new Conversation node
- Appears at random canvas position
- Click to select and edit

**Add Condition Button**

- Creates new Condition (IF) node
- Pre-configured with sensible defaults
- Edit operator and compare value

**Delete Selected Button**

- Only enabled when node is selected
- Removes selected node
- Automatically removes connected edges
- Confirmation on "Reset All"

**Reset All Button**

- Clears entire workflow
- Removes all nodes and edges
- Asks for confirmation
- One-click reset to start over

### 7. Animations & Interactions

#### Node Animations

- **Mount**: Fade in with scale-up (0.8 → 1.0)
- **Hover**: Slight scale increase (1.0 → 1.05)
- **Select**: Glow effect with border color change
- **Drag**: Smooth position transitions

#### Edge Animations

- **Creation**: Path length animation (0 → 1)
- **Active**: Continuous glow with opacity pulse
- **Transitions**: Smooth color changes

#### Sidebar Animations

- **Open**: Slide from right with spring effect
- **Content**: Staggered fade-in of sections
- **Close**: Slide out and fade

#### Button Interactions

- **Hover**: Scale up slightly
- **Click**: Scale down feedback
- **Active**: Color change or state update

---

## 🔄 Common Workflows

### Workflow 1: Simple Q&A Flow

```
Step 1: Add Message Node
        "Ask for name" → Value: "John"

Step 2: Add another Message Node
        "Ask for age" → Value: "25"

Step 3: Connect first to second
        "Ask for name" → "Ask for age"

Result: Sequential flow of messages
```

### Workflow 2: Age-Based Branching

```
Step 1: Add Message "Ask Age"
        Value: "22"

Step 2: Add Condition Node
        Operator: >
        Compare: 18

Step 3: Connect Message to Condition
        Message → Condition (auto-detects true/false)

Step 4: Add two Message Nodes
        - "Adult path"
        - "Minor path"

Step 5: Connect condition outputs
        Condition TRUE → Adult path
        Condition FALSE → Minor path

Step 6: Change the "Ask Age" value
        Watch paths light up differently!
```

### Workflow 3: Multi-Level Branching

```
Start → Age Check (>18)
           ├→ TRUE → Income Check (>50000)
           │            ├→ TRUE → Premium path
           │            └→ FALSE → Standard path
           └→ FALSE → Kid path
```

---

## ⚙️ Customization Guide

### Changing Node Content

**Conversation Node:**

1. Click the node to select
2. In sidebar under "Properties"
3. Edit:
   - **Label**: Short identifier (appears as title)
   - **Message**: Full message content
   - **Value**: Numeric value for conditions

**Condition Node:**

1. Click the node to select
2. In sidebar under "Properties"
3. Edit:
   - **Operator**: Click dropdown to change >, <, ==, !=
   - **Compare Value**: Change the number to compare against

### Editing After Creation

- All changes sync in real-time
- Preview updates instantly
- Conditions re-evaluate automatically
- No need to refresh or save

### Deleting Nodes

- Select node (click on it)
- Click "Delete Selected" in toolbar
- Or select → Delete key (if implemented)

### Rearranging

- Drag nodes anywhere on canvas
- Pan canvas (right-click + drag)
- Zoom in/out (mouse wheel)
- Use minimap to navigate

---

## 🎨 Visual Design Details

### Color Scheme

| Element            | Color       | Use                     |
| ------------------ | ----------- | ----------------------- |
| Conversation Nodes | Blue        | Message/content nodes   |
| Condition Nodes    | Purple      | Logic/branching nodes   |
| Active Paths       | Blue Glow   | Currently active path   |
| True Paths         | Green       | Successful condition    |
| False Paths        | Red         | Condition not met       |
| Text               | Slate       | Primary, secondary text |
| Backgrounds        | White/Slate | Cards and surfaces      |

### Styling Features

- **Soft Shadows**: Subtle depth on cards
- **Rounded Corners**: Modern, smooth appearance
- **Hover States**: Visual feedback on interactions
- **Gradient Backgrounds**: Premium feel
- **Smooth Transitions**: All changes are animated
- **Responsive Spacing**: Proper padding and gaps

---

## 🐛 Troubleshooting

### Node Issues

**Q: Node won't appear when I click "Add Message"**
A:

- Check browser console (F12) for errors
- Ensure all dependencies installed: `npm install`
- Try refreshing page: `Ctrl+R`
- Check Node.js version: `node -v` (should be 16+)

**Q: Can't edit node properties**
A:

- Click node to select it first
- Wait for sidebar to slide in (1-2 seconds)
- Check if node is actually selected (should show glow)

**Q: Changes don't appear in preview**
A:

- Ensure you're typing in correct field
- Try scrolling in sidebar
- Close and reopen sidebar
- Select different node then back

### Edge Issues

**Q: Can't connect nodes**
A:

- Ensure nodes have handles (small circles)
- Drag from handle to handle (not empty space)
- Verify both nodes exist on canvas
- Check for overlapping nodes blocking handles

**Q: Conditions not evaluating**
A:

- Ensure Conversation node has numeric value
- Value must be number (not text)
- Connection must be Conversation → Condition
- Click condition to verify settings

**Q: Wrong path activating**
A:

- Verify operator is correct (>, <, ==, !=)
- Check compare value
- Verify incoming value in Conversation node
- Try changing value to test

### Performance Issues

**Q: Canvas feels slow/laggy**
A:

- Reduce number of nodes (>50 might lag)
- Zoom in to focus area
- Close sidebar if not needed
- Clear browser cache

---

## 🚀 Advanced Tips

### Building Complex Workflows

1. **Plan First**: Sketch flow on paper
2. **Add Nodes Systematically**: Don't add all at once
3. **Connect Gradually**: Connect as you go
4. **Test Conditions**: Verify each branch works
5. **Use Preview**: Check appearance in sidebar

### Organizing Large Workflows

- Group related nodes together
- Use clear, descriptive labels
- Keep conditions simple (> 3 levels gets complex)
- Use consistent naming convention

### Testing Your Workflow

1. Set test values in Conversation nodes
2. Trace through conditions manually
3. Change values and verify paths light up
4. Check that all branches are covered

---

## 💡 Best Practices

### Node Naming

- Use clear, descriptive labels
- Keep labels short (3-5 words max)
- Use action verbs: "Ask", "Check", "Validate"

### Message Content

- Keep messages concise
- Use natural language
- Include context for user
- Format for mobile preview

### Condition Logic

- Use simple, clear operators
- Avoid deeply nested conditions (>5 levels)
- Document complex logic with message nodes
- Test with boundary values

### Node Layout

- Leave space between nodes (not cramped)
- Align nodes vertically or horizontally
- Top-to-bottom or left-to-right flow
- Group related branches together

---

## 🔗 Integration Points

### Extracting Data

When you build a workflow, you can export:

- Node positions and content
- Edge connections
- Condition logic
- Default values

### Future Extensions

- Save/load workflows to database
- Version control for workflows
- User-specific workflow instances
- Real-time collaboration

---

## 📞 Support & Help

### Quick Help

- Hover over elements for tooltips
- Check info box in toolbar for tips
- Read helpful messages in sidebar
- Check README.md for API details

### Detailed Docs

- **README.md**: Full documentation
- **PROJECT_STRUCTURE.md**: Code organization
- **SETUP.md**: Development setup
- Code comments in source files

---

**Happy building! Create amazing workflows! 🎉**
