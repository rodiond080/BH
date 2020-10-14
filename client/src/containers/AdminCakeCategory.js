import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, useParams} from "react-router-dom";

function mapStateToProps(state) {
  return {
    // loading: state.admAboutReducer.loading,
    // admAboutContent: state.admAboutReducer.admAboutContent,
    // imgNamesToUpdate: state.admAboutReducer.imgNamesToUpdate,
    // error: state.admAboutReducer.error,
    // contentTouched: state.admAboutReducer.contentTouched,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // setAdminAboutContent: (e, content, files) => dispatch(setAdminAboutContent(e, content, files)),
    // getAdminAboutContent: () => dispatch(getAdminAboutContent()),
    // setContentTouched: (e) => dispatch(setContentTouched(e)),
    // updateAdminAboutContent: (e) => dispatch(updateAdminAboutContent(e)),
  }
}

function readFileAsync(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    }
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

const AdminCakeCategory = (props) => {

  useEffect(() => {

  }, []);

  return (
    <div className="admin__about-category">
      <ul>
        {
          props.location.cakes.map((cake, index) => {

            const images = cake.images.map((img, idx) => {
              return (
                <div key={idx} className="about__category-image"
                     style={{background: `url(/public/images/main-slider/${img})`}}
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
                      pathname: '/admin/cakes/' + useParams().category + '/edit/' + cake.engName,
                      cakeData:cake
                    }}
                  >Редактировать</NavLink>
                  <button>Удалить</button>
                </div>
              </li>
            )
          })
        }
      </ul>


      {/*<div >*/}
      {/*  <label htmlFor="filling">Начинка</label>*/}
      {/*  <input type="text" id="filling"/>*/}
      {/*</div>*/}

      {/*{useParams().category}*/}
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCakeCategory));
