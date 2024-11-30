import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getFullAccessList } from "../../../services/operations/Access";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addRole, editRole } from "../../../services/operations/Roles";
import { AiOutlineCheck } from "react-icons/ai";
import SubmitButton from "../../../components/common/SubmitButton";
const CreateRole = () => {
  const Theme = useSelector((state)=>state.Theme.theme)
  const location = useLocation();
  const preFilled = location?.state?.preFilled;
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getFullAccessList());
  }, []);

  const tabs = [
    "Employee",
    "Department",
    "Performance",
    "Leave",
    "Role",
    "Personal Profile",
    "Organization",
    "Branch",
    "Attendance",
  ];
  const [currTab, setCurrTab] = useState("EMPLOYEE");
  const [selectAll, setSelectAll] = useState(false);
  const [selectCategory, setSelectCategory] = preFilled ? useState(preFilled?.selectedCategories) : useState([]); 
  const accessList = useSelector((state) => state.Aside.accessList);

  // useEffect(()=>{
  //   console.log(preFilled,preFilled?.selectedCategories)
  //   preFilled && setSelectCategory(preFilled?.selectedCategories)
  // })
console.log("selectCategory",selectCategory)
const [checks, setChecks] = useState({})
 useEffect(()=>{
  
 
    const allChecks = accessList.reduce((acc, item) => {
      acc[item] = preFilled?.accessList?.includes(item) || false;
      return acc;
    }, {})

    setChecks(allChecks)
 },[accessList,preFilled])

  function updateAllCheckboxes(value) {
    const updatedChecks = Object.keys(checks).reduce((acc, key) => {
      let isSelected;
      isSelected = selectCategory.length>0 && selectCategory.some((item)=>key.includes(item))
      acc[key] = isSelected ||  value;
      return acc;
    }, {});

  
    setChecks(updatedChecks);
  }

  useEffect(() => {
   
    updateAllCheckboxes(selectAll);
  }, [selectAll,selectCategory]);

  useEffect(()=>{
    
    const data =  selectCategory.length>0 && selectCategory.reduce((acc,key)=>{
        
      acc[key] = true
      return acc
    },{})
    console.log("selectCategory",data)
    // setChecks()
  },[selectCategory])

  function checkHandler(e) {
    e.preventDefault();
    console.log(e.target.name);
    const timerId = setTimeout(() => {
      setChecks((prev) => {
        return {
          ...prev,
          [e.target.name]: !prev[e.target.name],
        };
      });
    }, 10);

    return () => {
      clearTimeout(timerId);
    };
  }

  function submissionHandler(roleName) {
    // console.log(data);
    const accessList = [];
    for (let key in checks) {
      checks[key] && accessList.push(key);
    }
    console.log(roleName,accessList,selectCategory);
    
    preFilled 
    ? dispatch(editRole(preFilled?._id,roleName,accessList,selectCategory))
    : dispatch(addRole(roleName,accessList,selectCategory))
  }

  function tabHandler(e, item) {
    e.preventDefault();
    setCurrTab(item.toUpperCase().split(" ")[0]);

    console.log(currTab, item.toUpperCase().split(" ")[0]);
  }


  function toggleCategory(e){
    {
      e.preventDefault();
     const timerId = setTimeout(()=>{
      if(selectCategory.includes(currTab))
        {
          setSelectCategory((prev)=>{
            return prev.filter((elem)=>elem!==currTab)
          })

        }
        else
        {
          setSelectCategory((prev)=>{
            return [...prev,currTab]
          });
        }
     },100)

     return ()=>{
      clearTimeout(timerId)
     }
    }
  }
