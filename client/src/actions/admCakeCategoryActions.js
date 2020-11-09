import {
  GET_CATEGORY_CAKES_INIT, GET_CATEGORY_CAKES_SUCCESS, GET_CATEGORY_CAKES_ERROR, SET_CURRENT_PAG_PAGE
} from "../_constants/admCakeCategoryConstants";
import axios from "axios";

export function setCurrentPaginationPage(currentPage) {
  return (dispatch) => {
    dispatch(success(currentPage));
  }

  function success(currentPage) {
    return {
      type: SET_CURRENT_PAG_PAGE,
      currentPage: currentPage
    }
  }
}

export function getCategoryCakes(categoryName, currentPage) {
  return (dispatch) => {
    try {
      dispatch(init());
      axios.post('/api/adm/cakes/getcategorycakes', {categoryName, currentPage})
        .then(res => {
          dispatch(success(
            res.data.categoryCakesWithImages,
            res.data.overallNumberPages
          ));
        });
    } catch (e) {
      dispatch(error(e));
    }
  }

  function init() {
    return {
      type: GET_CATEGORY_CAKES_INIT,
      loading: true
    }
  }

  function success(categoryCakes, overallNumberPages) {
    return {
      type: GET_CATEGORY_CAKES_SUCCESS,
      loading: false,
      overallNumberPages,
      categoryCakes
    }
  }

  function error(error) {
    return {
      type: GET_CATEGORY_CAKES_ERROR,
      loading: false,
      message: error.toString(),
      error: error
    }
  }
}
