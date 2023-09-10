import React from "react";
import ContactForm from "./ContactForm";
import { ContactItemModel } from "./ContactItem";
import ContactList from "./ContactList";
import CreateContact from "./CreateContact";
import SearchAppBar from "./SearchAppBar";

export default function ContactsView() {
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingContact, setEditingContact] = React.useState<ContactItemModel | null>(null);
  const [operation, setOperation] = React.useState<"add" | "edit">("add");
  const [tableKey, setTableKey] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleCreateContact = (operation: string) => {
    console.log("Show Contact Form");

    setFormOpen(true);
    setOperation("add");
    setEditingContact(null);
  };

  const handleEditContact = (contact: ContactItemModel) => {
    console.log("Edit Contact");
    console.log({ contact });

    setFormOpen(true);
    setOperation("edit");
    setEditingContact(contact);
  };

  const refreshContactList = () => {
    setTableKey(prevState => prevState + 1);
  };

  const handleContactSaved = () => {
    console.log("Contact Saved. Refresh the List");
    refreshContactList();
  };

  const handleSearch = (searchString: string | null | undefined) => {
    setSearchQuery(searchString ?? "");
  };

  return (
    <React.Fragment>
      <SearchAppBar onSearch={handleSearch}></SearchAppBar>
      <ContactList key={tableKey} onEditContact={handleEditContact} searchQuery={searchQuery}></ContactList>
      <CreateContact onCreateContact={handleCreateContact}></CreateContact>
      <ContactForm open={formOpen} setOpen={setFormOpen} operation={operation} data={editingContact} onContactSaved={handleContactSaved}></ContactForm>
    </React.Fragment>
  );
}
