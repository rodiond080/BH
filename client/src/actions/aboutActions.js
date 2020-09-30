import {GET_ABOUT_INIT, GET_ABOUT_SUCCESS, GET_ABOUT_ERROR} from "../_constants/aboutConstants";

// import axios from 'axios';

export function getAboutContent() {
  return (dispatch) => {
    try {
      dispatch(init())
      fetch('/api/adm/about/getaboutcontent', {
        method: 'POST'
      })
        .then(res => res.json())
        .then((res) => {
          const workingDiv = document.createElement('div');
          workingDiv.innerHTML = res;
          const imageTags = workingDiv.getElementsByClassName('admin__about-image');
          Array.from(imageTags).forEach(imageTag=>{
            imageTag.classList.remove('admin__about-image');
            // imageTag.classList.add('admin__about-image');
          });

          dispatch(success(workingDiv.innerHTML));
        })
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: GET_ABOUT_INIT,
      loading: true
    }
  }

  function success(aboutContent) {
    return {
      type: GET_ABOUT_SUCCESS,
      aboutContent: aboutContent,
      loading: false
    }
  }

  function error(error) {
    return {
      type: GET_ABOUT_ERROR,
      error: error,
      loading: false
    }
  }
}
