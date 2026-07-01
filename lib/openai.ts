import OpenAI from "openai";
import type { Response } from "openai/resources/responses/responses";

let openaiClient: OpenAI | null = null;

export const AI_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
}

function getFastReasoningConfig(model: string) {
  const normalized = model.toLowerCase();

  if (normalized.startsWith("gpt-5.1")) {
    return { effort: "low" as const };
  }

  if (normalized.startsWith("gpt-5") || normalized.startsWith("o")) {
    return { effort: "low" as const };
  }

  return undefined;
}

function extractResponseText(response: Response) {
  const directText = response.output_text?.trim();
  if (directText) {
    return directText;
  }

  return response.output
    .flatMap((item) => (item.type === "message" ? item.content : []))
    .map((part) => {
      if (part.type === "output_text") {
        return part.text;
      }

      if (part.type === "refusal") {
        return part.refusal;
      }

      return "";
    })
    .join("")
    .trim();
}

export async function generateAIText({
  instructions,
  input,
  maxOutputTokens = 900,
  verbosity = "low",
  jsonSchema,
}: {
  instructions: string;
  input: string;
  maxOutputTokens?: number;
  verbosity?: "low" | "medium" | "high";
  jsonSchema?: {
    name: string;
    description?: string;
    schema: Record<string, unknown>;
  };
}) {
  const reasoning = getFastReasoningConfig(AI_MODEL);

  async function createResponse(tokenBudget: number) {
    return getOpenAIClient().responses.create({
      model: AI_MODEL,
      instructions,
      input,
      max_output_tokens: tokenBudget,
      store: false,
      text: {
        verbosity,
        ...(jsonSchema
          ? {
              format: {
                type: "json_schema" as const,
                name: jsonSchema.name,
                description: jsonSchema.description,
                schema: jsonSchema.schema,
                strict: true,
              },
            }
          : {}),
      },
      ...(reasoning ? { reasoning } : {}),
    });
  }

  const firstResponse = await createResponse(maxOutputTokens);
  const firstText = extractResponseText(firstResponse);
  if (firstText && firstResponse.status !== "incomplete") {
    return firstText;
  }

  console.warn("OpenAI response was empty or incomplete; retrying with larger budget.", {
    model: AI_MODEL,
    status: firstResponse.status,
    incompleteReason: firstResponse.incomplete_details?.reason,
    maxOutputTokens,
  });

  const retryResponse = await createResponse(Math.max(maxOutputTokens * 2, 1600));
  const retryText = extractResponseText(retryResponse);
  if (retryText && retryResponse.status !== "incomplete") {
    return retryText;
  }

  throw new Error(
    `OpenAI response was empty. status=${retryResponse.status}, reason=${
      retryResponse.incomplete_details?.reason ?? "unknown"
    }`,
  );
}
