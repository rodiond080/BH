import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import adminReducer from "./adminReducer";
import admAboutReducer from "./admAboutReducer";
import aboutReducer from "./aboutReducer";
import cakesReducer from "./cakesReducer";
import admCakeEditReducer from "./admCakeEditReducer";
import admAddCategoryReducer from "./admAddCategoryReducer";
import admCakeCategoriesReducer from "./AdmCakeCategoriesReducer";
import admFillingEditorReducer from "./admFillingEditorReducer";
import admCakeCategoryReducer from "./admCakeCategoryReducer";


const rootReducer = combineReducers({
  admCakeCategoryReducer,
  admFillingEditorReducer,
  admCakesReducer: admCakeCategoriesReducer,
  admAddCategoryReducer,
  admCakeEditReducer,
  cakesReducer,
  aboutReducer,
  admAboutReducer,
  adminReducer,
  menuReducer
});

export default rootReducer;
