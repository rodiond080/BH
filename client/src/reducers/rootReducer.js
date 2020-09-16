import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import adminReducer from "./adminReducer";


const rootReducer = combineReducers({
  adminReducer,
  menuReducer
});

export default rootReducer;
