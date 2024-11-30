import React, { useEffect, useRef, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import AttributeList from '../AttributeList';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, getAllSkill } from '../../../services/operations/skills';
const Skills = ({setSkills,setSkillData,preFilledSkills}) => {


    const dispatch = useDispatch()
    useEffect(()=>{
     dispatch(getAllSkill())
    },[])
   
      const skills = useSelector((state)=>state.Aside.skillsData) 


    const [skillsList, setSkillsList] = useState(

      skills.reduce((acc, key) => {
        acc[key.title] = preFilledSkills ? preFilledSkills[key.title]  : false;
       
        return acc;
      }, {})
    );


    const skillInput = useRef("")
console.log(skillInput.current)



console.log(preFilledSkills)
  return (
    <div className=' h-full bg-transparent z-50 fixed top-0 left-0 right-0 border backdrop-blur-sm flex flex-col justify-center items-center '>
<div className='bg-gray-500 w-3/4 mx-auto flex flex-col justify-center items-center py-5 gap-10 rounded-lg'>
<div  className='flex gap-2 '>
<div>
   
                 <input 
                   type='text'
                   placeholder='Enter Skill'
                   onChange={(e)=>{
                    e.preventDefault()
                    skillInput.current = e.target.value
                   }}
                      className={`min-w-72 p-2 border rounded`}
                    //   ${errors.title ? "border-red-500" :  "border-gray-400"}
                    // {...register('title', { required: true })}
                     />
                    {/* {errors.title && <p className='text-red-500'>Title is required.</p>} */}
                 </div>
           
                   <div>
                   <button
                   onClick={(e)=>{
                    e.preventDefault()
                    dispatch(addSkill(skillInput.current))
                   }}
                  className='cursor-pointer bg-black text-white px-4 py-2 rounded mt-2 translate-y-[-7px]'
                     >Add</button>
                   </div>
</div>
<div className='flex flex-wrap justify-center gap-4 '>

{
    skills && skills.map((item,index)=><AttributeList key={index} item={item} parent={"skills"} skillsList={skillsList} setSkillsList={setSkillsList}/>
    
//     <div className='flex items-center gap-4'>
     
// <p>{item}</p>
// <div className='flex'>
// <FiEdit/>
// <MdDelete/>
// </div>
//     </div>
)
}
</div>
     

<div className='flex gap-4'>
<button 
      onClick={(e)=>{
      
        e.preventDefault()
        const arr = Object.entries(skillsList).map((item)=>{
          if(item[1]==true)
          {
            return item[0]
          }
       
        } )

        setSkillData((prev)=>{
          const combined = [...prev,...arr]
          return [...new Set(combined)]
        })
      }}
      className='bg-black text-white rounded p-3'>ADD</button>
      <button 
      onClick={(e)=>{
        console.log("HRERE",skills)
        e.preventDefault()
        setSkills(false)
      }}
      className='bg-gray-300 rounded p-3'>Cancel</button>
</div>
</div>


    </div>
  )
}

export default Skills
