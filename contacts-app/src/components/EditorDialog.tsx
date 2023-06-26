import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IDialogData, IRowData, UpdateAction, ContactFields, IFetchResult } from '../commonModels';
import { ContactsContext } from '../App';
import { updateData } from './../data/fetchContactsApi';

interface EditorDialogsProps {
  dialogParams: IDialogData;
  handleClose: () => void;
  handleSave: (r: IFetchResult) => void;
}

const initDialog = (mode: UpdateAction) => {
  let title = '', buttonCaption = '', successCaption = '', disableFields = false;
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
      disableFields = true;
      break;
    default:
      break;
  }
  return { title, buttonCaption, successCaption, disableFields };
};

const EditorDialog = (props: EditorDialogsProps) => {
  const { dialogParams, handleClose, handleSave } = props;
  const { isShown, mode, id } = dialogParams;
  const currentContactId = mode === 'add' ? 0 : id;
  const { title, buttonCaption, successCaption, disableFields } = initDialog(mode);

  // Get selected contact in context
  const rowData = useContext(ContactsContext);
  const [currentEditData, setCurrentEditData] = useState<IRowData>({
    id: 0,
    lastName: '',
    firstName: '',
    phoneNumber: '',
    emailAddress: '',
    isStarred: false
  });
  useEffect(() => {
    // Get record data from storage if does exist, else use default contact
    if (mode !== 'add') {
      const selectedRow = rowData.find(x => x.id === currentContactId);
      if (selectedRow) {
        setCurrentEditData(selectedRow);
      }
    }
  }, []);

  const onSave = () => {
    updateData(mode, currentEditData).then(result => {
      const dialogResult: IFetchResult = { type: 'warning', message: `${title} failed.`, isShown: true }
      if (result) {
        if (!result.hasError) {
          dialogResult.message = `${successCaption} ${currentEditData.firstName} ${currentEditData.lastName}`;
          dialogResult.type = 'success';
        }
        handleSave(dialogResult);
      }
    });
  };

  const onClose = () => {
    handleClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case ContactFields.lastName:
        setCurrentEditData({ ...currentEditData, lastName: e.target.value });
        break;
      case ContactFields.firstName:
        setCurrentEditData({ ...currentEditData, firstName: e.target.value });
        break;
      case ContactFields.emailAddress:
        setCurrentEditData({ ...currentEditData, emailAddress: e.target.value });
        break;
      case ContactFields.phoneNumber:
        setCurrentEditData({ ...currentEditData, phoneNumber: e.target.value });
        break;
    }
  }

  return (
    <Modal show={isShown} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="dialogForm.ControlInput1">
            <Form.Label>Last name</Form.Label>
            <Form.Control type='text' name={ContactFields.lastName} value={currentEditData.lastName} onChange={onChange} disabled={disableFields} />
            <Form.Label>First name</Form.Label>
            <Form.Control type='text' name={ContactFields.firstName} value={currentEditData.firstName} onChange={onChange} disabled={disableFields} />
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name={ContactFields.emailAddress} value={currentEditData.emailAddress} onChange={onChange} disabled={disableFields} />
            <Form.Label>Phone number</Form.Label>
            <Form.Control type='text' name={ContactFields.phoneNumber} value={currentEditData.phoneNumber} onChange={onChange} disabled={disableFields} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onSave}>{buttonCaption}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditorDialog