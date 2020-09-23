import {
  ADM_GET_ABOUT_BEGIN, ADM_GET_ABOUT_SUCCESS, ADM_GET_ABOUT_ERROR,
  ADM_SET_ABOUT_BEGIN, ADM_SET_ABOUT_SUCCESS, ADM_SET_ABOUT_ERROR
}
  from "../_constants/admAboutConstants";

const admAboutState = {
  loading: false,
  admAboutContent: '',
  filesToUpload: [],
  error: null
};

export default function admAboutReducer(state = admAboutState, action) {
  switch (action.type) {
    case ADM_GET_ABOUT_BEGIN:
      return {
        ...state, loading: true
      }
    case ADM_GET_ABOUT_SUCCESS:
      return {
        ...state, loading: false,
        admAboutContent: action.admAboutContent
      }
    case ADM_GET_ABOUT_ERROR:
      return {
        ...state, loading: false,
        error: action.error
      }


    case ADM_SET_ABOUT_BEGIN:
      return {
        ...state, loading: true
      }
    case ADM_SET_ABOUT_SUCCESS:
      return {
        ...state, loading: false,
        admAboutContent: action.admAboutContent,
        filesToUpload: action.filesToUpload
      }
    case ADM_SET_ABOUT_ERROR:
      return {
        ...state, loading: false,
        error: action.error
      }
  }
  return state
}
