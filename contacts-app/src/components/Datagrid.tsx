import React from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { IRowData } from './../commonModels';

const columns = [
    { key: 'lastName', name: 'Last Name' },
    { key: 'firstName', name: 'First Name' },
    { key: 'emailAddress', name: 'Email Address' },
    { key: 'phoneNumber', name: 'Phone Number' }
];

interface DatagridProps {
    rowData: IRowData[]
}

const Datagrid = (props: DatagridProps) => {
    const { rowData } = props;
    return (
        <DataGrid
            columns={columns}
            rows={rowData}
        />
    );
}

export default Datagrid