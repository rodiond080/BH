import React, {useRef} from 'react';
import {withRouter} from "react-router";
import {NotificationContext} from "../../hoc/AdminLayout";

const AdmEditCakeFilling = (props) => {


  const fillingToAdd = useRef(null);


  return (

    <div className="cake__edit-wrapper" onClick={() => props.toggleAddFilling(props.addFillingOpen)}>
      <div className="cake__edit-addbox" onClick={(e) => {
        e.stopPropagation();
      }}>
        {
          props.cakeFillings.length
            ? props.cakeFillings.map((filling, index) => {
              return (
                <div key={index}>
                  <select>
                    {props.fillingsList.map((globalFilling, index) => {
                      return (
                        filling.fillingName === globalFilling.fillingName
                          ? <option disabled selected value={globalFilling.fillingName}
                                    key={index}>{globalFilling.fillingName}</option>
                          : null
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
            : <div>Начинок пока добавлено не было</div>
        }
        <div>
          <select ref={fillingToAdd}>
            <option disabled selected value>-- выберите начинку --</option>
            {props.fillingsList.map((globalFilling, index) => {
              return (
                <option id={globalFilling._id}
                        value={globalFilling.fillingName}
                        key={index}>{globalFilling.fillingName}
                </option>
              )
            })}
          </select>
          <button onClick={(e) => {
            fillingToAdd.current.value === 'true'
              ? props.setMessage('Нужно выбрать начинку для редактирования')
              : props.setEditFillingOpen();
            props.setSelectedFillingValue(fillingToAdd.current)
          }}>Редактировать
          </button>
          <button onClick={(e) => {
            const cakeFillingsCopy = props.cakeFillings.slice();

            Array.from(cakeFillingsCopy).map(item => {
              return item.fillingName;
            }).includes(fillingToAdd.current.options[fillingToAdd.current.selectedIndex].value)
              ? props.setMessage('Данная начинка уже добавлена')
              : cakeFillingsCopy.push({
                fillingName: fillingToAdd.current.options[fillingToAdd.current.selectedIndex].value,
                fillingDescription: props.fillingsList.filter(filling => {
                  return fillingToAdd.current.options[fillingToAdd.current.selectedIndex].value === filling.fillingName;
                })[0].fillingDescription,
                id: props.fillingsList.filter(filling => {
                  return fillingToAdd.current.options[fillingToAdd.current.selectedIndex].value === filling.fillingName;
                })[0]._id
              });
            props.setCakeFillings(cakeFillingsCopy);
            fillingToAdd.current.selectedIndex = 0;
          }}>Добавить
          </button>
        </div>
        <div>{props.message}</div>
        <button onClick={(e) => {
          props.setAddNewFillingOpen();
        }}>Добавить новую начинку
        </button>
        <br/>
        <button onClick={(e) => {
          props.updateCakeFillings(props.cakeFillings);
          props.toggleAddFilling(props.addFillingOpen);
        }}>
          Сохранить
        </button>
      </div>
    </div>

  )

}

export default withRouter(AdmEditCakeFilling);
