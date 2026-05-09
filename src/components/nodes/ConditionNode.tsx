import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { useWorkflowStore } from "../../store";
import { ConditionNodeData } from "../../types";

export const ConditionNode: React.FC<NodeProps<ConditionNodeData>> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

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
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
      }}
      transition={{ duration: 0.2 }}
      className={`
        px-5 py-4 rounded-2xl shadow-soft border-2 transition-all duration-300
        relative backdrop-blur-sm
        ${
          selected
            ? "border-purple-500 shadow-glow-active bg-purple-50"
            : "border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-medium hover:border-purple-300"
        }
      `}
      onClick={() => setSelectedNode(id)}
    >
      {/* Diamond-like background decoration */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100/0 to-purple-100/20 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="w-4 h-4 text-purple-600" />
          <h3 className="font-bold text-sm text-slate-900">IF</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 mb-2 border border-purple-200/50">
          <p className="text-xs font-mono text-purple-700">
            value{" "}
            <span className="font-bold">
              {getOperatorSymbol(data.operator)}
            </span>{" "}
            {data.compareValue}
          </p>
        </div>

        <div className="flex gap-2 text-xs font-semibold">
          <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700">
            TRUE
          </span>
          <span className="px-2 py-1 rounded bg-red-100 text-red-700">
            FALSE
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        label="true"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        label="false"
        isConnectable={isConnectable}
      />
    </motion.div>
  );
};
