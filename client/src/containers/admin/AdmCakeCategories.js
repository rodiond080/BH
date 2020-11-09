import React, {useEffect} from 'react';
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import AdminCakeCategory from './AdmCakeCategory';
import {NavLink} from "react-router-dom";
import {getCategories, setCurrentPage} from "../../actions/admCakeCategoriesAction";
import {NotificationContext} from "../../hoc/AdminLayout";
import {setNotification} from "../../actions/admMenuActions";
import PaginationLinks from "../../components/PaginationLinks";

function mapStateToProps(state) {
  return {
    categories: state.admCakesReducer.categories,
    error: state.admCakesReducer.error,
    overallNumberPages: state.admCakesReducer.overallNumberPages,
    currentPage: state.admCakesReducer.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (currentPage) => dispatch(getCategories(currentPage)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
  }
}


const AdmCakeCategories = (props) => {

  const indexOfCategory = useParams().index;

  const paginationLinksRendering = (overallNumberPages) => {
    let content = [];
    if (overallNumberPages < 6) {
      const currentPage = useParams().index;
      for (let i = 0; i < overallNumberPages; i++) {
        content.push(<NavLink className="active"
                              onClick={() => {
                                props.setCurrentPage(i + 1)
                              }}
                              key={i} to={{
          pathname: '/admin/cakes/index/' + (i + 1)
        }}>{i + 1}</NavLink>);
      }
    } else {
      const currentPage = useParams().index;

      if (currentPage < 6) {
        for (let i = 0; i < 5; i++) {
          if (i === currentPage) {
            //highlight numeber
          }
          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(i + 1)
            }}
            to={{
              pathname: '/admin/cakes/index/' + (i + 1)
            }}>{i + 1}</NavLink>)
        }
        content.push('..')
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(overallNumberPages - 1)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (overallNumberPages - 1)
          }}>{overallNumberPages - 1}</NavLink>)

        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(overallNumberPages)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (overallNumberPages)
          }}>{overallNumberPages}</NavLink>)

        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(parseInt(currentPage) + 3)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (parseInt(currentPage) + 3)
          }}> > </NavLink>)

        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(parseInt(
              currentPage) + 5 > overallNumberPages
              ? overallNumberPages
              : parseInt(currentPage) + 5)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (parseInt(
              currentPage) + 5 > overallNumberPages
              ? overallNumberPages
              : parseInt(currentPage) + 5)
          }}> >> </NavLink>)

      } else if (currentPage > overallNumberPages - 6) {
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(parseInt(currentPage) - 5)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (parseInt(currentPage) - 5)
          }}> {'<<'} </NavLink>)
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(parseInt(currentPage) - 3)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (parseInt(currentPage) - 3)
          }}> {'<'} </NavLink>)

        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(1)
          }}
          to={{
            pathname: '/admin/cakes/index/' + 1
          }}> {'1'} </NavLink>)

        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(2)
          }}
          to={{
            pathname: '/admin/cakes/index/' + 2
          }}> {'2'} </NavLink>)

        content.push('..')

        for (let i = overallNumberPages - 5; i < overallNumberPages; i++) {
          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(i + 1)
            }}
            key={i} to={{
            pathname: '/admin/cakes/index/' + (i + 1)
          }}>{i + 1}</NavLink>);
        }
      } else {
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(parseInt(currentPage) - 5)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (parseInt(currentPage) - 5)
          }}> {'<<'} </NavLink>);
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(parseInt(currentPage) - 3)
          }}
          to={{
            pathname: '/admin/cakes/index/' + (parseInt(currentPage) - 3)
          }}> {'<'} </NavLink>);
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(1)
          }}
          to={{
            pathname: '/admin/cakes/index/' + 1
          }}> {'1'} </NavLink>)
        content.push(<NavLink
          onClick={() => {
            props.setCurrentPage(2)
          }}
          to={{
            pathname: '/admin/cakes/index/' + 2
          }}> {'1'} </NavLink>)

        content.push('..')

        for (let i = currentPage - 2; i < currentPage + 2; i++) {
          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(i)
            }}
            to={{
              pathname: '/admin/cakes/index/' + (i)
            }}>{i}</NavLink>)

          content.push('..')

          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(overallNumberPages - 1)
            }}
            to={{
              pathname: '/admin/cakes/index/' + (overallNumberPages - 1)
            }}>{overallNumberPages - 1}</NavLink>)

          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(overallNumberPages)
            }}
            to={{
              pathname: '/admin/cakes/index/' + (overallNumberPages)
            }}>{overallNumberPages}</NavLink>)

          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(parseInt(currentPage) + 3)
            }}
            to={{
              pathname: '/admin/cakes/index/' + (parseInt(currentPage) + 3)
            }}> > </NavLink>)

          content.push(<NavLink
            onClick={() => {
              props.setCurrentPage(parseInt(
                currentPage) + 5 > overallNumberPages
                ? overallNumberPages
                : parseInt(currentPage) + 5)
            }}
            to={{
              pathname: '/admin/cakes/index/' + (parseInt(
                currentPage) + 5 > overallNumberPages
                ? overallNumberPages
                : parseInt(currentPage) + 5)
            }}> >> </NavLink>)
        }
      }
    }
    return content;
  }


  useEffect(() => {
    // console.log(props.currentPage)
    // props.setCurrentPage(indexOfCategory);

    props.getCategories(indexOfCategory);


    // props.getCategories(props.currentPage);
    // props.setCurrentPage(useParams().index);
    // console.log(props);

  }, [props.currentPage]);

  return (

    <div className="admin__frame">
      <div className="admin__about-cakes">
        {
          !props.categories.length
            ? <div>Категорий пока нет..</div>
            :
            props.categories.map((category, index) => {
              return (
                <div key={index}>
                  <NavLink
                    key={index}
                    to={{
                      pathname: '/admin/cakes/index/' + props.currentPage + '/categories/' + category.categoryLinkName+'/page/'+props.currentPage,
                      // pathname: '/admin/cakes/index/'+useParams().index+'/categories/'+useParams().category+'/edit',
                      // /admin/cakes/index/:index/categories/:category/edit

                      // pathname: '/admin/cakes/index/'+props.currentPage+'/categories/' + category.categoryLinkName,
                      // pathname: '/admin/cakes/'+indexOfCategory+'/' + category.categoryLinkName,
                      categoryLinkName: category.categoryLinkName,
                      categoryId: category._id
                    }}
                    className="about__cakes"
                    style={{
                      background: `url(/public/images/categories/${category.imageName})`
                    }}>
                    <div>{category.categoryName}</div>
                  </NavLink>
                  <div className="about__cakes-buttonwrapper">
                    <NavLink
                      className="green__small-button"
                      to={{
                        pathname: '/admin/cakes/index/'+useParams().index+'/categories/'+category.categoryLinkName+'/edit',
                        categoryLinkName: category.categoryLinkName,
                        categoryName: category.categoryName,
                        imageName: category.imageName,
                        id: category._id,
                        serverAddressToSave: '/api/adm/cakes/updatecategory'
                      }}>Редактировать
                    </NavLink>
                    <button className="red__small-button">
                      Удалить
                    </button>
                  </div>

                </div>
              )
            })}


        <NotificationContext.Consumer>
          {
            context => {
              props.error ? context.setNotification(props.error.toString()) : null
            }
          }
        </NotificationContext.Consumer>


      </div>
      <div className="admin__cakes-paginationwrapper">
        <NavLink
          className="green__button"
          to={{
            pathname: '/admin/cakes/index/'+useParams().index+'/addcategory',
            categoryName: '',
            imageName: '',
            serverAddressToSave: '/api/adm/cakes/savenewcategory'
          }}
        >Добавить новую категорию</NavLink>
        <span>
          {
            <PaginationLinks
              overallNumberPages={props.overallNumberPages}
              addressPrefix={'/admin/cakes/index/'}
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
            />
            // paginationLinksRendering(props.overallNumberPages)
          }
        </span>
      </div>


      <button
        onClick={() => {
          console.log(props)
        }}>ddd
      </button>
    </div>
  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmCakeCategories));

