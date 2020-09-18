import {ADM_ABOUT_SUCCESS} from "../_constants/admAboutConstants";

function x(res) {
  return {
    type: ADM_ABOUT_SUCCESS,
    content:res
  }
}

export function getAdminAboutContent() {
  return (dispatch) => {

    fetch('/api/adm/about/getabout', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({content:'Hello'})
    })
      .then(res=>res.json())
      .then((res)=>{
        dispatch(x(res));
      })

    // fetch('/adm/about/getabout', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify('sss')
    // })
    //   .then(res => res.json())
    //   .then((res) => {
    //     dispatch(x(res))
    //   })

    // setTimeout(()=>{
    //   dispatch(x())
    // }, 2000);
  }
}


// import {ADM_ABOUT_SUCCESS} from "../_constants/admAboutConstants";
//
// function x(){
//   return {type:ADM_ABOUT_SUCCESS}
// }
//
// export function getAdminAboutContent() {
//   return (dispatch)=>{
//     setTimeout(()=>{
//       dispatch(x())
//     }, 2000);
//   }
// }
