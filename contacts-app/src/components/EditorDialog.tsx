import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { IDialogParams, UpdateAction, IFetchResult, ACTIONS } from '../commonModels';
import { ContactsContext } from '../App';
import { updateData } from './../data/fetchContactsApi';
import useDialogReducer from '../hooks/useDialogReducer';

interface EditorDialogsProps {
  dialogParams: IDialogParams;
  handleClose: () => void;
  handleSave: (r: IFetchResult) => void;
}

const initDialog = (mode: UpdateAction) => {
  let title = '', buttonCaption = '', successCaption = '', requiredSuffix = ' (required)', isDeleteMode = false;
  switch (mode) {
    case 'add':
      title = 'Add contact';
      buttonCaption = 'Add contact';
      successCaption = 'Successfully added contact: ';
      break;
    case 'edit':
      title = 'Edit contact';
      buttonCaption = 'Save changes';
      successCaption = 'Successfully updated contact: ';
      break;
    case 'delete':
      title = 'Delete contact';
      buttonCaption = 'Delete contact';
      successCaption = 'Successfully deleted contact: ';
      isDeleteMode = true;
      requiredSuffix = '';
      break;
    default:
      break;
  }
  return { title, buttonCaption, successCaption, isDeleteMode, requiredSuffix };
};

const EditorDialog = (props: EditorDialogsProps) => {
  const { dialogParams, handleClose, handleSave } = props;
  const { isShown, mode, id } = dialogParams;
  const currentContactId = mode === 'add' ? 0 : id;
  const { title, buttonCaption, successCaption, isDeleteMode, requiredSuffix } = initDialog(mode);

  // Get selected contact in context
  const rowData = useContext(ContactsContext);
  const { dialogData, dispatch } = useDialogReducer();
  useEffect(() => {
    // Get record data from storage if does exist, else use default contact
    if (mode !== 'add') {
      const selectedRow = rowData.find(x => x.id === currentContactId);
      if (selectedRow) {
        dispatch({ actionType: ACTIONS.LOAD, payload: selectedRow });
      }
    }
  }, []);

  const onSave = () => {
    if (isDeleteMode || dialogData.isReadyForSave) {
      updateData(mode, dialogData).then(result => {
        const dialogResult: IFetchResult = { type: 'warning', message: `${title} failed.`, isShown: true }
        if (result) {
          if (!result.hasError) {
            dialogResult.message = `${successCaption} ${dialogData.firstName} ${dialogData.lastName}`;
            dialogResult.type = 'success';
          }
          handleSave(dialogResult);
        }
      });
    }
  };

  const onClose = () => {
    // TODO: b. Optional: Persist uncommitted data to local storage to mitigate user data loss. 
    handleClose();
  };

  return (
    <Modal show={isShown} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="dialogFormContact">
            <FloatingLabel controlId='flLastName' label={`Last name ${requiredSuffix}`} className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Last name'
                value={dialogData.lastName}
                onChange={(e) => { dispatch({ actionType: ACTIONS.UPDATE_LASTNAME, payload: e.target.value }) }}
                disabled={isDeleteMode}
                isInvalid={!dialogData.isLastNameValid}
              />
              <Form.Control.Feedback type="invalid">Please enter Last name</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId='flFirstName' label={`First name ${requiredSuffix}`} className='mb-3'>
              <Form.Control
                type='text'
                placeholder='First name (Required)'
                value={dialogData.firstName}
                onChange={(e) => { dispatch({ actionType: ACTIONS.UPDATE_FIRSTNAME, payload: e.target.value }) }}
                disabled={isDeleteMode}
                isInvalid={!dialogData.isFirstNameValid}
              />
              <Form.Control.Feedback type="invalid">Please enter First name</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId='flEmailAddress' label='Email address' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Email address'
                value={dialogData.emailAddress}
                onChange={(e) => { dispatch({ actionType: ACTIONS.UPDATE_EMAIL, payload: e.target.value }) }}
                disabled={isDeleteMode}
                isInvalid={!dialogData.isEmailAddressValid}
              />
              <Form.Control.Feedback type="invalid">Please enter valid Email address</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId='flPhoneNumber' label='Phone number' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Phone number'
                value={dialogData.phoneNumber}
                onChange={(e) => { dispatch({ actionType: ACTIONS.UPDATE_PHONE, payload: e.target.value }) }}
                disabled={isDeleteMode}
                isInvalid={!dialogData.isPhoneNumberValid}
              />
              <Form.Control.Feedback type="invalid">Please enter valid Phone number</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onSave} disabled={!(isDeleteMode || dialogData.isReadyForSave)}>{buttonCaption}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditorDialog