import React, {useEffect} from 'react';
import {useParams, withRouter} from "react-router";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {getCategoryCakes} from "../actions/admCakeCategoryActions";

function mapStateToProps(state) {
  return {
    // categoryCakes: state.admCakeCategoryReducer.categoryCakes,
    // overallNumberPages: state.admCakesReducer.overallNumberPages,
    // currentPage: state.admCakesReducer.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // getCategoryCakes: (categoryId) => dispatch(getCategoryCakes(categoryId)),
  }
}


const PaginationLinks = (props) => {
  const overallNumberPages = props.overallNumberPages;
  const addressPrefix = props.addressPrefix;
  const currentPage = props.currentPage;
  const setCurrentPage = props.setCurrentPage;
  let content = [];
  if (overallNumberPages < 6) {
    for (let i = 0; i < overallNumberPages; i++) {
      content.push(<NavLink
        onClick={() => {
          setCurrentPage(i + 1)
        }}
        key={i} to={{
        pathname: addressPrefix + (i + 1)
      }}>{i + 1}</NavLink>);
    }
  } else {
    if (currentPage < 6) {
      for (let i = 0; i < 5; i++) {
        // if (i === currentPage) {
        //highlight numeber
        // }
        content.push(<NavLink
          onClick={() => {
            setCurrentPage(i + 1)
          }}
          to={{
            pathname: addressPrefix + (i + 1)
          }}>{i + 1}</NavLink>)
      }
      content.push('..')
      content.push(<NavLink
        onClick={() => {
          setCurrentPage(overallNumberPages - 1)
        }}
        to={{
          pathname: addressPrefix + (overallNumberPages - 1)
        }}>{overallNumberPages - 1}</NavLink>)

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(overallNumberPages)
        }}
        to={{
          pathname: addressPrefix + (overallNumberPages)
        }}>{overallNumberPages}</NavLink>)

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(parseInt(currentPage) + 1)
        }}
        to={{
          pathname: addressPrefix + (parseInt(currentPage) + 1)
        }}> > </NavLink>)

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(parseInt(
            currentPage) + 3 > overallNumberPages
            ? overallNumberPages
            : parseInt(currentPage) + 3)
        }}
        to={{
          pathname: addressPrefix + (parseInt(
            currentPage) + 5 > overallNumberPages
            ? overallNumberPages
            : parseInt(currentPage) + 3)
        }}> >> </NavLink>)

    } else if (currentPage > overallNumberPages - 5) {
      content.push(<NavLink
        onClick={() => {
          setCurrentPage(parseInt(currentPage) - 3)
        }}
        to={{
          pathname: addressPrefix + (parseInt(currentPage) - 3)
        }}> {'<<'} </NavLink>)
      content.push(<NavLink
        onClick={() => {
          setCurrentPage(parseInt(currentPage) - 1)
        }}
        to={{
          pathname: addressPrefix + (parseInt(currentPage) - 1)
        }}> {'<'} </NavLink>)

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(1)
        }}
        to={{
          pathname: addressPrefix + 1
        }}> {'1'} </NavLink>)

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(2)
        }}
        to={{
          pathname: addressPrefix + 2
        }}> {'2'} </NavLink>)

      content.push('..');

      for (let i = overallNumberPages - 5; i < overallNumberPages; i++) {
        content.push(<NavLink
          onClick={() => {
            setCurrentPage(i + 1)
          }}
          key={i} to={{
          pathname: addressPrefix + (i + 1)
        }}>{i + 1}</NavLink>);
      }
    } else {
      content.push(<NavLink
        onClick={() => {
          setCurrentPage(parseInt(currentPage) - 3)
        }}
        to={{
          pathname: addressPrefix + (parseInt(currentPage) - 3)
        }}> {'<<'} </NavLink>);

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(parseInt(currentPage) - 1)
        }}
        to={{
          pathname: addressPrefix + (parseInt(currentPage) - 1)
        }}> {'<'} </NavLink>);

      content.push(<NavLink
        onClick={() => {
          setCurrentPage(1)
        }}
        to={{
          pathname: addressPrefix + 1
        }}> {'1'} </NavLink>)
      content.push(<NavLink
        onClick={() => {
          setCurrentPage(2)
        }}
        to={{
          pathname: addressPrefix + 2
        }}> {'2'} </NavLink>)

      content.push('..');




      for (let i = currentPage - 2; i < currentPage + 3; i++) {
        content.push(<NavLink
          onClick={() => {
            setCurrentPage(i)
          }}
          to={{
            pathname: addressPrefix + (i)
          }}>{i}</NavLink>)

      }


      content.push('..');

        content.push(<NavLink
          onClick={() => {
            setCurrentPage(overallNumberPages - 1)
          }}
          to={{
            pathname: addressPrefix + (overallNumberPages - 1)
          }}>{overallNumberPages - 1}</NavLink>)

        content.push(<NavLink
          onClick={() => {
            setCurrentPage(overallNumberPages)
          }}
          to={{
            pathname: addressPrefix + (overallNumberPages)
          }}>{overallNumberPages}</NavLink>)

        content.push(<NavLink
          onClick={() => {
            setCurrentPage(parseInt(currentPage) + 1)
          }}
          to={{
            pathname: addressPrefix + (parseInt(currentPage) + 1)
          }}> > </NavLink>)

        content.push(<NavLink
          onClick={() => {
            setCurrentPage(parseInt(
              currentPage) + 3 > overallNumberPages
              ? overallNumberPages
              : parseInt(currentPage) + 3)
          }}
          to={{
            pathname: addressPrefix + (parseInt(
              currentPage) + 3 > overallNumberPages
              ? overallNumberPages
              : parseInt(currentPage) + 3)
          }}> >> </NavLink>)
    }
  }
  return content;
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaginationLinks));
