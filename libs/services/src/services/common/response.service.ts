import type { ServiceResponseEnvelope } from "../../types/common/service-response";

export interface StandardResponse<T> {
  data: T | null;
  errorMessage?: string;
  meta?: unknown;
  status: number;
  success: boolean;
}

function isServiceEnvelope(
  value: unknown
): value is ServiceResponseEnvelope<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    "success" in value &&
    "responseObject" in value &&
    typeof (value as { success?: unknown }).success === "boolean"
  );
}

export async function handleResponse<T>(
  response: Response
): Promise<StandardResponse<T>> {
  const text = await response.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    return {
      data: null,
      status: response.status,
      success: false,
      errorMessage: "Failed to parse response JSON.",
    };
  }

  if (isServiceEnvelope(json)) {
    const success = json.success && response.ok;
    return {
      data: (json.responseObject ?? null) as T | null,
      status: json.statusCode ?? response.status,
      success,
      errorMessage: success ? undefined : json.message,
    };
  }
  return {
    data: json as T,
    status: response.status,
    success: response.ok,
    errorMessage: response.ok ? undefined : "Request failed",
  };
}

export function handleError<T>(error: unknown): StandardResponse<T> {
  const err = error as { status?: number; message?: string };
  return {
    data: null,
    status: err.status ?? 500,
    success: false,
    errorMessage: err.message ?? "An unknown error occurred.",
  };
}
