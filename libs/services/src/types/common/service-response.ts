export interface ServiceResponseEnvelope<T> {
  message?: string;
  responseObject: T | null;
  statusCode?: number;
  success: boolean;
}
