import { randomUUID } from "node:crypto";
import {
  createDownloadUrl,
  createUploadUrl,
  deleteObject,
  isS3Configured,
} from "@/common/storage/s3";
import { db } from "@/db/knex";

function toDocument(row: Record<string, unknown>) {
  return {
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    folderId: null,
    id: row.id,
    mimeType: row.mime_type,
    sizeBytes: Number(row.size_bytes),
    storage: "s3" as const,
    storageKey: row.storage_key,
    title: row.title,
    uploadConfirmed: row.upload_confirmed,
    uploadedBy: row.uploaded_by,
    url: null,
  };
}

export const documentsService = {
  async confirm(userId: string, id: string) {
    const row = await db("documents")
      .where({ id, uploaded_by: userId })
      .first();
    if (!row) {
      return null;
    }
    await db("documents").where({ id }).update({ upload_confirmed: true });
    return toDocument({ ...row, upload_confirmed: true });
  },

  async downloadUrl(userId: string, id: string) {
    const row = await db("documents")
      .where({ id, uploaded_by: userId })
      .first();
    if (!row) {
      return null;
    }
    return {
      downloadUrl: await createDownloadUrl(row.storage_key),
      storage: "s3" as const,
    };
  },
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
    if (!isS3Configured()) {
      throw new Error("RustFS/S3 storage is not configured");
    }
    const id = randomUUID();
    const filename = body.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storageKey = `${userId}/${id}-${filename}`;
    await db("documents").insert({
      id,
      mime_type: body.mimeType,
      size_bytes: body.sizeBytes,
      storage_key: storageKey,
      title: body.title,
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

  async remove(userId: string, id: string) {
    const row = await db("documents")
      .where({ id, uploaded_by: userId })
      .first();
    if (!row) {
      return false;
    }
    await deleteObject(row.storage_key);
    await db("documents").where({ id }).del();
    return true;
  },

  async update(userId: string, id: string, title: string) {
    const count = await db("documents")
      .where({ id, uploaded_by: userId })
      .update({ title });
    if (!count) {
      return null;
    }
    return toDocument(await db("documents").where({ id }).first());
  },
};
