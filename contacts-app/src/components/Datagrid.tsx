import React from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'lastName', name: 'Last Name' },
    { key: 'firstName', name: 'First Name' },
    { key: 'emailAddress', name: 'Email Address' },
    { key: 'phoneNumber', name: 'Phone Number' }
];

const rows = [
    { id: 1, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 2, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 3, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 4, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 5, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 6, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 7, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 8, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 9, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' },
    { id: 10, lastName: 'Example', firstName: 'ex', emailAddress: 's@a.com', phoneNumber: '999' }
];

const Datagrid = () => {
    return (
        <DataGrid
            columns={columns}
            rows={rows}
        />
    );
}

export default Datagrid