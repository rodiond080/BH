import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import adminReducer from "./adminReducer";
import admAboutReducer from "./admAboutReducer";
import aboutReducer from "./aboutReducer";
import cakesReducer from "./cakesReducer";
import admCakeEditReducer from "./admCakeEditReducer";


const rootReducer = combineReducers({
  admCakeEditReducer,
  cakesReducer,
  aboutReducer,
  admAboutReducer,
  adminReducer,
  menuReducer
});

export default rootReducer;
