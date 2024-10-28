import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getFullAccessList } from "../../../services/operations/Access";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addRole, editRole } from "../../../services/operations/Roles";
import { AiOutlineCheck } from "react-icons/ai";
const CreateRole = () => {
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
  const [selectCategory, setSelectCategory] = useState([]);
  const accessList = useSelector((state) => state.Aside.accessList);
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
    console.log(roleName,accessList);

    preFilled 
    ? dispatch(editRole(preFilled?._id,roleName,accessList))
    : dispatch(addRole(roleName,accessList))
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
    <div>
      {tabs &&
        tabs.map((item) => (
          <button
            onClick={(e) => {
              tabHandler(e, item);
            }}
            className={` p-2 m-2 rounded  ${
              currTab == item.toUpperCase().split(" ")[0]
                ? "bg-blue-400"
                : "bg-slate-300"
            }`}
          >
            {item}
          </button>
        ))}

      <form onSubmit={handleSubmit((data) => submissionHandler(data.roleName))}>
        <label className="flex flex-col m-3">
          <sup>Role Name *</sup>
          <input
            className="border m-2 p-2 shadow-md rounded"
            defaultValue={preFilled?.title}
            placeholder="Enter Role name "
            {...register("roleName", { required: true })}
          />
          {errors.roleName && <p>Role Name is required.</p>}
        </label>

        <label className="flex">
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
            className={`w-4 h-4 appearance-none mr-2 border-2 border-gray-300 rounded  checked:border-blue-500 checked:bg-blue-500 `}
            checked={selectAll}
            type="checkbox"
          />
          <AiOutlineCheck
            className={`${
              selectAll ? "scale-70" : "scale-0"
            } translate-x-[-1.49rem]  transition-transform duration-200 ease-out text-white`}
          />
          Select All Privileges
        </label>

        <label className="flex">
          <input
            onClick={(e) => toggleCategory(e)}
            className={`w-4 h-4 appearance-none mr-2 border-2 border-gray-300 rounded  checked:border-blue-500 checked:bg-blue-500 `}
            checked={selectCategory.includes(currTab) ? true :  false}
            type="checkbox"
          />
          <AiOutlineCheck
            className={`${
              selectCategory.includes(currTab) ? "scale-70" : "scale-0"
            } translate-x-[-1.49rem]  transition-transform duration-200 ease-out text-white`}
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
                    className={`w-4 h-4 appearance-none mr-2 border-2 border-gray-300 rounded ${checks[item] || selectCategory.includes(currTab) ? "border-blue-500 bg-blue-500" : ""}`}
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

        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateRole;
