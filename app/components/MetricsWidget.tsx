'use client';

import { ScenarioMetrics } from '@/types';
import { Activity, ArrowDownToLine, Timer } from 'lucide-react';

interface MetricsWidgetProps {
  restMetrics: ScenarioMetrics | null;
  graphqlMetrics: ScenarioMetrics | null;
}

export function MetricsWidget({ restMetrics, graphqlMetrics }: MetricsWidgetProps) {
  if (!restMetrics || !graphqlMetrics) return null;

  const restTime = restMetrics.totalTimeMs;
  const gqlTime = graphqlMetrics.totalTimeMs;
  const timeDiff = restTime > 0 ? ((restTime - gqlTime) / restTime) * 100 : 0;

  const restSize = restMetrics.totalSizeBytes;
  const gqlSize = graphqlMetrics.totalSizeBytes;
  const sizeDiff = restSize > 0 ? ((restSize - gqlSize) / restSize) * 100 : 0;

  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius-lg)] border border-border shadow-sm p-6 mt-6">
      <h3 className="text-[20px] font-bold mb-6">Live Comparison Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Network Requests */}
        <div className="p-4 rounded-[var(--radius-md)] bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Activity className="w-5 h-5" />
            <span className="font-bold">Total Network Requests</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[28px] font-bold text-destructive">{restMetrics.requests.length}</div>
              <div className="text-[14px] text-muted-foreground">REST</div>
            </div>
            <div className="text-[24px] font-bold text-border pb-1">vs</div>
            <div className="text-right">
              <div className="text-[28px] font-bold text-success">{graphqlMetrics.requests.length}</div>
              <div className="text-[14px] text-muted-foreground">GraphQL</div>
            </div>
          </div>
        </div>

        {/* Payload Size */}
        <div className="p-4 rounded-[var(--radius-md)] bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <ArrowDownToLine className="w-5 h-5" />
            <span className="font-bold">Payload Size (KB)</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-[28px] font-bold text-destructive">{(restSize / 1024).toFixed(1)}</div>
              <div className="text-[14px] text-muted-foreground">REST</div>
            </div>
            <div className="text-[24px] font-bold text-border pb-1">vs</div>
            <div className="text-right">
              <div className="text-[28px] font-bold text-success">{(gqlSize / 1024).toFixed(1)}</div>
              <div className="text-[14px] text-muted-foreground">GraphQL</div>
            </div>
          </div>
          <div className="text-[14px] font-medium text-success text-center bg-success/10 rounded-[var(--radius-sm)] py-1">
            GraphQL is {sizeDiff.toFixed(0)}% lighter
          </div>
        </div>

        {/* Total Time */}
        <div className="p-4 rounded-[var(--radius-md)] bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Timer className="w-5 h-5" />
            <span className="font-bold">Total Round-Trip Time (ms)</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-[28px] font-bold text-destructive">{restTime.toFixed(0)}</div>
              <div className="text-[14px] text-muted-foreground">REST</div>
            </div>
            <div className="text-[24px] font-bold text-border pb-1">vs</div>
            <div className="text-right">
              <div className="text-[28px] font-bold text-success">{gqlTime.toFixed(0)}</div>
              <div className="text-[14px] text-muted-foreground">GraphQL</div>
            </div>
          </div>
          <div className="text-[14px] font-medium text-success text-center bg-success/10 rounded-[var(--radius-sm)] py-1">
            GraphQL is {timeDiff.toFixed(0)}% faster
          </div>
        </div>
      </div>
    </div>
  );
}
