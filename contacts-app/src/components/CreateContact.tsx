import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import React from "react";

interface ShowContactFormHandler {
  (operation: "add" | "edit"): void;
}

export default function CreateContact(props: { onCreateContact: ShowContactFormHandler }) {
  const handleClickOpen = () => {
    props.onCreateContact("add");
  };

  return (
    <React.Fragment>
      <Box sx={{ "& > :not(style)": { m: 1 }, position: "absolute", bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Box>
    </React.Fragment>
  );
}
