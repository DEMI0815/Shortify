import { NextRequest, NextResponse } from 'next/server';
import { connectDB, ShortUrl } from '../db';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  await connectDB();
  const { originalUrl } = await req.json();
  if (!originalUrl) {
    return NextResponse.json({ error: '缺少原始链接' }, { status: 400 });
  }
  const shortId = nanoid(6);
  await ShortUrl.create({ shortId, originalUrl });
  return NextResponse.json({ shortId, originalUrl });
}