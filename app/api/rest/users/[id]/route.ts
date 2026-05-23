import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Demonstrating over-fetching: Returns the full user profile including
  // email, avatar_url, created_at, even if we only need the 'name'
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
