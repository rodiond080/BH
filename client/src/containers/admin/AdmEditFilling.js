import {
  setNewFillingDescr, setNewFillingName, setMessage,
  getDescriptionById, updateFillingList
} from "../../actions/admFillingEditorAction";
import React, {useEffect} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NotificationContext} from "../../hoc/AdminLayout";

function mapStateToProps(state) {
  return {
    fillingName: state.admFillingEditorReducer.fillingName,
    fillingDescription: state.admFillingEditorReducer.fillingDescription,
    message: state.admFillingEditorReducer.message,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewFillingName: (fillingName) => dispatch(setNewFillingName(fillingName)),
    setNewFillingDescr: (fillingDescription) => dispatch(setNewFillingDescr(fillingDescription)),
    setMessage: (message) => dispatch(setMessage(message)),

    getDescriptionById: (id) => dispatch(getDescriptionById(id)),
    updateFillingList: (data) => dispatch(updateFillingList(data)),
  }
}

const AdmEditFilling = (props) => {

  useEffect(() => {
    if (props.data.id) {
      props.getDescriptionById(props.data.id);
    }
    props.setNewFillingName(props.data.fillingName);
    return function () {
      props.setNewFillingName('');
      props.setNewFillingDescr('');
    }
  }, []);

  return (
    <div className="cake__edit-wrapper" onClick={() => props.toggleAddNewFilling(props.addNewFillingOpen)}>
      <div className="cake__edit-addbox" onClick={(e) => {
        e.stopPropagation();
      }}>
        <label htmlFor="fillingname">Название:</label>
        <input type="text" onChange={(e) => {
          props.setNewFillingName(e.target.value);
        }} value={props.fillingName} id="fillingname"/>

        <label htmlFor="fillingdescription">Описание:</label>
        <textarea type="text" onChange={(e) => {
          props.setNewFillingDescr(e.target.value);
        }} value={props.fillingDescription} id="fillingdescription"/>

        <button onClick={() => {
          props.setAddFillingOpen();
        }}>Назад
        </button>

        <button onClick={
          (e) => {
            props.updateFillingList(
              {
                fillingName: props.fillingName,
                fillingDescription: props.fillingDescription,
                id: props.data.id ? props.data.id : null,
                addressToSaveResult: props.addressToSaveResult
              });

            props.setMessage('Начика была успешно сохранена');
          }
        }>Сохранить
        </button>
      </div>


    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdmEditFilling));
