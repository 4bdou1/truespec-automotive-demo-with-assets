"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <ErrorState
        title="Admin demo hit an error"
        description="Try again — this is a client-only demo, so nothing was lost on the server."
        action={
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
        }
      />
    </div>
  );
}
