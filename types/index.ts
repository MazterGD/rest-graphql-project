export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  email: string;
  body: string;
  created_at: string;
}

export interface RequestMetric {
  url: string;
  method: string;
  status?: number;
  timeMs: number;
  sizeBytes: number;
}

export interface ScenarioMetrics {
  requests: RequestMetric[];
  totalTimeMs: number;
  totalSizeBytes: number;
}
