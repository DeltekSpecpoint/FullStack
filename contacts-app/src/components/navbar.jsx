import React from 'react'
import { NavLink } from "react-router-dom";

function Navbar({ children, title, leftButton, rightButton, bgColor }) {
  
  return (
    <div className="flex items-center h-16 px-2 fixed top-0 inset-x-0 bg-slate-100/30 dark:bg-[#242424]/30 backdrop-blur z-10">
      <NavBarButton {...leftButton}/>
      <div className="flex-1 mx-1 text-lg font-medium ">{title}</div>
      {rightButton ? <NavBarButton {...rightButton}/> : null}
      {children}
    </div>
  );
}

function NavBarButton({ type = "button", icon, onClick, link }) {
  return type === "button" ? (
    <button className="p-2" onClick={onClick}>
      {React.createElement(icon, { className: "h-6 w-6" })}
    </button>
  ) : (
    <NavLink className="p-2" to={link}>
      {React.createElement(icon, { className: "h-6 w-6" })}
    </NavLink>
  );
}

export default Navbar