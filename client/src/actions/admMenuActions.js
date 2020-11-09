import {ADM_MENU_TOGGLE, NOTIFICATION} from "../_constants/admMenuConstants";

export function admMenuToggle() {
  return {
    type: ADM_MENU_TOGGLE
  }
}

export function setNotification(message) {
  return {
    type: NOTIFICATION,
    notification:message
  }
}
