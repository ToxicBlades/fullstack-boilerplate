import { BACK_API_ROUTES } from "../api-routes/back-api-routes";
import type {
  AcceptLegalBody,
  AuthUser,
  AvatarPresignResponse,
  DataRequestResponse,
  DeleteAccountBody,
  DeleteAccountResponse,
  PatchAiProviderKeysBody,
  PatchProfileBody,
  PresignAvatarBody,
} from "../types/auth";
import BaseService, {
  type BaseRequestOptions,
  type RawRequestOptions,
} from "./common/base.service";
import {
  handleError,
  handleResponse,
  type StandardResponse,
} from "./common/response.service";

class AuthService extends BaseService {
  me(options?: BaseRequestOptions): Promise<StandardResponse<AuthUser>> {
    return this.request<AuthUser>("GET", BACK_API_ROUTES.AUTH.ME, options);
  }

  presignAvatar(
    body: PresignAvatarBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<AvatarPresignResponse>> {
    return this.request<AvatarPresignResponse>(
      "POST",
      BACK_API_ROUTES.AUTH.AVATAR_PRESIGN,
      {
        ...options,
        body,
      }
    );
  }

  async putAvatarContent(
    uploadPath: string,
    body: BodyInit,
    mimeType: string,
    options?: RawRequestOptions
  ): Promise<StandardResponse<{ storageKey: string }>> {
    try {
      const response = await this.fetchWithAuth("PUT", uploadPath, {
        ...options,
        body,
        headers: { ...options?.headers, "Content-Type": mimeType },
      });
      return await handleResponse<{ storageKey: string }>(response);
    } catch (error: unknown) {
      return handleError<{ storageKey: string }>(error);
    }
  }

  fetchAvatarContent(
    storageKey: string,
    options?: BaseRequestOptions
  ): Promise<Response> {
    const query = new URLSearchParams({ storageKey });
    return this.fetchWithAuth(
      "GET",
      `${BACK_API_ROUTES.AUTH.AVATAR_CONTENT}?${query}`,
      {
        baseUrl: options?.baseUrl,
        init: options?.init,
        token: options?.token,
      }
    );
  }

  patchMe(
    body: PatchProfileBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<AuthUser>> {
    return this.request<AuthUser>("PATCH", BACK_API_ROUTES.AUTH.ME, {
      ...options,
      body,
    });
  }

  patchAiProviderKeys(
    body: PatchAiProviderKeysBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<AuthUser>> {
    return this.request<AuthUser>(
      "PATCH",
      BACK_API_ROUTES.AUTH.AI_PROVIDER_KEYS,
      {
        ...options,
        body,
      }
    );
  }

  deleteAccountPermanently(
    body: DeleteAccountBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<DeleteAccountResponse>> {
    return this.request<DeleteAccountResponse>(
      "POST",
      BACK_API_ROUTES.AUTH.DELETE_ACCOUNT,
      { ...options, body }
    );
  }

  requestPersonalData(
    options?: BaseRequestOptions
  ): Promise<StandardResponse<DataRequestResponse>> {
    return this.request<DataRequestResponse>(
      "POST",
      BACK_API_ROUTES.AUTH.DATA_REQUEST,
      options
    );
  }

  acceptLegalDocuments(
    body: AcceptLegalBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<AuthUser>> {
    return this.request<AuthUser>(
      "POST",
      BACK_API_ROUTES.AUTH.LEGAL_ACCEPTANCES,
      {
        ...options,
        body,
      }
    );
  }
}

export const authService = new AuthService();
