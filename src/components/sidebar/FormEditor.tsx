import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useWorkflowStore } from '../../store'
import { ConversationNodeData, ConditionNodeData, WorkflowNode } from '../../types'

interface FormEditorProps {
  node: WorkflowNode
}

export const FormEditor: React.FC<FormEditorProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)

  const handleChange = useCallback(
    (key: string, value: any) => {
      updateNodeData(node.id, { [key]: value })
      // updateNodeData already triggers evaluation, but add explicit call for safety
    },
    [node.id, updateNodeData]
  )

  if (node.type === 'conversation') {
    const data = node.data as ConversationNodeData

    return (
      <div className="space-y-4">
        {/* Label Field */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Label</label>
          <input
            type="text"
            value={data.label}
            onChange={(e) => handleChange('label', e.target.value)}
            placeholder="Enter label"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
          />
        </motion.div>

        {/* Message Field */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Message</label>
          <textarea
            value={data.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Enter message content"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none transition-all"
            rows={3}
          />
        </motion.div>

        {/* Value Field */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Value (for conditions)</label>
          <input
            type="text"
            value={data.text}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="e.g. 15, 20, 100"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
          />
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <p className="text-xs text-blue-700">
            💡 <strong>Tip:</strong> Enter a numeric value in the Value field if this node will be evaluated by a
            condition.
          </p>
        </motion.div>
      </div>
    )
  }

  if (node.type === 'condition') {
    const data = node.data as ConditionNodeData

    return (
      <div className="space-y-4">
        {/* Operator Field */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Operator</label>
          <select
            value={data.operator}
            onChange={(e) => handleChange('operator', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all"
          >
            <option value=">">Greater Than (&gt;)</option>
            <option value="<">Less Than (&lt;)</option>
            <option value="==">Equal To (==)</option>
            <option value="!=">Not Equal (!=)</option>
          </select>
        </motion.div>

        {/* Compare Value Field */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Compare Value</label>
          <input
            type="number"
            value={data.compareValue}
            onChange={(e) => handleChange('compareValue', parseInt(e.target.value) || 0)}
            placeholder="Enter number to compare"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all"
          />
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 bg-purple-50 border border-purple-200 rounded-lg space-y-2"
        >
          <p className="text-xs text-purple-700">
            <strong>Example:</strong> If a previous node has value{' '}
            <code className="bg-purple-100 px-1 rounded">15</code>
          </p>
          <p className="text-xs text-purple-700">and this condition is value &gt; 10</p>
          <p className="text-xs text-purple-700 font-semibold">Then: TRUE path is activated ✓</p>
        </motion.div>
      </div>
    )
  }

  return null
}
