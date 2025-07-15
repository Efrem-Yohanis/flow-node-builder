import React from 'react';
import { Position } from '@xyflow/react';
import { Database } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface RawBackupNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface RawBackupNodeProps {
  data: RawBackupNodeData;
}

export function RawBackupNode({ data }: RawBackupNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(0 0% 45%)"
      handles={{
        targets: [
          { id: 'input', position: Position.Left }
        ]
      }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Database className="w-4 h-4" />
        <span className="text-xs">Raw Backup</span>
      </div>
    </BaseNode>
  );
}