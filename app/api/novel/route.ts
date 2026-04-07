import { NextResponse } from 'next/server';
import { getNovelOfTheMonth } from '../../../lib/content';

export async function GET() {
  const novel = await getNovelOfTheMonth();
  return NextResponse.json(novel);
}

