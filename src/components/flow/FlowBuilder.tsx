import React, { useState, useCallback } from 'react';
import { Node } from '@xyflow/react';
import { FlowCanvas } from './FlowCanvas';
import { NodeToolbar } from './NodeToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { FlowHeader } from './FlowHeader';

export function FlowBuilder() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeSelect = useCallback((node: Node | null) => {
    setSelectedNode(node);
  }, []);

  const handleAddNode = useCallback((type: string) => {
    // TODO: Implement node addition logic
    console.log('Adding node of type:', type);
  }, []);

  const handleUpdateNode = useCallback((nodeId: string, data: any) => {
    // TODO: Implement node update logic
    console.log('Updating node:', nodeId, data);
  }, []);

  const handleDeleteNode = useCallback((nodeId: string) => {
    // TODO: Implement node deletion logic
    console.log('Deleting node:', nodeId);
  }, []);

  const handleFlowAction = useCallback((action: string) => {
    // TODO: Implement flow actions (save, deploy, etc.)
    console.log('Flow action:', action);
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col">
      <FlowHeader 
        flowName="Data Pipeline Flow"
        onAction={handleFlowAction}
      />
      
      <div className="flex-1 flex">
        <NodeToolbar onAddNode={handleAddNode} />
        
        <FlowCanvas onNodeSelect={handleNodeSelect} />
        
        <PropertiesPanel
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
        />
      </div>
    </div>
  );
}