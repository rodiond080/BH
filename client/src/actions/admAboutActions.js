import {
  ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR,
  ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR, SET_ERROR
} from "../_constants/admAboutConstants";
import axios from 'axios';

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

export function setError(err) {
  return (dispatch) => {
    dispatch(success(err))
  }

  function success(error) {
    return {
      type: SET_ERROR,
      error: error
    }
  }
}

export function setAdminAboutContent(e) {
  return (dispatch) => {
    try {
      const files = e.target.files;
      Array.from(files).forEach(async (file) => {
        const blobForImgSketch = await readFileAsync(file);
        const fileName = Date.now().toString().substr(9, 4) + file.name;
        const imgSketch = document.createElement('div');
        imgSketch.classList.add('admin__about-image');
        imgSketch.setAttribute('data-nameId', fileName);
        const imgLine = document.createElement('div');
        imgLine.classList.add('line');
        imgSketch.appendChild(imgLine);
        imgSketch.contentEditable = false;

        imgSketch.setAttribute('data-nameId', fileName);
        imgSketch.style.backgroundImage = 'url(\'' + blobForImgSketch + '\')';
        document.getElementById('contentarea').appendChild(imgSketch);

        const fd = new FormData();

        fd.append('image', file, fileName);
        axios.post('/api/adm/about/setaboutcontent', fd, {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            imgLine.style.width = '' + percentCompleted + '%';
            if (percentCompleted === 100) {
              imgSketch.remove();
              const imgSketch2 = document.createElement('img');
              imgSketch2.classList.add('admin__about-image');
              imgSketch2.setAttribute('data-nameId', fileName);
              document.getElementById('contentarea').appendChild(imgSketch2);
              imgSketch2.style.backgroundImage = 'url(\'' + blobForImgSketch + '\')';
            }
          }
        }).then(res => {
          dispatch(success());
        })

      });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function success() {
    return {
      type: ADM_SET_ABOUT_SUCCESS,
      message: 'Изображения были успешно загружены',
      error: null
    }
  }

  function error(error) {
    return {
      type: ADM_SET_ABOUT_ERROR,
      error: error
    }
  }
}

export function updateAdminAboutContent(e) {
  e.preventDefault();
  return (dispatch) => {
    try {
      const imagesTagsToUpdate = document.getElementsByClassName('admin__about-image');
      const imagesToUpdate = Array.from(imagesTagsToUpdate).map(imgTag => {
        return imgTag.attributes.getNamedItem('data-nameId').value;
      });

      Array.from(imagesTagsToUpdate).forEach(imgTag => {
        const fileName = imgTag.attributes.getNamedItem('data-nameId').value;
        imgTag.style.backgroundImage = 'url(\'' + '../public/images/about/' + fileName + '\')';
      });

      axios.post('/api/adm/about/updateaboutcontent', {
        aboutContent: JSON.stringify(document.getElementById('contentarea').innerHTML),
        imagesToUpdate: JSON.stringify(imagesToUpdate),
      }).then(res => {
        dispatch(success());
      });

      dispatch(success());
    } catch (e) {
      dispatch(error(e));
    }
  }

  function success() {
    return {
      type: ADM_SET_ABOUT_SUCCESS,
      message: 'Изменения были успешно сохранены',
      error: null
    }
  }

  function error(error) {
    return {
      type: ADM_SET_ABOUT_ERROR,
      error: error
    }
  }
}

export function getAdminAboutContent() {
  return async (dispatch) => {
    try {
      // dispatch(init())
      const contentProm = await axios.post('/api/adm/about/getaboutcontent');
      dispatch(success(contentProm.data));
    } catch (e) {
      dispatch(error(e));
    }
  }

  // function init() {
  //   return {
  //     type: ADM_GET_ABOUT_INIT,
  //     loading: true
  //   }
  // }

  function success(result) {
    return {
      type: ADM_GET_ABOUT_SUCCESS,
      admAboutContent: result.aboutContent,
      imageSizes: result.imgSizes,
      loading: false
    }
  }

  function error(error) {
    return {
      type: ADM_GET_ABOUT_ERROR,
      error: error,
      loading: false
    }
  }
}
