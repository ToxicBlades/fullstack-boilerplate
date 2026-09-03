import { redirect } from "next/navigation";
import {
  authService,
  documentsService,
  itemsService,
} from "@project/services/server";
import { Dashboard } from "../modules/dashboard/component/dashboard";
import { sessionOptions } from "../modules/auth/lib/session-options";

export default async function Home() {
  const options = await sessionOptions();
  const [session, items, documents] = await Promise.all([
    authService.me(options),
    itemsService.list(options),
    documentsService.list(options),
  ]);

  if (!session.success || !session.data) redirect("/auth");

  return (
    <Dashboard
      initialDocuments={documents.data ?? []}
      initialItems={items.data ?? []}
      user={session.data}
    />
  );
}
