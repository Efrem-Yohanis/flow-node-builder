import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubNode {
  id: string;
  name: string;
  script_name: string;
  status: 'active' | 'deployed' | 'inactive';
}

interface BaseNodeProps {
  data: {
    label: string;
    description?: string;
    parameters?: Record<string, any>;
    subnodes?: SubNode[];
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const subnodes = data.subnodes || [];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-500',
      deployed: 'bg-blue-500',
      inactive: 'bg-gray-500'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-500';
  };
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

        {/* SubNodes Dropdown */}
        {subnodes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground transition-colors nodrag"
            >
              <span>{subnodes.length} subnode{subnodes.length !== 1 ? 's' : ''}</span>
              {isDropdownOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                {subnodes.map((subnode) => (
                  <div
                    key={subnode.id}
                    className="p-2 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">
                          {subnode.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {subnode.script_name}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <div className={cn("w-2 h-2 rounded-full", getStatusBadge(subnode.status))} />
                        <span className="text-xs text-muted-foreground capitalize">
                          {subnode.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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