"use server";

import type { DocumentListItem } from "@project/services";
import type { StandardResponse } from "@project/services/server";
import { documentsService } from "@project/services/server";
import { sessionOptions } from "../../auth/lib/session-options";

export async function renameDocument(id: string, title: string) {
  return documentsService.patch(id, { title }, await sessionOptions());
}
export async function deleteDocument(id: string) {
  return documentsService.remove(id, await sessionOptions());
}
export async function uploadDocument(
  title: string,
  file: File
): Promise<StandardResponse<DocumentListItem>> {
  const options = await sessionOptions();
  const presign = await documentsService.presign(
    {
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      title,
    },
    options
  );
  if (!(presign.success && presign.data)) {
    return {
      data: null,
      errorMessage: presign.errorMessage ?? "Could not prepare upload.",
      status: presign.status,
      success: false,
    };
  }
  const upload = await fetch(presign.data.uploadUrl, {
    body: await file.arrayBuffer(),
    headers: presign.data.headers,
    method: presign.data.method,
  });
  if (!upload.ok) {
    return {
      data: null,
      errorMessage: "Upload failed.",
      status: upload.status,
      success: false,
    };
  }
  return documentsService.confirm(presign.data.documentId, options);
}
