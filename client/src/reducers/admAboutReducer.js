import {
  ADM_SET_ABOUT_INIT, ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR,
  ADM_GET_ABOUT_INIT, ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR
} from "../_constants/admAboutConstants";

const admAboutState = {
  loading: false,
  admAboutContent: '',
  filesToUpload: [],
  error: null
};

export default function admAboutReducer(state = admAboutState, action) {
  switch (action.type) {
    case ADM_GET_ABOUT_INIT:
      return {
        ...state,
        loading: action.loading
      }
    case ADM_GET_ABOUT_SUCCESS:
      return {
        ...state,
        admAboutContent: action.admAboutContent,
        loading: action.loading
      }
    case ADM_GET_ABOUT_ERROR:
      return {
        admAboutContent: action.content,
        loading: action.loading,
        error: action.error
      }
    case ADM_SET_ABOUT_INIT:
      return {
        ...state,
        loading: action.loading
      }
    case ADM_SET_ABOUT_SUCCESS:
      return {
        ...state,
        // admAboutContent: action.admAboutContent,
        loading: action.loading
      }
    case ADM_SET_ABOUT_ERROR:
      return {
        loading: action.loading,
        error: action.error
      }
  }
  return state
}
