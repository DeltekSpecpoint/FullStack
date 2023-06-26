import React from 'react';
import { Button } from 'react-bootstrap';
import { UpdateAction } from '../commonModels';

interface ToolbarButtonsProps {
  disableModifyButtons: boolean;
  handleOpen: (d: UpdateAction) => void;
}

const ToolbarButtons = (props: ToolbarButtonsProps) => {
  const { disableModifyButtons, handleOpen } = props;
  return (
    <div className='toolbarContainer'>
      <Button variant="primary" onClick={() => handleOpen('add')}>Add contact</Button>
      <Button variant="primary" onClick={() => handleOpen('edit')} disabled={disableModifyButtons}>Edit contact</Button>
      <Button variant="primary" onClick={() => handleOpen('delete')} disabled={disableModifyButtons}>Delete contact</Button>
    </div>
  )
}

export default ToolbarButtons