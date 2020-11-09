import React from 'react';
import logo from '@public/images/logo.png';
import {NavLink} from "react-router-dom";

export const SearchAndNavigation = (props)=>{

  const menuCls = ['header__nav'];
  const cakeCls = ["header__nav-cakes-cat"];
  const capCakeCls = ["header__nav-capcakes-cat"];


  if (props.menuIsOpen) {
    menuCls.push('active');

    if (props.cakesOpen) {
      cakeCls.push('active');
    }
    if (props.capCakesOpen) {
      capCakeCls.push('active');
    }
  }

  return(
    <header className="header">
      <div className="header__heading">
        <div className="header__heading-box border">
          <div className="header__heading-logo">
            <NavLink to="/"><img src={logo} alt="" /></NavLink>
          </div>

          <div className="header__heading-search">
            <form className="header__heading-form">
              <input type="text" placeholder="Search on bakehousespb ...." />
              <button><i className="fas fa-search"></i></button>
            </form>
          </div>


          <div className="header__heading-reg-cart">
            <div className="header__heading-reg">
              <i className="fas fa-sign-in-alt"></i>
              <a href="#">Вход</a> или <a href="#">Регистрация</a>
            </div>


            <div className="header__heading-card">
              <a href="#">
                <div><i className="fas fa-shopping-cart"></i></div>
                <div className="header__heading-card-num">0</div>
                <div className="header__heading-card-name">Корзина</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={menuCls.join(' ')}>
        <nav className="border">
          <ul className="menu__list">
            <li className="btn"><a id="btn-menu" href="#" onClick={
              props.menuIsOpen ? ()=>props.closeMenu() : ()=>props.openMenu()
            }>
              <div>
                <div className="btn-line"></div>
                <div className="btn-line"></div>
                <div className="btn-line"></div>
              </div>
              <span>MENU</span>
            </a></li>
            <li><NavLink className="menu__list-link" to="/about">Кондитер</NavLink></li>
            <li>
              <a className="header__nav-cakes menu__list-link" href="#"
                onClick={()=>props.toggleCakes()}
              >Торты</a>
              <ul className={cakeCls.join(' ')}>
                <li><NavLink to="/cakes/category1">Category1</NavLink></li>
                <li><NavLink to="/cakes/category2">Category2</NavLink></li>
                <li><NavLink to="/cakes/category3">Category3</NavLink></li>
              </ul>
            </li>
            <li>
              <a className="header__nav-capcakes menu__list-link" href="#"
                 onClick={()=>props.toggleCapCakes()}
              >Страницы</a>
              <ul className={capCakeCls.join(' ')}>
                <li><a href="./product.html">Продукт</a></li>
                <li><a href="./category.html">Категория</a></li>
                <li><a href="./cart.html">Корзина</a></li>
                <li><a href="./payment.html">Оплата</a></li>
                <li><a href="./contact.html">Контакты</a></li>
              </ul>
            </li>
            <li><NavLink className="menu__list-link"
                         to={{
                           pathname:'/print',
                           search:'?a=1&b=2',
                           hash:'wfm-hash'  //to scroll until this element: /print?a=1&b=2#wfm-hash
                         }}>Напечатать</NavLink></li>
            <li><NavLink className="menu__list-link" to="/admin/main">Отзывы</NavLink></li>
            <li><NavLink className="menu__list-link" to="/contact">Контакты</NavLink></li>

          </ul>
        </nav>
      </div>

    </header>
  )
}