console.log(preFilled)
  
  // console.log(checks,currTab)
  return (
    <div className={` p-2 rounded-lg ${Theme=="Dark" ? "bg-slate-800" : "bg-slate-100"}`}>


           <div className='flex justify-between font-bold w-full p-5 text-xl'>
           <p>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</p>
           <p>Home / <span className='text-yellow-600'>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</span></p>
           </div>

      <div className="ml-11 mb-3">
 
      <p className="font-bold my-3">Workflow to create a role</p>
      <p>1. Fill out the role name</p>
      <p>2. Select the appropriate tab to view the priveleges related to a specific group (e.g. :- Department,Employee etc)</p>
      <p>3. Check the boxes for priveleges you want to assign to the role</p>
      </div>

    

      <form onSubmit={handleSubmit((data) => submissionHandler(data.roleName))}>
        <label className="flex flex-col m-3 mt-8 ">
          <sup className="font-bold text-sm">Role Name *</sup>
          <input
            className={`border m-2 p-2 shadow-md rounded my-4 ${Theme=="Dark" ? "bg-slate-800 border-slate-400" : ""}`}
            defaultValue={preFilled?.title}
            placeholder="Enter Role name "
            {...register("roleName", { required: true })}
          />
          {errors.roleName && <p>Role Name is required.</p>}
        </label>

        <label className="flex text-orange-500">
          <input
            onClick={(e) => {
              e.preventDefault();
              const timerId = setTimeout(() => {
                setSelectAll(!selectAll);
              });

              return () => {
                clearTimeout(timerId);
              };
            }}
            className={`w-4 h-4 translate-y-1 appearance-none mr-2 border-2 ${Theme=="Dark" ? "border-white" : "border-gray-300"}  rounded  checked:border-blue-500 checked:bg-blue-500 `}
            checked={selectAll}
            type="checkbox"
          />
          <AiOutlineCheck
            className={`${
              selectAll ? "scale-70" : "scale-0"
            } translate-x-[-1.49rem] translate-y-1 transition-transform duration-200 ease-out text-white`}
          />
          Select All Privileges
        </label>

        <div className="my-5">
        {tabs &&
        tabs.map((item) => (
          <button
            onClick={(e) => {
              tabHandler(e, item);
            }}
            className={` p-2 m-2 rounded  ${
              currTab == item.toUpperCase().split(" ")[0]
                ? `${Theme=="Dark" ? "bg-blue-600": "bg-blue-400"}`
                : Theme=="Dark" ? "bg-slate-600": "bg-slate-300"
            }`}
          >
            {item}
          </button>
        ))}
        </div>

        

        <label className="flex text-orange-400 mb-4">
          <input
            onClick={(e) => toggleCategory(e)}
            className={`w-4 h-4 translate-y-1 appearance-none mr-2 border-2  ${Theme=="Dark" ? "border-white" : "border-gray-300"} rounded  checked:border-blue-500 checked:bg-blue-500 `}
            checked={selectCategory.includes(currTab) ? true :  false}
            type="checkbox"
          />
          <AiOutlineCheck
            className={`${
              selectCategory.includes(currTab) ? "scale-70" : "scale-0"
            } translate-x-[-1.49rem] translate-y-1 transition-transform duration-200 ease-out text-white`}
          />
          Select {currTab && currTab.toLowerCase()} Privileges
        </label>

        {accessList &&
          accessList
            .filter((elem) => elem.includes(currTab))
            .map((item) => (
              <div>
                {
                  // console.log(checks[item],selectCategory.includes(currTab),item)
                 
                }
                {
                  //  console.log(selectCategory.includes(currTab))
                }
                <label className="flex items-center ml-2 mb-1">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 appearance-none mr-2 border-2  ${Theme=="Dark" ? "border-white" : "border-gray-300"} rounded ${checks[item] || selectCategory.includes(currTab) ? "border-blue-500 bg-blue-500" : ""}`}
                    onClick={(e) => checkHandler(e)}
                
                    // checked={checks[item] || selectCategory.includes(currTab) ? true :  false}
                  
                    {...register(`${item}`)}
                  />
                  <AiOutlineCheck
                    className={`${
                      checks[item] || selectCategory.includes(currTab) ? "scale-70" : "scale-0"
                    } translate-x-[-1.49rem]  transition-transform duration-200 ease-out text-white`}
                  />
                  Permission to{" "}
                  {item
                    .replaceAll("_", " ")
                    .replace("GET ", "Access ")
                    .replace("ADD ", "create ")
                    .replace("BRANCHES ", "Sub Organizations ")
                    .replace("BRANCH ", "Sub Organization ")
                    .replace("DELETE", "delete")
                    .toLowerCase()}
                </label>
              </div>
            ))}
        <div className="flex justify-center mt-9 mb-3">
          <SubmitButton
          buttonText={"Submit"}
          />
        </div>
        
      </form>
    </div>
  );
};

export default CreateRole;
