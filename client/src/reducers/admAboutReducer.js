import {
  ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR,
  ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR,SET_ERROR
} from "../_constants/admAboutConstants";

const admAboutState = {
  admAboutContent: '',
  imgNamesToUpdate: [],
  error: null,
  contentTouched: false
};

export default function admAboutReducer(state = admAboutState, action) {
  switch (action.type) {

    case ADM_GET_ABOUT_SUCCESS:
      return {
        ...state,
        admAboutContent: action.admAboutContent,
        error: action.error
      }
    case ADM_GET_ABOUT_ERROR:
      return {
        admAboutContent: action.content,
        error: action.error
      }

    case ADM_SET_ABOUT_SUCCESS:
      return {
        ...state,
        message: action.message,
        error: action.error
      }
    case ADM_SET_ABOUT_ERROR:
      return {
        error: action.error
      }
    case SET_ERROR:
      return {
        error: action.error
      }
  }
  return state
}
