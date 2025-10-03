import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, Settings, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Configuration types data
const configTypes = [
  {
    id: "kafka",
    name: "Kafka Configuration",
    description: "Manage Kafka cluster connections and settings",
    icon: Database,
    count: 3,
    status: "active"
  },
  {
    id: "database",
    name: "Database Configuration",
    description: "Manage database connections and settings",
    icon: Database,
    count: 0,
    status: "inactive"
  },
  {
    id: "api",
    name: "API Configuration",
    description: "Manage external API integrations",
    icon: Settings,
    count: 0,
    status: "inactive"
  },
  {
    id: "security",
    name: "Security Configuration",
    description: "Manage security and authentication settings",
    icon: Settings,
    count: 0,
    status: "inactive"
  }
];

export function ConfigManagementPage() {
  const navigate = useNavigate();

  const handleConfigClick = (configId: string) => {
    navigate(`/devtool/config/${configId}`);
  };

  return (
    <div className="space-y-6">
      {/* Configs Table */}
      <div className="overflow-hidden border border-border rounded-lg bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30">
              <TableHead className="h-12 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Configuration Type
              </TableHead>
              <TableHead className="h-12 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Description
              </TableHead>
              <TableHead className="h-12 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Configurations
              </TableHead>
              <TableHead className="h-12 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="h-12 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configTypes.map((config) => {
              const Icon = config.icon;
              return (
                <TableRow 
                  key={config.id}
                  onClick={() => handleConfigClick(config.id)}
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{config.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{config.description}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className="text-xs font-medium">
                      {config.count} {config.count === 1 ? 'Config' : 'Configs'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge 
                      variant="outline"
                      className={`text-xs font-medium ${
                        config.status === "active" 
                          ? "bg-success text-success-foreground border-success" 
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {config.status === "active" ? "Active" : "Not Configured"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <ChevronRight className="h-5 w-5 text-muted-foreground inline-block" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
