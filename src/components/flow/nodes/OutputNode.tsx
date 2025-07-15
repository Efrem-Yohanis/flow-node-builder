import React from 'react';
import { Position } from '@xyflow/react';
import { FileOutput } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface OutputNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface OutputNodeProps {
  data: OutputNodeData;
}

export function OutputNode({ data }: OutputNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(var(--node-output))"
      handles={{
        targets: [
          { id: 'input', position: Position.Left }
        ]
      }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <FileOutput className="w-4 h-4" />
        <span className="text-xs">Output</span>
      </div>
    </BaseNode>
  );
}