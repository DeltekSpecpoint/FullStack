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
    <>
      <Button variant="primary" onClick={() => handleOpen('add')}>Add</Button>
      <Button variant="primary" onClick={() => handleOpen('edit')} disabled={disableModifyButtons}>Edit</Button>
      <Button variant="primary" onClick={() => handleOpen('delete')} disabled={disableModifyButtons}>Delete</Button>
    </>
  )
}

export default ToolbarButtons