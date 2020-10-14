import React, {Component, useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {admMenuToggle} from "../actions/admMenuActions";
import {NavLink} from "react-router-dom";


function mapStateToProps(state) {
  return {
    admMenuOpen: state.adminReducer.admMenuOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    admMenuToggle: () => dispatch(admMenuToggle())
  }
}


function AdminLayout(props) {
  const menuCls = ['admin__menu'];

  if(props.admMenuOpen){
    menuCls.push('active');
  }


  useEffect(() => {
  }, []);

  return (
    <div className="admin">
      <div className="admin__heading">
        <div className="admin__about-heading">{props.props.title}</div>
        {props.children}
      </div>
      <aside className={menuCls.join(' ')} >
        <div className="admin__menu-wrapper">
          <div className="admin__menu-menu ">
            <div><h2>Admen menu</h2></div>
            <ul>
              <li><NavLink to={{pathname:'/admin'}}>Кондитер</NavLink></li>
              <li><NavLink to="/admin/cakes">Торты</NavLink></li>
              {/*<li><a href="#">Link 3</a></li>*/}
              {/*<li><a href="#">Link 4</a></li>*/}
              {/*<li><a href="#">Link 5</a></li>*/}
            </ul>
          </div>
          <a className="admin__menu-button " onClick={()=>props.admMenuToggle()} href="#">
            <div >
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
