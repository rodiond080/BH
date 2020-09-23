import {
  ADM_GET_ABOUT_BEGIN, ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR,
  ADM_SET_ABOUT_BEGIN, ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR
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

export function setAdminAboutContent(event, admAboutContent) {
  event.persist();
  event.preventDefault();
  return async (dispatch) => {
    dispatch(begin());
    try {
      const filesToUpload = [];
      let resultAdmAboutContent = admAboutContent;

      const fd = new FormData();

      Array.from(event.target.files).forEach(file => {
        const imgName = Date.now().toString().substr(9, 4) + file.name;
        fd.append('imageFiles', file, imgName);
        filesToUpload.push(file);
      });

      // for (let i = 0; i < Array.from(event.target.files).length; i++) {
      //   const file = Array.from(event.target.files)[i];
      //   filesToUpload.push(file);
      //   const blobAddress = await readFileAsync(file);
      //   resultAdmAboutContent += '<img src="' + blobAddress + '" />';
      // }


      fetch('/api/adm/about/setaboutcontent', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json;charset=utf-8'
        // },
        body: fd
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText);
          res.json();
        })
        .then((res) => {
          dispatch(success(res, filesToUpload));
        });

      // // let progress = 0;
      // axios.post('/api/adm/about/setaboutcontent', fd, {
      //   // onUploadProgress:(event) => progress = Math.round((event.loaded * 100) / event.total)
      //   onUploadProgress: event => console.log(event)
      // });



      // dispatch(success(resultAdmAboutContent, filesToUpload));
    } catch (e) {
      dispatch(error(e))
    }
  }

  function begin() {
    return {
      type: ADM_SET_ABOUT_BEGIN
    }
  }

  function success(content, files) {
    return {
      type: ADM_SET_ABOUT_SUCCESS,
      admAboutContent: content,
      filesToUpload: files
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
  return (dispatch) => {
    dispatch(begin());
    try {
      fetch('/api/adm/about/getaboutcontent', {
        method: 'POST'
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText);
          res.json();
        })
        .then((res) => {
          dispatch(success(res));
        });
    } catch (e) {
      dispatch(error(e))
    }
  }

  function begin() {
    return {
      type: ADM_GET_ABOUT_BEGIN
    }
  }

  function success(res) {
    return {
      type: ADM_GET_ABOUT_SUCCESS,
      admAboutContent: res
    }
  }

  function error(error) {
    return {
      type: ADM_GET_ABOUT_ERROR,
      error: error
    }
  }
}


// export function setAdminAboutContent(content) {
//   return (dispatch) => {
//
//     fetch('/api/adm/about/setaboutcontent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify({content: content})
//     })
//       .then(res => res.json())
//       .then((res) => {
//         dispatch(success(res));
//       })
//
//     function success(res) {
//       return {
//         type: ADM_SET_ABOUT_SUCCESS,
//         content: res
//       }
//     }
//   }
// }


// export function getAdminAboutContent() {
//   return (dispatch) => {
//
//     fetch('/api/adm/about/getaboutcontent', {
//       method: 'POST'
//     })
//       .then(res => res.json())
//       .then((res) => {
//         dispatch(success(res));
//       });
//
//     function success(res) {
//       return {
//         type: ADM_GET_ABOUT_SUCCESS,
//         content: res
//       }
//     }
//   }
// }

