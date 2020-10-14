import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AdminCakeCategory from './AdminCakeCategory';
import {NavLink} from "react-router-dom";

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

const AdminCakes = (props) => {

  useEffect(() => {

  }, []);

  return (
    <div className="admin__about-cakes">
      {[
        {name: 'Category1', image: 'pic1.jpg', linkname: 'category1', cakes:[{
            name: 'Берлускони11',
            engName: 'berluskoni11',
            images: ['pic1.jpg', 'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg', 'pic2.jpg', 'pic2.jpg', 'pic2.jpg'],
            price: 2550,
            description: 'Детский тортик на первый Детский тортик на первый день рождения малышаДетский тортик на первый день рождения малыша',
            filling: ['Начинка1', 'Начинка2'],
            colors: ['#fff', 'purple']
          },{
            name: 'Берлускони12',
            engName: 'berluskoni12',
            images: ['pic1.jpg', 'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg',
              'pic2.jpg', 'pic2.jpg', 'pic2.jpg', 'pic2.jpg'],
            price: 2550,
            description: 'Детский тортик на первый Детский тортик на первый день рождения малышаДетский тортик на первый день рождения малыша',
            filling: ['Начинка1', 'Начинка2'],
            colors: ['#fff', 'purple']
          }]},
        {name: 'Category2', image: 'pic2.jpg', linkname: 'category2', cakes:[{
            name: 'Берлускони21',
            engName: 'berluskoni21',
            images: ['pic1.jpg',
              'pic1.jpg',
              'pic1.jpg',
              'pic1.jpg',
              'pic2.jpg'],
            price: 2550,
            description: 'Детский тортик на первый день рождения малыша',
            filling: ['Начинка1', 'Начинка2'],
            colors: ['#fff', 'purple']
          },{
            name: 'Берлускони22',
            engName: 'berluskoni22',
            images: ['pic1.jpg',
              'pic1.jpg',
              'pic1.jpg',
              'pic1.jpg',
              'pic2.jpg'],
            price: 2550,
            description: 'Детский тортик на первый день рождения малыша',
            filling: ['Начинка1', 'Начинка2'],
            colors: ['#fff', 'purple']
          }]}
      ].map((category, index) => {
        return (
          <NavLink
            key={index}
            to={{
              pathname: '/admin/cakes/' + category.linkname,
              cakes:category.cakes
            }}
            className="about__cakes"
            style={{
              background: `url(/public/images/main-slider/${category.image})`
            }}>
            {category.linkname}
          </NavLink>
        )
      })}
    </div>
  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCakes));

