import FrontLayout from "@/hoc/FrontLayout";
import About from "@/containers/About";
import Home from "@/containers/Home";
import React from "react";

function renderWithLayout(Layout, Component ) {
  return <Layout > <Component  /></Layout>
}

export default [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About }
];
