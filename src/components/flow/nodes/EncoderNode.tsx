import React from 'react';
import { Position } from '@xyflow/react';
import { RotateCcw } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface EncoderNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface EncoderNodeProps {
  data: EncoderNodeData;
}

export function EncoderNode({ data }: EncoderNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(173 80% 40%)"
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
        <RotateCcw className="w-4 h-4" />
        <span className="text-xs">Encoder</span>
      </div>
    </BaseNode>
  );
}