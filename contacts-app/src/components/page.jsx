import React from 'react'
import Navbar from "./navbar"


function Page({ title, children, leftButton, rightButton }) {
  return (
    <article>
      <Navbar
        title={title}
        leftButton={leftButton}
        rightButton={rightButton}
        />
      <div className='pt-16'>
        {children}
      </div>
    </article>
  )
}

export default Page