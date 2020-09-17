import {ADM_ABOUT_SUCCESS} from "../_constants/admAboutConstants";

const admAboutState = {
  admAboutContent: ''
};

export default function admAboutReducer(state = admAboutState, action) {
  switch (action.type) {
    case ADM_ABOUT_SUCCESS:
      return {
        admAboutContent: "action.content"
      }
  }
  return state
}
