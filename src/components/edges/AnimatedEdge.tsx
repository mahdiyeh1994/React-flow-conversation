import React from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import { motion } from "framer-motion";
import { useWorkflowStore } from "../../store";

export const AnimatedEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const activeEdges = useWorkflowStore((state) => state.activeEdges);
  const isActive = activeEdges.includes(id);
  const label = (data as any)?.label;

  return (
    <g>
      {/* Glow effect for active edges */}
      {isActive && (
        <motion.path
          d={edgePath}
          fill="none"
          strokeWidth={4}
          stroke="#3b82f6"
          opacity={0.3}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      )}

      {/* Main edge path */}
      <motion.path
        d={edgePath}
        fill="none"
        strokeWidth={2}
        stroke={
          isActive
            ? "#3b82f6"
            : label === "true"
              ? "#10b981"
              : label === "false"
                ? "#ef4444"
                : "#cbd5e1"
        }
        strokeDasharray={label ? "5,5" : "0"}
        className="transition-all duration-300"
        markerEnd={
          isActive ? "url(#arrowblue)" : label ? "url(#arrow)" : undefined
        }
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          opacity: isActive ? 1 : 0.6,
          strokeWidth: isActive ? 2.5 : 2,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* SVG markers for arrows */}
      <defs>
        <marker
          id="arrow"
          markerWidth="20"
          markerHeight="20"
          refX="19"
          refY="9"
          orient="auto"
        >
          <polygon
            points="0 0, 20 10, 0 20"
            fill={label === "true" ? "#10b981" : "#ef4444"}
          />
        </marker>
        <marker
          id="arrowblue"
          markerWidth="20"
          markerHeight="20"
          refX="19"
          refY="9"
          orient="auto"
        >
          <polygon points="0 0, 20 10, 0 20" fill="#3b82f6" />
        </marker>
      </defs>

      {/* Edge label */}
      {label && (
        <motion.text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 10}
          textAnchor="middle"
          className="select-none fill-slate-600 text-xs font-semibold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
};
