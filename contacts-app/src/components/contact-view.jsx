import React from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

function ContactView({ value }) {
  return (
    <div>
      <div className='lg:flex lg:items-center'>
        <div 
          className="h-48 w-48 rounded-full m-auto
          bg-[url('https://img.freepik.com/free-photo/happy-asian-young-woman-face-portrait_53876-143108.jpg?w=996&t=st=1688796515~exp=1688797115~hmac=63a1713170cd149d1415f608327e9a84e76ae2d1ba72b0fb33b942eddca25f87')]
          bg-center
          bg-cover
          lg:mr-12
          "
          >
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
          <li>
            <EnvelopeIcon className='inline w-6 h-6 mr-3 text-inherit'/>
            <span className='text-sm font-medium'>devjoelmanuel@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContactView