import React, { useEffect, useState, useCallback } from 'react';
import './assets/App.css';
import Header from './components/Header';
import Datagrid from './components/Datagrid';
import ToolbarButtons from './components/ToolbarButtons';
import EditorDialog from './components/EditorDialog';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import useContactsStorage from './hooks/useContactsStorage';
import { IRowData, UpdateAction, IDialogData, IFetchResult } from './commonModels';
import { getRowData } from './data/fetchContactsApi';

export const ContactsContext = React.createContext<IRowData[]>([]);

const App = () => {
  // Alert
  const [alertDisplayData, updateAlertDisplayData] = useState<IFetchResult>({ type: 'success', message: '', isShown: false });
  const alertDisplay = useCallback(() => {
    if (alertDisplayData.isShown) {
      return <Alert variant={alertDisplayData.type} onClose={() => updateAlertDisplayData({ ...alertDisplayData, isShown: false })} dismissible>
        {alertDisplayData.message}
      </Alert>;
    }
    else {
      return <></>;
    }
  }, [alertDisplayData]);

  // Datagrid data
  const { contacts, setContacts } = useContactsStorage();
  const loadData = () => {
    getRowData().then(getRowDataResult => {
      if (getRowDataResult) {
        setContacts([]);
        if (getRowDataResult.data) {
          setContacts(getRowDataResult.data);
        }
        else if (getRowDataResult.hasError) {
          updateAlertDisplayData({ type: 'warning', message: getRowDataResult.error, isShown: true });
        }
      }
    })
  };

  // Get BE data on page load
  useEffect(() => {
    loadData();
  }, []);

  // Datagrid selection
  const [selectedContactId, setSelectedContactId] = useState<number>(0);
  const handleOnselect = (id: number) => { setSelectedContactId(id) };

  // Dialog
  const [dialogState, setDialogState] = useState<IDialogData>({ isShown: false, mode: 'add', id: 0 });
  const editorDialog = useCallback(() => {
    if (dialogState.isShown) {
      return <EditorDialog dialogParams={dialogState} handleSave={handleSaveDialog} handleClose={handleCloseDialog} />;
    }
    else {
      return <></>;
    }
  }, [dialogState]);
  const handleOpenDialog = (updateAction: UpdateAction) => setDialogState({ isShown: true, mode: updateAction, id: selectedContactId });
  const handleCloseDialog = () => setDialogState({ ...dialogState, isShown: false });
  const handleSaveDialog = (r: IFetchResult) => {
    updateAlertDisplayData(r);
    loadData();
    handleCloseDialog();
  };

  return (
    <ContactsContext.Provider value={contacts}>
      <Header />
      {editorDialog()}
      <Container className='contentContainer'>
        <Row className='toolbarRow'>
          <Col xs={12} md={8}>{alertDisplay()}</Col>
          <Col xs={6} md={4}><ToolbarButtons disableModifyButtons={selectedContactId === 0} handleOpen={handleOpenDialog} /></Col>
        </Row>
        <Row className='datagridRow'>
          <Col>
            <Datagrid selectedContactId={selectedContactId} setSelectedContact={handleOnselect} />
          </Col>
        </Row>
      </Container>
    </ContactsContext.Provider>
  );
}

export default App