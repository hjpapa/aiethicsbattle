import { NextResponse } from "next/server";
import { createDebateSession, isEthicsTypeCode, isStudentLevel } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    !isEthicsTypeCode(body.userType) ||
    !isEthicsTypeCode(body.botType) ||
    !isStudentLevel(body.studentLevel) ||
    typeof body.topicId !== "string"
  ) {
    return NextResponse.json({ error: "Invalid debate session payload." }, { status: 400 });
  }

  const sessionId = await createDebateSession({
    userType: body.userType,
    botType: body.botType,
    studentLevel: body.studentLevel,
    topicId: body.topicId,
  });

  return NextResponse.json({
    sessionId: sessionId ?? null,
    database: Boolean(sessionId),
  });
}
