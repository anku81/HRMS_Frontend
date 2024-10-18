import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";


const CreateOrg = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <>
      {/* Form */}
      <form className="flex flex-col  p-4 rounded space-y-4">
        {/* Add organization logo */}
        <div className="flex flex-row items-center  space-x-4">
          {/* Preview Image */}
          <div className="w-24 h-24  rounded-full border border-black overflow-hidden flex items-center justify-center">
            {image ? (
              <img src={image} alt="Organization Logo" className="w-full h-full object-cover rounded-full" />
            ) : (
              <p className=''><CgProfile /></p>
            )}
          </div>

          {/* File Input */}
          <div className="flex flex-col">
            <p className="font-semibold">Add Organization Logo</p>
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-black text-white px-4 py-2 rounded mt-2"
            >
              Select
            </label>
          </div>
        </div>

        {/* Remaining Form Fields */}
        <div className="flex flex-col">
          <label htmlFor="orgName" className="font-bold text-gray-800 font-serif">
            Organization Name
          </label>
          <input
            type="text"
            placeholder="Organization Name"
            className="p-2 border border-gray-400 rounded"
            required
          />

          <label htmlFor="orgDescription" className="font-bold text-gray-800 font-serif">
            Organization Description
          </label>
          <textarea
            placeholder="Organization Description"
            className="p-2 border border-gray-400 rounded"
            required
          ></textarea>
        </div>

        <div className='flex gap-5'>
          <button className='bg-blue-700 text-neutral-50  p-2 rounded-lg ' >Submit Organization</button>
          <button className='bg-gray-300 p-2 rounded-lg'>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default CreateOrg;