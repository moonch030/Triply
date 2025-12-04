import ComponentsDemo from "@/components/layout/ComponentsDemo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComponentsDemo />;
}
