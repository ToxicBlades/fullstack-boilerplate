import {
  checkS3Connection,
  createDownloadUrl,
  createUploadUrl,
  deleteObject,
  getObject,
  isS3Configured,
  listObjects,
  putObject,
} from "@/common/storage/s3";

export const storageService = {
  checkConnection: checkS3Connection,
  download: getObject,
  isConfigured: isS3Configured,
  list: listObjects,
  presignDownload: createDownloadUrl,
  presignUpload: createUploadUrl,
  remove: deleteObject,
  upload: putObject,
};
