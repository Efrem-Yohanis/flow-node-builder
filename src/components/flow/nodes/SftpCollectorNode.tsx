import React from 'react';
import { Position } from '@xyflow/react';
import { Database } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface SftpCollectorNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface SftpCollectorNodeProps {
  data: SftpCollectorNodeData;
}

export function SftpCollectorNode({ data }: SftpCollectorNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(217 91% 60%)"
      handles={{
        sources: [
          { id: 'output', position: Position.Right }
        ]
      }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Database className="w-4 h-4" />
        <span className="text-xs">SFTP Source</span>
      </div>
    </BaseNode>
  );
}