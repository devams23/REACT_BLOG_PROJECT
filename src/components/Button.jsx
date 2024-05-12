import React from 'react'

function Button({
    children ,
    type = 'button',
    textcolor ,
    bgcolor ,
    classname = '',
    ...props

}) {
  return (
    <button  className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${classname}`} {...props}>
    {children}
    </button>
  )
}

export default Button