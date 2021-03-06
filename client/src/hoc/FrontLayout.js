import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import * as $ from 'jquery';
import {SearchAndNavigation} from "../components/SearchAndNavigation";
import {Footer} from "../components/Footer";
import {connect} from "react-redux";
import {menuOpen, menuClose, toggleCakes, toggleCapCakes} from "../actions/menuActions";
import {Crumbs} from "@/components/Crumbs";
import {withRouter} from "react-router";


// function mapStateToProps(state) {
//   return {
//     cakesOpen: state.subMenuReducer.cakesOpen,
//     capCakesOpen: state.subMenuReducer.capCakesOpen
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {
//     openCake:()=> dispatch({type:'CAKOPEN'}),
//     openCapC:()=> dispatch({type:'CAPOPEN'})
//   }
// }

function mapStateToProps(state) {
  return {
    menuOpen: state.menuReducer.menuOpen,
    cakesOpen: state.menuReducer.cakesOpen,
    capCakesOpen: state.menuReducer.capCakesOpen,
  }
}

function mapDispatchToProps(dispatch){
  return {
    openMenu:()=> dispatch(menuOpen()),
    closeMenu:()=> dispatch(menuClose()),
    toggleCakes:()=> dispatch(toggleCakes()),
    toggleCapCakes:()=> dispatch(toggleCapCakes()),

  }
}


//custom window checker
//https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


function FrontLayout (props){

  // const [width, height] = useWindowSize();
  // width<900 ? console.log('width<900'):null;
  // console.log('width', width)
  // console.log('height', height)
  console.log(props)

    useEffect(()=>{
      const btn = $('.main__up-button');
    $(window).on('scroll', function(){
      if($(this).scrollTop()>=50){
        btn.fadeIn();
      }else {
        btn.fadeOut();
      }
    });

    btn.on('click', function (e) {
      e.preventDefault();

      $('html').animate({scrollTop: 0}, 1000);
    })
  },[]);


  return (
    <div>
      {/*<p>{props.cakesOpen.toString()}</p>*/}
      {/*<button onClick={()=>props.openCake()}>sss</button>*/}

      <SearchAndNavigation
          menuIsOpen={props.menuOpen}
          openMenu={props.openMenu}
          closeMenu={props.closeMenu}
          cakesOpen={props.cakesOpen}
          capCakesOpen={props.capCakesOpen}
          toggleCakes={props.toggleCakes}
          toggleCapCakes={props.toggleCapCakes}
      />
      {props.crumb
        ? <Crumbs

        /> : null}
      { props.children }
      <button className="main__up-button">Наверх</button>
      <Footer />
    </div>
  )
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FrontLayout));
