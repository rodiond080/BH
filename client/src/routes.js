import FrontLayout from "@/hoc/FrontLayout";
import About from "@/containers/About";
import Home from "@/containers/Home";
import Cakes from "@/containers/Cakes";
import AdminLayout from "@/hoc/AdminLayout";
import AdminAbout from "@/containers/AdminAbout";
import AdminCakes from "@/containers/AdminCakes";
import AdminCakeCategory from "@/containers/AdminCakeCategory";
import AdminCakeEdit from "@/containers/AdminCakeEdit";
import React from "react";

const renderWithLayout = (Layout, Component) => {
  const result = (props) => {
    return <Layout props={props}><Component /></Layout>
  }
  return result;
}

export default [
  {path: "/", Component: renderWithLayout(FrontLayout, Home), name: 'Домашняя', title: 'Главная'},
  {path: "/about", Component: renderWithLayout(FrontLayout, About), name: 'Обо мне', title: 'Обо мне'},
  {path: "/cakes/:category", Component: renderWithLayout(FrontLayout, Cakes), name: 'Торты', title: 'Торты'},

  {path: "/admin", Component: renderWithLayout(AdminLayout, AdminAbout), name: 'Редактирование раздела "Кондитер"', title: 'Редактирование раздел "Кондитер"'},
  {path: "/admin/cakes", Component: renderWithLayout(AdminLayout, AdminCakes), name: 'Редактирование раздела "Торты"', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/:category", Component: renderWithLayout(AdminLayout, AdminCakeCategory), name: 'Редактирование раздела "Торты/Категория"', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/:category/edit/:cake", Component: renderWithLayout(AdminLayout, AdminCakeEdit), name: 'Редактирование торта ', title: 'Редактирование раздел "Торты"'},
];
