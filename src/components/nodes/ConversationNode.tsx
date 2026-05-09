import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useWorkflowStore } from "../../store";
import { ConversationNodeData } from "../../types";

export const ConversationNode: React.FC<NodeProps<ConversationNodeData>> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={`
        px-4 py-3 rounded-xl shadow-soft border-2 transition-all duration-300
        ${
          selected
            ? "border-blue-500 shadow-glow-active bg-blue-50"
            : "border-slate-200 bg-white hover:shadow-medium hover:border-slate-300"
        }
      `}
      onClick={() => setSelectedNode(id)}
    >
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-4 h-4 text-blue-500" />
        <h3 className="font-semibold text-sm text-slate-900">{data.label}</h3>
      </div>

      <p className="text-xs text-slate-600 max-w-xs line-clamp-2">
        {data.message}
      </p>

      {data.text && (
        <p className="text-xs mt-1 px-2 py-1 bg-slate-100 rounded text-slate-700">
          {data.text}
        </p>
      )}

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </motion.div>
  );
};
