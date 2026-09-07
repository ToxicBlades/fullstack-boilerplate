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
import { useCallback, useState } from "react";
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
  const save = useCallback(
    async (event: React.FormEvent) => {
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
    },
    [editing, file, title]
  );
  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setTitle(event.target.value),
    []
  );
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFile(event.target.files?.[0] ?? null),
    []
  );
  const cancelEditing = useCallback(() => {
    setEditing(null);
    setTitle("");
  }, []);
  const editDocument = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setEditing(event.currentTarget.dataset.id ?? null);
      setTitle(event.currentTarget.dataset.title ?? "");
    },
    []
  );
  const removeDocument = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const { id } = event.currentTarget.dataset;
      if (!id) {
        return;
      }
      const result = await deleteDocument(id);
      if (result.success) {
        setDocuments((current) =>
          current.filter((document) => document.id !== id)
        );
      } else {
        setError(result.errorMessage ?? "Could not delete document.");
      }
    },
    []
  );
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
            onChange={handleTitleChange}
            placeholder={editing ? "Document title…" : "Title"}
            required
            value={title}
          />
          {!editing && (
            <Input
              aria-label="Document file"
              onChange={handleFileChange}
              required
              type="file"
            />
          )}
          {editing && (
            <Button onClick={cancelEditing} type="button" variant="ghost">
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
                    data-id={document.id}
                    data-title={document.title}
                    onClick={editDocument}
                    size="sm"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-red-600 hover:text-red-700"
                    data-id={document.id}
                    onClick={removeDocument}
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
