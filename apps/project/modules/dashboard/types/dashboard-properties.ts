import type { AuthUser } from "../../auth/types/auth-user";
import type { DocumentListItem } from "../../documents/types/document-list-item";
import type { Item } from "../../items/types/item";

export interface DashboardProperties {
  user: AuthUser;
  initialDocuments: DocumentListItem[];
  initialItems: Item[];
}
