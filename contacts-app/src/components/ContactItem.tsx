import { Avatar, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Contact } from "../models/Contact";
import { stringToAvatar } from "../utilities/AvatarConverter";
import { ContactItemEditHandler } from "./ContactList";

export interface ContactItemModel {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
  contacts: ContactItemModel[];
  contactRef: Contact;
}

function ContactItem(props: { row: ContactItemModel; onEditContact: ContactItemEditHandler }) {
  const { row } = props;

  function handleDoubleClick() {
    // onEditContact(row);
    props.onEditContact(row);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} hover={true} onDoubleClick={handleDoubleClick}>
        <TableCell sx={{ display: "flex", justifyContent: "right" }}>
          <Avatar {...stringToAvatar(row.name)} />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.city}</TableCell>

        <TableCell>{row.country}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default ContactItem;
