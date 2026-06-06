import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    
    // Map snake_case back to camelCase for the frontend
    const formattedData = data.map(row => ({
      userName: row.team_name,
      restTimeMs: row.rest_time_ms,
      restRequests: row.rest_requests,
      restSizeBytes: row.rest_size_bytes,
      gqlTimeMs: row.gql_time_ms,
      gqlRequests: row.gql_requests,
      gqlSizeBytes: row.gql_size_bytes
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to read' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const entry = await request.json();
    
    // Check if team exists
    const { data: existingTeam } = await supabase
      .from('leaderboard')
      .select('id, team_name')
      .eq('team_name', entry.userName)
      .maybeSingle();

    const payload = {
      team_name: entry.userName,
      ...(entry.restTimeMs !== undefined && { rest_time_ms: entry.restTimeMs }),
      ...(entry.restRequests !== undefined && { rest_requests: entry.restRequests }),
      ...(entry.restSizeBytes !== undefined && { rest_size_bytes: entry.restSizeBytes }),
      ...(entry.gqlTimeMs !== undefined && { gql_time_ms: entry.gqlTimeMs }),
      ...(entry.gqlRequests !== undefined && { gql_requests: entry.gqlRequests }),
      ...(entry.gqlSizeBytes !== undefined && { gql_size_bytes: entry.gqlSizeBytes }),
      updated_at: new Date().toISOString()
    };

    if (existingTeam) {
      const { error } = await supabase
        .from('leaderboard')
        .update(payload)
        .eq('id', existingTeam.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('leaderboard')
        .insert([payload]);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to write' }, { status: 500 });
  }
}
