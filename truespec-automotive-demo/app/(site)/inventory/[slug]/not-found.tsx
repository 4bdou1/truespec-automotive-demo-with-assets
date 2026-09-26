import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";

export default function VehicleNotFound() {
  return (
    <Container className="py-20">
      <EmptyState
        title="Vehicle not found"
        description="This listing may have sold or the link may be out of date. Browse current inventory instead."
        action={<LinkButton href="/inventory">View inventory</LinkButton>}
      />
    </Container>
  );
}
