import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LoadingCard, LoadingSpinner } from "@/components/ui/loading";
import { FlowCanvas } from "./FlowCanvas";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Play, 
  Square, 
  ArrowLeft,
  Activity,
  Settings,
  Users,
  BarChart3,
  FileText,
  EyeOff,
  RotateCcw,
  History,
  CheckCircle,
  Clock,
  User,
  Shield,
  Database,
  Network,
  Gauge,
  AlertTriangle,
  TrendingUp,
  Server,
  GitBranch,
  Calendar,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { flowService, FlowVersion } from "@/services/flowService";

// Enhanced flow type detection for mediation categories
const getMediationType = (flowName: string): "charging" | "convergent" | "ncc" | "generic" => {
  const name = flowName.toLowerCase();
  if (name.includes('charging') || name.includes('billing')) return 'charging';
  if (name.includes('convergent') || name.includes('converge')) return 'convergent';
  if (name.includes('ncc') || name.includes('call control')) return 'ncc';
  return 'generic';
};

const getMediationTypeIcon = (type: string) => {
  switch (type) {
    case 'charging': return <Zap className="h-4 w-4" />;
    case 'convergent': return <Network className="h-4 w-4" />;
    case 'ncc': return <Shield className="h-4 w-4" />;
    default: return <Activity className="h-4 w-4" />;
  }
};

