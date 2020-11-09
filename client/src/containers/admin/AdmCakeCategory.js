import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {NotificationContext} from "../../hoc/AdminLayout";
import {getCategoryCakes, setCurrentPaginationPage} from "../../actions/admCakeCategoryActions";
import PaginationLinks from "../../components/PaginationLinks";

function mapStateToProps(state) {
  return {
    categoryCakes: state.admCakeCategoryReducer.categoryCakes,
    overallNumberPages: state.admCakeCategoryReducer.overallNumberPages,
    currentPage: state.admCakeCategoryReducer.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategoryCakes: (categoryName, currentPage) => dispatch(getCategoryCakes(categoryName, currentPage)),
    setCurrentPaginationPage: (currentPage) => dispatch(setCurrentPaginationPage(currentPage)),
  }
}


const AdmCakeCategory = (props) => {

  const categoryName = useParams().category;

  useEffect(() => {
    props.getCategoryCakes(categoryName, props.currentPage);
  }, [props]);

  return (
    props.loading?<div className="admin__about-category admin__frame">Loading...</div>:
    <div className="admin__about-category admin__frame">
      <ul>
        {
          !props.categoryCakes.length
            ? <div>Торты пока не добавлены...</div>
            : props.categoryCakes.map((cake, index) => {

              const images = cake.images.map((img, idx) => {
                return (
                  <div key={idx} className="about__category-image"
                       style={{background: `url(${img.cakeImageAddress})`}}
                       alt=""/>
                )
              });

              return (
                <li key={index} className="about__category-cake">
                  <div className="about__category-name">{cake.name}</div>
                  <div className="about__category-imgwrapper">
                    {images}
                  </div>
                  <div className="about__category-description">
                    {cake.description}
                  </div>
                  <div className="about__category-btnwrapper">
                    <NavLink
                      className="about__category-edit"
                      to={{
                        pathname: '/admin/cakes/index/'+useParams().index+'/categories/'+useParams().category+'/page/'+props.currentPage+'/edit/'+cake.linkName,
                        // pathname: '/admin/cakes/' + useParams().category + '/edit/' + cake.linkName,

                        cakeData: cake,
                        categoryLinkName:props.location.categoryLinkName,
                        categoryId:props.location.categoryId,
                        addressToSaveResult:'/api/adm/cakes/updatecake',
                      }}
                    >Редактировать</NavLink>
                    <button>Удалить</button>
                  </div>
                </li>
              )
            })
        }

      </ul>
      <div>{props.message}</div>

      <div className="admin__cakes-paginationwrapper">
      <NavLink
        style={{marginLeft:'10px'}}
        className="green__button"
        to={{
          pathname: '/admin/cakes/index/'+useParams().index+'/categories/' + useParams().category + '/page/'+useParams().catcakepage+'/addcake',
          // addressToSaveResult:'/api/adm/cakes/savenewcake',
          // cakeData: {
          //   id:null,
          //   name: '',
          //   price: '',
          //   description: '',
          //   fillings: [],
          //   images: [],
          //   categoryId:props.location.categoryId,
          //   categoryLinkName:props.categoryLinkName
          // }
        }}

      >Добавить торт</NavLink>

        <span> <PaginationLinks
          overallNumberPages={props.overallNumberPages}
          addressPrefix={'/admin/cakes/index/'+useParams().index+'/categories/'+useParams().category+'/page/'}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPaginationPage}
        /></span>

      </div>

      <button
        onClick={() => {
          console.log(props)
        }}
      >ddd
      </button>


      <NotificationContext.Consumer>
        {
          context=>{
            props.error?context.setNotification(props.error.toString()):null
          }
        }
      </NotificationContext.Consumer>

    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmCakeCategory));
