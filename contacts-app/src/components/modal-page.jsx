import React from 'react'
import Navbar from "./navbar"

function ModalPage({ title, children, leftButton, actions = null }) {
  return (
    <section className='bg-[#f3f4f6] dark:bg-[#242424] fixed inset-0 lg:inset-auto z-10 lg:z-0 w-full'>
      <Navbar
        title={title}
        leftButton={leftButton}
        className='lg:hidden'
      >
        {actions}
      </Navbar>
      <div className='hidden mb-5 lg:block'>
        {actions}
      </div>
      <div className='pt-20 lg:pt-0'>
        {children}
      </div>
    </section>
  )
}

export default ModalPage