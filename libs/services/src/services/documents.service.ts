import { BACK_API_ROUTES } from "../api-routes/back-api-routes";
import type {
  CreateDocumentFolderBody,
  DocumentDownloadUrl,
  DocumentFolder,
  DocumentListItem,
  DocumentsCapabilities,
  PatchDocumentBody,
  PatchDocumentFolderBody,
  PresignUploadBody,
  PresignUploadResponse,
  RecipeImageBrowseItem,
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
  private base(groupId: string) {
    return `${BACK_API_ROUTES.GROUPS}/${groupId}/${BACK_API_ROUTES.DOCUMENTS}`;
  }

  private foldersBase(groupId: string) {
    return `${this.base(groupId)}/folders`;
  }

  listFolders(groupId: string, options?: BaseRequestOptions) {
    return this.request<DocumentFolder[]>(
      "GET",
      this.foldersBase(groupId),
      options
    );
  }

  createFolder(
    groupId: string,
    body: CreateDocumentFolderBody,
    options?: BaseRequestOptions
  ) {
    return this.request<DocumentFolder>("POST", this.foldersBase(groupId), {
      ...options,
      body,
    });
  }

  patchFolder(
    groupId: string,
    folderId: string,
    body: PatchDocumentFolderBody,
    options?: BaseRequestOptions
  ) {
    return this.request<DocumentFolder>(
      "PATCH",
      `${this.foldersBase(groupId)}/${folderId}`,
      { ...options, body }
    );
  }

  deleteFolder(
    groupId: string,
    folderId: string,
    options?: BaseRequestOptions
  ) {
    return this.request<{ id: string }>(
      "DELETE",
      `${this.foldersBase(groupId)}/${folderId}`,
      options
    );
  }

  capabilities(groupId: string, options?: BaseRequestOptions) {
    return this.request<DocumentsCapabilities>(
      "GET",
      `${this.base(groupId)}/capabilities`,
      options
    );
  }

  list(groupId: string, options?: BaseRequestOptions) {
    return this.request<DocumentListItem[]>("GET", this.base(groupId), options);
  }

  listRecipeImages(groupId: string, options?: BaseRequestOptions) {
    return this.request<RecipeImageBrowseItem[]>(
      "GET",
      `${this.base(groupId)}/recipe-images`,
      options
    );
  }

  presign(
    groupId: string,
    body: PresignUploadBody,
    options?: BaseRequestOptions
  ) {
    return this.request<PresignUploadResponse>(
      "POST",
      `${this.base(groupId)}/presign`,
      { ...options, body }
    );
  }

  async putContent(
    groupId: string,
    documentId: string,
    body: BodyInit,
    mimeType: string,
    options?: RawRequestOptions
  ): Promise<StandardResponse<DocumentListItem>> {
    const response = await this.fetchWithAuth(
      "PUT",
      `${this.base(groupId)}/${documentId}/content`,
      {
        ...options,
        body,
        headers: { ...options?.headers, "Content-Type": mimeType },
      }
    );
    return handleResponse<DocumentListItem>(response);
  }

  confirm(groupId: string, documentId: string, options?: BaseRequestOptions) {
    return this.request<DocumentListItem>(
      "POST",
      `${this.base(groupId)}/${documentId}/confirm`,
      options
    );
  }

  patch(
    groupId: string,
    documentId: string,
    body: PatchDocumentBody,
    options?: BaseRequestOptions
  ) {
    return this.request<DocumentListItem>(
      "PATCH",
      `${this.base(groupId)}/${documentId}`,
      { ...options, body }
    );
  }

  remove(groupId: string, documentId: string, options?: BaseRequestOptions) {
    return this.request<{ id: string }>(
      "DELETE",
      `${this.base(groupId)}/${documentId}`,
      options
    );
  }

  downloadUrl(
    groupId: string,
    documentId: string,
    options?: BaseRequestOptions
  ) {
    return this.request<DocumentDownloadUrl>(
      "GET",
      `${this.base(groupId)}/${documentId}/download-url`,
      options
    );
  }

  fetchContent(
    groupId: string,
    documentId: string,
    options?: RawRequestOptions
  ) {
    return this.fetchWithAuth(
      "GET",
      `${this.base(groupId)}/${documentId}/content`,
      options
    );
  }
}

export const documentsService = new DocumentsService();
