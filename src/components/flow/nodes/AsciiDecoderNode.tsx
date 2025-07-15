import React from 'react';
import { Position } from '@xyflow/react';
import { FileText } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface AsciiDecoderNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface AsciiDecoderNodeProps {
  data: AsciiDecoderNodeData;
}

export function AsciiDecoderNode({ data }: AsciiDecoderNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(45 93% 47%)"
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
        <FileText className="w-4 h-4" />
        <span className="text-xs">ASCII Decoder</span>
      </div>
    </BaseNode>
  );
}