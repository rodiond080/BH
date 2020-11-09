import {
  ADM_GET_CATEGORIES_INIT,
  ADM_GET_CATEGORIES_SUCCESS,
  ADM_GET_CATEGORIES_ERROR, SET_CURRENT_PAGE
} from "../_constants/admCakeCategoriesConstants";

const admCakeCatState = {
  loading: false,
  categories:[],
  error:null,
  overallNumberPages:1,
  currentPage:1,
};

export default function AdmCakeCategoriesReducer(state = admCakeCatState, action) {
  switch (action.type) {
    case ADM_GET_CATEGORIES_INIT:
      return {
        ...state,
        loading: action.loading,
      }
    case ADM_GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        categories: action.categories,
        overallNumberPages: action.overallNumberPages,
      }
    case ADM_GET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: action.loading,
        error:action.error
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
  }
  return state
}
