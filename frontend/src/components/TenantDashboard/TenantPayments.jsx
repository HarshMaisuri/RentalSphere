import React, { useState } from "react";
import { sampleListingsData, samplePaymentData } from "../../Utils/SampleData";

const TenantPayments = () => {

  const [tenantPaymentData, setTenantPaymentData] = useState(samplePaymentData);

  return (
    <>
      <h1 className="font-bold text-[20px]">Payments</h1>

      <div className="my-8 border-l-4 border-green-700 w-full flex justify-between items-center bg-white drop-shadow rounded-[8px] p-6">
        <div>
          <h3 className="font-medium text-[26px]">Your Current Balance</h3>
          <h3 className="font-extrabold text-[26px]">$ 0.00</h3>
        </div>

        <div>
          <button className="bg-green-700 text-white tracking-wider rounded-full px-10 py-2">
            Make payment
          </button>
        </div>
      </div>

      <div className="">
        {/* <div className="overflow-x-auto h-[400px]">
          <table className="payment-table table table-xs table-pin-rows table-pin-cols">
            <thead className="text-[22px] capitalize py-2">
              <tr>
                <td>Invoice No.</td>
                <td>date</td>
                <td>Amount</td>
                <td>Note</td>
              </tr>
            </thead>
            <tbody >
              {
                tenantPaymentData?.map((data) => (
                  <tr >
                    <td className="text-[20px] p-2">{data.id}</td>
                    <td className="text-[20px] p-2">{data.date}</td>
                    <td className="text-[20px] p-2">$ {data.amount}</td>
                    <td className="text-[20px] p-2">{data.paymentFor}</td>
                  </tr>
                ))
              }
              <tr >
                <td className="text-[20px] p-2">1</td>
                <td className="text-[20px] p-2">24 march 2024</td>
                <td className="text-[20px] p-2">$ 200</td>
                <td className="text-[20px] p-2">Maintenance</td>
              </tr>
              <tr>
                <td>2</td>
                <td>24 march 2024</td>
                <td>$ 200</td>
                <td>Maintenance</td>
              </tr>
              <tr>
                <td>3</td>
                <td>24 march 2024</td>
                <td>$ 200</td>
                <td>Maintenance</td>
              </tr>
              <tr>
                <td>4</td>
                <td>24 march 2024</td>
                <td>$ 200</td>
                <td>Maintenance</td>
              </tr>
            </tbody>
          </table>
        </div> */}



        <div className='hidden md:flex justify-between items-center mt-10'>

          <table className='table-auto w-full h-full'>
            <thead className='text-left text-gray-4 uppercase text-[14px] tracking-wider'>
              <tr className='border-b-2 border-gray py-10'>
                <th className='pb-5 px-3'>
                  ID
                </th>
                <th className='pb-5 px-3'>Invoice ID</th>
                <th className='pb-5 px-3'>Amount</th>
                <th className='pb-5 px-3'>Date</th>
                <th className='pb-5 px-3'>Note</th>
              </tr>
            </thead>
            <tbody className='text-black font-gilroy-medium'>
              {tenantPaymentData.map((data, index) => (
                <tr key={index} className='border-b-2 border-gray py-10'>
                  <td className='py-4 px-3'>
                    {data.id}
                  </td>
                  
                  <td className='py-4 px-3'>{data.invoiceNo}</td>
                  <td className='py-4 px-3'>$ {data.amount}</td>
                  <td className='py-4 px-3 '>{data.paymentDate}</td>
                  <td className='py-4 px-3 '>{data.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          </div>
      </div>
    </>
  );
};

export default TenantPayments;
