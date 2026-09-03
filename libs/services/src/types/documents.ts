export type DocumentStorageKind = "postgres" | "s3";

export interface DocumentsCapabilities {
  documentsBucketConfigured: boolean;
  recipesBucketConfigured: boolean;
  s3Configured: boolean;
}

export interface DocumentFolder {
  createdAt: string;
  groupId: string;
  id: string;
  name: string;
  parentId: string | null;
}

export interface CreateDocumentFolderBody {
  name: string;
  parentId?: string | null;
}

export interface PatchDocumentFolderBody {
  name: string;
}

export interface DocumentListItem {
  createdAt: string;
  expiresAt: string | null;
  folderId: string | null;
  groupId: string;
  id: string;
  mimeType: string;
  sizeBytes: number;
  storage: DocumentStorageKind;
  storageKey: string;
  title: string;
  uploadConfirmed: boolean;
  uploadedBy: string;
  url: string | null;
}

export interface PresignUploadBody {
  filename: string;
  folderId?: string | null;
  mimeType: string;
  sizeBytes: number;
  title: string;
}

export interface PresignUploadResponsePostgres {
  documentId: string;
  headers: { "Content-Type": string };
  method: "PUT";
  storage: "postgres";
  uploadUrl: string;
}

export interface PresignUploadResponseS3 {
  documentId: string;
  headers: { "Content-Type": string };
  method: "PUT";
  storage: "s3";
  storageKey: string;
  uploadUrl: string;
}

export type PresignUploadResponse =
  | PresignUploadResponsePostgres
  | PresignUploadResponseS3;

export interface PatchDocumentBody {
  expiresAt?: string | null;
  folderId?: string | null;
  title?: string;
}

export interface DocumentDownloadUrlPostgres {
  downloadUrl: string;
  storage: "postgres";
}

export interface DocumentDownloadUrlS3 {
  downloadUrl: string;
  publicUrl?: string;
  storage: "s3";
}

export type DocumentDownloadUrl =
  | DocumentDownloadUrlPostgres
  | DocumentDownloadUrlS3;

export interface RecipeImageBrowseItem {
  id: string;
  imageUrl: string;
  recipeId: string;
  recipeTitle: string;
}
