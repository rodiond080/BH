import React, {lazy, useRef, useEffect} from 'react';
import {setAdminAboutContent, getAdminAboutContent} from "../actions/admAboutActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
// import * as images from '../public/images';
import * as images from '../../../img/index';

// const images = require.context('../../../img', true);


function mapStateToProps(state) {
  return {
    loading: state.admAboutReducer.loading,
    admAboutContent: state.admAboutReducer.admAboutContent,
    filesToUpload: state.admAboutReducer.filesToUpload,
    error: state.admAboutReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAdminAboutContent: (content, files) => dispatch(setAdminAboutContent(content, files)),
    getAdminAboutContent: () => dispatch(getAdminAboutContent()),
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
  })
}


const AdminAbout = (props) => {
  const textArea = useRef(null);
  const imgInput = useRef(null);
  const arrayOfImgFiles = [];
  // console.log('props:', props);

  const imagesInputHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.files)

    // const fd = new FileList()
    // console.log(e.dataTransfer)

    // Array.from(imgInput.current.files).forEach(async file => {
    //   arrayOfImgFiles.push(file);
    //   const img = document.createElement('img');
    //   img.src = await readFileAsync(file);
    //   textArea.current.appendChild(img);
    // });


    // const img = document.createElement('img')

    // console.log(arrayOfImgFiles);

    // console.log(imgInput.current.files)
    // imgInput.current.files.map((file, idx)=>{
    //   arrayOfImgFiles.push(file);
    // });
  }

  useEffect(() => {
    props.getAdminAboutContent();
    // console.log(new Date().getTime().toString().slice(new Date().getTime().toString().length-5, 3));
    // console.log()
    // console.log(new Date().getTime().toString())

    // textArea.html = props.admAboutContent;
    // textArea.current.innerHTML=props.admAboutContent;
    // console.log('props:', props);
    // textArea.current.innerHTML = props.admAboutContent
    // imgInput.current.addEventListener('change', imagesInputHandler);
    // console.log(imgInput.current)

    // console.log(textArea.current.innerText);
  }, [textArea]);

  return (
    <div  className="admin__about">
      <div className="admin__about-heading">Admen heading</div>
      <div className="admin__about-buttons">
        <input className="admin__about-img"
               onChange={(e) => props.setAdminAboutContent(textArea.current.innerHTML, e.target.files)} multiple
               type="file" id='imgbutton'
               accept="image/*"/>
        <label className="ladmin__about-img" htmlFor="imgbutton">
          <i className="far fa-file-image"></i>
        </label>
      </div>

      <div id="xxx" ref={textArea} suppressContentEditableWarning={true} contentEditable={"true"}
           className="admin__about-content" dangerouslySetInnerHTML={{__html: props.admAboutContent}}></div>
      <button onClick={() => props.setAdminAboutContent(textArea.current.innerHTML)}>Save</button>

      <img src={images["nodeimg"]} alt=""/>
    </div>
  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAbout));

