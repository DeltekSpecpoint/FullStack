import { UserIcon } from '@heroicons/react/24/solid'
import { NavLink } from "react-router-dom"

function ContactList({ items, onDelete }) {

  const handleDelete = (value) => {
    if (onDelete) onDelete(value)
  }

  return (
    <ul>
      {items.map(item => <ContactListItem key={item.id} value={item} onDelete={value => handleDelete(value)}/>)}
    </ul>
  )
}

function ContactListItem({ value, onDelete }) {

  const handleDelete = () => {
    if (onDelete) onDelete(value)
  }

  return (
    <li> 
      <NavLink 
        to={`/contact/${value.id}`}
        className="flex px-4"
        >
        <span 
          className={`relative flex items-center justify-center w-12 h-12 
            text-2xl rounded-full border-spacing-1 border-slate-500 border-2 mr-2`
          }
          >
          <UserIcon className="w-8 h-8 text-inherit" />
        </span>
        <div className='flex-1 px-2'>
          <div className='text-md'>{value.name}</div>
          <div className='text-sm text-gray-500'>{value.mobileNumber}</div>
        </div>
      </NavLink>
    </li>
  )
}

ContactList.Item = ContactListItem

export default ContactList