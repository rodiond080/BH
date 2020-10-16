import {
  ADM_TOGGLE_BACKDROP,
  ADM_FILLING_OPEN,
  ADM_NEW_FILLING_OPEN,
  SET_CAKE_NAME,
  SET_CAKE_PRICE,
  SET_CAKE_DESCRIPTION,
  SET_CAKE_FILLINGS,
  SET_NEW_FILLING_NAME,
  SET_NEW_FILLING_DESCR,
  UPDATE_FILLING_LIST_INIT,
  UPDATE_FILLING_LIST_SUCCESS,
  UPDATE_FILLING_LIST_ERROR,
  GET_FILLING_LIST_INIT,
  GET_FILLING_LIST_SUCCESS, GET_FILLING_LIST_ERROR,
} from "../_constants/admCakeEditConstants";
import axios from "axios";
import {ADM_SET_ABOUT_ERROR, ADM_SET_ABOUT_INIT, ADM_SET_ABOUT_SUCCESS} from "../_constants/admAboutConstants";

export function getFillingList(newFillingName, newFillingDescr) {
  return (dispatch) => {
    try {
      dispatch(init());
      axios.post('/api/adm/cakes/getfillinglist', {}).then(res => {
        dispatch(success(res.data));
      });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: GET_FILLING_LIST_INIT,
      loading: true
    }
  }

  function success(fillingsList) {
    return {
      type: GET_FILLING_LIST_SUCCESS,
      fillingsList: fillingsList
    }
  }

  function error(error) {
    return {
      type: GET_FILLING_LIST_ERROR,
      error: error,
      loading: false
    }
  }
}

export function updateFillingList(newFillingName, newFillingDescr) {
  return (dispatch) => {
    try {
      dispatch(init());
      // const imagesTagsToUpdate = document.getElementsByClassName('admin__about-image');
      // const imagesToUpdate = Array.from(imagesTagsToUpdate).map(imgTag => {
      //   return imgTag.attributes.getNamedItem('data-nameId').value;
      // });
      //
      // Array.from(imagesTagsToUpdate).forEach(imgTag => {
      //   const fileName = imgTag.attributes.getNamedItem('data-nameId').value;
      //   imgTag.style.backgroundImage = 'url(\'' + '../public/images/about/' + fileName + '\')';
      // });
      // const fd = new FormData();
      // fd.append('newFillingName', newFillingName);
      // fd.append('newFillindDescr', newFillindDescr);

      const fd = {
        newFillingName,
        newFillingDescr
      }

      axios.post('/api/adm/cakes/updatefillinglist', fd).then(res => {
        dispatch(success());
      });

      dispatch(success());
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: UPDATE_FILLING_LIST_INIT,
      loading: true
    }
  }

  function success() {
    return {
      type: UPDATE_FILLING_LIST_SUCCESS,
      loading: false
    }
  }

  function error(error) {
    return {
      type: UPDATE_FILLING_LIST_ERROR,
      error: error,
      loading: false
    }
  }
}

export function setNewFillingName(newFillingName) {
  return (dispatch) => {
    dispatch(success(newFillingName));
  }

  function success(newFillingName) {
    return {
      type: SET_NEW_FILLING_NAME,
      newFillingName: newFillingName
    }
  }
}


export function setNewFillingDescr(newFillingDescr) {
  return (dispatch) => {
    dispatch(success(newFillingDescr));
  }

  function success(newFillingDescr) {
    return {
      type: SET_NEW_FILLING_DESCR,
      newFillingDescr: newFillingDescr
    }
  }
}

export function setCakeName(cakeName) {
  return (dispatch) => {
    dispatch(success(cakeName));
  }

  function success(cakeName) {
    return {
      type: SET_CAKE_NAME,
      cakeName: cakeName
    }
  }
}

export function setCakePrice(cakePrice) {
  return (dispatch) => {
    dispatch(success(cakePrice));
  }

  function success(cakePrice) {
    return {
      type: SET_CAKE_PRICE,
      cakePrice: cakePrice
    }
  }
}

export function setCakeDescription(cakeDescription) {
  return (dispatch) => {
    dispatch(success(cakeDescription));
  }

  function success(cakeDescription) {
    return {
      type: SET_CAKE_DESCRIPTION,
      cakeDescription: cakeDescription
    }
  }
}

export function setCakeFillings(cakeFillings) {
  return (dispatch) => {
    dispatch(success(cakeFillings));
  }

  function success(cakeFillings) {
    return {
      type: SET_CAKE_FILLINGS,
      cakeFillings: cakeFillings
    }
  }
}


export function toggleActiveBackdrop(backdropActive) {
  return (dispatch) => {
    dispatch(success(backdropActive));
  }

  function success(backdropActive) {
    return {
      type: ADM_TOGGLE_BACKDROP,
      backdropActive: !backdropActive
    }
  }
}

export function toggleAddFilling(addFillingOpen) {
  return (dispatch) => {
    dispatch(success(addFillingOpen));
  }

  function success(addFillingOpen) {
    return {
      type: ADM_FILLING_OPEN,
      addFillingOpen: !addFillingOpen
    }
  }
}

export function toggleAddNewFilling(addNewFillingOpen) {
  return (dispatch) => {
    dispatch(success(addNewFillingOpen));
  }

  function success(addNewFillingOpen) {
    return {
      type: ADM_NEW_FILLING_OPEN,
      addNewFillingOpen: !addNewFillingOpen
    }
  }
}
