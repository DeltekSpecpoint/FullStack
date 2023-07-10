import React from 'react'
import { PhoneIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'

function ContactView({ value }) {
  return (
    <div>
      <div className='lg:flex lg:items-center'>
        <div 
          className="flex items-center justify-center w-48 h-48 m-auto border border-gray-500 rounded-full lg:mr-12"
          >
          <UserIcon className='w-24 h-24'/>
        </div>
        <div className='py-4 text-center lg:flex-1 lg:text-left'>
          <div className='py-2 text-2xl'>{value.name}</div>
        </div>
      </div>
      <div className='px-6 mt-3 lg:px-0'>
        <div className='pt-3 pb-4 font-medium'>Contact Details</div>
        <ul className='space-y-3'>
          <li>
            <PhoneIcon className='inline w-6 h-6 mr-3 text-inherit'/>
            <span className='text-sm font-medium'>{value.mobileNumber}</span>
          </li>
          {/* <li>
            <EnvelopeIcon className='inline w-6 h-6 mr-3 text-inherit'/>
            <span className='text-sm font-medium'>devjoelmanuel@gmail.com</span>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default ContactView