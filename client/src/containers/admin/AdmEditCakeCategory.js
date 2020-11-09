import React, {useEffect, useRef} from 'react';
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {
  setImgAddress, removeGarbageImages, setMessage,
  uploadImgAndSetImgAddr, setImageName,
  setCategoryName, saveNewCategory
} from "../../actions/admAddCategoryActions";
import {NotificationContext} from "../../hoc/AdminLayout";


function mapStateToProps(state) {
  return {
    loading: state.admAddCategoryReducer.loading,
    categoryName: state.admAddCategoryReducer.categoryName,
    message: state.admAddCategoryReducer.message,
    imageAddress: state.admAddCategoryReducer.imageAddress,
    imgUploadPercent: state.admAddCategoryReducer.imgUploadPercent,
    imageName: state.admAddCategoryReducer.imageName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategoryName: (newCategoryName) => dispatch(setCategoryName(newCategoryName)),
    setImgAddress: (imageAddress) => dispatch(setImgAddress(imageAddress)),
    setMessage: (message) => dispatch(setMessage(message)),
    uploadImgAndSetImgAddr: (fileBlob, file) => dispatch(uploadImgAndSetImgAddr(fileBlob, file)),
    saveNewCategory: (categoryName, categoryLinkName, imageName, id, serverAddressToSave) => dispatch(saveNewCategory(categoryName, categoryLinkName, imageName, id, serverAddressToSave)),
    removeGarbageImages: () => dispatch(removeGarbageImages()),
    setImageName: (imageName) => dispatch(setImageName(imageName)),
  }
}


const AdmEditCakeCategory = (props) => {

  const posterInputLabelWrapper = useRef(null);
  const paginationCategoriesIndex= useParams().index;

  useEffect(() => {
    props.setCategoryName(props.location.categoryName);
    props.location.imageName.length
      ? props.setImageName(props.location.imageName)
      : props.setImageName('')
    ;
    props.location.imageName.length
      ? props.setImgAddress('/public/images/categories/' + props.location.imageName)
      : props.setImgAddress('');

    return function () {
      props.removeGarbageImages();
    }
  }, []);

  return (
    <div className="admin__frame"
    //      onDrop={(event => {
    //   // event.preventDefault();
    //   // event.stopPropagation();
    // })}
    >
      <div className="admin__category-edit"
      //      onDrop={(event => {
      //   // event.preventDefault();
      //   // event.stopPropagation();
      // }
      // )}
      >
        <label htmlFor="addcatname">Название</label>
        <input type="text" value={props.categoryName} onChange={(e) => {
          props.setCategoryName(e.target.value);
        }} id="addcatname"/>


        {props.imageAddress.length ?
          // <div style={{background: `url(/public/images/logo.png)`}} className="category__edit-imgsketch">
          <div style={{background: `url(${props.imageAddress})`}} className="category__edit-imgsketch">
            <div className="category__edit-loadline">
              <div className="category__edit-subloadline" style={{width: props.imgUploadPercent + '%'}}>
              </div>
            </div>
            <div className="category__edit-loadclose">
              <div className="category__edit-cross"
                   onClick={(e) => {
                     props.setImgAddress('')
                     props.setImageName('')
                   }}
                   style={{background: `url(/public/images/close.png)`}}>
              </div>
            </div>
          </div>
          : <div ref={posterInputLabelWrapper} className="category__edit-imglabelwrapper"
                 onDrop={async (e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   let dt = e.dataTransfer;
                   let files = dt.files;
                   files = [...files];
                   const file = files[0];
                   const fileBlob = await file.readFileAsync();
                   // const fileBlob = await readFileAsync(file);
                   props.uploadImgAndSetImgAddr(fileBlob, file);
                 }}
                 onDragOver={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   posterInputLabelWrapper.current.classList.add('active');
                 }}
                 onDragLeave={(e) => {
                   posterInputLabelWrapper.current.classList.remove('active');
                 }}>

            <span>Перенесите файл изображения сюда или нажмите</span>
            &nbsp;
            <label htmlFor="addcatposter">добавить файл</label>
          </div>
        }
        <input accept="image/*" onChange={async (e) => {
          const file = e.target.files[0];
          const fileBlob = await file.readFileAsync();
          // const fileBlob = await readFileAsync(file);
          props.uploadImgAndSetImgAddr(fileBlob, file);
        }} type="file" id="addcatposter"/>
        <button
          className="green__button"
          onClick={
          (e) => {
            props.saveNewCategory(
              props.categoryName,
              props.categoryName.translit().replace(/\s/g, '').toLowerCase(),
              props.imageName,
              props.location.id ? props.location.id : null,
              props.location.serverAddressToSave
            );
            // props.history.push("/admin/cakes/"+);
          }
        }>
          Сохранить
        </button>
      </div>

      <NotificationContext.Consumer>
        {
          context => {
            props.message ?
              context.setNotification(props.message)
              : null
          }
        }
      </NotificationContext.Consumer>

      <NotificationContext.Consumer>
        {
          context => (props.message
            ? <button style={{zIndex: '4'}} onClick={() => {
              if (props.message === 'Данные были успешно сохранены') {
                props.setMessage('');
                context.setNotification('');
                return props.history.push('/admin/cakes/index/' + paginationCategoriesIndex);
              }
              props.setMessage('');
              context.setNotification('');
            }
            }>ok</button>
            : null)
        }
      </NotificationContext.Consumer>

      <button
        onClick={() => {
          console.log(props);
        }}
      >ddd
      </button>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmEditCakeCategory));
