import React from 'react';
import { Position } from '@xyflow/react';
import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface ValidationBlnNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface ValidationBlnNodeProps {
  data: ValidationBlnNodeData;
}

export function ValidationBlnNode({ data }: ValidationBlnNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(0 84% 60%)"
      handles={{
        targets: [
          { id: 'input', position: Position.Left }
        ],
        sources: [
          { id: 'valid', position: Position.Right, top: '30%' },
          { id: 'invalid', position: Position.Right, top: '70%' }
        ]
      }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="text-xs">Validation</span>
      </div>
    </BaseNode>
  );
}