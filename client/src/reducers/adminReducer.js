import {ADM_MENU_TOGGLE} from "../_constants/admMenuConstants";

const admMenuState = {
  admMenuOpen: false
};

export default function adminReducer(state = admMenuState, action) {
  switch (action.type) {
    case ADM_MENU_TOGGLE:
      return {
        admMenuOpen: !state.admMenuOpen
      }
  }
  return state
}
