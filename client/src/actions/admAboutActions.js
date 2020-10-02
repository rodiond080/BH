import {
  ADM_SET_ABOUT_INIT, ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR,
  ADM_GET_ABOUT_INIT, ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR,
  ADM_SET_CONTENT_TOUCHED, ADM_UPDATE_ABOUT
} from "../_constants/admAboutConstants";
import axios from 'axios';
import io from 'socket.io-client';
import ss from 'socket.io-stream';

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

export function setAdminAboutContent(e, content, touched) {

  return (dispatch) => {

    try {
      dispatch(init());
      const files = e.target.files;
      console.log(files)
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
        document.getElementById('xxx').appendChild(imgSketch);

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
              document.getElementById('xxx').appendChild(imgSketch2);
              imgSketch2.style.backgroundImage = 'url(\'' + blobForImgSketch + '\')';
              // imgSketch2.style.backgroundImage = 'url(\'' + '../public/images/about/' + fileName + '\')';
            }

            // document.getElementById('output').innerHTML = percentCompleted;
          }
        })
          .then(res => {
            console.log(res);
            dispatch(success());
          })


        //   axios.post('/api/adm/about/setaboutcontent', fd,
        //     {
        //
        //     }
        //   ),
        // ).
        //   then(res => {
        //     // console.log(res)
        //     dispatch(success());
        //   })


      });

      // var socket = io.connect('http://localhost:5001');
      // const files = e.target.files;
      //
      // Array.from(files).forEach(async (file) => {
      //   const blobForImgSketch = await readFileAsync(file);
      //   const imgSketch = document.createElement('img');
      //   imgSketch.classList.add('admin__about-image');
      //   imgSketch.setAttribute('data-nameId', file.name);
      //   imgSketch.style.backgroundImage = 'url(\'' + blobForImgSketch + '\')';
      //   document.getElementById('xxx').appendChild(imgSketch);
      //
      //
      //   const stream = ss.createStream();
      //   ss(socket).emit('img-about-upload', stream, {
      //     size: file.size, name: file.name
      //   });
      //   ss.createStream(file).pipe(stream);
      //
      //   var blobStream = ss.createBlobReadStream(file);
      //   var size = 0;
      //   blobStream.on('data', function (chunk) {
      //     size += chunk.length;
      //     // console.log(Math.floor(size / file.size * 100) + '%');
      //     if (size === file.size) {
      //       imgSketch.style.backgroundImage = 'url(\'' + '../public/images/about/' + file.name + '\')';
      //     }
      //   });
      //   blobStream.pipe(stream);
      // });
      //
      //
      // axios.post('/api/adm/about/setaboutcontent', {
      //   aboutContent: JSON.stringify(document.getElementById('xxx').innerHTML),
      // }).then(res => {
      //   // console.log(res)
      //   dispatch(success());
      // })


    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: ADM_SET_ABOUT_INIT,
      loading: true
    }
  }

  function success() {
    return {
      type: ADM_SET_ABOUT_SUCCESS,
      loading: false
    }
  }

  function error(error) {
    return {
      type: ADM_SET_ABOUT_ERROR,
      error: error,
      loading: false
    }
  }
}

export function updateAdminAboutContent(e) {
  e.preventDefault();
  return (dispatch) => {
    try {
      dispatch(init());
      const imagesTagsToUpdate = document.getElementsByClassName('admin__about-image');
      const imagesToUpdate = Array.from(imagesTagsToUpdate).map(imgTag => {
        return imgTag.attributes.getNamedItem('data-nameId').value;
      });

      Array.from(imagesTagsToUpdate).forEach(imgTag => {
        const fileName = imgTag.attributes.getNamedItem('data-nameId').value;
        imgTag.style.backgroundImage = 'url(\'' + '../public/images/about/' + fileName + '\')';
      });

      axios.post('/api/adm/about/updateaboutcontent', {
        aboutContent: JSON.stringify(document.getElementById('xxx').innerHTML),
        imagesToUpdate: JSON.stringify(imagesToUpdate),
      }).then(res => {
        dispatch(success());
      });

      dispatch(success());
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: ADM_SET_ABOUT_INIT,
      loading: true
    }
  }

  function success() {
    return {
      type: ADM_SET_ABOUT_SUCCESS,
      loading: false
    }
  }

  function error(error) {
    return {
      type: ADM_SET_ABOUT_ERROR,
      error: error,
      loading: false
    }
  }
}

export function setContentTouched(e) {
  return (dispatch) => {
    dispatch(init())
    dispatch(success())
  }

  function init() {
    return {
      type: ADM_SET_CONTENT_TOUCHED,
      contentTouched: true
    }
  }

  function success() {
    return {
      type: ADM_SET_CONTENT_TOUCHED,
      contentTouched: true
    }
  }
}

export function getAdminAboutContent() {
  return (dispatch) => {
    try {
      dispatch(init())
      fetch('/api/adm/about/getaboutcontent', {
        method: 'POST'
      })
        .then(res => res.json())
        .then((res) => {
          dispatch(success(res));
        })
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: ADM_GET_ABOUT_INIT,
      loading: true
    }
  }

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



// export function getAdminAboutContent(content) {
//   return (dispatch) => {
//
//     fetch('/api/adm/about/getaboutcontent', {
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
//         type: ADM_GET_ABOUT_SUCCESS,
//         content: res
//       }
//     }
//   }
// }
