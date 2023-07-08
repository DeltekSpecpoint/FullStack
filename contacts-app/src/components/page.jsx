import React from 'react'
import Navbar from "./navbar"

function Page({ title, children, leftButton, actions = null }) {
  return (
    <article>
      <Navbar
        title={title}
        leftButton={leftButton}
      >
        {actions}
      </Navbar>
      <div>
        
      </div>
      <div className='pt-20'>
        {children}
      </div>
    </article>
  )
}

export default Page