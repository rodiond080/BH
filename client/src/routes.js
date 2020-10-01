import FrontLayout from "@/hoc/FrontLayout";
import AdminLayout from "@/hoc/AdminLayout";
import AdminAbout from "@/containers/AdminAbout";
import About from "@/containers/About";
import Home from "@/containers/Home";
import React from "react";

const renderWithLayout = (Layout, Component)=> {
  const result = (props)=>{
    return <Layout props={props} ><Component/></Layout>
  }
  return result;
}

export default [
  {path: "/", Component: renderWithLayout(FrontLayout, Home), name: 'Домашняя', title: 'Главная'},
  {path: "/about", Component: renderWithLayout(FrontLayout, About), name: 'Обо мне', title: 'Обо мне'},
  {path: "/admin", Component: renderWithLayout(AdminLayout, AdminAbout), name: '1', title: '2'}
];
