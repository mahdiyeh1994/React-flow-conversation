import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, GitBranch } from "lucide-react";
import {
  WorkflowNode,
  ConversationNodeData,
  ConditionNodeData,
} from "../../types";

interface LivePreviewProps {
  node: WorkflowNode;
  nodeData: ConversationNodeData | ConditionNodeData;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ node, nodeData }) => {
  if (node.type === "conversation") {
    const data = nodeData as ConversationNodeData;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {/* Mobile-like preview container */}
        <div className="bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl p-4 border border-slate-200 shadow-soft">
          {/* Phone frame effect */}
          <div className="bg-white rounded-xl p-4 space-y-3">
            {/* Chat bubbles preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-start"
            >
              <div className="max-w-xs bg-slate-200 text-slate-900 rounded-2xl rounded-bl-none px-4 py-2">
                <p className="text-sm font-medium">
                  {data.message || "(Enter your message)"}
                </p>
              </div>
            </motion.div>

            {/* Bot response hint */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-end"
            >
              <div className="max-w-xs bg-blue-500 text-white rounded-2xl rounded-br-none px-4 py-2">
                <p className="text-sm">Next message will continue flow...</p>
              </div>
            </motion.div>
          </div>

          {/* Info section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-xs text-blue-700">
              <MessageCircle className="inline w-3 h-3 mr-1" />
              <strong>Label:</strong> {data.label || "Untitled"}
            </p>
            {data.text && (
              <p className="text-xs text-blue-700 mt-1">
                <strong>Value:</strong>{" "}
                <code className="bg-blue-100 px-1">{data.text}</code>
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (node.type === "condition") {
    const data = nodeData as ConditionNodeData;

    const getOperatorSymbol = (operator: string) => {
      const symbols: Record<string, string> = {
        ">": ">",
        "<": "<",
        "==": "=",
        "!=": "≠",
      };
      return symbols[operator] || operator;
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {/* Condition logic preview */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 border-2 border-purple-200">
          {/* Logic expression */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-purple-200 mb-3 font-mono text-sm"
          >
            <div className="flex items-center justify-center gap-2 text-purple-700">
              <span className="font-semibold">value</span>
              <span className="text-lg font-bold">
                {getOperatorSymbol(data.operator)}
              </span>
              <span className="font-semibold">{data.compareValue}</span>
            </div>
          </motion.div>

          {/* Branch outcomes */}
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-emerald-700 font-semibold">
                TRUE Path
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✕</span>
              </div>
              <span className="text-sm text-red-700 font-semibold">
                FALSE Path
              </span>
            </motion.div>
          </div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 pt-4 border-t border-purple-200 text-xs text-purple-600"
          >
            <GitBranch className="inline w-3 h-3 mr-1" />
            Connect conversation nodes before this condition to evaluate their
            values.
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return null;
};
