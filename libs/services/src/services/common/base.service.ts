import { envShared } from "../../env-config";
import {
  handleError,
  handleResponse,
  type StandardResponse,
} from "./response.service";

const TRAILING_SLASH = /\/$/;
const LEADING_SLASH = /^\//;

export function joinApiUrl(path: string, baseOverride?: string): string {
  const base = (baseOverride ?? envShared.BACK_API_BASE_URL).replace(
    TRAILING_SLASH,
    ""
  );
  if (!base) {
    throw new Error(
      "BACK_API_BASE_URL is not set and no baseUrl was passed in request options"
    );
  }
  return `${base}/${path.replace(LEADING_SLASH, "")}`;
}

export interface BaseRequestOptions {
  baseUrl?: string;
  body?: unknown;
  init?: RequestInit;
  token?: string;
}

export interface RawRequestOptions {
  baseUrl?: string;
  body?: BodyInit | null;
  headers?: HeadersInit;
  init?: Omit<RequestInit, "body" | "method" | "headers">;
  token?: string;
}

abstract class BaseService {
  protected getHeaders(contentType: boolean, options?: BaseRequestOptions) {
    const headers = new Headers(options?.init?.headers);
    if (options?.token) {
      headers.set("Authorization", `Bearer ${options.token}`);
    }
    if (contentType && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  }

  protected async request<T>(
    method: string,
    path: string,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<T>> {
    const hasBody = options?.body !== undefined;
    try {
      const response = await fetch(joinApiUrl(path, options?.baseUrl), {
        ...options?.init,
        body: hasBody ? JSON.stringify(options.body) : undefined,
        credentials:
          options?.init?.credentials ?? (options?.token ? "omit" : "include"),
        headers: this.getHeaders(hasBody, options),
        method,
      });
      return await handleResponse<T>(response);
    } catch (error: unknown) {
      return handleError<T>(error);
    }
  }

  protected fetchWithAuth(
    method: string,
    path: string,
    options?: RawRequestOptions
  ): Promise<Response> {
    const headers = new Headers(options?.headers);
    if (options?.token) {
      headers.set("Authorization", `Bearer ${options.token}`);
    }
    return fetch(joinApiUrl(path, options?.baseUrl), {
      ...options?.init,
      body: options?.body ?? undefined,
      credentials:
        options?.init?.credentials ?? (options?.token ? "omit" : "include"),
      headers,
      method,
    });
  }
}

export default BaseService;
