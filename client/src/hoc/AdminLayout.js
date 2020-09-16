import React, {Component, useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {admMenuToggle} from "../actions/admMenuActions";


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
        {props.children}
      </div>
      <aside className={menuCls.join(' ')}>
        <div className="admin__menu-wrapper">
          <div className="admin__menu-menu ">
            <div><h2>Admen menu</h2></div>
            <ul>
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
              <li><a href="#">Link 5</a></li>
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
