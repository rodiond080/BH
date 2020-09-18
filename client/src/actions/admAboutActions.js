import {ADM_SET_ABOUT_SUCCESS, ADM_GET_ABOUT_SUCCESS} from "../_constants/admAboutConstants";


export function setAdminAboutContent(content) {
  return (dispatch) => {

    fetch('/api/adm/about/setaboutcontent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({content: content})
    })
      .then(res => res.json())
      .then((res) => {
        dispatch(success(res));
      })

    function success(res) {
      return {
        type: ADM_SET_ABOUT_SUCCESS,
        content: res
      }
    }
  }
}

export function getAdminAboutContent() {
  return (dispatch) => {

    fetch('/api/adm/about/getaboutcontent', {
      method: 'POST'
    })
      .then(res => res.json())
      .then((res) => {
        dispatch(success(res));
      })

    function success(res) {
      return {
        type: ADM_GET_ABOUT_SUCCESS,
        content: res
      }
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
