import React, {lazy, useRef, useEffect} from 'react';
import {setAdminAboutContent, getAdminAboutContent, setContentTouched} from "../actions/admAboutActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ContentEditable from 'react-contenteditable'

function mapStateToProps(state) {
  return {
    loading: state.admAboutReducer.loading,
    admAboutContent: state.admAboutReducer.admAboutContent,
    filesToUpload: state.admAboutReducer.filesToUpload,
    error: state.admAboutReducer.error,
    contentTouched: state.admAboutReducer.contentTouched,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAdminAboutContent: (e,content, files) => dispatch(setAdminAboutContent(e,content, files)),
    getAdminAboutContent: () => dispatch(getAdminAboutContent()),
    setContentTouched: (e) => dispatch(setContentTouched(e))
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



  useEffect(() => {
      props.getAdminAboutContent();
    // console.log(document.querySelector('img.admin__about-image'));
  }, [textArea, props.contentTouched]);

  return (
    <div className="admin__about">
      <div className="admin__about-heading">Admen heading</div>
      <div className="admin__about-buttons">
        <input className="admin__about-img"
               onChange={(e) => {
                 e.preventDefault();
                 props.setAdminAboutContent(e,textArea.current.innerHTML, props.contentTouched)
               }}
               multiple
               type="file" id='imgbutton'
               accept="image/*"/>
        <label className="ladmin__about-img" htmlFor="imgbutton">
          <i className="far fa-file-image"></i>
        </label>
      </div>

      <div id="xxx" ref={textArea} suppressContentEditableWarning={true} contentEditable={"true"}
           className="admin__about-content" dangerouslySetInnerHTML={{__html: props.admAboutContent}}></div>

      {/*<ContentEditable*/}
      {/*  id="xxx"*/}
      {/*  html={props.admAboutContent}*/}
      {/*  ref={textArea}*/}
      {/*  onChange={(e) => {*/}
      {/*    props.setContentTouched(e)*/}
      {/*  }}*/}
      {/*  disabled={false}*/}
      {/*  className="admin__about-content"*/}
      {/*/>*/}
      <button onClick={() => props.setAdminAboutContent(textArea.current.innerHTML)}>Save</button>
    </div>
  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAbout));

