import React, {useEffect, useRef} from 'react';
import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import {
  toggleAddFilling, toggleAddNewFilling, setMessage, uploadImgAndSetImgAddr, getCakeFillingsById,
  setCakeName, setCakePrice, setCakeDescription, setCakeFillings, setCakeImages,setSelectedFillingValue,
  getFillingList, updateCakeFillings, updateCake, toggleEditFilling, getCakeData
} from "../../actions/admCakeEditActions";
import AdmEditFilling from "./AdmEditFilling";
import ImgDragAndDField from "./DragAndDropField";
import AdmEditCakeFilling from "./AdmEditCakeFilling";
import {NotificationContext} from "../../hoc/AdminLayout";

function mapStateToProps(state) {
  return {
    cakeId: state.admCakeEditReducer.cakeId,
    cakeName: state.admCakeEditReducer.cakeName,
    cakePrice: state.admCakeEditReducer.cakePrice,
    cakeDescription: state.admCakeEditReducer.cakeDescription,
    cakeFillings: state.admCakeEditReducer.cakeFillings,

    cakeImages: state.admCakeEditReducer.cakeImages,
    selectedFillingValue: state.admCakeEditReducer.selectedFillingValue,

    fillingsList: state.admCakeEditReducer.fillingsList,
    message: state.admCakeEditReducer.message,

    addFillingOpen: state.admCakeEditReducer.addFillingOpen,
    editFillingOpen: state.admCakeEditReducer.editFillingOpen,
    addNewFillingOpen: state.admCakeEditReducer.addNewFillingOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCakeName: (cakeName) => dispatch(setCakeName(cakeName)),
    setCakePrice: (cakePrice) => dispatch(setCakePrice(cakePrice)),
    setCakeDescription: (cakeDescription) => dispatch(setCakeDescription(cakeDescription)),
    setCakeFillings: (cakeFillings) => dispatch(setCakeFillings(cakeFillings)),
    setCakeImages: (cakeImages) => dispatch(setCakeImages(cakeImages)),


    getCakeFillingsById: (arrayOfCakeFIllingsIds) => dispatch(getCakeFillingsById(arrayOfCakeFIllingsIds)),
    updateCakeFillings: (cakeFillings) => dispatch(updateCakeFillings(cakeFillings)),
    updateCake: (categoryId, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages, addressToSaveResult) => dispatch(updateCake(categoryId, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages, addressToSaveResult)),
    getFillingList: () => dispatch(getFillingList()),
    getCakeData: (cakeLinkName) => dispatch(getCakeData(cakeLinkName)),
    setMessage: (message) => dispatch(setMessage(message)),
    setSelectedFillingValue: (selectedFillingValue) => dispatch(setSelectedFillingValue(selectedFillingValue)),

    uploadImgAndSetImgAddr: (fileblob, file, counter) => dispatch(uploadImgAndSetImgAddr(fileblob, file, counter)),

    toggleAddFilling: (addFillingOpen) => dispatch(toggleAddFilling(addFillingOpen)),
    toggleAddNewFilling: (addNewFillingOpen) => dispatch(toggleAddNewFilling(addNewFillingOpen)),
    toggleEditFilling: (editFillingOpen) => dispatch(toggleEditFilling(editFillingOpen)),
  }
}

