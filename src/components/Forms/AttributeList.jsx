import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deleteAttribute, editAttribute } from '../../services/operations/Attribute';
import { useDispatch } from 'react-redux';
const AttributeList = ({item,parent}) => {
    const [clicked,setClicked] = useState(false)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      function editHandler(e){
        e.preventDefault()
        setClicked(!clicked)
      }

      function deleteHandler(e){
        e.preventDefault()
        dispatch(deleteAttribute(parent,item._id))
        console.log(item._id)
      }

     
  return (
    <div className='flex flex-col'>
                              
                              <form 
                              onSubmit={handleSubmit((data) => dispatch(editAttribute(data[item.title],parent,item._id)))}
                              className='p-1 m-1 border bg-white flex '>
                          {        !clicked && <p>{item.title}</p>   }   
                          {  clicked && <input 
                                  className=' max-w-72 p-2 border border-gray-400 rounded '
                                 id='desc'
                                 defaultValue={item.title}
                               {...register(`${item.title}`, { required: true })} />}

                               {/* {errors.{item.title} && <p>{item.title} is required.</p>} */}
                             { clicked &&  <button className='border p-2 bg-blue-600 m-2 rounded' >Edit</button>}
                                   <div className='flex items-center gap-3 ml-auto'>
          <FiEdit 
        onClick={(e)=>editHandler(e)}
        />
        <MdDelete
        onClick={(e)=>deleteHandler(e)}
        />
          </div>
                              </form>
                                  </div>
  )
}

export default AttributeList


// <div className='flex flex-col'>
                              
//                               <form>
                                         
//                              <input 
//                                   className=' max-w-72 p-2 border border-gray-400 rounded'
//                                  id='desc'
//                                  defaultValue={item.title}
//                                {...register(`${item.title}`, { required: true })} />
//                                {/* {errors.{item.title} && <p>{item.title} is required.</p>} */}
//                                <button onClick={(e)=>{
//                                   e.preventDefault()
//                                   return <button>Edit it</button>}}>Edit</button>
//                               </form>
//                                   </div>