import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../slices/contactSlice";
import { v4 as uuid } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
interface Prop {
  modalOpen: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  contact?: any;
}
const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

function ContactsModal({ modalOpen, setModalOpen, type, contact }: Prop) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ name: "", address: "" });

  useEffect(() => {
   
    if (type === "update" && contact) {
      setName(contact.name);
      setAddress(contact.address);
    } else {
      setName("");
      setAddress("");
    }
    setErrors({ name: "", address: "" });
  }, [type, contact, modalOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors = {
      name: "",
      address: "",
    };
    console.log(validationErrors.name);

    if (name === "") {
      validationErrors.name = "Name is Required";
      toast.error("Please enter a title");
    }

    if (address === "") {
      validationErrors.address = "Address is Required";
      toast.error("Please enter a address");
    }
    setErrors(validationErrors);

    if (name && address) {
      if (type === "add") {
        dispatch(
          addContact({
            id: uuid(),
            name,
            address,
            isStarred: false,
            createDT: new Date().toLocaleString(),
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "update") {
        if (contact.name !== name || contact.address !== address) {
          dispatch(updateContact({ ...contact, name, address }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {" "}
                {type === "add" ? "Add" : "Update"} Contacts
              </h1>
              <label>
                Name
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                {errors.name && <span>{errors.name}</span>}
              </label>

              <label htmlFor="title">
                Address
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
                {errors.address && <span>{errors.address}</span>}
              </label>

              <div className={styles.buttonContainer}>
                <Button buttonType="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </Button>
                <Button
                  buttonType="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactsModal;
