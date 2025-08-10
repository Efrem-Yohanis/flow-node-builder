import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Play, Square, History } from "lucide-react";
import { SubnodeDetail, SubnodeVersion } from "@/services/subnodeService";

interface SubnodeHeaderProps {
  subnode: SubnodeDetail;
  selectedVersion: SubnodeVersion | null;
  onEditVersion: () => void;
  onDeployVersion: () => void;
  onUndeployVersion: () => void;
  onCreateNewVersion: () => void;
  onShowVersionHistory: () => void;
  isLoading?: boolean;
}

export function SubnodeHeader({
  subnode,
  selectedVersion,
  onEditVersion,
  onDeployVersion,
  onUndeployVersion,
  onCreateNewVersion,
  onShowVersionHistory,
  isLoading = false
}: SubnodeHeaderProps) {
  const isActiveVersion = selectedVersion?.is_deployed;
  const canEdit = selectedVersion && !selectedVersion.is_deployed;

  return (
    <div className="space-y-4">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">🧩 {subnode.name}</h1>
          <Badge variant="outline">
            Version {selectedVersion?.version || 'Unknown'}
          </Badge>
          <Badge 
            variant={isActiveVersion ? "default" : "outline"}
            className={isActiveVersion ? "bg-green-500 text-white" : "text-muted-foreground"}
          >
            {isActiveVersion ? "🟢 Active" : "🔴 Draft"}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={onShowVersionHistory}
            disabled={isLoading}
          >
            <History className="h-4 w-4 mr-2" />
            Version History
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {isActiveVersion ? (
          <>
            <Button 
              variant="outline"
              onClick={onCreateNewVersion}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4 mr-2" />
              Create New Version
            </Button>
            <Button 
              variant="destructive"
              onClick={onUndeployVersion}
              disabled={isLoading}
            >
              <Square className="h-4 w-4 mr-2" />
              Undeploy
            </Button>
          </>
        ) : canEdit ? (
          <>
            <Button 
              variant="outline"
              onClick={onEditVersion}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Version
            </Button>
            <Button 
              variant="default"
              onClick={onDeployVersion}
              disabled={isLoading}
            >
              <Play className="h-4 w-4 mr-2" />
              Deploy
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}