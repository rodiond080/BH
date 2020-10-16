import {
  ADM_TOGGLE_BACKDROP, ADM_FILLING_OPEN, ADM_NEW_FILLING_OPEN,
  SET_CAKE_NAME, SET_CAKE_PRICE, SET_CAKE_DESCRIPTION, SET_CAKE_FILLINGS,
  SET_NEW_FILLING_NAME, SET_NEW_FILLING_DESCR,
  UPDATE_FILLING_LIST_INIT, UPDATE_FILLING_LIST_SUCCESS,
  UPDATE_FILLING_LIST_ERROR
} from "../_constants/admCakeEditConstants";

const admCakeEditState = {
  backdropActive: false,
  addFillingOpen: false,
  cakeName: '',
  cakePrice: 0,
  cakeDescription: '',
  cakeFillings: [],
  newFillingName:'',
  newFillingDescr:'',
  fillingsList:[],
  error:null,
  loading:false
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
  }
  return state
}
