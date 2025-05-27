import { NextRequest, NextResponse } from 'next/server';
import { connectDB, ShortUrl } from '../db';

interface IShortRequest {
  params: any
}

export async function GET(req: NextRequest, { params }: IShortRequest) {
  await connectDB();
  const { shortId } = params;
  const shortUrl = await ShortUrl.findOne({ shortId });
  if (shortUrl) {
    shortUrl.clicks += 1;
    await shortUrl.save();
    return NextResponse.redirect(shortUrl.originalUrl);
  } else {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}