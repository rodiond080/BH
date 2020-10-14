import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {toggleActiveBackdrop, toggleAddFilling, toggleAddNewFilling} from "../actions/adminCakeEditActions";
import Backdrop from "../components/Backdrop/Backdrop";

function mapStateToProps(state) {
  return {
    backdropActive: state.admCakeEditReducer.backdropActive,
    addFillingOpen: state.admCakeEditReducer.addFillingOpen,
    addNewFillingOpen: state.admCakeEditReducer.addNewFillingOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAddFilling: (addFillingOpen) => dispatch(toggleAddFilling(addFillingOpen)),
    toggleAddNewFilling: (addNewFillingOpen) => dispatch(toggleAddNewFilling(addNewFillingOpen)),
    toggleActiveBackdrop: (backdropActive) => dispatch(toggleActiveBackdrop(backdropActive)),
  }
}

const AdminCakeEdit = (props) => {

  const fillings = ['Начинка1', 'Начинка2', 'Начинка3'];

  const addFilling = (e) => {
    e.preventDefault();
    props.toggleAddFilling(props.addFillingOpen);
  }

  const removeFilling = (e) => {
    e.preventDefault();

  }

  useEffect(() => {
    console.log(props)
  }, []);

  return (
    <div className="admin__about-cakeedit">
      {props.addFillingOpen && !props.addNewFillingOpen ?
        <div className="cake__edit-wrapper" onClick={() => props.toggleAddFilling(props.addFillingOpen)}>
          <div className="cake__edit-addbox" onClick={(e) => {
            e.stopPropagation()
          }}>
            {props.location.cakeData.filling.length
              ? props.location.cakeData.filling.map((filling, index) => {
                return (
                  <div key={index}>
                    <select>
                      {fillings.map((globalFilling, index) => {
                        return (
                          filling === globalFilling
                            ? <option selected value={globalFilling} key={index}>{globalFilling}</option>
                            : <option value={globalFilling} key={index}>{globalFilling}</option>
                        )
                      })}
                    </select>
                    <button>Редактировать</button>
                    <button>Удалить</button>
                  </div>
                )
              })
              : <div>Начинок пока добавлено не было</div>}
            <div>
              <select>
                <option disabled selected value>-- выберите начинку --</option>
                {fillings.map((globalFilling, index) => {
                  return (
                    <option value={globalFilling} key={index}>{globalFilling}</option>
                  )
                })}
              </select>
              <button>Добавить</button>
            </div>
            <button onClick={(e) => {
              props.toggleAddFilling(props.addFillingOpen);
              props.toggleAddNewFilling(props.addNewFillingOpen);
            }}>Добавить новую начинку
            </button>
          </div>
        </div>
        : null}
      {
        props.addNewFillingOpen && !props.addFillingOpen ?
          <div className="cake__edit-wrapper" onClick={() => props.toggleAddNewFilling(props.addNewFillingOpen)}>
            <div className="cake__edit-addbox" onClick={(e) => {
              e.stopPropagation()
            }}>
              add new filling
              <button onClick={() => {
                props.toggleAddFilling(props.addFillingOpen);
                props.toggleAddNewFilling(props.addNewFillingOpen);
              }}>Добавить</button>
            </div>
          </div>
          : null
      }
      {/*{props.backdropActive ? <Backdrop onClick={onClose} /> : null}*/}
      <label htmlFor="cakename">Название:</label>
      <input type="text" id="cakename"/>
      <label htmlFor="cakeprice">Стоимость:</label>
      <input type="text" id="cakeprice"/>
      <label htmlFor="cakedescription">Описание:</label>
      <input type="text" id="cakedescription"/>
      <label>Начинки:</label>
      {
        props.location.cakeData.filling.length
          ? props.location.cakeData.filling.map((filling, index) => {
            return (
              <div key={index}>
                <a className="cake__edit-fillingname" href="#"
                   onClick={(e) => {
                     e.preventDefault()
                   }}>
                  {filling}
                </a>
              </div>
            )
          })
          : <div>Начинок пока добавлено не было</div>
      }
      <button onClick={(e) => addFilling(e)}>Редактировать начинки</button>
    </div>
  )


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCakeEdit));
