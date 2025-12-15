import { Outlet, redirect, createFileRoute } from "@tanstack/react-router";
import { getToken } from "@/utils/cookie";
import React from "react";

export const Route = createFileRoute("/(protected)/_layout")({
  beforeLoad: ({ location }) => {
    const token = getToken();

    console.log("????????????", token)
    if (!token) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
