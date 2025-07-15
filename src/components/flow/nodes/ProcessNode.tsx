import React from 'react';
import { Position } from '@xyflow/react';
import { Cpu } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface ProcessNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface ProcessNodeProps {
  data: ProcessNodeData;
}

export function ProcessNode({ data }: ProcessNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(var(--node-process))"
      handles={{
        targets: [
          { id: 'input', position: Position.Left }
        ],
        sources: [
          { id: 'output', position: Position.Right }
        ]
      }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Cpu className="w-4 h-4" />
        <span className="text-xs">Processing</span>
      </div>
    </BaseNode>
  );
}