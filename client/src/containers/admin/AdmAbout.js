import React, {useRef, useEffect} from 'react';
import {
  setAdminAboutContent, getAdminAboutContent,
  updateAdminAboutContent,
  setError
} from "../../actions/admAboutActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function mapStateToProps(state) {
  return {
    admAboutContent: state.admAboutReducer.admAboutContent,
    imgNamesToUpdate: state.admAboutReducer.imgNamesToUpdate,
    error: state.admAboutReducer.error,
    message: state.admAboutReducer.message,
    contentTouched: state.admAboutReducer.contentTouched,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAdminAboutContent: (e) => dispatch(setAdminAboutContent(e)),
    getAdminAboutContent: () => dispatch(getAdminAboutContent()),
    updateAdminAboutContent: (e) => dispatch(updateAdminAboutContent(e)),
    setError: (err) => dispatch(setError(err)),
  }
}


const AdmAbout = (props) => {
  const textArea = useRef(null);

  useEffect(() => {
    props.getAdminAboutContent();
    document.getElementById('contentarea').focus();
    window.addEventListener('beforeunload', e => {
      e.preventDefault();
      try {
        const imagesToDelete = [];
        Array.from(document.getElementsByClassName('admin__about-image')).forEach(imgTag => {
          if (imgTag.style.backgroundImage.length > 100) {
            imagesToDelete.push(imgTag.getAttribute('data-nameId'));
          }
        });

        fetch('/api/adm/about/correctaboutcontent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({imagesToDelete: imagesToDelete})
        })
      } catch (e) {
        props.setError(e);
      }
    });

    return (() => {
      props.setError(null);
    })

  }, [textArea, props.contentTouched]);

  return (

    <div className="admin__about">

      <div className="admin__about-buttons">
        <input className="admin__about-img"
               onChange={(e) => {
                 e.preventDefault();
                 props.setAdminAboutContent(e);
               }}
               multiple
               type="file" id='imgbutton'
               accept="image/*"/>
        <label className="ladmin__about-img" htmlFor="imgbutton">
          <i className="far fa-file-image"></i>
        </label>
      </div>
      <div id="contentarea" ref={textArea} suppressContentEditableWarning={true} contentEditable={"true"}
           className="admin__about-content" dangerouslySetInnerHTML={{__html: props.admAboutContent}}></div>
      <div id="notifier" className="admin__about-notifier">{
        props.error
          ? setTimeout(() => {
            return props.error.toString()
          }, 3000)
          : props.message}</div>
      <button onClick={(e) => props.updateAdminAboutContent(e)}>Save</button>

    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmAbout));

