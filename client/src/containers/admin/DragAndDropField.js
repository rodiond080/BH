import React, {useEffect, useRef} from 'react';
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {
  setImgAddress, removeGarbageImages,
  uploadImgAndSetImgAddr, setImgName,
  setCategoryName, saveNewCategory
} from "../../actions/admAddCategoryActions";


function mapStateToProps(state) {
  return {
    // loading: state.admAddCategoryReducer.loading,
    // newCategoryName: state.admAddCategoryReducer.newCategoryName,
    // imgAddress: state.admAddCategoryReducer.imgAddress,
    // imgUploadPercent: state.admAddCategoryReducer.imgUploadPercent,
    // imgName: state.admAddCategoryReducer.imgName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // setCategoryName: (newCategoryName) => dispatch(setCategoryName(newCategoryName)),
    // setImgAddress: (imgAddress) => dispatch(setImgAddress(imgAddress)),
    // uploadImgAndSetImgAddr: (fileBlob, file) => dispatch(uploadImgAndSetImgAddr(fileBlob, file)),
    // saveNewCategory: (newCategoryName, newCategoryLinkName, imgName,dbId,serverAddressToSave) => dispatch(saveNewCategory(newCategoryName, newCategoryLinkName, imgName, dbId,serverAddressToSave)),
    // removeGarbageImages: () => dispatch(removeGarbageImages()),
    // setImgName: (imgName) => dispatch(setImgName(imgName)),
  }
}

function readFileAsync(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    }
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

const DragAndDropField = (props) => {
  const posterInputLabelWrapper = useRef(null);
  useEffect(() => {

    // props.setCategoryName(props.location.newCategoryName);
    // props.location.imgName.length
    //   ?props.setImgName(props.location.imgName)
    //   :props.setImgName('')
    // ;
    // props.location.imgName.length
    //   ?props.setImgAddress('/public/images/categories/'+props.location.imgName)
    //   :props.setImgAddress('');

    return function () {
      // props.removeGarbageImages();
    }
  }, []);

  return (
    <div className="" onDrop={(event => {
      event.preventDefault();
      event.stopPropagation();
    })}>
      <div className="admin__draganddrop" onDrop={(event => {
        event.preventDefault();
        event.stopPropagation();
      })}>
        <div className="admin__images-container">
          {
            props.cakeImages.length ?
              props.cakeImages.map((imageObject , index)=>{
                return(
                  <div style={{background: `url(${imageObject.cakeImageAddress})`}}
                       className="admin__draganddrop-imgitemwrapper"
                       key={index}
                  ><div className="admin__draganddrop-loadline">
                    {
                      imageObject.cakeImgUploadPercents
                        ?
                        <div className="admin__draganddrop-subloadline" style={{width:  imageObject.cakeImgUploadPercents[index]+'%'}}>
                        </div>
                        :null
                    }</div>

                    <div className="admin__draganddrop-loadclose">
                      <div className="admin__draganddrop-cross"
                           onClick={(e) => {
                             let newCakeImages = props.cakeImages.slice();
                             newCakeImages.splice(index, 1);
                             props.setCakeImages(newCakeImages);
                           }}
                           style={{background: `url(/public/images/close.png)`}}>
                      </div>
                    </div>
                  </div>
                )}):null
          }

        </div>


        <div ref={posterInputLabelWrapper} className="admin__draganddrop-imgwrapper"
                 onDrop={async (e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   let dt = e.dataTransfer;
                   let files = dt.files;
                   files = [...files];
                   let counter = props.cakeImages.length;
                   files.forEach(async (file)=>{
                     const fileBlob = await readFileAsync(file);
                     props.uploadImgAndSetImgAddr(fileBlob, file, counter);
                     counter++;
                   });


                   posterInputLabelWrapper.current.classList.remove('active');
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
          <label htmlFor="addposter">добавить файл</label>

          </div>
        <input accept="image/*" onChange={async (e) => {
          const files = [...e.target.files];
          let counter = props.cakeImages.length;
          files.forEach(async (file)=>{
            const fileBlob = await readFileAsync(file);
            props.uploadImgAndSetImgAddr(fileBlob, file, counter);
            counter++;
          });
          // const file = e.target.files[0];
          // const fileBlob = await readFileAsync(file);
          // props.uploadImgAndSetImgAddr(fileBlob, file);
        }} multiple type="file" id="addposter" />

      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DragAndDropField));