const getMediationTypeColor = (type: string) => {
  switch (type) {
    case 'charging': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'convergent': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    case 'ncc': return 'bg-green-500/10 text-green-600 border-green-500/20';
    default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
};

export function FlowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [flow, setFlow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [versions, setVersions] = useState<FlowVersion[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(false);

  useEffect(() => {
    const fetchFlowStructure = async () => {
      try {
        const response = await flowService.getFlowGraph(id!);
        setFlow(response);
      } catch (err) {
        setError("Error fetching flow structure");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlowStructure();
    }
  }, [id]);

  // Fetch versions
  const fetchVersions = async () => {
    if (!id) return;
    
    setVersionsLoading(true);
    try {
      const flowVersions = await flowService.getFlowVersions(id);
      setVersions(flowVersions);
    } catch (err) {
      console.error('Error fetching flow versions:', err);
    } finally {
      setVersionsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVersions();
    }
  }, [id]);

  const activateVersion = async (version: number) => {
    if (!id) return;
    
    try {
      await flowService.activateFlowVersion(id, version);
      
      setVersions(prevVersions => 
        prevVersions.map(v => ({
          ...v,
          is_active: v.version === version
        }))
      );
      
      const response = await flowService.getFlowGraph(id);
      setFlow(response);
      
      toast({
        title: "Version Activated",
        description: `Flow version ${version} is now active`,
      });
    } catch (err) {
      console.error('Error activating version:', err);
      toast({
        title: "Error",
        description: "Failed to activate version",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-8">
          <LoadingCard text="Loading enterprise flow details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-md w-full border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!flow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Flow Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested flow does not exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getFlowStatus = () => {
    if (flow.is_running) return "running";
    if (flow.is_deployed) return "deployed";
    return "draft";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success/10 text-success border-success/20";
      case "deployed": return "bg-info/10 text-info border-info/20";
      case "draft": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Activity className="h-4 w-4 animate-pulse" />;
      case "deployed": return <CheckCircle className="h-4 w-4" />;
      case "draft": return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const mediationType = getMediationType(flow.name || '');
  
  // Helper function to determine node type based on name or other criteria
  const getNodeType = (nodeName?: string): string => {
    const name = (nodeName ?? '').toLowerCase();
    if (!name) return 'generic';
    if (name.includes('sftp') || name.includes('collector')) return 'sftp_collector';
    if (name.includes('fdc')) return 'fdc';
    if (name.includes('asn1') || name.includes('decoder')) return 'asn1_decoder';
    if (name.includes('ascii')) return 'ascii_decoder';
    if (name.includes('validation')) return 'validation_bln';
    if (name.includes('enrichment')) return 'enrichment_bln';
    if (name.includes('encoder')) return 'encoder';
    if (name.includes('diameter')) return 'diameter_interface';
    if (name.includes('backup')) return 'raw_backup';
    return 'generic';
  };

  // Create unique nodes map to avoid duplicates
  const uniqueNodes = new Map();
  flow.nodes?.forEach((node) => {
    if (!uniqueNodes.has(node.id)) {
      uniqueNodes.set(node.id, node);
    }
  });

  // Prepare nodes from the unique nodes with proper positioning  
  const nodes = Array.from(uniqueNodes.values()).map((node, index) => {
    const nodeType = getNodeType(node.name);
    
    return {
      id: node.id,
      type: nodeType,
      position: { 
        x: (index % 4) * 300 + 100,
        y: Math.floor(index / 4) * 200 + 100 
      },
      data: {
        label: node.name,
        description: `Order: ${node.order}`,
        node: node,
        selected_subnode: node.selected_subnode_id ? { id: node.selected_subnode_id } : undefined,
        parameters: [],
        subnodes: [],
      },
    };
  });

  // Prepare edges from flow edges
  const edges = flow.edges?.map((edge) => ({
    id: edge.id,
    source: edge.from_node,
    target: edge.to_node,
    animated: true,
    label: edge.condition || undefined,
  })) || [];

  const handleRunFlow = async () => {
    try {
      await flowService.runFlow(id!);
      setFlow(prev => ({ ...prev, is_running: true }));
      toast({
        title: "Flow Started",
        description: "The flow has been started successfully.",
      });
    } catch (err: any) {
      console.error("Error starting flow:", err);
      const errorMessage = err.response?.data?.error || err.message || "Error starting flow";
      toast({
        title: "Error Starting Flow",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleStopFlow = async () => {
    try {
      await flowService.stopFlow(id!);
      setFlow(prev => ({ ...prev, is_running: false }));
      toast({
        title: "Flow Stopped",
        description: "The flow has been stopped successfully.",
      });
    } catch (err: any) {
      console.error("Error stopping flow:", err);
      const errorMessage = err.response?.data?.error || err.message || "Error stopping flow";
      toast({
        title: "Error Stopping Flow",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const currentStatus = getFlowStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-8 space-y-8">
        {/* Enhanced Header with Breadcrumbs */}
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate('/dashboard')}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate('/flows')}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  Flows
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate(`/mediations/${mediationType}`)}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  {mediationType.charAt(0).toUpperCase() + mediationType.slice(1)} Mediation
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{flow.name}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Professional Header */}
          <div className="bg-card/50 backdrop-blur-xl border border-border/40 rounded-3xl p-8 shadow-elegant">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{flow.name}</h1>
                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(currentStatus)} font-medium`}>
                        {getStatusIcon(currentStatus)}
                        <span className="ml-2 capitalize">{currentStatus}</span>
                      </Badge>
                      <Badge className={getMediationTypeColor(mediationType)}>
                        {getMediationTypeIcon(mediationType)}
                        <span className="ml-2">{mediationType.charAt(0).toUpperCase() + mediationType.slice(1)} Mediation</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Controls */}
              <div className="flex items-center gap-3">
                {currentStatus === "deployed" && !flow.is_running && (
                  <Button 
                    onClick={handleRunFlow}
                    className="bg-success hover:bg-success/90 text-white shadow-lg"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Flow
                  </Button>
                )}
                {currentStatus === "running" && flow.is_running && (
                  <Button 
                    variant="destructive" 
                    onClick={handleStopFlow}
                    className="shadow-lg"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop Flow
                  </Button>
                )}
                <Button variant="outline" className="border-border/60 hover:bg-primary/10">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
                <Button variant="outline" className="border-border/60 hover:bg-primary/10">
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide
                </Button>
                <Button variant="outline" className="border-border/60 hover:bg-primary/10">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur-xl border-border/40 shadow-elegant">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{flow.description || 'No description provided'}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/40 shadow-elegant">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-foreground font-medium">{new Date(flow.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p className="text-sm text-muted-foreground">{new Date(flow.created_at).toLocaleTimeString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/40 shadow-elegant">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Author
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{flow.created_by || 'System'}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/40 shadow-elegant">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Version
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-base font-semibold">v{flow.version || 1}</Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate(`/flows/${id}/versions`)}
                  className="text-xs"
                >
                  <History className="h-3 w-3 mr-1" />
                  History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Section */}
        <Card className="bg-card/50 backdrop-blur-xl border-border/40 shadow-elegant">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-border/40 bg-muted/20 rounded-t-2xl">
              <TabsList className="h-14 w-full justify-start bg-transparent p-0 rounded-t-2xl">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-3 h-14 px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none rounded-tl-2xl"
                >
                  <Activity className="h-5 w-5" />
                  <span className="font-medium">Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="pipeline" 
                  className="flex items-center gap-3 h-14 px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Network className="h-5 w-5" />
                  <span className="font-medium">Pipeline</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="monitoring" 
                  className="flex items-center gap-3 h-14 px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-medium">Monitoring</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-3 h-14 px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-8 space-y-8">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Throughput
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">2.4K/min</div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">+12% from last hour</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">99.8%</div>
                    <p className="text-xs text-green-600 dark:text-green-400">Within SLA targets</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Error Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">0.2%</div>
                    <p className="text-xs text-orange-600 dark:text-orange-400">3 errors last hour</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">45ms</div>
                    <p className="text-xs text-purple-600 dark:text-purple-400">Avg processing time</p>
                  </CardContent>
                </Card>
              </div>

              {/* Host Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Host Servers</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          mediation-01.domain.com
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          mediation-02.domain.com
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Uptime</div>
                      <div className="text-2xl font-bold text-success">240h 25m</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Last Started</div>
                      <div className="text-sm">2024-01-05 14:14:30</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pipeline" className="p-8">
              <div className="h-[600px] bg-background/50 border border-border/40 rounded-2xl overflow-hidden">
                <FlowCanvas nodes={nodes} edges={edges} onNodeSelect={(node) => console.log(node)} />
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Real-time Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Metrics visualization would go here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Alert History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Badge variant="destructive" className="w-2 h-2 p-0"></Badge>
                          <span>High error rate detected</span>
                          <span className="text-muted-foreground ml-auto">2h ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Badge className="w-2 h-2 p-0 bg-warning"></Badge>
                          <span>Performance degradation</span>
                          <span className="text-muted-foreground ml-auto">4h ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-8">
              <div className="space-y-6">
                {/* Version History */}
                {versionsLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : versions.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Version History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Version</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {versions.map((version) => (
                            <TableRow key={version.id}>
                              <TableCell>
                                <Badge variant={version.is_active ? "default" : "outline"}>
                                  v{version.version}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {version.is_active ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 text-success" />
                                      <span className="text-success font-medium">Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">Inactive</span>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{version.created_by}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {new Date(version.created_at).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <span className="text-sm text-muted-foreground">
                                  {version.description || 'No description'}
                                </span>
                              </TableCell>
                              <TableCell>
                                {!version.is_active && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        Activate
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Activate Version {version.version}</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will make version {version.version} the active version of this flow. 
                                          The current active version will be deactivated. This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => activateVersion(version.version)}>
                                          Activate Version
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                                {version.is_active && (
                                  <Badge variant="secondary" className="text-xs">
                                    Current
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Version History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-muted-foreground">
                        No version history available
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}