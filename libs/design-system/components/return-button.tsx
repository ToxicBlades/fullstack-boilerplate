"use client";

import { Button } from "@project/design-system/components/ui/button";
import { cn } from "@project/design-system/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnButtonProps {
  className?: string;
}
export function ReturnButton({ className }: ReturnButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={cn("mr-4", className)}
      onClick={() => router.back()}
      type="button"
      variant="ghost"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
