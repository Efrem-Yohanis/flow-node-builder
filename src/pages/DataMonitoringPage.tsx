import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./data-monitoring/OverviewTab";
import { LookupDataTab } from "./data-monitoring/LookupDataTab";
import { RejectedDataTab } from "./data-monitoring/RejectedDataTab";
import { BufferedDataTab } from "./data-monitoring/BufferedDataTab";

export function DataMonitoringPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Data Monitoring</h1>
        <p className="text-muted-foreground mt-2">Monitor system KPIs, stream throughput, and data processing</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lookup">Lookup Data</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Data</TabsTrigger>
          <TabsTrigger value="buffered">Buffered Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="lookup">
          <LookupDataTab />
        </TabsContent>

        <TabsContent value="rejected">
          <RejectedDataTab />
        </TabsContent>

        <TabsContent value="buffered">
          <BufferedDataTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
