import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubnodeVersion } from "@/services/subnodeService";

interface ParameterValuesTableProps {
  selectedVersion: SubnodeVersion | null;
}

export function ParameterValuesTable({ selectedVersion }: ParameterValuesTableProps) {
  const parameterEntries = selectedVersion?.parameter_values 
    ? Object.entries(selectedVersion.parameter_values)
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parameter Values (Version {selectedVersion?.version || 'Unknown'})</CardTitle>
      </CardHeader>
      <CardContent>
        {parameterEntries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter Key</TableHead>
                <TableHead>Parameter Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parameterEntries.map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell className="font-mono text-sm bg-muted/30 px-2 py-1 rounded">
                    {value || <span className="text-muted-foreground italic">Empty</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No parameters defined for this version
          </div>
        )}
      </CardContent>
    </Card>
  );
}