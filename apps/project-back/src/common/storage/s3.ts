import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/config/env";

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export function isS3Configured(): boolean {
  return Boolean(
    env.S3_BUCKET && env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY
  );
}

export function getS3Client(): S3Client {
  if (!isS3Configured()) {
    throw new Error("S3 is not configured");
  }
  return new S3Client({
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    region: env.AWS_REGION,
    ...(env.S3_ENDPOINT
      ? { endpoint: env.S3_ENDPOINT, forcePathStyle: true }
      : {}),
  });
}

export function assertValidKey(key: string): string {
  const normalized = key.trim();
  if (!normalized || normalized.startsWith("/") || normalized.includes("..")) {
    throw new Error("Object key must be a non-empty relative path");
  }
  return normalized;
}

export async function checkS3Connection() {
  await getS3Client().send(new HeadBucketCommand({ Bucket: env.S3_BUCKET }));
}

export async function listObjects(prefix = "") {
  const output = await getS3Client().send(
    new ListObjectsV2Command({ Bucket: env.S3_BUCKET, Prefix: prefix })
  );
  return (output.Contents ?? []).map((object) => ({
    etag: object.ETag,
    key: object.Key,
    lastModified: object.LastModified,
    size: object.Size ?? 0,
  }));
}

export async function putObject(
  key: string,
  body: Buffer,
  contentType = "application/octet-stream"
) {
  if (body.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("Object is larger than the 25 MB upload limit");
  }
  await getS3Client().send(
    new PutObjectCommand({
      Body: body,
      Bucket: env.S3_BUCKET,
      ContentType: contentType,
      Key: assertValidKey(key),
    })
  );
}

export function getObject(key: string) {
  return getS3Client().send(
    new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: assertValidKey(key) })
  );
}

export async function deleteObject(key: string) {
  await getS3Client().send(
    new DeleteObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: assertValidKey(key),
    })
  );
}

export function createUploadUrl(key: string, contentType?: string) {
  return getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: assertValidKey(key),
      ...(contentType ? { ContentType: contentType } : {}),
    }),
    { expiresIn: 900 }
  );
}

export function createDownloadUrl(key: string) {
  return getSignedUrl(
    getS3Client(),
    new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: assertValidKey(key) }),
    { expiresIn: 900 }
  );
}
