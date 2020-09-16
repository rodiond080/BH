import React, {Component, useEffect} from 'react';

import {withRouter} from "react-router";
import {connect} from "react-redux";
import {menuClose, menuOpen, toggleCakes, toggleCapCakes} from "../actions/menuActions";


function mapStateToProps(state) {
  return {
    // menuOpen: state.menuReducer.menuOpen,
    // cakesOpen: state.menuReducer.cakesOpen,
    // capCakesOpen: state.menuReducer.capCakesOpen,
  }
}

function mapDispatchToProps(dispatch){
  return {
    // openMenu:()=> dispatch(menuOpen()),
    // closeMenu:()=> dispatch(menuClose()),
    // toggleCakes:()=> dispatch(toggleCakes()),
    // toggleCapCakes:()=> dispatch(toggleCapCakes()),

  }
}



function AdminLayout(props){

  useEffect(()=>{},[]);

  return(
    <div>
      <h2>Hat</h2>

      {props.children}


      <h3>Footer</h3>
    </div>
  )
}

export default AdminLayout;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));
