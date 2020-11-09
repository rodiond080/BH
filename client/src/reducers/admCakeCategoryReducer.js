import {
  GET_CATEGORY_CAKES_INIT, GET_CATEGORY_CAKES_SUCCESS, GET_CATEGORY_CAKES_ERROR, SET_CURRENT_PAG_PAGE
} from "../_constants/admCakeCategoryConstants";

const admCakeCategoryState = {
  loading:false,
  categoryCakes:[],
  error:null,
  message:'',
  currentPage:1,
  overallNumberPages:1
};

export default function getCategoryCakes(state = admCakeCategoryState, action) {
  switch (action.type) {

    case GET_CATEGORY_CAKES_INIT:
      return {
        ...state,
        loading:action.loading
      }
    case GET_CATEGORY_CAKES_SUCCESS:
      return {
        ...state,
        loading:action.loading,
        categoryCakes:action.categoryCakes,
        overallNumberPages:action.overallNumberPages
      }
    case GET_CATEGORY_CAKES_ERROR:
      return {
        ...state,
        loading:action.loading,
        error: action.error,
        message: action.message
      }
    case SET_CURRENT_PAG_PAGE:
      return {
        ...state,
        currentPage:action.currentPage
      }
    default:
      return state
  }
}
