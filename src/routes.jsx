import React from "react";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", component: React.lazy(() => import("./components/pages/Dashboard")) },
];

export default routes;
