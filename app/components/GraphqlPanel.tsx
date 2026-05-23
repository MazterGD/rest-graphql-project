'use client';

import { RequestMetric } from '@/types';
import { Loader2, Zap } from 'lucide-react';

interface GraphqlPanelProps {
  metrics: RequestMetric[];
  isRunning: boolean;
  responseData: any;
}

export function GraphqlPanel({ metrics, isRunning, responseData }: GraphqlPanelProps) {
  const query = `query GetUserDashboard($id: ID!) {
  user(id: $id) {
    name
    posts {
      title
      comments {
        body
      }
    }
  }
}`;

  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius-lg)] border border-border flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
        <h3 className="text-[20px] font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-success" />
          GraphQL
        </h3>
        <span className="text-[14px] font-medium text-success">Single Request</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto min-h-[400px]">
        {/* Request Visualization */}
        <div>
          <h4 className="text-[15px] font-bold mb-4 text-muted-foreground">Network Requests</h4>
          <div className="space-y-3">
            {metrics.map((req, i) => (
              <div key={i} className="relative">
                <div className="flex items-center justify-between text-[14px] font-medium mb-1">
                  <span className="font-mono bg-muted px-2 py-0.5 rounded-[var(--radius-sm)] truncate max-w-[70%]">
                    <span className="text-success font-bold mr-2">{req.method}</span>
                    {req.url}
                  </span>
                  <span className="text-muted-foreground">
                    {req.timeMs.toFixed(0)}ms | {(req.sizeBytes / 1024).toFixed(1)}KB
                  </span>
                </div>
                {/* Single Bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden w-full">
                  <div className="h-full bg-success/60 w-full rounded-full" />
                </div>
              </div>
            ))}
            
            {isRunning && (
              <div className="flex items-center gap-2 text-muted-foreground text-[14px] p-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Resolving graph...
              </div>
            )}

            {!isRunning && metrics.length === 0 && (
              <div className="text-center text-muted-foreground text-[14px] py-8 border border-dashed border-border rounded-[var(--radius-md)]">
                Click "Run Comparison" to start
              </div>
            )}
          </div>
        </div>

        {/* Query & Payload Viewer */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 flex-1 min-h-[250px]">
          <div className="flex flex-col">
            <h4 className="text-[15px] font-bold mb-2 text-muted-foreground">Query</h4>
            <div className="bg-[#11141a] text-[#0cb9c1] p-4 rounded-[var(--radius-md)] flex-1 overflow-auto font-mono text-[12px] whitespace-pre-wrap">
              {query}
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[15px] font-bold mb-2 text-muted-foreground">Precise Payload</h4>
            <div className="bg-[#11141a] text-[#f5f5f5] p-4 rounded-[var(--radius-md)] flex-1 overflow-auto font-mono text-[12px] whitespace-pre-wrap">
              {responseData ? JSON.stringify(responseData, null, 2) : '// Awaiting data...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
