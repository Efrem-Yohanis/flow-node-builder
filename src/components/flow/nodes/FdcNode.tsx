import React from 'react';
import { Position } from '@xyflow/react';
import { CheckCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface FdcNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface FdcNodeProps {
  data: FdcNodeData;
}

export function FdcNode({ data }: FdcNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(142 76% 36%)"
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
        <CheckCircle className="w-4 h-4" />
        <span className="text-xs">FDC Processor</span>
      </div>
    </BaseNode>
  );
}