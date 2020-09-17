import React from 'react';
import {getAdminAboutContent} from "../actions/admAboutActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    admAboutContent: state.admAboutReducer.admAboutContent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAdminAboutContent: () => dispatch(getAdminAboutContent())
  }
}


const AdminAbout = (props) => {

  console.log('props:',props);

  return (
    <div className="admin__about">
      <div className="admin__about-heading">Admen heading</div>
      {/*<div contentEditable={"true"} className="admin__about-content"></div>*/}


      <button onClick={()=> {
       fetch('/api/adm/about/getabout', {
         method:'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8'
         },
         body: JSON.stringify({content:'Hello'})
       })
         .then(res=>res.json())
         .then((res)=>{
           console.log(res)})

      }}>Click me</button>
      {/*<button onClick={()=>props.getAdminAboutContent()}>Click me</button>*/}

      <div className="admin__about-buttons">
        <input className="admin__about-img" type="file" id='imgbutton'/>
        <label className="ladmin__about-img" htmlFor="imgbutton">
          <i className="far fa-file-image"></i>
        </label>
      </div>

      <div contentEditable={"true"} className="admin__about-content">

      </div>

      <button>Save</button>

    </div>

  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAbout));

