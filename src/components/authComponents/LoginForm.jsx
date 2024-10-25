import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/auth";

const LoginForm = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm();
  return (
  
     
<div className="bg-blue-300 rounded-lg border w-1/2 min-w-60 border-green-500 " >
          <div>
            <h1 className="text-2xl font-bold font-serief text-center pt-5 text-gray-800 mb-4">
              Sign in to your Account
            </h1>
          </div>

          <form  className="p-4 flex flex-col rounded-r-lg "  onSubmit={handleSubmit((data) =>navigate("/"))}>
        
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
                {...register("password", { required: true, minLength: 8 })}
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

  );
};

export default LoginForm;
