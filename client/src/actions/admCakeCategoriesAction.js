import {
  ADM_GET_CATEGORIES_INIT,
  ADM_GET_CATEGORIES_SUCCESS,
  ADM_GET_CATEGORIES_ERROR, SET_CURRENT_PAGE
} from "../_constants/admCakeCategoriesConstants";
import axios from 'axios';

export function setCurrentPage(currentPage){
  return async (dispatch) => {
    dispatch(success(currentPage));
  }
  function success(currentPage) {
    return {
      type: SET_CURRENT_PAGE,
      currentPage
    }
  }
}


export function getCategories(currentPage) {
  return async (dispatch) => {
    try {
      dispatch(init());
      const res = await axios.post('/api/adm/cakes/getcategories', {currentPage});
      const {overallNumberPages, categoriesToSend} = res.data
      dispatch(success(overallNumberPages, categoriesToSend));
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: ADM_GET_CATEGORIES_INIT,
      loading: true
    }
  }

  function success(overallNumberPages, categories) {
    return {
      type: ADM_GET_CATEGORIES_SUCCESS,
      loading: false,
      overallNumberPages:overallNumberPages,
      categories
    }
  }

  function error(error) {
    return {
      type: ADM_GET_CATEGORIES_ERROR,
      loading: false,
      error
    }
  }
}
