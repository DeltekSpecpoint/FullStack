import useContacts from "../hooks/use-contacts"

function EmptyContact() {
  const { data: { items } } = useContacts()

  if (items.length === 0) {
    return (
      <div className="hidden lg:block">
        Add a contact
      </div>  
    )
  }
  return (
    <div className="hidden lg:block">
      Select a contact
    </div>
  )
}

const contactEmptyPage = {
  path: '/',
  element: <EmptyContact/>
}

export default contactEmptyPage