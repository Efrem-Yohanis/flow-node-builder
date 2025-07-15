import React from 'react';
import { Position } from '@xyflow/react';
import { Globe } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface DiameterInterfaceNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface DiameterInterfaceNodeProps {
  data: DiameterInterfaceNodeData;
}

export function DiameterInterfaceNode({ data }: DiameterInterfaceNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(231 81% 63%)"
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
        <Globe className="w-4 h-4" />
        <span className="text-xs">Diameter Interface</span>
      </div>
    </BaseNode>
  );
}