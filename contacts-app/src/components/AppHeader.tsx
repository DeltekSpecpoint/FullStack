import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import ContactsModal from "./ContactsModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/contactSlice";

function AppHeader() {
  let [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector(
    (state: any) => state.contact.filterStatus
  );
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };
  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Contacts
      </Button>

      <SelectButton
        variant="primary"
        id="status"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          updateFilter(e);
        }}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="Starred">Starred</option>
      </SelectButton>

      <ContactsModal
        type="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export default AppHeader;
