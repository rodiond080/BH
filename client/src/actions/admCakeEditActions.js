import {
  ADM_FILLING_OPEN,
  ADM_NEW_FILLING_OPEN,
  SET_CAKE_NAME,
  ADM_EDITFILLING_OPEN,
  SET_CAKE_PRICE,
  SET_CAKE_DESCRIPTION,
  SET_CAKE_FILLINGS,
  UPDATE_FILLING_LIST_ERROR,
  SET_NEW_FILLING_DESCR,
  UPDATE_FILLING_LIST_INIT,
  UPDATE_FILLING_LIST_SUCCESS,
  SET_CAKE_IMAGES,
  GET_FILLING_LIST_INIT,
  GET_FILLING_LIST_SUCCESS,
  GET_FILLING_LIST_ERROR,
  SET_MESSAGE,
  UPLOAD_IMAGES_INIT,SET_SELECTED_FILLING_VALUE,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_ERROR,
  UPLOAD_IMAGES_LOADING,
  GET_FILLINGS_BY_IDS_ERROR,
  GET_FILLINGS_BY_IDS_SUCCESS, GET_FILLINGS_BY_IDS_INIT, GET_CAKE_DATA_SUCCESS, GET_CAKE_DATA_ERROR, GET_CAKE_DATA_INIT
} from "../_constants/admCakeEditConstants";
import axios from "axios";

export function getCakeFillingsById(arrayOfCakeFIllingsIds) {
  return (dispatch, getState) => {
    try {
      dispatch(init())
      axios.post('/api/adm/cakes/getcakefillingsbyid', {arrayOfCakeFIllingsIds})
        .then(res => {
          dispatch(success(res.data))
        })
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: GET_FILLINGS_BY_IDS_INIT,
      loading: true
    }
  }

  function success(cakeFillings) {
    return {
      type: GET_FILLINGS_BY_IDS_SUCCESS,
      cakeFillings: cakeFillings,
      loading: false,
    }
  }

  function error(error) {
    return {
      type: GET_FILLINGS_BY_IDS_ERROR,
      loading: false,
      error: error
    }
  }
}

export function uploadImgAndSetImgAddr(fileblob, file, counter) {
  return (dispatch, getState) => {
    try {
      const cakeImagesArray = getState().admCakeEditReducer.cakeImages.slice();
      const fileName = Date.now().toString().substr(9, 4) + file.name;
      let cakeImageObjectToAdd = {
        cakeImageName: fileName,
        cakeImageAddress: fileblob,
        cakeImgUploadPercents: 0,
      }
      //
      cakeImagesArray.push(cakeImageObjectToAdd);
      dispatch(init(cakeImagesArray));
      const fd = new FormData();
      fd.append('imageName', file, fileName);
      axios.post('/api/adm/cakes/uploadnewcakeimages', fd, {
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          let newCakeImageObject = {...cakeImageObjectToAdd};
          newCakeImageObject.cakeImgUploadPercents = percentCompleted;
          let cakeImagesArray = getState().admCakeEditReducer.cakeImages.slice();
          cakeImagesArray[counter] = newCakeImageObject;
          dispatch(loading(cakeImagesArray));
        }
      }).then(res => {
        const imgAddress = '/public/images/cakes/temp/' + fileName;
        let newCakeImageObject = getState().admCakeEditReducer.cakeImages.slice()[counter];
        newCakeImageObject.cakeImageAddress = imgAddress;
        let cakeImagesCopy = getState().admCakeEditReducer.cakeImages.slice();
        cakeImagesCopy[counter] = newCakeImageObject;
        dispatch(success(cakeImagesCopy));
      });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init(cakeImagesArray) {
    return {
      type: UPLOAD_IMAGES_INIT,
      cakeImages: cakeImagesArray
    }
  }

  function loading(cakeImagesArray) {
    return {
      type: UPLOAD_IMAGES_LOADING,
      cakeImages: cakeImagesArray,
    }
  }

  function success(cakeImagesCopy) {
    return {
      type: UPLOAD_IMAGES_SUCCESS,
      cakeImages: cakeImagesCopy,
      message: 'Изображения были успешно загружены'
    }
  }

  function error(error) {
    return {
      type: UPLOAD_IMAGES_ERROR,
      error: error
    }
  }
}

export function setCakeImages(cakeImages) {
  return (dispatch) => {
    dispatch(success(cakeImages));
  }

  function success(cakeImages) {
    return {
      type: SET_CAKE_IMAGES,
      cakeImages: cakeImages
    }
  }
}

export function setSelectedFillingValue(selectedFillingValue){
  return (dispatch)=>{
    dispatch(success(selectedFillingValue));
  }

  function success(selectedFillingValue) {
    return {
      type: SET_SELECTED_FILLING_VALUE,
      selectedFillingValue,
    }
  }
}

export function updateCake(categoryName, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages, addressToSaveResult) {
  return (dispatch) => {
    // console.log(categoryName, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages, addressToSaveResult)
    try {
      dispatch(init());
      axios.post(addressToSaveResult,
        {categoryName, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages}
        ).then(res => {
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
      fillingsList: fillingsList,
      message:'Данные были успешно сохранены'
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

export function updateCakeFillings(cakeFillings) {
  return (dispatch) => {
    try {
      dispatch(init());

      axios.post('/api/adm/cakes/updatecakefillings', cakeFillings).then(res => {
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

export function getCakeData(cakeLinkName){
  return (dispatch) => {
    try {
      axios.post('/api/adm/cakes/getcakedata', {cakeLinkName})
        .then(res => {
        dispatch(success(res.data));
      });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: GET_CAKE_DATA_INIT,
      loading:true
    }
  }

  function success(data) {
    return {
      type: GET_CAKE_DATA_SUCCESS,
      cakeId: data._id,
      cakeName: data.name,
      cakePrice: data.price,
      cakeDescription: data.description,
      cakeFillings: data.fillings,
      cakeImages:data.images,
      loading:false,
    }
  }

  function error(error) {
    return {
      type: GET_CAKE_DATA_ERROR,
      error: error,
      loading: false
    }
  }
}

export function getFillingList() {
  return (dispatch) => {
    try {
      axios.post('/api/adm/cakes/getfillinglist', {}).then(res => {
        dispatch(success(res.data));
      });
    } catch (e) {
      dispatch(error(e));
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

export function updateFillingList(fillingNameData) {
  return (dispatch) => {
    try {
      dispatch(init());

      // const fd = {
      //   fillingName,
      //   fillingDescription
      // }

      console.log(fillingNameData);

      // const fd = {
      //   fillingName,
      //   fillingDescription
      // }

      // axios.post('/api/adm/cakes/updatefillinglist', fd).then(res => {
      //   dispatch(success());
      // });

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

export function toggleEditFilling(editFillingOpen) {
  return (dispatch) => {
    dispatch(success(editFillingOpen));
  }

  function success(editFillingOpen) {
    return {
      type: ADM_EDITFILLING_OPEN,
      editFillingOpen: !editFillingOpen
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
