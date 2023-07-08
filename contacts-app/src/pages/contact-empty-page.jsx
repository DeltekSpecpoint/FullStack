function EmptyContact() {
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