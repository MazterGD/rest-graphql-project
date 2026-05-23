'use client';

import { Play, Database } from 'lucide-react';

interface ScenarioControllerProps {
  onRun: () => void;
  isRunning: boolean;
}

export function ScenarioController({ onRun, isRunning }: ScenarioControllerProps) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-[var(--radius-lg)] border border-border shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-[20px] font-bold leading-tight">Data Goal: Fetch User Dashboard</h2>
        </div>
        <p className="text-[16px] text-muted-foreground">
          Scenario: The client needs to render a dashboard for a specific user (ID: 1). The view requires the user's basic info, a list of their posts, and all comments on those posts.
        </p>
      </div>
      
      <button
        onClick={onRun}
        disabled={isRunning}
        className="bg-primary text-primary-foreground px-[24px] py-[11px] rounded-[var(--radius-sm)] font-bold text-[16px] flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isRunning ? (
          <span className="animate-pulse">Fetching...</span>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Run Comparison
          </>
        )}
      </button>
    </div>
  );
}
