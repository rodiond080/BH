import FrontLayout from "@/hoc/FrontLayout";
import About from "@/containers/About";
import Home from "@/containers/Home";
import Cakes from "@/containers/Cakes";
import AdminLayout from "@/hoc/AdminLayout";
import AdmAbout from "@/containers/admin/AdmAbout";
import AdmCakeCategories from "@/containers/admin/AdmCakeCategories";
import AdmCakeCategory from "@/containers/admin/AdmCakeCategory";
import AdmEditCake from "@/containers/admin/AdmEditCake";
import AdmEditCakeCategory from "@/containers/admin/AdmEditCakeCategory";
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

  {path: "/admin/main", Component: renderWithLayout(AdminLayout, AdmAbout), name: '', title: 'Администрирование'},
  {path: "/admin/cakes/index/:index", Component: renderWithLayout(AdminLayout, AdmCakeCategories), name: 'Торты', title: 'Торты'},
  {path: "/admin/cakes/index/:index/addcategory", Component: renderWithLayout(AdminLayout, AdmEditCakeCategory), name: 'Добавление новой категории', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/index/:index/categories/:category/edit", Component: renderWithLayout(AdminLayout, AdmEditCakeCategory), name: 'Редактирование раздела "Торты/Категория"', title: 'Редактирование раздел "Торты"'},

  // {path: "/admin/cakes/addcategory", Component: renderWithLayout(AdminLayout, AdmEditCakeCategory), name: 'Добавление новой категории', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/index/:index/categories/:category/page/:catcakepage", Component: renderWithLayout(AdminLayout, AdmCakeCategory), name: 'Торт:', title: 'Категория'},
  {path: "/admin/cakes/index/:index/categories/:category/page/:catcakepage/addcake", Component: renderWithLayout(AdminLayout, AdmEditCake), name: 'Добавление торта"', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/index/:index/categories/:category/page/:catcakepage/edit/:cake", Component: renderWithLayout(AdminLayout, AdmEditCake), name: 'Редактирование торта ', title: 'Редактирование раздел "Торты"'},

  // {path: "/admin/cakes/:category/addcake", Component: renderWithLayout(AdminLayout, AdmEditCake), name: 'Добавление торта"', title: 'Редактирование раздел "Торты"'},

  // {path: "/admin/cakes/categories/:category", Component: renderWithLayout(AdminLayout, AdmCakeCategory), name: 'Редактирование раздела "Торты/Категория"', title: 'Редактирование раздел "Торты"'},



  // {path: "/admin/cakes", Component: renderWithLayout(AdminLayout, AdmCakeCategories), name: 'Редактирование раздела "Торты"', title: 'Редактирование раздел "Торты"'},
  // {path: "/admin/cakes/:index/:category", Component: renderWithLayout(AdminLayout, AdmCakeCategory), name: 'Редактирование раздела "Торты/Категория"', title: 'Редактирование раздел "Торты"'},
  // {path: "/admin/cakes/:category/edit/:cake", Component: renderWithLayout(AdminLayout, AdmEditCake), name: 'Редактирование торта ', title: 'Редактирование раздел "Торты"'},
];
