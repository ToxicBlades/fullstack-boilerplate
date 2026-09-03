"use client";

import { Button } from "@project/design-system/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { signOut } from "../../auth/actions/auth";
import { DocumentsPanel } from "../../documents/component/documents-panel";
import { ItemsPanel } from "../../items/component/items-panel";
import type { DashboardProperties } from "../types/dashboard-properties";
import type { View } from "../types/view";

export function Dashboard({
  user,
  initialDocuments,
  initialItems,
}: DashboardProperties) {
  const [view, setView] = useState<View>("items");
  const router = useRouter();
  const firstName = useMemo(
    () => user.fullName?.split(" ")[0] || user.email,
    [user]
  );
  async function handleSignOut() {
    await signOut();
    router.replace("/auth");
  }

  const navigation = [
    { label: "Items", count: initialItems.length, value: "items" as const },
    {
      label: "Documents",
      count: initialDocuments.length,
      value: "documents" as const,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/80">
      <header className="border-slate-200/80 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-slate-950 font-bold text-sm text-white shadow-sm">
              W
            </div>
            <div>
              <p className="font-semibold text-slate-950 text-sm tracking-tight">
                Workspace
              </p>
              <p className="hidden text-slate-500 text-xs sm:block">
                Your personal command centre
              </p>
            </div>
          </div>
          <Button
            className="h-9 border-slate-200 bg-white px-3 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            onClick={handleSignOut}
            variant="outline"
          >
            Sign out
          </Button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-8">
          <p className="mb-2 font-medium text-slate-500 text-sm">Overview</p>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-semibold text-3xl text-slate-950 tracking-tight sm:text-4xl">
                Good to see you, {firstName}
              </h1>
              <p className="mt-2 text-slate-500 text-sm">
                Keep your work organised and easy to find.
              </p>
            </div>
            <p className="text-slate-500 text-sm">
              {initialItems.length + initialDocuments.length} total records
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Items tracked", value: initialItems.length },
            { label: "Documents stored", value: initialDocuments.length },
          ].map((stat) => (
            <div
              className="rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-slate-200/40 shadow-sm"
              key={stat.label}
            >
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <p className="mt-2 font-semibold text-2xl text-slate-950 tracking-tight">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <nav className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-slate-200/40 shadow-sm">
            <p className="px-3 pt-2 pb-2 font-semibold text-slate-400 text-xs uppercase tracking-wider">
              Manage
            </p>
            {navigation.map((entry) => (
              <button
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-medium text-sm transition-colors ${
                  view === entry.value
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
                key={entry.value}
                onClick={() => setView(entry.value)}
                type="button"
              >
                {entry.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${view === entry.value ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  {entry.count}
                </span>
              </button>
            ))}
          </nav>
          <section className="min-w-0">
            {view === "items" ? (
              <ItemsPanel initialItems={initialItems} />
            ) : (
              <DocumentsPanel initialDocuments={initialDocuments} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
