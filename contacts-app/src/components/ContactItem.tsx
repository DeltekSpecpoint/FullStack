import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, {  useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import styles from '../styles/modules/contactItem.module.scss';
import { getClasses } from '../utils/getClasses';


import { updateContact,deleteContact } from '../slices/contactSlice';
import ContactsModal from './ContactsModal';

interface Prop
{
contact : any
}
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function ContactItem({contact} : Prop) {
    
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);


  const handleCheck = () => {
    if(contact.isStarred === checked)
    {
     
        setChecked(true);
        dispatch(
            updateContact({ ...contact, isStarred: !checked})
          );
    }
    else
    {
        setChecked(!checked);
        dispatch(
            updateContact({ ...contact, isStarred: checked})
          );
    }
   
    console.log(contact.isStarred, checked);

  };

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    toast.success('Contact Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return ( 
    
    <>
   
      <motion.div className={styles.item} variants={child}>
        <div className={styles.contactDetails}>
          <input type='checkbox' className={styles.svgBox} checked={contact.isStarred} onChange={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.contactText,
                contact.isStarred,
              ])}
            >
              {contact.name}
             
            </p>
            <p className={styles.time}>
              {contact.address}
            </p>
          </div>
        </div>
        <div className={styles.contactActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <ContactsModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        contact={contact}
      />
    </>
  );
}

export default ContactItem;
