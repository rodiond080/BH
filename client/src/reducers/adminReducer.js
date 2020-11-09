import {ADM_MENU_TOGGLE, NOTIFICATION} from "../_constants/admMenuConstants";

const admMenuState = {
  admMenuOpen: false,
  notification: '',
};

export default function adminReducer(state = admMenuState, action) {
  switch (action.type) {
    case ADM_MENU_TOGGLE:
      return {
        ...state,
        admMenuOpen: !state.admMenuOpen
      }
    case NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      }
  }
  return state
}
