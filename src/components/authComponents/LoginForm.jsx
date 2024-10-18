import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/auth";
import Avisoft from "../../assets/Avisoft.svg"
const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm();
  return (

    <div className="flex flex-col"> 
     <div className='flex  mt-20 justify-center gap-4'>
         <div>
      <img className="h-32 w-32 p-2" src={Avisoft} alt="Avi Logo" />
       <h3 className='font-serif font-bold text-2xl'> Sign-In Portal</h3>
        </div>
       </div>

<div className="bg-gray-300 rounded-lg border w-1/2 min-w-60 " >
          <div>
            <h1 className="text-2xl font-bold font-serif text-center pt-5 text-gray-800 mb-4">
              Sign in to your Account
            </h1>
          </div>

          <form  className="p-4 flex flex-col rounded-r-lg "  onSubmit={handleSubmit((data) =>dispatch(login(data.email,data.password,navigate)))}>

            <div className=" flex flex-col space-y-5">
              
              <label htmlFor="email" className=" font-bold text-gray-800 font-serif">Enter your email: </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="p-2 border border-gray-400 rounded"
                {...register("email", { required: true })}
              />
              {errors.email && <div className="text-sm text-red-600 ">* Please enter your email</div>}
            

              <label htmlFor="password" className=" font-bold text-gray-800 font-serif"> Enter your password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="p-2 border border-gray-400 rounded"
                {...register("password", { required: true })}
              />
              {errors.password && <div>Please enetr your password</div>}
            </div>

            <div>
              <a href="#" className="text-blue-600 text-sm">
                Forgot Password?  
              </a>
            </div>

            <input 
            type="submit"
            value = {`${ isSubmitting? "Submitting" : "Submit" }`}
            disabled={isSubmitting}
            className="bg-blue-600 w-full text-white p-2 rounded font-serif" >
               
            </input>
          </form>
        </div>
        </div>

  );
};

export default LoginForm;
