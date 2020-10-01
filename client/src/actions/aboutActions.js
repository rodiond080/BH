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
          workingDiv.innerHTML = res.aboutContent;
          const imageTags = workingDiv.getElementsByClassName('admin__about-image');

          let counter = 0;
          Array.from(imageTags).forEach(imageTag => {
            imageTag.classList.remove('admin__about-image');
            counter%2===0 ? imageTag.style.float='left':imageTag.style.float='right';
            counter++;
          });

          dispatch(success({
            admAboutContent: workingDiv.innerHTML,
            imageSizes:res.imgSizes
          }));
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

  function success(result) {
    return {
      type: GET_ABOUT_SUCCESS,
      aboutContent: result.admAboutContent,
      imageSizes:result.imageSizes,
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
