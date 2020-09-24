import {
  ADM_SET_ABOUT_INIT, ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR,
  ADM_GET_ABOUT_INIT, ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR
} from "../_constants/admAboutConstants";

import io from 'socket.io-client';
import ss from 'socket.io-stream';

export function setAdminAboutContent(content, files) {
  return (dispatch) => {

    try {
      dispatch(init());
      var socket = io.connect('http://localhost:5001');

      console.log(Array.from(files))
      Array.from(files).forEach(file=>{
        // const file = files[0];
        const ind = document.createElement('p');
        ind.innerHTML='0%'
        document.getElementById('xxx').appendChild(ind)


        const stream = ss.createStream();
        ss(socket).emit('img-about-upload', stream, {
          size: file.size, name: file.name
        });
        ss.createStream(file).pipe(stream);

        var blobStream = ss.createBlobReadStream(file);
        var size = 0;

        blobStream.on('data', function (chunk) {
          size += chunk.length;
          ind.innerHTML=Math.floor(size / file.size * 100) + '%'
          // console.log(Math.floor(size / file.size * 100) + '%');
        });

        blobStream.pipe(stream);
      });






      // const file = files[0];
      // const stream = ss.createStream();
      // ss(socket).emit('img-about-upload', stream, {
      //   size: file.size, name: file.name
      // });
      // ss.createStream(file).pipe(stream);
      //
      // var blobStream = ss.createBlobReadStream(file);
      // var size = 0;
      //
      // blobStream.on('data', function (chunk) {
      //   size += chunk.length;
      //   console.log(Math.floor(size / file.size * 100) + '%');
      // });
      //
      // blobStream.pipe(stream);





      //--------------------------------------or with axios
      // img-about-upload


      // const fd = new FormData();
      // fd.append('content', content);
      // fetch('/api/adm/about/setaboutcontent', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      //   },
      //   body: JSON.stringify({content: content})
      // })
      //   .then(res => res.json())
      //   .then((res) => {
      dispatch(success());
      //   });
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
      // admAboutContent: admAboutContent,
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
