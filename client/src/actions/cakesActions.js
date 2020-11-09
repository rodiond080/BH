import {SET_MIN_PRICE, SET_MAX_PRICE, SET_CURRENT_MAX_PRICE, SET_CURRENT_MIN_PRICE} from "../_constants/cakesConstants";

export function openNextCakeSegment(maxPrice) {
  return (dispatch) => {
    dispatch(success(maxPrice));
  }

  function success(maxPrice) {
    return {
      type: SET_MAX_PRICE,
      maxPrice: maxPrice
    }
  }
}

export function setCurrentMaxPrice(currentMaxPrice) {
  return (dispatch) => {
    dispatch(success(currentMaxPrice));
  }

  function success(currentMaxPrice) {
    return {
      type: SET_CURRENT_MAX_PRICE,
      currentMaxPrice: currentMaxPrice
    }
  }
}

export function setCurrentMinPrice(currentMinPrice) {
  return (dispatch) => {
    dispatch(success(currentMinPrice));
  }

  function success(currentMinPrice) {
    return {
      type: SET_CURRENT_MIN_PRICE,
      currentMinPrice: currentMinPrice
    }
  }
}

export function setMaxPrice(maxPrice) {
  return (dispatch) => {
    dispatch(success(maxPrice));
  }

  function success(maxPrice) {
    return {
      type: SET_MAX_PRICE,
      maxPrice: maxPrice
    }
  }
}

export function setMinPrice(minPrice) {
  return (dispatch) => {
    dispatch(success(minPrice));
  }

  function success(minPrice) {
    return {
      type: SET_MIN_PRICE,
      minPrice: minPrice
    }
  }
}
