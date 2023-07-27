import React, { useState, useEffect } from 'react';
import Placeholder from '../assets/placeholder.png';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import CloseBtn from '../assets/CloseBtn.svg';


const Info = (props) => {
    const [mode, setMode] = useState("view");
    const [inputData, setInputData] = useState([]);
    const [isOpenConfirmationPopUp, setIsOpenConfirmationPopUp] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [contactInfo, setContactInfo] = useState({});
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [popUpMsg, setPopUpMsg] = useState ("Contact has been updated!")

    const fields = [
        { id: "fullName", name: "fullName", placeholder: "Name", type: "text", defaultValue: props.contactInfo.fullName },
        { id: "phone", name: "phone", placeholder: "Phone", type: "number", defaultValue: props.contactInfo.phone},
        { id: "email", name: "email", placeholder: "Email", type: "text", defaultValue: props.contactInfo.email},
        { id: "address", name: "address", placeholder: "Address", type: "text", defaultValue: props.contactInfo.address},
    ]

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: "white",
        border: '1px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    useEffect(() => {
        getUpdatedInfo();
    }, []);

    const getUpdatedInfo = () => {
        axios.get(`/api/Contacts/${props.contactInfo.id}`)
            .then(res => setInputData(res.data))
            .catch(err => console.log(err))
    }

    const handleConfirmationClose = () => {
        setIsOpenConfirmationPopUp(false);
        setMode("view");
      };

    const handleUpdateMode = () => {
        setMode("update");
    }


    const handleCancelButton = () => {
        setMode("view");
    }

    const handleUpdateContact = (event) => {
        axios.put(`/api/Contacts/${props.contactInfo.id}`, inputData)
            .then(res => {
                setIsOpenConfirmationPopUp(true);
                getUpdatedInfo();
            }).catch(error => console.log(error));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const deleteContacts = () => {
        axios.delete("/api/Contacts/" + props.contactInfo.id)
            .then(() => {
                setOpen(false)
                setPopUpMsg("Contact has been deleted")
                setIsOpenConfirmationPopUp(true)
                props.changeMain("");
            })
    }

    const handleClose = () => {
        setOpen(false);
    };
    
  return (
      <div className="info-page-cont">
          <div className='profile-info-cont'>
          <div className="info-close-btn"><img src={CloseBtn} className='small-btn' id="close-btn" onClick={()=> props.changeMain("")}/></div>
              <div className="prof-pic-cont"><img src={Placeholder} className="info-prof-pic" alt="picture" /></div>
              <div className='contact-info'>
              {fields.map((field) =>
                  <div className="info-cont">
                        {
                            mode === "update" ? 
                                <div className="info-cont">
                                    <TextField
                                        required
                                        className='text-input'
                                        id="outlined-required"
                                        inputProps={{ style: { color: '#0E8388', borderColor: '#0E8388' }}}
                                        InputLabelProps={{ style: { color: '#0E8388' }}}
                                        type={field.type}
                                        name={field.name}
                                        label={field.placeholder}
                                        defaultValue={field.defaultValue}
                                        onChange={handleChange}
                                        sx={{ width: '300px'}}
                                    />    
                                </div> :
                                <div className="info-cont">
                                    <TextField
                                        disabled
                                        className='text-input'
                                        inputProps={{ style: { color: 'white', borderColor: 'white' }}}
                                        id="outlined-required"
                                        type={field.type}
                                        name={field.name}
                                        label={field.placeholder}
                                        defaultValue={field.defaultValue}
                                        onChange={handleChange}
                                        sx={{ width: '300px'}}
                                    />    
                                </div>
                        }
                  </div>
                )}
                <div className="info-btn">
                    <span className="button">
                        <button 
                            className ="primary" 
                            onClick = { mode === "view" ? handleUpdateMode : handleUpdateContact }
                        >
                        { mode === "view" ? "Update" : "Save" }
                        </button>
                    </span>
                    <span className="button">
                        <button 
                            className="secondary"
                            onClick = { mode === "view" ? handleClickOpen : handleCancelButton }
                            >{ mode === "view" ? "Delete" : "cancel" }
                        </button>
                    </span>
                </div>
              </div>
          </div>
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
                      <center>{popUpMsg}</center>
                    </p>
                  </Box>
                </Modal>
              </React.Fragment>

              : ""
            }

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
      </div>
  )
}

export default Info