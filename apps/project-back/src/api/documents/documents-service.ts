import { randomUUID } from "node:crypto";
import { db } from "@/db/knex";
import {
  createDownloadUrl,
  createUploadUrl,
  deleteObject,
  isS3Configured,
} from "@/common/storage/s3";

function toDocument(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    storageKey: row.storage_key,
    mimeType: row.mime_type,
    sizeBytes: Number(row.size_bytes),
    uploadedBy: row.uploaded_by,
    uploadConfirmed: row.upload_confirmed,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    folderId: null,
    storage: "s3" as const,
    url: null,
  };
}

export const documentsService = {
  async list(userId: string) {
    const rows = await db("documents")
      .where({ uploaded_by: userId })
      .orderBy("created_at", "desc");
    return rows.map(toDocument);
  },

  async presign(
    userId: string,
    body: {
      filename: string;
      mimeType: string;
      sizeBytes: number;
      title: string;
    }
  ) {
    if (!isS3Configured())
      throw new Error("RustFS/S3 storage is not configured");
    const id = randomUUID();
    const filename = body.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storageKey = `${userId}/${id}-${filename}`;
    await db("documents").insert({
      id,
      title: body.title,
      storage_key: storageKey,
      mime_type: body.mimeType,
      size_bytes: body.sizeBytes,
      uploaded_by: userId,
    });
    return {
      documentId: id,
      headers: { "Content-Type": body.mimeType },
      method: "PUT" as const,
      storage: "s3" as const,
      storageKey,
      uploadUrl: await createUploadUrl(storageKey, body.mimeType),
    };
  },

  async confirm(userId: string, id: string) {
    const row = await db("documents")
      .where({ id, uploaded_by: userId })
      .first();
    if (!row) return null;
    await db("documents").where({ id }).update({ upload_confirmed: true });
    return toDocument({ ...row, upload_confirmed: true });
  },

  async update(userId: string, id: string, title: string) {
    const count = await db("documents")
      .where({ id, uploaded_by: userId })
      .update({ title });
    if (!count) return null;
    return toDocument(await db("documents").where({ id }).first());
  },

  async remove(userId: string, id: string) {
    const row = await db("documents")
      .where({ id, uploaded_by: userId })
      .first();
    if (!row) return false;
    await deleteObject(row.storage_key);
    await db("documents").where({ id }).del();
    return true;
  },

  async downloadUrl(userId: string, id: string) {
    const row = await db("documents")
      .where({ id, uploaded_by: userId })
      .first();
    if (!row) return null;
    return {
      downloadUrl: await createDownloadUrl(row.storage_key),
      storage: "s3" as const,
    };
  },
};
