import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { gitService, GitInfo } from "@/services/gitService";

interface FlowDetailsData {
  id: string;
  name: string;
  description: string;
  nodes?: Array<any>;
  updated_at: string;
  updated_by?: string;
  created_by: string;
}

interface FlowDetailsPanelProps {
  flow: FlowDetailsData;
}

export function FlowDetailsPanel({ flow }: FlowDetailsPanelProps) {
  const [gitInfo, setGitInfo] = useState<GitInfo | null>(null);
  const [loadingGit, setLoadingGit] = useState(true);
  
  useEffect(() => {
    const fetchGitInfo = async () => {
      try {
        const info = await gitService.getLatestCommit();
        setGitInfo(info);
      } catch (error) {
        console.error('Failed to fetch git info:', error);
      } finally {
        setLoadingGit(false);
      }
    };

    fetchGitInfo();
  }, []);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const nodeCount = flow.nodes?.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flow Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Description</h4>
            <p className="text-sm">{flow.description || 'No description available'}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Nodes</h4>
            <p className="font-medium">{nodeCount}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Last Updated By</h4>
            <p className="text-sm">{flow.updated_by || flow.created_by || 'Unknown'}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Last Updated Date</h4>
            <p className="text-sm">{formatDateTime(flow.updated_at)}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Flow ID</h4>
            <p className="font-mono text-xs bg-muted px-2 py-1 rounded">{flow.id}</p>
          </div>
          
          {/* Git Commit Information */}
          {loadingGit ? (
            <div className="col-span-full">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Latest Commit</h4>
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          ) : gitInfo ? (
            <>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Latest Commit</h4>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{gitInfo.lastCommit.hash}</code>
                  <Badge variant="outline" className="text-xs">{gitInfo.lastCommit.branch}</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Commit Message</h4>
                <p className="text-sm line-clamp-2" title={gitInfo.lastCommit.message}>
                  {gitInfo.lastCommit.message}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Commit Author</h4>
                <p className="text-sm">{gitInfo.lastCommit.author}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Commit Date</h4>
                <p className="text-sm">{formatDateTime(gitInfo.lastCommit.date)}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Repository Status</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={gitInfo.status === 'clean' ? 'default' : 'secondary'}>
                    {gitInfo.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {gitInfo.totalCommits} commits
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}