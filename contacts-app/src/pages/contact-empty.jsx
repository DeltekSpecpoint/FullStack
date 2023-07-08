function EmptyContact() {
  return (
    <div className="hidden lg:block">
      Select a contact
    </div>
  )
}

const EmptyContactRoute = {
  path: '/',
  element: <EmptyContact/>
}

export default EmptyContactRoute