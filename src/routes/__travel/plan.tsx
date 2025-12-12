import TravelMap from "@/components/layout/travel/TravelMap";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__travel/plan")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TravelMap />;
}