const AdmEditCake = (props) => {
  // const fillingToAdd = useRef(null);
  const categoriesPaginationIndex = useParams().index;
  const cakeCategoryName = useParams().category;
  const cakesPaginationIndex = useParams().catcakepage;
  const cakeLinkName = useParams().cake;


  const setAddFillingOpen = () => {
    props.toggleAddFilling(false);
    props.toggleAddNewFilling(true);
    props.toggleEditFilling(true);
  }
  const setAddNewFillingOpen = () => {
    props.toggleAddFilling(true);
    props.toggleAddNewFilling(false);
    props.toggleEditFilling(true);
  }
  const setEditFillingOpen = () => {
    props.toggleAddFilling(true);
    props.toggleAddNewFilling(true);
    props.toggleEditFilling(false);
  }

  useEffect(() => {
    props.getFillingList();
    cakeLinkName ? props.getCakeData(cakeLinkName) : null;

    return function () {
      props.setCakeName('');
      props.setCakePrice('');
      props.setCakeDescription('');
      props.setCakeFillings([]);
      props.setCakeImages([]);
    }

  }, []);

  return (
    <div className="admin__about-cakeedit admin__frame">
      {props.addNewFillingOpen && !props.addFillingOpen && !props.editFillingOpen ?
        <AdmEditFilling
          toggleAddNewFilling={props.toggleAddNewFilling}
          setAddFillingOpen={setAddFillingOpen}
          updateFillingList={props.updateFillingList}
          addNewFillingOpen={props.addNewFillingOpen}
          getFillingList={props.getFillingList}
          data={{fillingName: '', fillingDescription: ''}}
          addressToSaveResult={'/api/adm/cakes/savenewfilling'}
        />
        : null}
      {!props.addNewFillingOpen && !props.addFillingOpen && props.editFillingOpen ?
        <AdmEditFilling
          toggleAddNewFilling={props.toggleEditFilling}
          getFillingList={props.getFillingList}
          setAddFillingOpen={setAddFillingOpen}
          addNewFillingOpen={props.editFillingOpen}
          addressToSaveResult={'/api/adm/cakes/updateonefilling'}
          data={{
            fillingName: props.selectedFillingValue ? props.selectedFillingValue.value : null,
            fillingDescription: '',
            id: Array.from(props.selectedFillingValue).filter(item => {
              return item.value === props.selectedFillingValue.value
            })[0].id
          }}
        />
        : null}


      {props.addFillingOpen && !props.addNewFillingOpen && !props.editFillingOpen ?
        <AdmEditCakeFilling
          cakeFillings={props.cakeFillings}
          fillingsList={props.fillingsList}
          addFillingOpen={props.addFillingOpen}
          setEditFillingOpen={setEditFillingOpen}
          setAddNewFillingOpen={setAddNewFillingOpen}
          updateCakeFillings={props.updateCakeFillings}
          toggleAddFilling={props.toggleAddFilling}
          setAddFillingOpen={setAddFillingOpen}
          setCakeFillings={props.setCakeFillings}
          setMessage={props.setMessage}
          setSelectedFillingValue={props.setSelectedFillingValue}

        />
        : null}


      <label htmlFor="cakename">Название:</label>
      <input type="text" onChange={(e) => {
        props.setCakeName(e.target.value)
      }} value={props.cakeName} id="cakename"/>
      <label htmlFor="cakeprice">Стоимость:</label>
      <input type="number" onChange={(e) => {
        props.setCakePrice(e.target.value)
      }} value={props.cakePrice} id="cakeprice"/>
      <label htmlFor="cakedescription">Описание:</label>
      <textarea type="text" onChange={(e) => {
        props.setCakeDescription(e.target.value)
      }} value={props.cakeDescription} id="cakedescription"/>
      <label>Начинки:</label>
      <div className="cake__edit-fillingsbuttonwrapper">
        <div className="cake__edit-fillingswrapper">
          {
            props.cakeFillings.length
              ? props.cakeFillings.map((filling, index) => {
                return (
                  <div key={index}>
                    <a className="cake__edit-fillingname" href="#"
                       onClick={(e) => {
                         e.preventDefault();
                       }}>
                      {filling.fillingName}
                      <span className="cake__edit-fillingdescr">
                        {filling.fillingDescription}
                      </span>
                    </a>
                  </div>
                )
              })
              : <div>Начинок пока добавлено не было</div>
          }
        </div>
        <div className="cake__edit-buttonwrapper">
          <button
            className="green__button"
            onClick={(e) => {
              e.preventDefault();
              setAddFillingOpen();
            }}>Редактировать начинки
          </button>
        </div>

      </div>

      <ImgDragAndDField
        uploadImgAndSetImgAddr={props.uploadImgAndSetImgAddr}
        cakeImages={props.cakeImages}
        setCakeImages={props.setCakeImages}
        cakeCategory={2}
      />
      <button className="green__button"
              onClick={(e) => {
                e.preventDefault();
                const addressToSaveResult = cakeLinkName
                  ? '/api/adm/cakes/updatecake'
                  : '/api/adm/cakes/savenewcake';
                props.updateCake(
                  cakeCategoryName,
                  props.cakeId,
                  props.cakeName,
                  props.cakePrice,
                  props.cakeDescription,
                  props.cakeFillings,
                  props.cakeName.translit().replace(/\s/g, '').toLowerCase(),
                  props.cakeImages,
                  addressToSaveResult
                );
              }}
      >
        Сохранить
      </button>
      <div>{props.message}</div>


      <button
        onClick={() => {
          console.log(props)
        }}
      >ddd
      </button>


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
            ? <button style={{zIndex: '4',
              width: '40px', height: '20px',
            }} onClick={() => {
              props.setMessage('');
              context.setNotification('');
              props.getFillingList();

              if (props.message === 'Данные были успешно сохранены'

              ) {
                props.history.push(
                  '/admin/cakes/index/' + categoriesPaginationIndex +
                  '/categories/' + cakeCategoryName +
                  '/page/' + cakesPaginationIndex +
                  '/edit/' + props.cakeName.translit().replace(/\s/g, '').toLowerCase()
                );
              }else if(props.message === 'Начика была успешно сохранена'){
                setAddFillingOpen();
              }
            }
            }>ok</button>
            : null)
        }
      </NotificationContext.Consumer>
    </div>
  )


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmEditCake));
