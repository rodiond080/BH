import {
  UPLOAD_IMG_INIT, SET_IMG_ADDRESS_SUCCESS, SET_CATEGORY_NAME, SET_IMG_NAME,
  UPLOAD_IMG_SUCCESS, UPLOAD_IMG_ERROR, UPLOAD_IMG_LOADING, SAVE_NEW_CAT_SUCCESS, SAVE_NEW_CAT_ERROR, SET_MESSAGE
} from "../_constants/admAddCategoryConstants";

const aboutState = {
  error: null,
  message:'',
  loading: false,
  categoryName:'',
  imageAddress: '',
  imgUploadPercent:0,
  imageName:''
};

export default function admAddCategoryReducer(state = aboutState, action) {
  switch (action.type) {
    case UPLOAD_IMG_INIT:
      return {
        ...state,
        imageAddress: action.imageAddress
      }
    case UPLOAD_IMG_LOADING:
      return {
        ...state,
        imgUploadPercent: action.imgUploadPercent
      }
    case UPLOAD_IMG_SUCCESS:
      return {
        ...state,
        imageAddress: action.imageAddress,
        imageName: action.imageName
      }
    case UPLOAD_IMG_ERROR :
      return {
        ...state,
        imageName: action.imageName,
        error: action.error
      }
    case SET_IMG_ADDRESS_SUCCESS  :
      return {
        ...state,
        imageAddress: action.imageAddress,
      }
    case SET_CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.categoryName,
      }
    case SAVE_NEW_CAT_SUCCESS:
      return {
        ...state,
        categoryName: action.categoryName,
        imageName: action.imageName,
        message: action.message,
        imageAddress: action.imageAddress,
      }
    case SAVE_NEW_CAT_ERROR:
      return {
        ...state,
        message: action.message,
        error: action.error,
      }
    case SET_IMG_NAME:
      return {
        ...state,
        imageName: action.imageName,
      }
    case SET_MESSAGE:
      return {
        ...state,
      message: action.message
      }
  }
  return state
}
