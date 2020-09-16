import React from 'react';
import pic1 from '@/public/images/header-slider/pic1.jpg'
// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';

const AdminAbout = (props) => {

  // console.log(props)

  return (
    <div className="admin__about">
      <div className="admin__about-heading">Admen heading</div>
      {/*<div contentEditable={"true"} className="admin__about-content"></div>*/}

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

export default AdminAbout
