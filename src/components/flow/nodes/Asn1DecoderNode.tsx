import React from 'react';
import { Position } from '@xyflow/react';
import { Activity } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface Asn1DecoderNodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
}

interface Asn1DecoderNodeProps {
  data: Asn1DecoderNodeData;
}

export function Asn1DecoderNode({ data }: Asn1DecoderNodeProps) {
  return (
    <BaseNode
      data={data}
      color="hsl(271 91% 65%)"
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
        <Activity className="w-4 h-4" />
        <span className="text-xs">ASN.1 Decoder</span>
      </div>
    </BaseNode>
  );
}