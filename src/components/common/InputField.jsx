import React from 'react';
import { useSelector } from 'react-redux';

const InputField = React.forwardRef(({ label, errors, ...props },ref) => {
    const Theme = useSelector((state)=>state.Theme.theme)
  

    return (
        <div className='flex flex-col gap-2 w-full max-w-96 ' >

            <label htmlFor={props.id}>{label}</label>
            <input
                ref={ref}
                {...props}
                className={`w-full min-w-72 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800" : ""} ${errors ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors && <span className="text-red-500 text-sm mt-[-10px]">{errors.message}</span>}

            
        </div>
    );
});

export default InputField;