import React, { useContext } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { IRowData } from './../commonModels';
import { ContactsContext } from '../App';

const columns = [
    { key: 'lastName', name: 'Last Name' },
    { key: 'firstName', name: 'First Name' },
    { key: 'emailAddress', name: 'Email Address' },
    { key: 'phoneNumber', name: 'Phone Number' }
];

function rowKeyGetter(row: IRowData) {
    return row.id;
}

interface DatagridProps {
    selectedContactId: number;
    setSelectedContact: (id: number) => void;
}

const Datagrid = (props: DatagridProps) => {
    const { selectedContactId, setSelectedContact } = props;
    const rowData = useContext(ContactsContext);

    const EmptyRowsRenderer = () => {
        return (
            <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>No contacts.</div>
        );
    };

    return (
        <DataGrid
            className='rdg-light mainDatagrid'
            headerRowHeight={56}
            renderers={{ noRowsFallback: EmptyRowsRenderer() }}
            columns={columns}
            rows={rowData}
            rowKeyGetter={rowKeyGetter}
            onCellClick={(args, event) => {
                event.preventGridDefault();
                if (selectedContactId !== Number(args.row.id)) {
                    setSelectedContact(Number(args.row.id));
                }
                else {
                    // deselect row
                    setSelectedContact(0);
                }
            }}
            rowClass={(row) =>
                row.id === selectedContactId ? 'SelectedRow' : undefined
            }
        />
    );
}

export default Datagrid