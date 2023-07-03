import ContactList from "../components/contact-list";
import ContactSearchForm from "../components/contact-search-form";

function Contacts({
  handleOnAdd,
  items
}) {

  const handleSearchSubmit = (query) => {
    
  }

  return (
    <div>
      <h1>Contacts</h1>
      <div>
        <button onClick={handleOnAdd}>Add</button>
      </div>
      <ContactSearchForm onSubmit={handleSearchSubmit}/>
      <ContactList items={items}/>
    </div>
  )
}

export default Contacts;