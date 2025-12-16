import TravelMap from "@/components/layout/travel/TravelMap";
import { isLoggedIn } from "@/utils/getLocalstorage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/(travel)/plan")({
  beforeLoad: ({ location }) => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <TravelMap />;
}
