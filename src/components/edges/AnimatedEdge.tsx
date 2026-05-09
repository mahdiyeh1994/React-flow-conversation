import React from 'react'
import { EdgeProps, getBezierPath } from 'reactflow'
import { motion } from 'framer-motion'
import { useWorkflowStore } from '../../store'

export const AnimatedEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceHandle,
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const activeEdges = useWorkflowStore((state) => state.activeEdges)
  const isActive = activeEdges.includes(id)

  // Determine if this is a true or false branch from sourceHandle
  const isTrueBranch = sourceHandle === 'true'
  const isFalseBranch = sourceHandle === 'false'
  const isConditionEdge = isTrueBranch || isFalseBranch
  const label = data?.label

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
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}

      {/* Main edge path */}
      <motion.path
        d={edgePath}
        fill="none"
        strokeWidth={2}
        stroke={
          isActive
            ? isTrueBranch
              ? '#10b981'
              : isFalseBranch
                ? '#ef4444'
                : '#3b82f6'
            : isTrueBranch
              ? '#d1e7e6'
              : isFalseBranch
                ? '#ffe4e6'
                : '#cbd5e1'
        }
        strokeDasharray={isConditionEdge ? '5,5' : '0'}
        className="transition-all duration-300"
        markerEnd={isActive ? (isTrueBranch ? 'url(#arrowtrue)' : 'url(#arrowfalse)') : undefined}
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          opacity: isActive ? 1 : 0.5,
          strokeWidth: isActive ? 3 : 2,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* SVG markers for arrows */}
      <defs>
        <marker id="arrowtrue" markerWidth="20" markerHeight="20" refX="19" refY="9" orient="auto">
          <polygon points="0 0, 20 10, 0 20" fill="#10b981" />
        </marker>
        <marker id="arrowfalse" markerWidth="20" markerHeight="20" refX="19" refY="9" orient="auto">
          <polygon points="0 0, 20 10, 0 20" fill="#ef4444" />
        </marker>
        <marker id="arrow" markerWidth="20" markerHeight="20" refX="19" refY="9" orient="auto">
          <polygon points="0 0, 20 10, 0 20" fill={label === 'true' ? '#10b981' : '#ef4444'} />
        </marker>
        <marker id="arrowblue" markerWidth="20" markerHeight="20" refX="19" refY="9" orient="auto">
          <polygon points="0 0, 20 10, 0 20" fill="#3b82f6" />
        </marker>
      </defs>

      {/* Edge label */}
      {isConditionEdge && (
        <motion.text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 15}
          textAnchor="middle"
          className="select-none text-xs font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          fill={isTrueBranch ? '#059669' : '#dc2626'}
        >
          {isTrueBranch ? '✓ TRUE' : '✕ FALSE'}
        </motion.text>
      )}
    </g>
  )
}
