import React, { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useWorkflowStore } from '../../store'
import { FormEditor } from './FormEditor'
import { LivePreview } from './LivePreview'
import { ConversationNodeData, ConditionNodeData } from '../../types'

export const Sidebar: React.FC = () => {
  const selectedNode = useWorkflowStore((state) => state.getSelectedNode())
  const sidebarOpen = useWorkflowStore((state) => state.sidebarOpen)
  const closeSidebar = useWorkflowStore((state) => state.closeSidebar)

  const handleClose = useCallback(() => {
    closeSidebar()
  }, [closeSidebar])

  return (
    <AnimatePresence>
      {sidebarOpen && selectedNode && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {selectedNode.type === 'conversation' ? 'Message Node' : 'Condition Node'}
                </h2>
                <p className="text-xs text-slate-300">ID: {selectedNode.id}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Form Editor */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Properties</h3>
                  <FormEditor node={selectedNode} />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Live Preview */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Preview</h3>
                  <LivePreview
                    node={selectedNode}
                    nodeData={selectedNode.data as ConversationNodeData | ConditionNodeData}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
