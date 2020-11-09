import React, {Component, useEffect, createContext} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {admMenuToggle, setNotification} from "../actions/admMenuActions";
import {NavLink} from "react-router-dom";

export const NotificationContext = createContext();

function mapStateToProps(state) {
  return {
    admMenuOpen: state.adminReducer.admMenuOpen,
    notification: state.adminReducer.notification,
    crumbs: state.adminReducer.crumbs,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    admMenuToggle: () => dispatch(admMenuToggle()),
    setNotification: (message) => dispatch(setNotification(message)),
  }
}


function AdminLayout(props) {
  const menuCls = ['admin__menu'];

  if (props.admMenuOpen) {
    menuCls.push('active');
  }

  useEffect(() => {
  }, []);

  return (
    <div className="admin">
      {props.notification.length ? <div className="admin__notification">
        {props.notification}
      </div> : null}
      <div className="admin__heading">
        <div className="admin__about-heading">

          <div className="admin__about-headingwrapper">
            {props.props.crumb.map((link, index) => {

              if(link.title==='Главная'){
                return (
                  <div>&nbsp;{' \\ '}&nbsp;<NavLink key={index} to={{pathname: '/admin/main'}}>
                    {'Администрирование'}
                  </NavLink></div>
                )
              }

              if(link.title==='Администрирование' && index===1){
                return null;
              }

              return (
                index === 0
                  ? <div>&nbsp;{' \\ '}&nbsp;<NavLink key={index} to={{pathname: '/admin/main'}}>
                    {link.title}
                  </NavLink></div>
                  : <div>&nbsp; {' \\ '}&nbsp;<NavLink key={index} to={{pathname: link.path}}>
                    {link.title}
                  </NavLink></div>
              )
            })}</div>
        </div>
        <NotificationContext.Provider
          value={{
            setNotification: props.setNotification
          }}
        >
          {props.children}
        </NotificationContext.Provider>
      </div>
      <aside className={menuCls.join(' ')}>
        <div className="admin__menu-wrapper">

          <div className="admin__menu-menu ">
            <div><h2>Admen menu</h2></div>
            <ul>
              <li><NavLink to={{pathname: '/admin/main'}}>Кондитер</NavLink></li>
              <li><NavLink to="/admin/cakes/index/1">Торты</NavLink></li>
              {/*<li><a href="#">Link 3</a></li>*/}
              {/*<li><a href="#">Link 4</a></li>*/}
              {/*<li><a href="#">Link 5</a></li>*/}
            </ul>
          </div>
          <a className="admin__menu-button " onClick={() => props.admMenuToggle()} href="#">
            <div>
              <div className="admin__menu-stick"></div>
              <div className="admin__menu-stick"></div>
              <div className="admin__menu-stick"></div>
            </div>
          </a>
        </div>
      </aside>

    </div>
  )
}

// export default AdminLayout;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));
