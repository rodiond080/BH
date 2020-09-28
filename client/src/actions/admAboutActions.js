import {
  ADM_SET_ABOUT_INIT, ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR,
  ADM_GET_ABOUT_INIT, ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR, ADM_SET_CONTENT_TOUCHED
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

export function setAdminAboutContent(e, content, touched) {

  return (dispatch) => {
    // e.preventDefault();

    try {
      dispatch(init());
      var socket = io.connect('http://localhost:5001');

      const files = e.target.files;
      const listOfFileNames = [];

      Array.from(files).forEach(async (file) => {
        //Blob
        const blobForImgSketch = await readFileAsync(file);
        const imgSketch = document.createElement('img');
        imgSketch.classList.add('admin__about-image');
        imgSketch.nameId = file.name;
        imgSketch.style.backgroundImage = 'url(\'' + blobForImgSketch + '\')';
        document.getElementById('xxx').appendChild(imgSketch);


        const stream = ss.createStream();
        ss(socket).emit('img-about-upload', stream, {
          size: file.size, name: file.name
        });
        ss.createStream(file).pipe(stream);

        var blobStream = ss.createBlobReadStream(file);
        var size = 0;
        blobStream.on('data', function (chunk) {
          size += chunk.length;
          // ind.innerHTML = Math.floor(size / file.size * 100) + '%';
          // console.log(Math.floor(size / file.size * 100) + '%');
        });
        blobStream.pipe(stream);
      });


      for (let i = 0; i < document.getElementsByClassName('admin__about-image').length; i++) {
        console.log(document.getElementsByClassName('admin__about-image')[i]);
      }

      // console.log(document.getElementsByClassName('admin__about-image'));

      // let allImageTagsToSave = ;
      // document.getElementsByClassName('admin__about-image').forEach(imageTag=>{
      // console.log(imageTag)
      // imageTag.style.backgroundImage=   'url(\'' + '../public/images/about/'+imageTag.nameId + '\')';
      // });

      // window.addEventListener('load', function () {
      //   console.log(document.getElementsByClassName('admin__about-image')[0]);
      // })

      axios.post('/api/adm/about/setaboutcontent', {
        aboutContent: JSON.stringify(document.getElementById('xxx').innerHTML)
      })
        .then(res => {
          // console.log(res)
        })


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

  function success(admAboutContent) {
    return {
      type: ADM_GET_ABOUT_SUCCESS,
      admAboutContent: admAboutContent,
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
