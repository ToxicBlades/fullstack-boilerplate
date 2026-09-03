import type { LegalAcceptances } from "./legal";

export interface AiProviderKeysSet {
  openai: boolean;
}

export interface AuthUser {
  aiProviderKeysSet: AiProviderKeysSet;
  avatarUrl: string | null;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  legalAcceptances: LegalAcceptances;
  timezone: string;
}

export interface PatchProfileBody {
  avatarUrl?: string | null;
  fullName?: string;
  timezone?: string;
}

export interface PatchAiProviderKeysBody {
  openai?: string | "";
}

export interface PresignAvatarBody {
  filename?: string;
  mimeType: string;
  sizeBytes: number;
}

export interface AvatarPresignResponse {
  headers: Record<string, string>;
  method: "PUT";
  publicUrl: string;
  storageKey: string;
  uploadUrl: string;
}

export interface DeleteAccountBody {
  confirmation: "DELETE MY ACCOUNT";
}

export interface DeleteAccountResponse {
  deleted: true;
}

export interface DataRequestResponse {
  email: string;
  sent: true;
}

export interface AcceptLegalBody {
  acceptances: LegalAcceptances;
}
