import React from 'react';
import { Position } from '@xyflow/react';
import { Database } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface InputNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface InputNodeProps {
  data: InputNodeData;
}

export function InputNode({ data }: InputNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(var(--node-input))"
      handles={{
        sources: [
          { id: 'output', position: Position.Right }
        ]
      }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Database className="w-4 h-4" />
        <span className="text-xs">Data Source</span>
      </div>
    </BaseNode>
  );
}