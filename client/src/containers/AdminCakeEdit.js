import React, {useEffect, useRef} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
  toggleAddFilling, toggleAddNewFilling, setNewFillingName,
  setCakeName, setCakePrice, setCakeDescription, setCakeFillings, setNewFillingDescr,
  updateFillingList, getFillingList
} from "../actions/adminCakeEditActions";

function mapStateToProps(state) {
  return {
    cakeName: state.admCakeEditReducer.cakeName,
    cakePrice: state.admCakeEditReducer.cakePrice,
    cakeDescription: state.admCakeEditReducer.cakeDescription,
    cakeFillings: state.admCakeEditReducer.cakeFillings,


    newFillingName: state.admCakeEditReducer.newFillingName,
    newFillingDescr: state.admCakeEditReducer.newFillingDescr,

    fillingsList: state.admCakeEditReducer.fillingsList,

    addFillingOpen: state.admCakeEditReducer.addFillingOpen,
    addNewFillingOpen: state.admCakeEditReducer.addNewFillingOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCakeName: (cakeName) => dispatch(setCakeName(cakeName)),
    setCakePrice: (cakePrice) => dispatch(setCakePrice(cakePrice)),
    setCakeDescription: (cakeDescription) => dispatch(setCakeDescription(cakeDescription)),
    setCakeFillings: (cakeFillings) => dispatch(setCakeFillings(cakeFillings)),

    setNewFillingName: (newFillingName) => dispatch(setNewFillingName(newFillingName)),
    setNewFillingDescr: (newFillingDescr) => dispatch(setNewFillingDescr(newFillingDescr)),

    updateFillingList: (newFillingName, newFillingDescr) => dispatch(updateFillingList(newFillingName, newFillingDescr)),

    getFillingList: () => dispatch(getFillingList()),

    toggleAddFilling: (addFillingOpen) => dispatch(toggleAddFilling(addFillingOpen)),
    toggleAddNewFilling: (addNewFillingOpen) => dispatch(toggleAddNewFilling(addNewFillingOpen)),
  }
}

const AdminCakeEdit = (props) => {
  const fillingToAdd = useRef(null);
  const fillings = ['Начинка1', 'Начинка2', 'Начинка3', 'Начинка4', 'Начинка5', 'Начинка6'];
  // const fillings = []
  // Array.from(props.fillingsList).forEach(filling=>{
  //   console.log(filling)
  // })

  const fillingsRender = (props) => {
    return (
      props.cakeFillings.map((filling, index) => {
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
            <button onClick={(e) => {
              const newCakeFillings = props.cakeFillings.slice();
              newCakeFillings.splice(index, 1);
              props.setCakeFillings(newCakeFillings);
            }}>Удалить
            </button>
          </div>
        )
      })
    )
  }

  const renderAddNewFilling = (props) => {
    return (
      <div className="cake__edit-wrapper" onClick={() => props.toggleAddNewFilling(props.addNewFillingOpen)}>
        <div className="cake__edit-addbox" onClick={(e) => {
          e.stopPropagation()
        }}>
          <label htmlFor="fillingname">Название:</label>
          <input type="text" onChange={(e) => {
            props.setNewFillingName(e.target.value);
          }} value={props.newFillingName} id="fillingname"/>

          <label htmlFor="fillingdescription">Описание:</label>
          <textarea type="text" onChange={(e) => {
            props.setNewFillingDescr(e.target.value);
          }} value={props.newFillingDescr} id="fillingdescription"/>

          <button onClick={(e) => {
            // props.addNewFilling(props.newFillingName, props.newFillingDescr);
            props.updateFillingList(props.newFillingName, props.newFillingDescr);
            props.setNewFillingName('');
            props.setNewFillingDescr('');
            props.toggleAddFilling(props.addFillingOpen);
            props.toggleAddNewFilling(props.addNewFillingOpen);
          }}>Добавить
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    props.getFillingList();
    props.setCakeName(props.location.cakeData.name);
    props.setCakePrice(props.location.cakeData.price);
    props.setCakeDescription(props.location.cakeData.description);
    props.setCakeFillings(props.location.cakeData.filling);
  }, []);

  return (
    <div className="admin__about-cakeedit">
      {props.addFillingOpen && !props.addNewFillingOpen ?
        <div className="cake__edit-wrapper" onClick={() => props.toggleAddFilling(props.addFillingOpen)}>
          <div className="cake__edit-addbox" onClick={(e) => {
            e.stopPropagation()
          }}>
            {
              props.cakeFillings.length
                ? fillingsRender(props)
                : <div>Начинок пока добавлено не было</div>
            }
            <div>
              <select ref={fillingToAdd}>
                <option disabled selected value>-- выберите начинку --</option>
                {fillings.map((globalFilling, index) => {
                  return (
                    props.cakeFillings.includes(globalFilling) ? null :
                      <option value={globalFilling} key={index}>{globalFilling}</option>
                  )
                })}
              </select>
              <button>Редактировать</button>
              <button onClick={(e) => {
                const cakeFillingsCopy = props.cakeFillings.slice();
                cakeFillingsCopy.push(fillingToAdd.current.options[fillingToAdd.current.selectedIndex].value);
                props.setCakeFillings(cakeFillingsCopy);
                fillingToAdd.current.selectedIndex = 0;
              }}>Добавить
              </button>
            </div>
            <button onClick={(e) => {
              props.toggleAddFilling(props.addFillingOpen);
              props.toggleAddNewFilling(props.addNewFillingOpen);
            }}>Добавить новую начинку
            </button>
            <br/>
            <button onClick={(e) => {
              props.toggleAddFilling(props.addFillingOpen);
            }}>Сохранить
            </button>
          </div>
        </div>
        : null}
      {props.addNewFillingOpen && !props.addFillingOpen ?
        renderAddNewFilling(props)
        : null}

      <label htmlFor="cakename">Название:</label>
      <input type="text" onChange={(e) => {
        props.setCakeName(e.target.value)
      }} value={props.cakeName} id="cakename"/>
      <label htmlFor="cakeprice">Стоимость:</label>
      <input type="text" onChange={(e) => {
        props.setCakePrice(e.target.value)
      }} value={props.cakePrice} id="cakeprice"/>
      <label htmlFor="cakedescription">Описание:</label>
      <textarea type="text" onChange={(e) => {
        props.setCakeDescription(e.target.value)
      }} value={props.cakeDescription} id="cakedescription"/>
      <label>Начинки:</label>
      {
        props.cakeFillings.length
          ? props.cakeFillings.map((filling, index) => {
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
      <button onClick={(e) => {
        e.preventDefault();
        props.toggleAddFilling(props.addFillingOpen);
      }}>Редактировать начинки
      </button>
    </div>
  )


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCakeEdit));
