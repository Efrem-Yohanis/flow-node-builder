import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllConnectionPointsTab } from "./network-model/AllConnectionPointsTab";
import { IncomingConnectionPointsTab } from "./network-model/IncomingConnectionPointsTab";
import { OutgoingConnectionPointsTab } from "./network-model/OutgoingConnectionPointsTab";

export function NetworkModelPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Network Model</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor all connection points</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All Connection Points</TabsTrigger>
          <TabsTrigger value="incoming">Incoming Connection Points</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Connection Points</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllConnectionPointsTab />
        </TabsContent>

        <TabsContent value="incoming">
          <IncomingConnectionPointsTab />
        </TabsContent>

        <TabsContent value="outgoing">
          <OutgoingConnectionPointsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
