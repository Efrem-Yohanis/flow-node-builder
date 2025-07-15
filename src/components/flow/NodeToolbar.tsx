import React from 'react';
import { Button } from '@/components/ui/button';
import { Database, Cpu, FileOutput, GitBranch, Plus } from 'lucide-react';

interface NodeToolbarProps {
  onAddNode: (type: string) => void;
}

export function NodeToolbar({ onAddNode }: NodeToolbarProps) {
  const nodeTypes = [
    { type: 'input', icon: Database, label: 'Input', color: 'hsl(var(--node-input))' },
    { type: 'process', icon: Cpu, label: 'Process', color: 'hsl(var(--node-process))' },
    { type: 'conditional', icon: GitBranch, label: 'Conditional', color: 'hsl(var(--node-conditional))' },
    { type: 'output', icon: FileOutput, label: 'Output', color: 'hsl(var(--node-output))' },
  ];

  return (
    <div className="w-64 bg-card border-r border-border shadow-panel animate-slide-in">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Nodes
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop to add to canvas
        </p>
      </div>
      
      <div className="p-4 space-y-2">
        {nodeTypes.map((nodeType) => {
          const Icon = nodeType.icon;
          return (
            <Button
              key={nodeType.type}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3 border-border/50 hover:border-border transition-all duration-200"
              onClick={() => onAddNode(nodeType.type)}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: nodeType.color }}
              />
              <Icon className="w-4 h-4" />
              <span>{nodeType.label}</span>
            </Button>
          );
        })}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <div className="text-xs text-muted-foreground">
          <p className="mb-2">💡 Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Connect nodes to create flows</li>
            <li>• Click nodes to edit properties</li>
            <li>• Use conditionals for branching</li>
          </ul>
        </div>
      </div>
    </div>
  );
}