import {ADM_TOGGLE_BACKDROP, ADM_FILLING_OPEN, ADM_NEW_FILLING_OPEN} from "../_constants/admCakeEditConstants";


export function toggleActiveBackdrop(backdropActive) {
  return (dispatch) => {
    dispatch(success(backdropActive));
  }

  function success(backdropActive) {
    return {
      type: ADM_TOGGLE_BACKDROP,
      backdropActive: !backdropActive
    }
  }
}

export function toggleAddFilling(addFillingOpen) {
  return (dispatch) => {
    dispatch(success(addFillingOpen));
  }

  function success(addFillingOpen) {
    return {
      type: ADM_FILLING_OPEN,
      addFillingOpen: !addFillingOpen
    }
  }
}

export function toggleAddNewFilling(addNewFillingOpen) {
  return (dispatch) => {
    dispatch(success(addNewFillingOpen));
  }

  function success(addNewFillingOpen) {
    return {
      type: ADM_NEW_FILLING_OPEN,
      addNewFillingOpen: !addNewFillingOpen
    }
  }
}
