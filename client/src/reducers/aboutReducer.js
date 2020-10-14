import {GET_ABOUT_INIT, GET_ABOUT_SUCCESS, GET_ABOUT_ERROR} from "../_constants/aboutConstants";
import {TOGGLE_BACKDROP_ACTIVE} from "../_constants/aboutConstants";

const aboutState = {
  aboutContent: '',
  imageSizes: [],
  loading: false,
  error: null
};

export default function aboutReducer(state = aboutState, action) {
  switch (action.type) {
    case GET_ABOUT_INIT:
      return {
        ...state,
        loading: action.loading
      }
    case GET_ABOUT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        aboutContent: action.aboutContent,
        imageSizes: action.imageSizes
      }
    case GET_ABOUT_ERROR:
      return {
        ...state,
        error: action.error
      }
    case TOGGLE_BACKDROP_ACTIVE:
      return {
        backdropActive:action.backdropActive
      }
  }
  return state
}
