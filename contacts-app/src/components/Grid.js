import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Checkbox } from '@mui/material';
import { StarBorder, Star, Delete, EditNote } from "@mui/icons-material";

const Grid = ({ contacts, onDelete, onEdit }) => {
  const [selectedID, setSelectedID] = useState('');
  const columns = [
    {
      field: 'isStarred',
      headerName: 'Favorite',
      flex: 0.25,
      renderCell: (params) => (
        <Checkbox icon={<StarBorder />} checkedIcon={<Star />} checked={params.row.isStarred} />)
    },

    { field: 'id', headerName: 'ID', flex: 0.25, },
    {
      field: 'firstName',
      headerName: 'First name',
      editable: false,
      flex: 0.25,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      editable: false,
      flex: 0.25,
    },
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      editable: false,
      flex: 0.25,
    },
    /* TODO: Add Country Code */
    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      sortable: true,
      editable: false,
      flex: 0.25,
    },
    {
      field: 'createdOn',
      headerName: 'Created Date',
      sortable: true,
      editable: false,
      flex: 0.25,
      valueFormatter: params=> (new Date(params?.value)).toDateString()
    },
    {
      field: 'modifiedOn',
      headerName: 'Modified Date',
      sortable: true,
      editable: false,
      flex: 0.25,
      valueFormatter: params=> (new Date(params?.value)).toDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.25,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={(e) => { handleEdit(e, params.row); }}>
            <EditNote />
          </IconButton>
          <IconButton aria-label="delete" onClick={(e) => { handleDelete(e, params.row.id); }}>
            <Delete />
          </IconButton>
        </div>),
      filterable: false
    }
  ];
  var handleEdit = (e, contact) => {
    e.preventDefault();
    setSelectedID(contact.id);
    onEdit(selectedID, contact);
  }
  var handleDelete = (e, id) => {
    e.preventDefault();
    setSelectedID(id);
    onDelete(id);
  }

  return (
    <div className="App">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={contacts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
        />
      </Box>
    </div>
  );
}

export default Grid;
