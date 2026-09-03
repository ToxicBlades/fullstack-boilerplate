export interface Item {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
}

export interface CreateItemBody {
  name: string;
}

export interface PatchItemBody {
  name: string;
}
