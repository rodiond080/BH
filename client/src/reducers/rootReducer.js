import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import adminReducer from "./adminReducer";
import admAboutReducer from "./admAboutReducer";


const rootReducer = combineReducers({
  admAboutReducer,
  adminReducer,
  menuReducer
});

export default rootReducer;
