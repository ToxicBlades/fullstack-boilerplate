"use client";

import { Button } from "@project/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@project/design-system/components/ui/card";
import { Input } from "@project/design-system/components/ui/input";
import { useState } from "react";
import { deleteItem, saveItem } from "../actions/items";
import type { Item } from "../types/item";

export function ItemsPanel({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }
    setBusy(true);
    const result = await saveItem(name.trim(), editing ?? undefined);
    if (result.success && result.data) {
      const savedItem = result.data;
      setItems((current) =>
        editing
          ? current.map((item) => (item.id === editing ? savedItem : item))
          : [savedItem, ...current]
      );
      setName("");
      setEditing(null);
    } else {
      setError(result.errorMessage ?? "Could not save item.");
    }
    setBusy(false);
  }
  async function remove(id: string) {
    const result = await deleteItem(id);
    if (result.success) {
      setItems((current) => current.filter((item) => item.id !== id));
    } else {
      setError(result.errorMessage ?? "Could not delete item.");
    }
  }
  return (
    <Card className="gap-0 overflow-hidden border-slate-200/80 shadow-slate-200/40 shadow-sm">
      <CardHeader className="border-slate-100 border-b bg-white pt-6 pb-5">
        <CardTitle className="text-lg">Items</CardTitle>
        <CardDescription>
          Keep a lightweight list of anything you need to track.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 bg-slate-50/40 py-6">
        <form className="flex flex-col gap-2 sm:flex-row" onSubmit={save}>
          <Input
            aria-label="Item name"
            onChange={(event) => setName(event.target.value)}
            placeholder={editing ? "Rename item…" : "Add an item…"}
            value={name}
          />
          <Button disabled={busy}>{editing ? "Save" : "Add"}</Button>
          {editing && (
            <Button
              onClick={() => {
                setEditing(null);
                setName("");
              }}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
          )}
        </form>
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-red-700 text-sm">
            {error}
          </p>
        )}
        <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200/80 bg-white">
          {items.length ? (
            items.map((item) => (
              <div
                className="flex min-h-14 items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-slate-50"
                key={item.id}
              >
                <span className="truncate font-medium text-sm">
                  {item.name}
                </span>
                <div className="flex gap-1">
                  <Button
                    onClick={() => {
                      setEditing(item.id);
                      setName(item.name);
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-red-600 hover:text-red-700"
                    onClick={async () => {
                      await remove(item.id);
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="px-4 py-8 text-center text-muted-foreground text-sm">
              No items yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
