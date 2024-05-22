import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log(await req.json(), req);
    return NextResponse.json({
      message: "ok",
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
