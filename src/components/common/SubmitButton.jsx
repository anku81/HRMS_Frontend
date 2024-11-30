import React from 'react'
import { useSelector } from 'react-redux'

const SubmitButton = ({buttonText}) => {
    const Theme = useSelector((state)=>state.Theme.theme)
  return (
   <button className={`p-2 rounded-lg hover:scale-95 min-w-32 ${Theme=="Dark" ? "bg-yellow-500 text-black" : "bg-yellow-400 text-black"} `} >
{buttonText}
   </button>
  )
}

export default SubmitButton
