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
  SET_CAKE_IMAGES,
  UPDATE_FILLING_LIST_INIT,
  UPDATE_FILLING_LIST_SUCCESS,
  UPDATE_FILLING_LIST_ERROR,
  GET_FILLING_LIST_INIT,
  GET_FILLING_LIST_SUCCESS,
  GET_FILLING_LIST_ERROR,
  ADM_EDITFILLING_OPEN,
  SET_MESSAGE,
  UPLOAD_IMAGES_INIT,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_ERROR,
  UPLOAD_IMAGES_LOADING,
  GET_FILLINGS_BY_IDS_INIT,
  GET_FILLINGS_BY_IDS_SUCCESS,
  GET_FILLINGS_BY_IDS_ERROR,
  GET_CAKE_DATA_INIT,
  GET_CAKE_DATA_SUCCESS,
  GET_CAKE_DATA_ERROR,
  SET_SELECTED_FILLING_VALUE
} from "../_constants/admCakeEditConstants";

const admCakeEditState = {
  backdropActive: false,
  addFillingOpen: false,
  editFillingOpen: false,
  cakeId: '',
  cakeName: '',
  cakePrice: 0,
  cakeDescription: '',
  cakeFillings: [],
  newFillingName: '',
  newFillingDescr: '',
  fillingsList: [],
  error: null,
  loading: false,
  message: '',
  cakeImages: [],
  selectedFillingValue:{}
};

export default function admCakeEditReducer(state = admCakeEditState, action) {

  switch (action.type) {
    case ADM_TOGGLE_BACKDROP:
      return {
        ...state,
        backdropActive: action.backdropActive
      }
    case ADM_FILLING_OPEN:
      return {
        ...state,
        addFillingOpen: action.addFillingOpen
      }
    case ADM_NEW_FILLING_OPEN:
      return {
        ...state,
        addNewFillingOpen: action.addNewFillingOpen
      }
    case SET_CAKE_NAME:
      return {
        ...state,
        cakeName: action.cakeName
      }
    case SET_CAKE_PRICE:
      return {
        ...state,
        cakePrice: action.cakePrice
      }
    case SET_CAKE_DESCRIPTION:
      return {
        ...state,
        cakeDescription: action.cakeDescription
      }
    case SET_CAKE_FILLINGS:
      return {
        ...state,
        cakeFillings: action.cakeFillings
      }
    case SET_NEW_FILLING_NAME:
      return {
        ...state,
        newFillingName: action.newFillingName
      }
    case SET_NEW_FILLING_DESCR:
      return {
        ...state,
        newFillingDescr: action.newFillingDescr
      }
    case UPDATE_FILLING_LIST_INIT:
      return {
        ...state,
        // cakeFillings: action.cakeFillings
      }
    case UPDATE_FILLING_LIST_SUCCESS:
      return {
        ...state,
        // newFillingName: action.newFillingName
      }
    case UPDATE_FILLING_LIST_ERROR:
      return {
        ...state,
        // newFillingDescr: action.newFillingDescr
      }
    case GET_FILLING_LIST_INIT:
      return {
        ...state,
        loading: true
      }
    case GET_FILLING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
        fillingsList: action.fillingsList
      }
    case GET_FILLING_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case ADM_EDITFILLING_OPEN:
      return {
        ...state,
        editFillingOpen: action.editFillingOpen
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case UPLOAD_IMAGES_INIT:
      return {
        ...state,
        cakeImages: action.cakeImages,
      }
    case UPLOAD_IMAGES_LOADING:
      return {
        ...state,
        cakeImages: action.cakeImages
      }
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        message: action.message,
        cakeImages: action.cakeImages
      }
    case UPLOAD_IMAGES_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_CAKE_IMAGES:
      return {
        ...state,
        cakeImages: action.cakeImages
      }
    case GET_FILLINGS_BY_IDS_INIT:
      return {
        ...state,
        loading: action.loading,
      }
    case GET_FILLINGS_BY_IDS_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        cakeFillings: action.cakeFillings
      }
    case GET_FILLINGS_BY_IDS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      }
    case GET_CAKE_DATA_INIT:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      }
    case GET_CAKE_DATA_SUCCESS:
      return {
        ...state,
        cakeId: action.cakeId,
        cakeName: action.cakeName,
        cakePrice: action.cakePrice,
        cakeDescription: action.cakeDescription,
        cakeFillings: action.cakeFillings,
        cakeImages:action.cakeImages,
        loading: action.loading
      }
    case GET_CAKE_DATA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      }
    case SET_SELECTED_FILLING_VALUE:
      return {
        ...state,
        selectedFillingValue: action.selectedFillingValue
      }

    default:
      return {
        ...state
      }
  }
}
