import { ADM_TOGGLE_BACKDROP, ADM_FILLING_OPEN, ADM_NEW_FILLING_OPEN} from "../_constants/admCakeEditConstants";

const admCakeEditState = {
  backdropActive:false,
  addFillingOpen:false,
  addNewFillingOpen:false,
};

export default function admCakeEditReducer(state = admCakeEditState, action) {

  switch (action.type) {
    case ADM_TOGGLE_BACKDROP:
      return {
        ...state,
          backdropActive: action.backdropActive
      }
    case ADM_FILLING_OPEN:
      return {
        ...state,
        addFillingOpen: action.addFillingOpen
      }
    case ADM_NEW_FILLING_OPEN:
      return {
        ...state,
        addNewFillingOpen: action.addNewFillingOpen
      }
  }
  return state
}
