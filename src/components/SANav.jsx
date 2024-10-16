import React from 'react'

const SANav = () => {
  return (
    <>
    <div className='flex flex-row border border-red-600'>
        <div className=' flex justify-center border  border-green-600 w-10'>
           <h1 className=' flex justify-center align-middle border border-black rounded-full bg-orange-500 h-7 w-7 text-neutral-50 '>A</h1>
        </div>

        <div className='flex flex-col justify-center p-4'>
            <p className='text-neutral-50 font-serif'>Avinash Sharma</p>
            <p className='text-neutral-50 font-serif'>Super Admin</p>
        </div>
    </div>
    </>
  )
}

export default SANav
