import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

interface BaseNodeProps {
  data: {
    label: string;
    description?: string;
    parameters?: Record<string, any>;
  };
  children?: React.ReactNode;
  className?: string;
  color: string;
  handles?: {
    sources?: Array<{ id: string; position: Position; top?: string; bottom?: string; label?: string }>;
    targets?: Array<{ id: string; position: Position; top?: string; bottom?: string; label?: string }>;
  };
}

export function BaseNode({ data, children, className, color, handles }: BaseNodeProps) {
  return (
    <div 
      className={cn(
        "min-w-48 rounded-lg border shadow-node transition-all duration-300",
        "bg-canvas-node-bg border-canvas-node-border",
        "hover:border-canvas-node-hover hover:shadow-glow",
        "group relative",
        className
      )}
      style={{
        '--node-color': color,
      } as React.CSSProperties}
    >
      {/* Target handles */}
      {handles?.targets?.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="target"
          position={handle.position}
          className="w-3 h-3 border-2 bg-background border-canvas-edge transition-colors hover:border-canvas-edge-hover"
          style={{
            top: handle.top,
            bottom: handle.bottom,
          }}
        />
      ))}

      {/* Node content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: color }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {data.label}
            </h3>
            {data.description && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {data.description}
              </p>
            )}
          </div>
        </div>

        {/* Custom content */}
        {children}

        {/* Parameters preview */}
        {data.parameters && Object.keys(data.parameters).length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="text-xs text-muted-foreground">
              {Object.keys(data.parameters).length} parameter{Object.keys(data.parameters).length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {/* Source handles */}
      {handles?.sources?.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="source"
          position={handle.position}
          className="w-3 h-3 border-2 bg-background border-canvas-edge transition-colors hover:border-canvas-edge-hover"
          style={{
            top: handle.top,
            bottom: handle.bottom,
          }}
        />
      ))}
    </div>
  );
}