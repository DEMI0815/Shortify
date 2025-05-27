import { NextRequest, NextResponse } from 'next/server';
import { connectDB, ShortUrl } from '../../db';

export async function GET(req: NextRequest, { params }: { params: { shortId: string } }) {
  await connectDB();
  const { shortId } = params;
  const shortUrl = await ShortUrl.findOne({ shortId });
  if (shortUrl) {
    return NextResponse.json({ clicks: shortUrl.clicks, createdAt: shortUrl.createdAt });
  } else {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}