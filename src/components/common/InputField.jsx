import React from 'react';
import { useSelector } from 'react-redux';

const InputField = React.forwardRef(({ label, error, ...props },ref) => {

   
    return (
        <div className='flex flex-col'>
            <label htmlFor={props.id}>{label}</label>
            <input
                ref={ref}
                {...props}
                className={`max-w-72 p-2 border rounded ${error ? 'border-red-500' : 'border-gray-400'}`}
            />
            {error && <span className="text-red-500 text-sm">{error.message}</span>}

            
        </div>
    );
});

export default InputField;