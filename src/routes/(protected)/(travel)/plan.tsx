import TravelMap from "@/components/layout/travel/TravelMap";
import { getLocalStorage, isLoggedIn } from "@/utils/localstorage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/(travel)/plan")({
  beforeLoad: ({ location }) => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }else{
      console.log(getLocalStorage("userName"));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <TravelMap />;
}
