"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { ErrorState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20">
      <ErrorState
        title="Something went wrong"
        description="This part of the showroom didn't load. Try again, or head back to inventory."
        action={
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
        }
      />
    </Container>
  );
}
