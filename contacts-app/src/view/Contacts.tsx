import ContactList from "./ContactList";
import { Typography, TextField, InputAdornment, Container, Button, IconButton, Tooltip} from '@mui/material';
import { Search, PersonAddAlt1, North, South, SortByAlpha } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TContactInformation, TContactListResult } from "../types/TContacts";
import ContactService from "../services/ContactService";

const Contacts: React.FC = () => {
  const [contactList, setContactList] = useState<Array<TContactInformation>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ascending, setAscending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState<boolean>(false);
  const contactService = new ContactService();
  const limit = 10;

  useEffect(() => {
    getContactList();
  }, [searchQuery, page, isFavoriteSelected, ascending]); /* eslint-disable-line react-hooks/exhaustive-deps*/

  const getContactList = async () => {
    const contacts: TContactListResult = await contactService.getContacts(searchQuery, page, limit, isFavoriteSelected, ascending);
    setContactList(contacts.items);
    setCount(contacts.count);
  }

  const deleteContact = async (id: number) => {
    const response: string = await contactService.deleteContact(id);
    alert(response);
    getContactList();
  }

  const sortContact = () => {
    setAscending(!ascending);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSelectList = (event: boolean) => {
    setIsFavoriteSelected(event);
    setPage(1);
  };

  const navigate = useNavigate();
  const changeViewToAddContact = () => {
    navigate("/addContact");
  }
    
  return (
    <Container className="contact">
      <div className="c-background-blue c-flex c-flex-wrap c-color-white c-justify-sb c-p-5">
        <Typography variant="h4"> Contacts </Typography>
        <Button 
          variant="outlined" 
          className="c-background-white c-color-black c-fw-6"
          onClick={() => changeViewToAddContact()}
        >
          <PersonAddAlt1 className="c-mr-1"/>
          Add Contact
        </Button>
      </div>
      <div className="c-mt-1">
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e)}
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="c-flex c-flex-row c-flex-wrap c-justify-sb c-mt-1">
        <div>
          <Button onClick={() => handleSelectList(false)} variant={isFavoriteSelected ? "outlined" : "contained"}>All</Button>
          <Button onClick={() => handleSelectList(true)} variant={!isFavoriteSelected ? "outlined" : "contained"} className="c-ml-2">Favorites</Button>
        </div>
        <div>
          <Tooltip title={ascending ? "Sort Descending" : "Sort Ascending"}>
            <IconButton sx={{ borderRadius: 1 }} onClick={sortContact}>
              { ascending ? <South color="primary"/> : <North color="primary"/> }
              <SortByAlpha color="primary"/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div>
        <ContactList contacts={contactList} deleteContact={deleteContact} page={page} limit={limit} count={count} setPage={setPage} />
      </div>
    </Container>
  );
}

export default Contacts;
