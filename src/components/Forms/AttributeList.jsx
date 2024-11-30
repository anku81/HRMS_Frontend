import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  deleteAttribute,
  editAttribute,
} from "../../services/operations/Attribute";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import { deleteSkill, editSkill } from "../../services/operations/skills";


const AttributeList = ({ item, parent, skillsList, setSkillsList,desgList,setDesgList }) => {

  const Theme = useSelector((state)=>state.Theme.theme)

  const [clicked, setClicked] = useState(false);
  const title = useRef("")
  const [dummy,setDummy] = useState(skillsList)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function editHandler(e) {
    e.preventDefault();
    setClicked(!clicked);
  }

  function deleteHandler(e) {
    e.preventDefault();
    parent=="skills" ? dispatch(deleteSkill(item._id)) : parent=="designations" ? "" : dispatch(deleteAttribute(parent, item._id));
 
  }




  function changeHandler(e) {
  
    e.preventDefault();

  // const updated = {...skillsList,[e.target.name] :!skillsList[e.target.name]}
  // console.log(e.target.checked,updated)
  //   setSkillsList(updated)

    parent=="skills"  && setSkillsList((prev)=>
      {
        console.log(prev)

       return {...prev,[e.target.name]: !prev[e.target.name]}
      }
     
        
      )
   

    // const timerId = setTimeout(()=>{
      
   

    //   parent=="skills"  && setSkillsList((prev)=>
    //   {
    //     console.log(prev)

    //    return {...prev,[e.target.name]: !prev[e.target.name]}
    //   }
     
        
    //   )


    //   parent=="designations" && setDesgList((prev)=>{
    //     return {...prev,[e.target.name]:!prev[e.target.name]}
    //   })
    

    // },100)

   

    

    // return ()=>{
    //   clearTimeout(timerId)
    // }
  }


  function submissionHandler(e)
  {
    e.preventDefault()
console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",title.current,item)
   

    if(parent=="skills")
      {
   
        dispatch(editSkill(item._id,title.current))
      }
      else if(parent=="designations")
      {
console.log("LLLSLSLSLS")
      }
      else
      {
       
        dispatch(editAttribute(title.current, parent, item._id))
      }


  }

 
  return (
    <div className="flex flex-col ">
      <div
        // onSubmit={handleSubmit((data)=> dispatch(editAttribute(data.title, parent, item._id)))}
        className={`p-3 w-full  border  ${Theme=="Dark" ? "bg-slate-800 border-slate-500" : "bg-white "}  flex`}
      >


      <div>
      {!clicked  && ((parent == "skills" && skillsList) || (parent == "designations" && desgList)) &&  (
         <div className="flex  ">
        
    
          <input
              type="checkbox"
            className={` w-4 h-4 translate-y-1 appearance-none mr-2 border-2 border-gray-300 rounded ${Theme=="Dark" ? "bg-slate-800" : ""} ${(parent == "designations" ? desgList[item.title] :  skillsList[item.title]   ) && "border-blue-500 bg-blue-500" } `}
            name={item.title}
        
            onClick={changeHandler}
     
          />
         <AiOutlineCheck
       
          className={`${
          (  parent == "designations" ? desgList[item.title] :  skillsList[item.title]) ? "scale-70" : "scale-0"
          } translate-x-[-1.49rem] translate-y-1 transition-transform duration-200 ease-out text-white`}
        />

  
      


         
         </div>
        )}
      </div>
     

        
         
        

     <div>
     {
        
        !clicked && <p>{item.title}</p>
        
        }
     </div>
        
        {clicked && (
          <input
            className={`max-w-72 w-full p-2 border border-gray-400 rounded ${Theme=="Dark" ? "bg-slate-800" : ""} `}
            id="desc"
            onChange={(e)=>title.current = e.target.value}
            defaultValue={item.title}
    
          />
        )}



        {clicked && (
          <button 
          onClick={(e)=>submissionHandler(e)}
          className="border px-2 py-1 bg-blue-700 m-2 text-white rounded">
            Edit
          </button>
        )}
        <div className="flex items-center gap-3 ml-auto">
          <FiEdit onClick={(e) => editHandler(e)} />
          <MdDelete onClick={(e) => deleteHandler(e)} />
        </div>
      </div>
    </div>
  );
};

export default AttributeList;

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
