import React, {useEffect, useRef} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
  toggleAddFilling, toggleAddNewFilling, setMessage, uploadImgAndSetImgAddr, getCakeFillingsById,
  setCakeName, setCakePrice, setCakeDescription, setCakeFillings, setCakeImages,
  updateFillingList, getFillingList, updateCakeFillings, updateCake, toggleEditFilling
} from "../../actions/admCakeEditActions";
import AdmEditFilling from "./AdmEditFilling";
import ImgDragAndDField from "./DragAndDropField";

function mapStateToProps(state) {
  return {
    cakeName: state.admCakeEditReducer.cakeName,
    cakePrice: state.admCakeEditReducer.cakePrice,
    cakeDescription: state.admCakeEditReducer.cakeDescription,
    cakeFillings: state.admCakeEditReducer.cakeFillings,

    cakeImages: state.admCakeEditReducer.cakeImages,

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

    getCakeFillingsById: (arrayOfCakeFIllingsIds) => dispatch(getCakeFillingsById(arrayOfCakeFIllingsIds)),
    updateCakeFillings: (cakeFillings) => dispatch(updateCakeFillings(cakeFillings)),
    updateFillingList: (fillingName, fillingDescription) => dispatch(updateFillingList(fillingName, fillingDescription)),
    updateCake: (categoryId, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages, addressToSaveResult) => dispatch(updateCake(categoryId, cakeId, cakeName, cakePrice, cakeDescription, cakeFillings, cakeLinkName, cakeImages, addressToSaveResult)),
    getFillingList: () => dispatch(getFillingList()),
    setMessage: (message) => dispatch(setMessage(message)),
    setCakeImages: (cakeImages) => dispatch(setCakeImages(cakeImages)),

    uploadImgAndSetImgAddr: (fileblob, file, counter) => dispatch(uploadImgAndSetImgAddr(fileblob, file, counter)),

    toggleAddFilling: (addFillingOpen) => dispatch(toggleAddFilling(addFillingOpen)),
    toggleAddNewFilling: (addNewFillingOpen) => dispatch(toggleAddNewFilling(addNewFillingOpen)),
    toggleEditFilling: (editFillingOpen) => dispatch(toggleEditFilling(editFillingOpen)),
  }
}

const AdmEditCake = (props) => {
  const fillingToAdd = useRef(null);


  const renderFillingsEditor = (props) => {
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
                : setEditFillingOpen();
              setTimeout(() => {
                props.setMessage('')
              }, 3000);
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
              setTimeout(() => {
                props.setMessage('');
              }, 3000);
            }}>Добавить
            </button>
          </div>
          <div>{props.message}</div>
          <button onClick={(e) => {
            setAddNewFillingOpen();
          }}>Добавить новую начинку
          </button>
          <br/>
          <button onClick={(e) => {
            props.updateCakeFillings(props.cakeFillings);
            props.toggleAddFilling(props.addFillingOpen);
          }}>Сохранить
          </button>
        </div>
      </div>
    )
  }

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
    props.location.cakeData.fillings.length
      ? props.getCakeFillingsById(props.location.cakeData.fillings)
      : null;

    props.setCakeName(props.location.cakeData.name);
    props.setCakePrice(props.location.cakeData.price);
    props.setCakeDescription(props.location.cakeData.description);
    props.setCakeImages(props.location.cakeData.images);
  }, []);

  return (
    <div className="admin__about-cakeedit admin__frame">
      {props.addNewFillingOpen && !props.addFillingOpen && !props.editFillingOpen ?
        <AdmEditFilling
          toggleAddNewFilling={props.toggleAddNewFilling}
          setAddFillingOpen={setAddFillingOpen}
          addNewFillingOpen={props.addNewFillingOpen}
          getFillingList={props.getFillingList}
          data={{fillingName: '', fillingDescription: ''}}
          addressToSaveResult={'/api/adm/cakes/updatefillinglist'}
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
            fillingName: fillingToAdd.current ? fillingToAdd.current.value : null,
            fillingDescription: '',
            id: Array.from(fillingToAdd.current).filter(item => {
              return item.value === fillingToAdd.current.value
            })[0].id
          }}
        />
        : null}


      {props.addFillingOpen && !props.addNewFillingOpen && !props.editFillingOpen ?
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
                  : setEditFillingOpen();
                setTimeout(() => {
                  props.setMessage('')
                }, 3000);
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
                setTimeout(() => {
                  props.setMessage('');
                }, 3000);
              }}>Добавить
              </button>
            </div>
            <div>{props.message}</div>
            <button onClick={(e) => {
              setAddNewFillingOpen();
            }}>Добавить новую начинку
            </button>
            <br/>
            <button onClick={(e) => {
              props.updateCakeFillings(props.cakeFillings);
              props.toggleAddFilling(props.addFillingOpen);
            }}>Сохранить
            </button>
          </div>
        </div>
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
                </a>
              </div>
            )
          })
          : <div>Начинок пока добавлено не было</div>
      }


      <button onClick={(e) => {
        e.preventDefault();
        setAddFillingOpen();
      }}>Редактировать начинки
      </button>
      <ImgDragAndDField
        uploadImgAndSetImgAddr={props.uploadImgAndSetImgAddr}
        cakeImages={props.cakeImages}
        setCakeImages={props.setCakeImages}
        cakeCategory={2}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          props.updateCake(
            props.location.cakeData.categoryId,
            props.location.cakeData._id,
            props.cakeName,
            props.cakePrice,
            props.cakeDescription,
            props.cakeFillings,
            props.cakeName.translit().replace(/\s/g, '').toLowerCase(),
            props.cakeImages,
            props.location.addressToSaveResult
          )
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
    </div>
  )


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmEditCake));
