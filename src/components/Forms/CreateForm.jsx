import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useForm, Controller } from "react-hook-form";
import AttributeList from "./AttributeList";
import { useDispatch, useSelector } from "react-redux";
import { addAttribute } from "../../services/operations/Attribute";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addOrganization,
  editOrganization,
} from "../../services/operations/Organization";
import ManageAttributes from "./ManageAttributes";
import {
  addSubOrganization,
  editSubOrganization,
} from "../../services/operations/SubOrganization";
import InputField from "../common/InputField";
import SearchResult from "./SearchResult";
import {
  addEmployeePersonalDetails,
  editEmployeePersonalDetails,
  getEmployeeById,
  getEmployeesByName,
} from "../../services/operations/Employee";
import {
  addDepartment,
  editDepartment,
} from "../../services/operations/Department";
import PersonalDetailsForm from "./Employee Form/PersonalDetailsForm";
import Skills from "./Employee Form/Skills";
import Designation from "./Employee Form/Designation";
import { getAllSkill } from "../../services/operations/skills";
import { CgProfile } from "react-icons/cg";
import SubmitButton from "../common/SubmitButton";


const CreateForm = ({
  customAttributes,
  parent,
  userId,
  setFormState,
  formState,
}) => {

  const Theme = useSelector((state)=>state.Theme.theme)
  const location = useLocation();

  const preFilled = location.state?.preFilled;

  const [manageAttributes, setManageAttributes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [managerId, setManagerId] = useState(null);

  const [skills, setSkills] = useState(false);
  const [skillData, setSkillData] = preFilled ?useState(preFilled?.personalDetails?.skills) : useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [designation, setDesignation] = useState(false);

  const OrganizationList = useSelector((state) => state.Aside.organizations);
  const departmentList = useSelector((state) => state.Aside.departments);
  const searchList = useSelector((state) => state.Aside.searchList);

  // const [designationArray,setDesignationArray]=useState([])

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();



  const [preview, setPreview] = preFilled
    ? useState(preFilled?.personalDetails?.profilePicture)
    : useState(null);
  useEffect(() => {
    console.log(preview);
  }, [preview]);

  useEffect(() => {
    preFilled?.personalDetails &&
      setValue("departmentId", preFilled?.personalDetails?.department);
  }, [departmentList, setValue]);

  const handleImagePreview = (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null); // Reset preview if no file is selected
    }
  };

  useEffect(() => {
    let timerId;
    if (searchTerm.trim() !== "") {
      timerId = setTimeout(() => {
        console.log("New searchTerm", searchTerm);
        dispatch(getEmployeesByName(searchTerm));
      }, 500);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  useEffect(() => {
    if (preFilled?.manager) {
      setSearchTerm(preFilled.manager);
    }
    if (!preFilled) {
      setSearchTerm("");
      reset();
    }
  }, [preFilled]);
  console.log(typeof parent);
  function submissionHandler(data) {
    console.log(
      "DATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt",
      data,
      parent
    );

    if (parent === "Organization") {
      const customAttributes = [];
      for (let key in data) {
        if (key !== "name" && key !== "file" && key !== "description") {
          customAttributes.push({ title: key, value: data[key] });
        }
      }
      console.log(data, preview);
      console.log(preFilled, preFilled?._id);
      // console.log("customAttributes Array",customAttributes)
      preFilled
        ? dispatch(
            editOrganization(
              data.name,
              data.description,
              customAttributes,
              data.file[0],
              preFilled?._id
            )
          )
        : dispatch(
            addOrganization(
              data.name,
              data.description,
              customAttributes,
              data.file[0]
            )
          );
    } else if (parent === "SubOrganization") {
      console.log(data, preFilled);
      const customAttributes = [];
      for (let key in data) {
        if (key !== "name" && key !== "organizationId") {
          customAttributes.push({ title: key, value: data[key] });
        }
      }
      preFilled
        ? dispatch(
            editSubOrganization(data.name, customAttributes, preFilled?._id)
          )
        : dispatch(
            addSubOrganization(data.name, customAttributes, data.organizationId)
          );
    } else if (parent === "Department") {
      // console.log("DATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt",data)
      const customAttributes = [];
      for (let key in data) {
        if (
          key !== "name" &&
          key !== "organizationId" &&
          key !== "description" &&
          key !== "managerId"
        ) {
          customAttributes.push({ title: key, value: data[key] });
        }
      }
      preFilled
        ? dispatch(
            editDepartment(
              data.name,
              data.description,
              customAttributes,
              preFilled.organizationId,
              managerId,
              preFilled?._id
            )
          )
        : dispatch(
            addDepartment(
              data.name,
              data.description,
              customAttributes,
              data.organizationId,
              managerId
            )
          );
    } else if (parent == "Employee") {
      const customAttributes = [];
      for (let key in data) {
        if (
          key !== "firstName" &&
          key !== "lastName" &&
          key !== "departmentId" &&
          key !== "file" &&
          key !== "employeeCode"
        ) {
          customAttributes.push({ title: key, value: data[key] });
        }
      }
      console.log(customAttributes);
      preFilled
        ? dispatch(
            editEmployeePersonalDetails(
              data.file[0],
              data.firstName,
              data.lastName,
              data.employeeCode,
              preFilled?.personalDetails?.department,
              skillData.filter((item)=>item !== undefined),
              data?.designation,
              customAttributes,
              preFilled?._id,
              setFormState
            )
          )
        : dispatch(
            addEmployeePersonalDetails(
              data.file[0],
              data.firstName,
              data.lastName,
              data.employeeCode,
              data.departmentId,
              skillData.filter((item)=>item !== undefined),
              data?.designation,
              customAttributes,
              userId,
              setFormState
            )
          );
    }
  }

  // console.log("::::::::::::::::::::",location.state,preFilled)

  console.log("MANAGER___IDDD", managerId, parent);

  console.log(preFilled?.personalDetails?.skills);

  const departmentIdValue = watch("departmentId");
  console.log("Current departmentId:", departmentIdValue);

  return (
    <div className={` flex justify-center m-4 rounded-lg p-7 flex-col gap-6 items-center ${Theme=="Dark" ? "bg-slate-800" : "bg-slate-100"}`}>
      {
       parent!=="Employee" &&  <div className="flex text-2xl justify-between font-bold w-full">
        <p>{location.pathname.split("/").at(-1).replaceAll("-", " ")}</p>
        <p>
          Home/
          <span className="text-yellow-600">
            {location.pathname.split("/").at(-1).replaceAll("-", " ")}
          </span>
        </p>
      </div>
      }

      <div className=" w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            setManageAttributes(!manageAttributes);
          }}
          className="border p-2 bg-blue-700 rounded text-white"
        >
          {manageAttributes ? "Back" : "Manage Attributes"}
        </button>
      </div>

      {!manageAttributes && (
        <form
          className={`flex flex-col rounded-lg  ${Theme=="Dark" ? "bg-slate-800" : "bg-gray-200"} items-center  p-3  py-10 ${
            parent == "Employee" ? "w-full" : "w-2/4"
          } w-2/4 min-w-96 ${Theme=="Dark" ? "bg-slate-600" : "bg-white"}`}
          onSubmit={handleSubmit((data) => submissionHandler(data))}
        >
          {(parent === "SubOrganization" ||
            parent === "Department" ||
            (parent === "Employee" && formState == 1)) &&
            !preFilled && (
              <div className=" flex flex-col gap-3 w-full max-w-96 mb-2">
                <label
                
                htmlFor="organizationId">Select a organization</label>
                <select
                  id="organizationId"
                  className={` appearance-none w-full min-w-72 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800" : ""} ${
                    errors.organizationId ? "border-red-500" : "border-gray-200"
                  }`}
                  {...register("organizationId")}
                >
                  <option value="">Select organization</option>
                  {OrganizationList &&
                    OrganizationList.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                </select>
                {errors.organizationId && <p>This field is required</p>}
              </div>
            )}

          {(parent === "Organization" || parent === "Employee") && (
            <div className="flex flex-col">
              <div className="flex gap-7 items-center">
                {/* <div className='border w-16 h-16 rounded-full'> */}
               { preview ? <img
                  className="border w-16 h-16 rounded-full flex justify-center items-center"
                  src={preview || preFilled?.logo}
                  alt="DP"
                ></img> : <CgProfile className="bg-gray-300 rounded-full" size={70} />}
                {/* </div> */}

                <div className="flex flex-col">
                  <p>
                    {parent === "Employee"
                      ? "Upload Employee Profile picture"
                      : "Add Organization logo"}
                  </p>
                  <div className="flex gap-6">
                    <label
                      className="cursor-pointer bg-black text-white px-4 py-2 rounded mt-2 hover:scale-95"
                      htmlFor="file"
                    >
                      Select
                    </label>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("UPLOAD EMPLOYEE PICTURE");
                      }}
                      className="cursor-pointer bg-yellow-400 text-black px-4 py-2 rounded mt-2"
                    >
                      Upload
                    </button>
                  </div>
                  <input
                    type="file"
                    className=" max-w-72 p-2 border border-gray-400 rounded hidden"
                    id="file"
                    accept="image/*"
                    {...register("file", {
                      required:
                        preFilled?.logo ||
                        preFilled?.personalDetails?.profilePicture
                          ? false
                          : true,
                    })}
                    onChange={(e) => {
                      handleImagePreview(e);
                      register("file").onChange(e);
                    }}
                  />
                  {errors.file && <p>file is required.</p>}
                </div>
              </div>
            </div>
          )}
          <div className="  flex  justify-center w-full">
            {/* <label htmlFor='name'>{parent} Name</label>
       <input 
        
           className=' max-w-72 p-2 border border-gray-400 rounded'
           id='name'
         {...register('name', { required: true })} />
         {errors.name && <p>Name is required.</p>} */}

            {parent !== "Employee" && (
              <InputField
                label={`${parent} Name`}
                id="name"
                placeholder={`${parent} Name`}
                defaultValue={preFilled ? preFilled?.name : ""}
                {...register("name", {
                  required: `${parent} Name is required`,
                })}
                errors={errors.name}
              />
            )}
          </div>

          {parent == "Employee" && <PersonalDetailsForm />}
          {parent == "Employee" && <p>Personal Info</p>}
          {parent == "Employee" && (
            <div className="flex   flex-wrap justify-center gap-6 mb-4 w-full ">
              <InputField
                label={`First Name`}
                placeholder={`First Name`}
                defaultValue={
                  preFilled ? preFilled?.personalDetails?.firstName : ""
                }
                errors={errors.firstName}
                {...register("firstName", {
                  required: `First Name is required`,
                })}
              />

              <InputField
                label={`Last Name`}
                placeholder={`Last Name`}
                errors={errors.lastName}
                defaultValue={
                  preFilled ? preFilled?.personalDetails?.lastName : ""
                }
                {...register("lastName", { required: `Last Name is required` })}
              />

              <InputField
                label={`Employee Code`}
                placeholder={`Employee Code`}
                errors={errors.employeeCode}
                defaultValue={
                  preFilled ? preFilled?.personalDetails?.employeeCode : ""
                }
                {...register("employeeCode", {
                  required: `Employee Code is required`,
                })}
              />

              <div className="flex items-center">
                {console.log(preFilled?.personalDetails?.department)}

                {parent == "Employee" && (
                  <div className="flex flex-col gap-2 w-3/4">
                    <label htmlFor="departmentId">Select Department</label>
                    <select
                      className={` appearance-none w-full min-w-96 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"}`}
                      {...register("departmentId", {
                        required: "Department is required",
                      })}
                    >
                      <option>Select a Department</option>

                      {departmentList &&
                        departmentList.map((item) => (
                          <option value={item._id}>{item.name}</option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {(parent === "Organization" || parent === "Department") && (
            <div className="flex justify-center w-full">
            

              <InputField
                label={`${parent} Description`}
                //  className={` max-w-72 p-2 drop-shadow-lg border rounded`}
                id="description"
                placeholder={`${parent} Description`}
                defaultValue={preFilled ? preFilled?.description : ""}
                {...register("description", {
                  required: `${parent} description is required`,
                })}
                errors={errors.description}
              />
            </div>
          )}

          {parent === "Department" && (
            <div className="flex justify-center w-full">
           
              <InputField
                type="search"
                label={"Manager"}
                //  className={`w-full min-w-72 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${errors ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="Manager"
                //  className=' max-w-72 p-2 border border-gray-400 rounded'
                id="manager"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
           
              {console.log("SSSSSSSSSSSSSSSS", searchTerm)}
              {searchTerm && (
                <SearchResult
                  setSearchTerm={setSearchTerm}
                  setManagerId={setManagerId}
                />
              )}
            </div>
          )}
          {/* {console.log("ooooooooooo",customAttributes,parent)} */}
          {/* ${parent=="Employee" ? "flex-wrap" : "flex-col"} */}
          <div className="flex  flex-wrap justify-center gap-6 w-full ">
            {customAttributes &&
              customAttributes.map((item, index) => (
                <InputField
                label={item.title}
                placeholder={item.title}
                defaultValue={
                  preFilled
                    ? parent === "Employee"
                      ? preFilled?.personalDetails?.customAttributes?.map(
                          (elem) =>
                            elem?.title == item?.title ? elem?.value : ""
                        )[index]
                      : preFilled?.customAttributes?.map((elem) =>
                          elem?.title == item?.title ? elem?.value : ""
                        )[index]
                    : ""
                }
                id="desc"
                {...register(`${item.title}`, {
                  required: `${item.title} is required`,
                })}
              />
              ))}
          </div>
          {skills && (
            <Skills
              skills={skills}
              setSkills={setSkills}
              preFilledSkills = {preFilled?.personalDetails?.skills}
              setSkillData={setSkillData}
            />
          )}

          {designation && (
            <Designation
              designation={designation}
              setDesignation={setDesignation}
              setDesignationData={setDesignationData}
            />
          )}

          {parent == "Employee" && (
            <div className=" w-full px-20 flex justify-between mb-2">
              <div className=" w-1/2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSkills(true);
                }}
                className="bg-yellow-400 p-2 rounded"
              >
                Add Skills
              </button>
              </div>

             <div className="w-1/2">
             <button
                onClick={(e) => {
                  e.preventDefault();
                  setDesignation(true);
                }}
                className="bg-yellow-400 p-2 rounded"
              >
                Add Designation
              </button>
             </div>
            </div>
          )}
          {console.log(skillData)}
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex gap-3 w-1/2 flex-wrap ">
              {" "}
              {skillData &&
                skillData.map(
                  (item) =>
                    item !== undefined && (
                      <div className=" border flex items-center gap-1 rounded-full p-1">
                        {item}
                        <RxCross1 
                        onClick={(e)=>{
                          e.preventDefault()
                          const updated = skillData.filter((elem)=>elem!==item)
                          
                          setSkillData(updated)
                        }}
                        />
                      </div>
                    )
                )}{" "}
            </div>

            <div className="flex gap-3  w-1/2 flex-wrap ">
              {designationData &&
                designationData.map(
                  (item) =>
                    item !== undefined && (
                      <div className=" border flex items-center gap-1 rounded-full p-1">
                        {item}
                        <RxCross1 />
                      </div>
                    )
                )}
            </div>
          </div>
                <SubmitButton
                buttonText={"Submit"}
                />
        </form>
      )}

      <div className="">
        {manageAttributes && <ManageAttributes parent={parent} />}
        {manageAttributes &&
          customAttributes &&
          customAttributes.map((item) => (
            <AttributeList item={item} parent={parent} />
          ))}
      </div>
    </div>
  );
};

export default CreateForm;
