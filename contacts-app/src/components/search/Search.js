import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';

const Search = ({ searchContact }) => {
  const handleChange = (event) => {
    searchContact(event.target.value);
  };

  return (
    <TextField
      placeholder="Search contacts"
      size="small"
      fullWidth
      style={{ maxWidth: "500px" }}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Search;