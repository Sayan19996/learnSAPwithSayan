import { NextResponse } from "next/server";
import { recordEvent, getCounts } from "@/lib/analytics";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.type) return NextResponse.json({ ok: false }, { status: 400 });
    recordEvent(body.type, body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('track error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type') || undefined;
  const counts = getCounts(type);
  return NextResponse.json({ ok: true, counts });
}
