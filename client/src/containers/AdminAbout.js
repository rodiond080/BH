import React, {useRef, useEffect} from 'react';
import {setAdminAboutContent, getAdminAboutContent} from "../actions/admAboutActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    admAboutContent: state.admAboutReducer.admAboutContent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAdminAboutContent: (content) => dispatch(setAdminAboutContent(content)),
    getAdminAboutContent: () => dispatch(getAdminAboutContent()),
  }
}


const AdminAbout = (props) => {
  const textArea = useRef(null);
  const imgInput = useRef(null);
  const arrayOfImgFiles = [];
  // console.log('props:', props);

  const imagesHandler = async (e) => {
    e.preventDefault();
    // Array.from(imgInput.current.files).forEach(file => {
    //   arrayOfImgFiles.push(file);
    // });
    // console.log(arrayOfImgFiles);

    // console.log(imgInput.current.files)
    // imgInput.current.files.map((file, idx)=>{
    //   arrayOfImgFiles.push(file);
    // });

  }

  useEffect(() => {
    props.getAdminAboutContent();

    // textArea.html = props.admAboutContent;
    // textArea.current.innerHTML=props.admAboutContent;
    // console.log('props:', props);
    // textArea.current.innerHTML = props.admAboutContent
    // imgInput.current.addEventListener('change', imagesHandler);
    // console.log(imgInput.current)

    // console.log(textArea.current.innerText);
  }, [textArea]);

  return (
    <div className="admin__about">
      <div className="admin__about-heading">Admen heading</div>
      <div className="admin__about-buttons">
        <input className="admin__about-img" ref={imgInput} multiple type="file" id='imgbutton'/>
        <label className="ladmin__about-img" htmlFor="imgbutton">
          <i className="far fa-file-image"></i>
        </label>
      </div>

      <div ref={textArea} suppressContentEditableWarning={true} contentEditable={"true"}
           className="admin__about-content" dangerouslySetInnerHTML={{__html: props.admAboutContent}}></div>
      <button onClick={() => props.setAdminAboutContent(textArea.current.innerHTML)}>Save</button>
    </div>
  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAbout));

