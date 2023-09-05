import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContactsList,
  handleShouldReload,
  updateSearchTerm,
} from "../contactReducer";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const dispatch = useDispatch();
  // const searchTerm = useSelector((state) => (state.contactReducer.searchTerm));
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (e.key === "Enter") {
      dispatch(updateSearchTerm(searchTerm));
      dispatch(handleShouldReload(true));
    }

    // axios
    //   .get(
    //     `https://localhost:44305/api/Contact/GetAll?page=1&pagesize=12&searchQuery=${searchTerm}`
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     dispatch(updateContactsList(response.data));
    //     dispatch(handleShouldReload(true));
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            Contact Me!
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyUp={handleSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
