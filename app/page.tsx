'use client';

import { useState, useEffect } from 'react';
import { Zap, Server, Trophy, Play, CheckCircle2, Clock, Send } from 'lucide-react';

const TARGET_EMAILS_REST = [
  "fan1@test.com", "fan2@test.com", "fan3@test.com", 
  "dev1@test.com", "dev2@test.com", "dev3@test.com", 
  "dbfan@test.com", "user1@test.com", "user2@test.com", "user3@test.com"
].sort().join(',');

const TARGET_EMAILS_GQL = [
  "react1@test.com", "react2@test.com", "react3@test.com",
  "state1@test.com", "state2@test.com", "state3@test.com", "state4@test.com",
  "api@test.com", "api2@test.com", "api3@test.com"
].sort().join(',');

interface RequestMetric {
  url: string;
  method: string;
  status: number;
  timeMs: number;
  sizeBytes: number;
}

export default function ChallengePortal() {
  const [userName, setUserName] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'rest' | 'graphql' | 'leaderboard'>('rest');
  
  // REST State
  const [restUrl, setRestUrl] = useState('/api/rest/users');
  const [restMethod, setRestMethod] = useState('GET');
  const [restRequests, setRestRequests] = useState<RequestMetric[]>([]);
  const [restResponse, setRestResponse] = useState<any>(null);
  const [restAnswer, setRestAnswer] = useState('');
  const [restCompleted, setRestCompleted] = useState(false);
  const [restStartTime, setRestStartTime] = useState<number | null>(null);
  const [restTimeMs, setRestTimeMs] = useState(0);

  // GraphQL State
  const [gqlQuery, setGqlQuery] = useState('query {\n  \n}');
  const [gqlRequests, setGqlRequests] = useState<RequestMetric[]>([]);
  const [gqlResponse, setGqlResponse] = useState<any>(null);
  const [gqlAnswer, setGqlAnswer] = useState('');
  const [gqlCompleted, setGqlCompleted] = useState(false);
  const [gqlStartTime, setGqlStartTime] = useState<number | null>(null);
  const [gqlTimeMs, setGqlTimeMs] = useState(0);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetch('/api/leaderboard')
        .then(res => res.json())
        .then(data => setLeaderboard(data))
        .catch(console.error);
    }
  }, [activeTab]);

  const startChallenge = () => {
    if (!userName.trim()) return;
    setIsStarted(true);
    setRestStartTime(Date.now());
    setGqlStartTime(Date.now());
  };

  const handleRestRequest = async () => {
    if (!restStartTime) setRestStartTime(Date.now());
    
    const start = performance.now();
    try {
      const res = await fetch(restUrl, { method: restMethod });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = { error: 'Invalid JSON response format' };
      }
      
      const timeMs = performance.now() - start;
      const sizeBytes = new Blob([JSON.stringify(data)]).size;
      
      setRestRequests(prev => [...prev, { url: restUrl, method: restMethod, status: res.status, timeMs, sizeBytes }]);
      
      if (!res.ok) {
        setRestResponse({ error: `HTTP Error ${res.status}: ${res.statusText}`, details: data });
      } else {
        setRestResponse(data);
      }
    } catch (e: any) {
      setRestResponse({ error: e.message || 'Network request failed. Check URL.' });
      setRestRequests(prev => [...prev, { url: restUrl, method: restMethod, status: 0, timeMs: performance.now() - start, sizeBytes: 0 }]);
    }
  };

  const verifyRestAnswer = async () => {
    if (restRequests.length === 0) {
      alert('You must execute your extraction strategy through the terminal first!');
      return;
    }
    const inputEmails = restAnswer.split(',').map(e => e.trim()).filter(Boolean).sort().join(',');
    if (inputEmails === TARGET_EMAILS_REST) {
      const timeTaken = Date.now() - (restStartTime || Date.now());
      setRestTimeMs(timeTaken);
      setRestCompleted(true);
      
      // Save
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          restTimeMs: timeTaken,
          restRequests: restRequests.length,
          restSizeBytes: restRequests.reduce((acc, req) => acc + req.sizeBytes, 0)
        })
      });
      alert('Vault Alpha Infiltrated! Proceed to Vault Beta.');
      setActiveTab('graphql');
    } else {
      alert('Incorrect intelligence. Try again.');
    }
  };

  const handleGqlRequest = async () => {
    if (!gqlStartTime) setGqlStartTime(Date.now());
    
    const start = performance.now();
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: gqlQuery })
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = { error: 'Invalid JSON response from GraphQL' };
      }
      
      const timeMs = performance.now() - start;
      const sizeBytes = new Blob([JSON.stringify(data)]).size;
      
      setGqlRequests(prev => [...prev, { url: '/api/graphql', method: 'POST', status: res.status, timeMs, sizeBytes }]);
      
      if (!res.ok) {
        setGqlResponse({ error: `HTTP Error ${res.status}: ${res.statusText}`, details: data });
      } else {
        setGqlResponse(data);
      }
    } catch (e: any) {
      setGqlResponse({ error: e.message || 'GraphQL network request failed.' });
      setGqlRequests(prev => [...prev, { url: '/api/graphql', method: 'POST', status: 0, timeMs: performance.now() - start, sizeBytes: 0 }]);
    }
  };

  const verifyGqlAnswer = async () => {
    if (gqlRequests.length === 0) {
      alert('You must execute your extraction strategy through the terminal first!');
      return;
    }
    const inputEmails = gqlAnswer.split(',').map(e => e.trim()).filter(Boolean).sort().join(',');
    if (inputEmails === TARGET_EMAILS_GQL) {
      const timeTaken = Date.now() - (gqlStartTime || Date.now());
      setGqlTimeMs(timeTaken);
      setGqlCompleted(true);
      
      // Save
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          gqlTimeMs: timeTaken,
          gqlRequests: gqlRequests.length,
          gqlSizeBytes: gqlRequests.reduce((acc, req) => acc + req.sizeBytes, 0)
        })
      });
      alert('Vault Beta Infiltrated! Mission Complete.');
      setActiveTab('leaderboard');
    } else {
      alert('Incorrect intelligence. Try again.');
    }
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border p-8 rounded-[var(--radius-lg)] max-w-md w-full shadow-lg">
          <h1 className="text-3xl font-black mb-2 text-center text-primary">The Data Heist</h1>
          <p className="text-muted-foreground mb-6 text-center text-sm">Operation Payload</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">User Name</label>
              <input 
                type="text" 
                className="w-full bg-background border border-border rounded-[var(--radius-sm)] px-4 py-2 text-foreground focus:border-primary outline-none transition-colors"
                placeholder="Enter your name..."
                value={userName}
                onChange={e => setUserName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startChallenge()}
              />
            </div>
            <button 
              onClick={startChallenge}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-[var(--radius-sm)] hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
            >
              <Play className="w-5 h-5" /> Start Heist
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 max-w-[1200px] mx-auto">
      <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">The Data Heist</h1>
          <p className="text-muted-foreground mt-1">Operative: <span className="font-bold text-foreground">{userName}</span></p>
        </div>
        <div className="flex w-full md:w-auto overflow-x-auto gap-2 p-1 bg-muted rounded-[var(--radius-md)]">
          <button 
            className={`px-4 py-2 text-sm font-bold rounded-[var(--radius-sm)] ${activeTab === 'rest' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('rest')}
          >
            Vault Alpha (REST)
          </button>
          <button 
            disabled={!restCompleted}
            className={`px-4 py-2 text-sm font-bold rounded-[var(--radius-sm)] ${activeTab === 'graphql' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'} ${!restCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => restCompleted && setActiveTab('graphql')}
          >
            Vault Beta (GraphQL)
          </button>
          <button 
            disabled={!gqlCompleted}
            className={`px-4 py-2 text-sm font-bold rounded-[var(--radius-sm)] ${activeTab === 'leaderboard' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'} ${!gqlCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => gqlCompleted && setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </header>

      {activeTab === 'rest' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-[var(--radius-lg)]">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-destructive" /> Objective
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Extract the <strong>email addresses</strong> of every single person who has commented on any post written by <strong>Alice Smith</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <select 
                  className="bg-background border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm outline-none"
                  value={restMethod}
                  onChange={e => setRestMethod(e.target.value)}
                >
                  <option>GET</option>
                </select>
                <input 
                  type="text" 
                  className="flex-1 bg-background border border-border rounded-[var(--radius-sm)] px-4 py-2 text-sm font-mono outline-none focus:border-primary"
                  value={restUrl}
                  onChange={e => setRestUrl(e.target.value)}
                  placeholder="/api/rest/..."
                  onKeyDown={e => e.key === 'Enter' && handleRestRequest()}
                />
                <button 
                  onClick={handleRestRequest}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius-sm)] font-bold text-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>

              <div className="bg-[#11141a] border border-border rounded-[var(--radius-md)] p-4 h-[300px] overflow-auto">
                <pre className="text-[#f5f5f5] text-xs font-mono whitespace-pre-wrap">
                  {restResponse ? JSON.stringify(restResponse, null, 2) : '// Response will appear here...'}
                </pre>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-[var(--radius-lg)]">
              <h3 className="text-sm font-bold mb-3">Submit Intelligence</h3>
              <textarea 
                className="w-full bg-background border border-border rounded-[var(--radius-sm)] p-3 text-sm font-mono outline-none focus:border-primary min-h-[100px] mb-3"
                placeholder="Comma separated emails (e.g. a@test.com, b@test.com)"
                value={restAnswer}
                onChange={e => setRestAnswer(e.target.value)}
                disabled={restCompleted}
              />
              <button 
                onClick={verifyRestAnswer}
                disabled={restCompleted}
                className="w-full bg-success text-primary-foreground font-bold py-2 rounded-[var(--radius-sm)] hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {restCompleted ? <><CheckCircle2 className="w-4 h-4" /> Infiltrated</> : 'Verify & Submit'}
              </button>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-[var(--radius-lg)] h-[400px] lg:h-[calc(100vh-180px)] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Network Footprint</h2>
            <div className="flex justify-between text-sm mb-6 border-b border-border pb-4">
              <div><span className="text-muted-foreground">Requests:</span> <strong className="text-destructive">{restRequests.length}</strong></div>
              <div><span className="text-muted-foreground">Payload:</span> <strong className="text-destructive">{(restRequests.reduce((a, r) => a + r.sizeBytes, 0) / 1024).toFixed(2)} KB</strong></div>
            </div>
            
            <div className="space-y-3">
              {restRequests.map((req, i) => (
                <div key={i} className="text-xs bg-muted p-3 rounded-[var(--radius-sm)] flex justify-between items-center gap-2">
                  <div className="flex items-center truncate">
                    <span className="text-destructive font-bold mr-2 w-8 shrink-0">{req.method}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mr-2 shrink-0 ${req.status >= 200 && req.status < 300 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {req.status === 0 ? 'ERR' : req.status}
                    </span>
                    <span className="font-mono truncate">{req.url}</span>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap shrink-0">{req.timeMs.toFixed(0)}ms | {(req.sizeBytes/1024).toFixed(1)}KB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'graphql' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-[var(--radius-lg)]">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-success" /> Objective
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Extract the <strong>email addresses</strong> of every single person who has commented on any post written by <strong>Diana Prince</strong>.
              </p>
              
              <div className="mb-4">
                <textarea 
                  className="w-full bg-[#11141a] text-[#0cb9c1] border border-border rounded-[var(--radius-sm)] p-4 text-sm font-mono outline-none focus:border-success min-h-[150px]"
                  value={gqlQuery}
                  onChange={e => setGqlQuery(e.target.value)}
                  placeholder="query { ... }"
                  spellCheck={false}
                />
                <button 
                  onClick={handleGqlRequest}
                  className="mt-2 bg-success text-primary-foreground px-4 py-2 rounded-[var(--radius-sm)] font-bold text-sm flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Run Query
                </button>
              </div>

              <div className="bg-[#11141a] border border-border rounded-[var(--radius-md)] p-4 h-[250px] overflow-auto">
                <pre className="text-[#f5f5f5] text-xs font-mono whitespace-pre-wrap">
                  {gqlResponse ? JSON.stringify(gqlResponse, null, 2) : '// Response will appear here...'}
                </pre>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-[var(--radius-lg)]">
              <h3 className="text-sm font-bold mb-3">Submit Intelligence</h3>
              <textarea 
                className="w-full bg-background border border-border rounded-[var(--radius-sm)] p-3 text-sm font-mono outline-none focus:border-success min-h-[100px] mb-3"
                placeholder="Comma separated emails (e.g. a@test.com, b@test.com)"
                value={gqlAnswer}
                onChange={e => setGqlAnswer(e.target.value)}
                disabled={gqlCompleted}
              />
              <button 
                onClick={verifyGqlAnswer}
                disabled={gqlCompleted}
                className="w-full bg-success text-primary-foreground font-bold py-2 rounded-[var(--radius-sm)] hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {gqlCompleted ? <><CheckCircle2 className="w-4 h-4" /> Infiltrated</> : 'Verify & Submit'}
              </button>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-[var(--radius-lg)] h-[400px] lg:h-[calc(100vh-180px)] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Network Footprint</h2>
            <div className="flex justify-between text-sm mb-6 border-b border-border pb-4">
              <div><span className="text-muted-foreground">Requests:</span> <strong className="text-success">{gqlRequests.length}</strong></div>
              <div><span className="text-muted-foreground">Payload:</span> <strong className="text-success">{(gqlRequests.reduce((a, r) => a + r.sizeBytes, 0) / 1024).toFixed(2)} KB</strong></div>
            </div>
            
            <div className="space-y-3">
              {gqlRequests.map((req, i) => (
                <div key={i} className="text-xs bg-muted p-3 rounded-[var(--radius-sm)] flex justify-between items-center gap-2">
                  <div className="flex items-center truncate">
                    <span className="text-success font-bold mr-2 w-10 shrink-0">{req.method}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mr-2 shrink-0 ${req.status >= 200 && req.status < 300 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {req.status === 0 ? 'ERR' : req.status}
                    </span>
                    <span className="font-mono truncate">{req.url}</span>
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap shrink-0">{req.timeMs.toFixed(0)}ms | {(req.sizeBytes/1024).toFixed(1)}KB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-card border border-border p-8 rounded-[var(--radius-lg)] min-h-[500px]">
          <h2 className="text-2xl font-black flex items-center gap-3 mb-6 text-primary">
            <Trophy className="w-6 h-6" /> Mission Leaderboard
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-sm">
                  <th className="pb-3 font-medium">User Name</th>
                  <th className="pb-3 font-medium">REST Time</th>
                  <th className="pb-3 font-medium">REST Setup (Req / KB)</th>
                  <th className="pb-3 font-medium">GraphQL Time</th>
                  <th className="pb-3 font-medium">GraphQL Setup (Req / KB)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">No data available yet.</td>
                  </tr>
                ) : (
                  leaderboard.map((entry, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 font-bold">{entry.userName}</td>
                      <td className="py-4">{entry.restTimeMs ? `${(entry.restTimeMs / 1000).toFixed(1)}s` : '-'}</td>
                      <td className="py-4 text-destructive">
                        {entry.restRequests || '-'} / {entry.restSizeBytes ? (entry.restSizeBytes/1024).toFixed(1) : '-'} KB
                      </td>
                      <td className="py-4">{entry.gqlTimeMs ? `${(entry.gqlTimeMs / 1000).toFixed(1)}s` : '-'}</td>
                      <td className="py-4 text-success">
                        {entry.gqlRequests || '-'} / {entry.gqlSizeBytes ? (entry.gqlSizeBytes/1024).toFixed(1) : '-'} KB
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
