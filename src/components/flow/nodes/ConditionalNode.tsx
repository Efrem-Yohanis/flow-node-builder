import React from 'react';
import { Position } from '@xyflow/react';
import { GitBranch } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface ConditionalNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface ConditionalNodeProps {
  data: ConditionalNodeData;
}

export function ConditionalNode({ data }: ConditionalNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(var(--node-conditional))"
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
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <GitBranch className="w-4 h-4" />
        <span className="text-xs">Conditional</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-node-input" />
          <span className="text-muted-foreground">Valid</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Invalid</span>
        </div>
      </div>
    </BaseNode>
  );
}