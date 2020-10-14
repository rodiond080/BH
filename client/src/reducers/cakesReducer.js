import {SET_MIN_PRICE, SET_MAX_PRICE, SET_CURRENT_MAX_PRICE ,SET_CURRENT_MIN_PRICE} from "../_constants/cakesConstants";

const aboutState = {
  firstLoad:true,
  maxPrice: 10000,
  minPrice: 0,
  currentMaxPrice:10000,
  currentMinPrice:0,
  currentCakeSegment: 0,
  numberOfSegments:0,
};

export default function cakesReducer(state = aboutState, action) {
  switch (action.type) {
    case SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.minPrice
      }
    case SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.maxPrice
      }
    case SET_CURRENT_MAX_PRICE:
      return {
        ...state,
        currentMaxPrice: action.currentMaxPrice
      }
    case SET_CURRENT_MIN_PRICE:
      return {
        ...state,
        currentMinPrice: action.currentMinPrice
      }
  }
  return state
}
