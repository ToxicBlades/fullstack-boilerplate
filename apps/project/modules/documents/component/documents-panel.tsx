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
import type { StandardResponse } from "@project/services/server";
import { useState } from "react";
import {
  deleteDocument,
  renameDocument,
  uploadDocument,
} from "../actions/documents";
import type { DocumentListItem } from "../types/document-list-item";

export function DocumentsPanel({
  initialDocuments,
}: {
  initialDocuments: DocumentListItem[];
}) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  let buttonLabel = "Upload";
  if (editing) {
    buttonLabel = "Save";
  }
  if (busy) {
    buttonLabel = "Saving…";
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    let result: StandardResponse<DocumentListItem> | null = null;
    if (editing) {
      result = await renameDocument(editing, title.trim());
    } else if (file && title.trim()) {
      result = await uploadDocument(title.trim(), file);
    }
    if (result?.success && result.data) {
      const savedDocument = result.data;
      setDocuments((current) =>
        editing
          ? current.map((document) =>
              document.id === editing ? savedDocument : document
            )
          : [savedDocument, ...current]
      );
      setTitle("");
      setFile(null);
      setEditing(null);
    } else if (result) {
      setError(result.errorMessage ?? "Could not save document.");
    }
    setBusy(false);
  }
  async function remove(id: string) {
    const result = await deleteDocument(id);
    if (result.success) {
      setDocuments((current) =>
        current.filter((document) => document.id !== id)
      );
    } else {
      setError(result.errorMessage ?? "Could not delete document.");
    }
  }
  return (
    <Card className="gap-0 overflow-hidden border-slate-200/80 shadow-slate-200/40 shadow-sm">
      <CardHeader className="border-slate-100 border-b bg-white pt-6 pb-5">
        <CardTitle className="text-lg">Documents</CardTitle>
        <CardDescription>
          Upload, rename, and remove files belonging to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 bg-slate-50/40 py-6">
        <form
          className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={save}
        >
          <Input
            aria-label="Document title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder={editing ? "Document title…" : "Title"}
            required
            value={title}
          />
          {!editing && (
            <Input
              aria-label="Document file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              required
              type="file"
            />
          )}
          {editing && (
            <Button
              onClick={() => {
                setEditing(null);
                setTitle("");
              }}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
          )}
          <Button disabled={busy || !(editing || file)}>{buttonLabel}</Button>
        </form>
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-red-700 text-sm">
            {error}
          </p>
        )}
        <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200/80 bg-white">
          {documents.length ? (
            documents.map((document) => (
              <div
                className="flex min-h-14 items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-slate-50"
                key={document.id}
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-sm">
                    {document.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {document.mimeType} · {Math.ceil(document.sizeBytes / 1024)}{" "}
                    KB
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => {
                      setEditing(document.id);
                      setTitle(document.title);
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-red-600 hover:text-red-700"
                    onClick={async () => {
                      await remove(document.id);
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
              No documents yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
