import { Outlet, redirect, createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/(protected)/_layout")({
  beforeLoad: ({ location }) => {
    
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
