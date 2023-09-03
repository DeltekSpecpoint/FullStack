import React , { useState }from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddEditContact from '../Components/AddEditContact';
 
  export default function Header({ contacts , onUpdate}) {
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const handleSort = () => {

    };
    
    const toggleAddEditModal = () => {
      setOpenAddEditModal(!openAddEditModal);
      
    };
    return (
    <>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button endIcon={<AddCircleIcon />} onClick={toggleAddEditModal}>
              Create New
            </Button>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button endIcon={<SortIcon />} onClick={handleSort}>
              Sort
            </Button>
          </Grid>
        </Grid>
      </Container>
        {
            openAddEditModal ? (<AddEditContact onUpdate={onUpdate}/>) : null
        }
    </>


    );
  }