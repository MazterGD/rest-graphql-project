import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }

  // Fetch comments for the specific post
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
