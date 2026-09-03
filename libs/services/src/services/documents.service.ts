import { BACK_API_ROUTES } from "../api-routes/back-api-routes";
import type {
  DocumentDownloadUrl,
  DocumentListItem,
  PatchDocumentBody,
  PresignUploadBody,
  PresignUploadResponse,
} from "../types/documents";
import BaseService, {
  type BaseRequestOptions,
  type RawRequestOptions,
} from "./common/base.service";
import {
  handleResponse,
  type StandardResponse,
} from "./common/response.service";

class DocumentsService extends BaseService {
  private base() {
    return BACK_API_ROUTES.DOCUMENTS;
  }

  list(options?: BaseRequestOptions) {
    return this.request<DocumentListItem[]>("GET", this.base(), options);
  }

  presign(body: PresignUploadBody, options?: BaseRequestOptions) {
    return this.request<PresignUploadResponse>(
      "POST",
      `${this.base()}/presign`,
      { ...options, body }
    );
  }

  async putContent(
    documentId: string,
    body: BodyInit,
    mimeType: string,
    options?: RawRequestOptions
  ): Promise<StandardResponse<DocumentListItem>> {
    const response = await this.fetchWithAuth(
      "PUT",
      `${this.base()}/${documentId}/content`,
      {
        ...options,
        body,
        headers: { ...options?.headers, "Content-Type": mimeType },
      }
    );
    return handleResponse<DocumentListItem>(response);
  }

  confirm(documentId: string, options?: BaseRequestOptions) {
    return this.request<DocumentListItem>(
      "POST",
      `${this.base()}/${documentId}/confirm`,
      options
    );
  }

  patch(
    documentId: string,
    body: PatchDocumentBody,
    options?: BaseRequestOptions
  ) {
    return this.request<DocumentListItem>(
      "PATCH",
      `${this.base()}/${documentId}`,
      { ...options, body }
    );
  }

  remove(documentId: string, options?: BaseRequestOptions) {
    return this.request<{ id: string }>(
      "DELETE",
      `${this.base()}/${documentId}`,
      options
    );
  }

  downloadUrl(documentId: string, options?: BaseRequestOptions) {
    return this.request<DocumentDownloadUrl>(
      "GET",
      `${this.base()}/${documentId}/download-url`,
      options
    );
  }

  fetchContent(documentId: string, options?: RawRequestOptions) {
    return this.fetchWithAuth(
      "GET",
      `${this.base()}/${documentId}/content`,
      options
    );
  }
}

export const documentsService = new DocumentsService();
