import React, { useState } from "react";
import { sampleContactData } from "../../Utils/SampleData";

const TenantContacts = () => {

  const [contactData, setContactData] = useState(sampleContactData);

  const searchData = (e) => {
    const searchString = e.target.value.toLowerCase();

    if (!searchString.trim()) {
      setContactData(sampleContactData);
      return;
    }

    const filteredData = sampleContactData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.phoneNumber.toLowerCase().includes(searchString) ||
        item.email.toLowerCase().includes(searchString) ||
        item.skill.toLowerCase().includes(searchString) ||
        item.companyName.toLowerCase().includes(searchString)
      );
    });

    setContactData(filteredData);
  };


  return <>
    <h1 className="font-bold text-[20px]">Contacts</h1>

    <div className="my-8 bg-white drop-shadow rounded-[8px]">

    <input type="search" placeholder="Search" className="py-2 w-1/5 px-4 border-2 border-gray-500  mb-6 focus:outline-none" onChange={(e)=>searchData(e)}/>
    <table className='drop-shadow-xl table-auto w-full h-full'>
          <thead className='bg-green-800 text-left text-gray-4 text-white uppercase text-[14px] tracking-wider'>
            <tr className='border-b-2 border-gray py-10'>
              <th className='border-r-2 border-gray  py-3 px-3'>Name</th>
              <th className='border-r-2 border-gray  py-3 px-3'>Phone Number</th>
              <th className='border-r-2 border-gray  py-3 px-3'>Email</th>
              <th className='border-r-2 border-gray  py-3 px-3'>Skill</th>
              <th className='border-r-2 border-gray  py-3 px-3'>Company</th>
            </tr>
          </thead>
          <tbody className='text-black font-gilroy-medium'>
            {contactData.map((data, index) => (
               <tr key={index} className={`${index%2?"bg-blue-300":"bg-blue-200"} border-b-2 border-gray py-10`}>

                <td className=' border-r-2 border-gray py-4 px-3'>{data.name}</td>
                <td className=' border-r-2 border-gray py-4 px-3'>{data.phoneNumber}</td>
                <td className=' border-r-2 border-gray  py-4 px-3'>{data.email}</td>
                <td className=' border-r-2 border-gray py-4 px-3'>{data.skill}</td>
                <td className=' border-r-2 border-gray py-4 px-3'>{data.companyName}</td>
                
              </tr>
            ))}
             
          </tbody>
        </table>
    </div>

  </>
};

export default TenantContacts;
