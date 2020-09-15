import FrontLayout from "@/hoc/FrontLayout";
import AdminLayout from "@/hoc/AdminLayout";
import About from "@/containers/About";
import Home from "@/containers/Home";
import React from "react";

function renderWithLayout(Layout, Component) {
  return <Layout> <Component/></Layout>
}

export default [
  {path: "/", Component: Home, name: "Домашняя", title: 'Главная'},
  {path: "/about", Component: About, name: "Обо мне", title: 'Обо мне'}
];
