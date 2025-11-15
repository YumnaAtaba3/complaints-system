import React from "react";
import { Outlet } from "react-router-dom";

export function LayoutContainer() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
