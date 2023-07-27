import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TableSortLabel, TablePagination, Dialog, DialogContent, DialogContentText, useMediaQuery, Box } from '@mui/material';
import axios from 'axios';
import EditBtn from '../assets/EditBtn.svg';
import DeleteBtn from '../assets/DeleteBtn.svg';
import Placeholder from '../assets/placeholder.png';
import { Button, DialogTitle, Modal } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';

const ContactList = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [orderBy, setOrderBy] = useState('fullname');
    const [order, setOrder] = useState('asc');
    const [contacts, setContacts] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const [contactInfo, setContactInfo] = useState({});
    const [isOpenConfirmationPopUp, setIsOpenConfirmationPopUp] = useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, contacts.length - page * rowsPerPage);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    useEffect(() => {
        getContactList();
    }, []);

    const getContactList = () => {
        axios.get("/api/Contacts")
            .then((response) => {
                setContacts(response.data);
            })
            .catch(error => console.log(error));
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (contact) => {
        setOpen(true);
        setContactInfo(contact);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedContacts = contacts.slice().sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
        }
    });

    const deleteContacts = () => {
        axios.delete("/api/Contacts/" + contactInfo.id)
            .then(() => {
                setOpen(false)
                setIsOpenConfirmationPopUp(true)
                getContactList();
            })
    }

    const handleConfirmationClose = () => {
        setIsOpenConfirmationPopUp(false);
    };
    
    return (
        <div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: 50 }} className="pic-col"></TableCell>
                        <TableCell style={{ width: 150 }}>
                            <TableSortLabel
                                active={orderBy === 'fullName'}
                                direction={orderBy === 'fullName' ? order : 'asc'}
                                onClick={() => handleRequestSort('fullName')}
                                className="fullname-col"
                            >
                                <span className="tbl-header">Full Name</span>
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ width: 100 }} className="phone-col"><span className="tbl-header">Phone</span></TableCell>
                        <TableCell style={{ width: 100 }} className="email-col"><span className="tbl-header">Email</span></TableCell>
                        <TableCell style={{ width: 300 }} className="address-col"><span className="tbl-header">Address</span></TableCell>
                        <TableCell style={{ width: 100 }} className="actions-col"><span className="tbl-header">Actions</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedContacts
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((contact) => (
                            <TableRow 
                                sx={{ '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' } }}
                            >
                                <TableCell className="pic-col"><img src={Placeholder} alt="picture" className="placeholder" /></TableCell>
                                <TableCell className="fullname-col" onClick={() => props.changeMain("info", contact)}>{contact.fullName}</TableCell>
                                <TableCell className="phone-col" onClick={() => props.changeMain("info", contact)}>{contact.phone}</TableCell>
                                <TableCell className="email-col" onClick={() => props.changeMain("info", contact)}>{contact.email}</TableCell>
                                <TableCell className="address-col" onClick={() => props.changeMain("info", contact)}>{contact.address}</TableCell>
                                <TableCell className="actions-col">
                                    <div>
                                        <img className="small-btn" src={EditBtn} onClick={() => props.changeMain("update", contact)} />
                                        <span variant="text" onClick={() => handleClickOpen(contact)}><img src={DeleteBtn} className="small-btn" /></span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={12}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {open ?
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={(handleClose)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Contact list deletion"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete <b>{contactInfo.fullName}</b>'s Contact Information?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            No
                        </Button>
                        <Button onClick={deleteContacts}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                : ""}

            {
                isOpenConfirmationPopUp ?

                    <React.Fragment>
                        <Modal
                            open={isOpenConfirmationPopUp} //simplify
                            onClose={handleConfirmationClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...style, width: 400 }}>
                                <p id="child-modal-description">
                                    <center>Contact information has been deleted!</center>
                                </p>
                            </Box>
                        </Modal>
                    </React.Fragment>
                    : ""
            }
        </div>
    );
};

export default ContactList;