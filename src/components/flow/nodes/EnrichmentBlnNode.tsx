import React from 'react';
import { Position } from '@xyflow/react';
import { AlertCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface EnrichmentBlnNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface EnrichmentBlnNodeProps {
  data: EnrichmentBlnNodeData;
}

export function EnrichmentBlnNode({ data }: EnrichmentBlnNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(25 95% 53%)"
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
        <AlertCircle className="w-4 h-4" />
        <span className="text-xs">Enrichment</span>
      </div>
    </BaseNode>
  );
}