import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { InputNode } from './nodes/InputNode';
import { ProcessNode } from './nodes/ProcessNode';
import { OutputNode } from './nodes/OutputNode';
import { ConditionalNode } from './nodes/ConditionalNode';

const nodeTypes = {
  input: InputNode,
  process: ProcessNode,
  output: OutputNode,
  conditional: ConditionalNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Data Input',
      description: 'External data source',
      parameters: {
        source: 'database',
        table: 'users'
      }
    },
  },
  {
    id: '2',
    type: 'process',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Transform Data',
      description: 'Process and clean data',
      parameters: {
        script: 'data_cleaner.py',
        mode: 'strict'
      }
    },
  },
  {
    id: '3',
    type: 'conditional',
    position: { x: 700, y: 100 },
    data: { 
      label: 'Validation Check',
      description: 'Validate data quality',
      parameters: {
        threshold: 0.8,
        action: 'reject'
      }
    },
  },
  {
    id: '4',
    type: 'output',
    position: { x: 1000, y: 50 },
    data: { 
      label: 'Success Output',
      description: 'Clean data destination',
      parameters: {
        destination: 'clean_data_table'
      }
    },
  },
  {
    id: '5',
    type: 'output',
    position: { x: 1000, y: 200 },
    data: { 
      label: 'Error Output',
      description: 'Failed validation logs',
      parameters: {
        destination: 'error_logs'
      }
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    label: 'Valid',
    sourceHandle: 'valid',
    style: { stroke: 'hsl(var(--node-input))' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    label: 'Invalid',
    sourceHandle: 'invalid',
    style: { stroke: 'hsl(var(--destructive))' },
  },
];

interface FlowCanvasProps {
  onNodeSelect: (node: Node | null) => void;
}

export function FlowCanvas({ onNodeSelect }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <div className="flex-1 bg-canvas-bg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-canvas-bg"
        style={{
          backgroundColor: 'hsl(var(--canvas-bg))',
        }}
      >
        <Controls 
          className="bg-card border-border shadow-panel"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap 
          className="bg-card border-border shadow-panel"
          maskColor="hsl(var(--canvas-bg) / 0.8)"
          nodeColor="hsl(var(--primary))"
          nodeStrokeWidth={2}
        />
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--canvas-grid))"
        />
      </ReactFlow>
    </div>
  );
}