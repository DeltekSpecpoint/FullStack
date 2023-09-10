import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box, IconButton, TableFooter, TablePagination, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React, { useEffect, useState } from "react";
import { Contact } from "../models/Contact";
import { ListResponse } from "../models/ListResponse";
import ContactItem, { ContactItemModel } from "./ContactItem";

interface EnhancedTableProps {
  isAscending: boolean;
  orderBy: string;
  onRequestSort: (id: string) => void;
}

interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const headCells: HeadCell[] = [
  { id: "Avatar", label: "", numeric: false, disablePadding: false },
  { id: "FirstName", label: "Name", numeric: false, disablePadding: false },
  { id: "Email", label: "Email", numeric: false, disablePadding: false },
  { id: "HomeAddress.City", label: "City, State", numeric: false, disablePadding: false },
  { id: "HomeAddress.Country.Name", label: "Country", numeric: false, disablePadding: false },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { isAscending, orderBy, onRequestSort } = props;

  const order = isAscending ? "asc" : "desc";

  const handleSort = (id: string) => {
    console.log("Sort");
    onRequestSort(id);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? "right" : "left"} padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={() => handleSort(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function map(contact: Contact): ContactItemModel {
  return {
    id: contact.id,
    name: contact.firstName + " " + contact.lastName,
    email: contact.email,
    city: contact.homeAddress.city + ", " + contact.homeAddress.state,
    country: contact.homeAddress.country.name,
    contacts: [],
    contactRef: contact,
  };
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export interface ContactItemEditHandler {
  (contact: ContactItemModel): void;
}

export default function ContactList(props: { onEditContact: ContactItemEditHandler; searchQuery: string }) {
  const [contacts, setContacts] = useState<ContactItemModel[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalCount, setTotalCount] = React.useState(5);
  const [isAscending, setIsAscending] = React.useState(true);
  const [orderBy, setOrderBy] = React.useState("FirstName");

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (id: string) => {
    console.log("Handle Request Sort");
    const isAsc = orderBy === id ? !isAscending : true;
    setIsAscending(isAsc);
    setOrderBy(id);
  };

  useEffect(() => {
    console.log("use Effect");
    const position = page * rowsPerPage;
    const pageSize = rowsPerPage;
    const searchString = props.searchQuery;

    fetch(`https://localhost:5001/api/Contact?Position=${position}&PageSize=${pageSize}&IsAscending=${isAscending}&OrderBy=${orderBy}&SearchString=${searchString}`)
      .then(response => response.json())
      .then((listResponse: ListResponse<Contact>) => {
        console.log({ listResponse });
        const contactItems: ContactItemModel[] = listResponse.data.map(contact => map(contact));
        setContacts(contactItems);
        setTotalCount(listResponse.totalCount);
      })
      .catch(error => console.error({ error }));
  }, [page, rowsPerPage, isAscending, orderBy, props.searchQuery]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <EnhancedTableHead isAscending={isAscending} orderBy={orderBy} onRequestSort={handleRequestSort}></EnhancedTableHead>
        {/* <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City, State</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {contacts.map(contact => (
            <ContactItem key={contact.id} row={contact} onEditContact={props.onEditContact} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              colSpan={3}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
