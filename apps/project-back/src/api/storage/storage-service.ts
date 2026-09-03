import {
  checkS3Connection,
  createDownloadUrl,
  createUploadUrl,
  deleteObject,
  getObject,
  isS3Configured,
  listObjects,
  putObject,
} from "@/common/storage/s3.js";

export const storageService = {
  isConfigured: isS3Configured,
  checkConnection: checkS3Connection,
  list: listObjects,
  upload: putObject,
  download: getObject,
  remove: deleteObject,
  presignUpload: createUploadUrl,
  presignDownload: createDownloadUrl,
};
