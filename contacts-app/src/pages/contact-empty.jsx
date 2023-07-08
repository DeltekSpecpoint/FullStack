function EmptyContact() {
  return (
    <div>
      Select a contact
    </div>
  )
}

const EmptyContactRoute = {
  path: '/',
  element: <EmptyContact/>
}

export default EmptyContactRoute