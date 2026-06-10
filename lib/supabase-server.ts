import { randomUUID } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  DebateMessage,
  DebateSetup,
  EthicsTypeCode,
  ReviewResult,
  StudentLevel,
} from "@/types/debate";

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseServerClient) {
    supabaseServerClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseServerClient;
}

export async function createDebateSession(setup: Required<Pick<
  DebateSetup,
  "userType" | "botType" | "studentLevel" | "topicId"
>>) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return undefined;
  }

  const sessionId = randomUUID();
  const { error } = await supabase.from("debate_sessions").insert({
    id: sessionId,
    user_type: setup.userType,
    bot_type: setup.botType,
    student_level: setup.studentLevel,
    topic_id: setup.topicId,
  });

  if (error) {
    console.warn("Failed to create Supabase debate session:", error.message);
    return undefined;
  }

  return sessionId;
}

export async function saveDebateMessage({
  sessionId,
  message,
}: {
  sessionId?: string;
  message: DebateMessage;
}) {
  const supabase = getSupabaseServerClient();
  if (!supabase || !sessionId) {
    return;
  }

  const { error } = await supabase.from("debate_messages").insert({
    session_id: sessionId,
    role: message.role,
    content: message.content,
    stage: message.stage,
    created_at: message.createdAt,
  });

  if (error) {
    console.warn("Failed to save Supabase debate message:", error.message);
  }
}

export async function saveDebateReview({
  sessionId,
  review,
}: {
  sessionId?: string;
  review: ReviewResult;
}) {
  const supabase = getSupabaseServerClient();
  if (!supabase || !sessionId) {
    return;
  }

  const { error } = await supabase.from("debate_reviews").insert({
    session_id: sessionId,
    review,
  });

  if (error) {
    console.warn("Failed to save Supabase debate review:", error.message);
  }
}

export function isEthicsTypeCode(value: unknown): value is EthicsTypeCode {
  return (
    value === "HSH" ||
    value === "HTH" ||
    value === "SSH" ||
    value === "SST" ||
    value === "STT" ||
    value === "HTT" ||
    value === "HST" ||
    value === "STH"
  );
}

export function isStudentLevel(value: unknown): value is StudentLevel {
  return value === "elementary" || value === "middle" || value === "high";
}
