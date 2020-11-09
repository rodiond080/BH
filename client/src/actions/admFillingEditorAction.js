import axios from "axios";
import {
  SET_NEW_FILLING_NAME, SET_NEW_FILLING_DESCR, SET_MESSAGE , GET_DESCRIPTION_BY_ID,
  UPDATE_FILLINGSLIST_INIT, UPDATE_FILLINGSLIST_SUCCESS, UPDATE_FILLINGSLIST_ERROR
} from "../_constants/admFillingEditorConstants";

// import {} from "../_constants/admCakeEditConstants";

export function setNewFillingName(fillingName) {
  return (dispatch) => {
    dispatch(success(fillingName));
  }

  function success(fillingName) {
    return {
      type: SET_NEW_FILLING_NAME,
      fillingName: fillingName
    }
  }
}

export function setNewFillingDescr(fillingDescription) {
  return (dispatch) => {
    dispatch(success(fillingDescription));
  }

  function success(fillingDescription) {
    return {
      type: SET_NEW_FILLING_DESCR,
      fillingDescription: fillingDescription
    }
  }
}

export function setMessage(message) {
  return (dispatch) => {
    dispatch(success(message));
  }

  function success(message) {
    return {
      type: SET_MESSAGE,
      message: message
    }
  }
}

export function updateFillingList(data) {
  return (dispatch) => {
    try {
      dispatch(init());
      axios.post(data.addressToSaveResult, data)
        .then(res => {
        dispatch(success());
      });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: UPDATE_FILLINGSLIST_INIT,
      message:'Loading..',
      loading: true,
    }
  }

  function success() {
    return {
      type: UPDATE_FILLINGSLIST_SUCCESS,
      loading: false,
      message:'Данные были успешно обновлены',
    }
  }

  function error(error) {
    return {
      type: UPDATE_FILLINGSLIST_ERROR,
      error: error,
      loading: false
    }
  }
}

export function getDescriptionById(id){
  return (dispatch) => {
    try {
      axios.post('/api/adm/cakes/getfillingdescriptionbyid', {id}).then(res => {
        dispatch(success(res.data.fillingDescription));
      });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function success(fillingDescription) {
    return {
      type: GET_DESCRIPTION_BY_ID,
      fillingDescription:fillingDescription
    }
  }

  function error(error) {
    return {
      type: UPDATE_FILLINGSLIST_ERROR,
      error: error,
      loading: false
    }
  }
}
// export function updateFillingList(newFillingName, newFillingDescr, addressToSaveResult) {
//   return (dispatch) => {
//     try {
//       dispatch(init());
//
//       const fd = {
//         newFillingName,
//         newFillingDescr
//       }
//       axios.post(addressToSaveResult, fd).then(res => {
//         dispatch(success());
//       });
//     } catch (e) {
//       dispatch(error(e));
//     }
//   }
//
//   function init() {
//     return {
//       type: UPDATE_FILLING_LIST_INIT,
//       loading: true
//     }
//   }
//
//   function success() {
//     return {
//       type: UPDATE_FILLING_LIST_SUCCESS,
//       loading: false
//     }
//   }
//
//   function error(error) {
//     return {
//       type: UPDATE_FILLING_LIST_ERROR,
//       error: error,
//       loading: false
//     }
//   }
// }

// export function setNewFillingDescr(cakeName, cakePrice, cakeDescription, cakeFillings) {
//   return (dispatch) => {
//     try {
//       dispatch(init());
//       axios.post('/api/adm/cakes/updatecake', {cakeName, cakePrice, cakeDescription, cakeFillings}).then(res => {
//         dispatch(success(res.data));
//       });
//     } catch (e) {
//       dispatch(error(e));
//     }
//   }
//
//   function init() {
//     return {
//       type: GET_FILLING_LIST_INIT,
//       loading: true
//     }
//   }
//
//   function success(fillingsList) {
//     return {
//       type: GET_FILLING_LIST_SUCCESS,
//       fillingsList: fillingsList
//     }
//   }
//
//   function error(error) {
//     return {
//       type: GET_FILLING_LIST_ERROR,
//       error: error,
//       loading: false
//     }
//   }
// }
