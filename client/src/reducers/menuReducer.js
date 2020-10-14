import {MENUCLOSE, MENUOPEN, CAKES, CAPCAKES} from "../_constants/menuConstants";

const menuState = {
  menuOpen:false,
  cakesOpen:false,
  capCakesOpen:false,
  backdropActive:false
};

export default function menuReducer(state=menuState, action) {
  switch (action.type){
    case MENUOPEN:
      return {
        ...state,
        menuOpen:true

      }
    case MENUCLOSE:
      return {
        ...state,
        menuOpen:false,

      }
    case CAKES:
      return {
        ...state,
        cakesOpen: !state.cakesOpen,
        capCakesOpen: state.capCakesOpen
      }
    case CAPCAKES:
      return {
        ...state,
        cakesOpen: state.cakesOpen,
        capCakesOpen: !state.capCakesOpen
      }

  }
  return state
}
