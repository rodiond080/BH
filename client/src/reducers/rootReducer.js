import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import adminReducer from "./adminReducer";
import admAboutReducer from "./admAboutReducer";
import aboutReducer from "./aboutReducer";


const rootReducer = combineReducers({
  aboutReducer,
  admAboutReducer,
  adminReducer,
  menuReducer
});

export default rootReducer;
