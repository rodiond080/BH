import {
  SET_NEW_FILLING_NAME, SET_NEW_FILLING_DESCR, SET_MESSAGE,
  UPDATE_FILLINGSLIST_INIT, UPDATE_FILLINGSLIST_SUCCESS, UPDATE_FILLINGSLIST_ERROR, GET_DESCRIPTION_BY_ID
} from "../_constants/admFillingEditorConstants";

const admAboutState = {
  newFillingName:'',
  newFillingDescr:'',
  message:'',
  loading: false,
};

export default function admFillingEditorReducer(state = admAboutState, action) {
  switch (action.type) {
    case SET_NEW_FILLING_NAME:
      return {
        ...state,
        fillingName: action.fillingName
      }
    case SET_NEW_FILLING_DESCR:
      return {
        ...state,
        fillingDescription: action.fillingDescription
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case UPDATE_FILLINGSLIST_INIT:
      return {
        ...state,
        message: action.message,
        loading: action.loading,
      }
    case UPDATE_FILLINGSLIST_SUCCESS:
      return {
        ...state,
        message: action.message,
        loading: action.loading
      }
    case UPDATE_FILLINGSLIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      }
    case GET_DESCRIPTION_BY_ID:
      return {
        ...state,
        fillingDescription: action.fillingDescription
      }
  }
  return state
}
