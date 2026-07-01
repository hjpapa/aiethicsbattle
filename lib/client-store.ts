"use client";

import type { DebateMessage, DebateSetup, ReviewResult } from "@/types/debate";

const SETUP_KEY = "ai-ethics-debate-setup";
const MESSAGES_KEY = "ai-ethics-debate-messages";
const REVIEW_KEY = "ai-ethics-debate-review-v2";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDebateSetup() {
  return readJson<DebateSetup>(SETUP_KEY, {});
}

export function patchDebateSetup(patch: DebateSetup) {
  const next = { ...getDebateSetup(), ...patch };
  writeJson(SETUP_KEY, next);
  return next;
}

export function resetDebate() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SETUP_KEY);
  window.localStorage.removeItem(MESSAGES_KEY);
  window.localStorage.removeItem(REVIEW_KEY);
}

export function getStoredMessages() {
  return readJson<DebateMessage[]>(MESSAGES_KEY, []);
}

export function setStoredMessages(messages: DebateMessage[]) {
  writeJson(MESSAGES_KEY, messages);
}

export function getStoredReview() {
  return readJson<ReviewResult | null>(REVIEW_KEY, null);
}

export function setStoredReview(review: ReviewResult) {
  writeJson(REVIEW_KEY, review);
}
