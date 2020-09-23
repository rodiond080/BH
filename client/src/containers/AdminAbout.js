import React, {useRef, useEffect} from 'react';
import {setAdminAboutContent, getAdminAboutContent} from "../actions/admAboutActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    admAboutContent: state.admAboutReducer.admAboutContent,
    loading: state.admAboutReducer.loading,
    filesToUpload: state.admAboutReducer.filesToUpload,
    error: state.admAboutReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAdminAboutContent: (event, admAboutContent) => dispatch(setAdminAboutContent(event, admAboutContent)),
    getAdminAboutContent: () => dispatch(getAdminAboutContent()),
  }
}

const AdminAbout = (props) => {
  const textArea = useRef(null);

  useEffect(() => {
    console.log(props)
    // props.getAdminAboutContent();
    // console.log(props)
    // props.filesToUpload.length === 0 ? props.getAdminAboutContent() : null
  }, [textArea, props.admAboutContent]);

  return (
    <div className="admin__about">
      <div className="admin__about-heading">Admen heading</div>
      <div className="admin__about-buttons">
        <input className="admin__about-img"
               onChange={(event) => props.setAdminAboutContent(event, props.admAboutContent)} multiple type="file"
               id='imgbutton' accept="image/*"/>
        <label className="ladmin__about-img" htmlFor="imgbutton">
          <i className="far fa-file-image"></i>
        </label>
      </div>

      {props.loading ? <h1 style={{color: 'green'}}>Loading...</h1> :
        <div ref={textArea} suppressContentEditableWarning={true} contentEditable={"true"}
             className="admin__about-content" dangerouslySetInnerHTML={{__html: props.admAboutContent}}>
        </div>}
      <button onClick={() => props.getAdminAboutContent()}>Save</button>
    </div>
  )
}

// export default AdminAbout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAbout));

