import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

// since this is for demo purpose only i just implemented the info alert, 
// but we could implement other types later as well.
function Alert({ text, icon, type = "info" }) {
  const [hidden, setHidden] = useState(false)

  const color = type === "info" ? "border-yellow-600 rounded bg-yellow-100/75 text-yellow-950"
              : type === "success" ? "" : ""

  const iconColors = type === "info" ? "text-yellow-700" : ""

  return (
    <div className={`text-sm font-medium flex items-center justify-between px-4 py-2 border-l-4 ${color} ${hidden ? "hidden" : "block"}`}>
      {React.createElement(icon, { className: `w-6 h-6 mr-3 ${iconColors}` })}
      <span className='flex-1 text-left'>{text}</span>
      <button type="button" onClick={() => setHidden(true)}><XMarkIcon className={`w-5 h-5 text-yellow-700 ${iconColors}`}/></button>
    </div>
  )
}

export default Alert