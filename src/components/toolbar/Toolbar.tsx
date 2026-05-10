import React, { useCallback } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  GitBranch,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useWorkflowStore } from "../../store";

interface ToolbarProps {
  onAddNode: (type: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAddNode }) => {
  const reset = useWorkflowStore((state) => state.reset);
  const removeNode = useWorkflowStore((state) => state.removeNode);
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);

  const handleAddConversation = useCallback(() => {
    onAddNode("conversation");
  }, [onAddNode]);

  const handleAddCondition = useCallback(() => {
    onAddNode("condition");
  }, [onAddNode]);

  const handleDeleteNode = useCallback(() => {
    if (selectedNodeId) {
      removeNode(selectedNodeId);
    }
  }, [selectedNodeId, removeNode]);

  const handleReset = useCallback(() => {
    if (confirm("Are you sure you want to clear all nodes and edges?")) {
      reset();
    }
  }, [reset]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-6 z-20 flex flex-col gap-3"
    >
      {/* Main container */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Workflow Builder
          </h1>
          <p className="text-xs text-slate-500">
            Build visual workflows with drag & drop
          </p>
        </div>

        {/* Tool buttons */}
        <div className="bg-white rounded-xl shadow-medium p-4 border border-slate-200 space-y-2">
          {/* Add Conversation Node */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddConversation}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-glow transition-all font-medium text-sm group"
          >
            <MessageCircle className="w-4 h-4 group-hover:animate-bounce" />
            Add Message
          </motion.button>

          {/* Add Condition Node */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCondition}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-glow transition-all font-medium text-sm group"
          >
            <GitBranch className="w-4 h-4 group-hover:animate-bounce" />
            Add Condition
          </motion.button>

          {/* Delete Selected Node */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteNode}
            disabled={!selectedNodeId}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
              selectedNodeId
                ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all font-medium text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </motion.button>
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-soft p-4 border border-slate-200 max-w-xs text-xs text-slate-600 space-y-2"
      >
        <p>
          <strong>✨ Quick Start:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-500">
          <li>Add nodes from the toolbar</li>
          <li>Drag to connect nodes</li>
          <li>Click nodes to edit properties</li>
          <li>Condition values auto-evaluate</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};
