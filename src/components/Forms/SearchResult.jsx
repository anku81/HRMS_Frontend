import React, { useEffect } from 'react'
import { setSearchList } from '../../redux/slices/asideSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeesByPID } from '../../services/operations/Employee'

const SearchResult = ({setSearchTerm,setManagerId}) => {
    const dispatch = useDispatch()
     const serachResult = useSelector((state)=>state.Aside.searchList)
    //  const serachResult  = [
    //     {
    //         name : "EShan SHarma"
    //     },
    //     {
    //         name : "Rohit SHarma"
    //     },
    //     {
    //         name : "EShan "
    //     }
    // ]
// console.log(serachResult)
  return (
    <div className=' w-full'>
        {/* <ul> */}
      {
            serachResult && serachResult.map((item)=><input 
           
            type='submit'
            onClick={async(e)=>{
                e.preventDefault()
                setSearchTerm(item?.firstName +" "+ item?.lastName)
                const userData = await dispatch(getEmployeesByPID(item?._id))
                // console.log("userData userData userData",userData[0]?._id)
                await setManagerId(userData[0]?._id)
               setTimeout(()=>{
                dispatch(setSearchList(null))
               },1000)
            }}
            
            className='w-full p-2 border   border-gray-400 ' value={item?.firstName +" "+ item?.lastName}></input>)

            }
            {/* </ul> */}
    </div>
  )
}

export default SearchResult
