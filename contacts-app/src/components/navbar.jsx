import React from 'react'
import { NavLink } from "react-router-dom";

function Navbar({ children, title, leftButton }) {
  
  return (
    <div className="flex items-center h-16 px-2 fixed top-0 inset-x-0 bg-slate-100/30 dark:bg-[#242424]/30 backdrop-blur z-10">
      <NavBarButton {...leftButton}/>
      <div className="flex-1 mx-1 text-lg font-medium ">{title}</div>
      {children}
    </div>
  );
}

export function NavBarButton({ type = "button", icon, onClick, link, text, formId = "" }) {
  return type === "button" ? (
    <button className="inline-flex p-2" onClick={onClick} form={formId}>
      {React.createElement(icon, { className: "h-6 w-6 lg:mr-3" })}
      {text 
        ? (<span className='hidden lg:inline'>{text}</span>)
        : null
      }
    </button>
  ) : (
    <NavLink className="inline-flex p-2" to={link}>
      {React.createElement(icon, { className: "h-6 w-6 lg:mr-3" })}
      {text 
        ? (<span className='hidden lg:inline'>{text}</span>)
        : null
      }
    </NavLink>
  );
}

export default Navbar