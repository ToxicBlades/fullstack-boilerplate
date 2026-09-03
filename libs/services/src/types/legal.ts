export const LEGAL_DOCUMENT_IDS = ["terms", "privacy"] as const;

export type LegalDocumentId = (typeof LEGAL_DOCUMENT_IDS)[number];
export type LegalAcceptances = Partial<Record<LegalDocumentId, string>>;
