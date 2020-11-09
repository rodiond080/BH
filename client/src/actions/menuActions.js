import {MENUCLOSE, MENUOPEN, CAKES, CAPCAKES} from "../_constants/menuConstants";

export function menuOpen(){
  return{
    type:MENUOPEN
  }
}

export function menuClose(){
  return{
    type:MENUCLOSE
  }
}


export function toggleCakes(){
  return{
    type:CAKES
  }
}

export function toggleCapCakes(){
  return{
    type:CAPCAKES
  }
}
