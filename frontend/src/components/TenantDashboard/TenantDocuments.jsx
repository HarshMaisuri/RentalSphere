import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
// import { sampleDocumentData } from "../../Utils/SampleData";
import { MdFileDownload, MdOutlineDelete } from "react-icons/md";

const TenantDocuments = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [lease, setLease] = useState("");

  const handleFetch = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    console.log(headers);
    await axios
      .get(`http://localhost:8080/api/v1/lease/tenant/${auth.email}`, {
        headers,
      })
      .then((res) => setLease(res.data.lease));
  };

  useEffect(() => {
    handleFetch();
  }, [auth, navigate]);

  // const docData = sampleDocumentData

  return (
    <>
      <h1 className="font-bold text-[20px]">Document</h1>

      <div className="my-8 bg-white drop-shadow rounded-[8px]">
        <div className="items-center justify-between hidden mt-10 md:flex">
          <table className="w-full h-full pt-1 mt-5 table-auto">
            <thead className="text-left text-gray-4 uppercase text-[14px]tracking-wider">
              <tr className="py-10 border-b-2 border-gray">
                {/* <th className="px-3 pb-5">ID</th> */}
                <th className="px-3 pb-5">Document</th>
                <th className="px-3 pb-5">Lease Holder</th>
                <th className="px-3 pb-5">Start Date</th>
                <th className="px-3 pb-5">End Date</th>
                <th className="px-3 pb-5">Monthly Rent</th>
                <th className="px-3 pb-5 text-center">
                  {/* <MdFileDownload  className="text-green-900 text-center text-[20px]"/> */}
                  Download
                </th>
                {/* <th className="px-3 pb-5 text-center"> */}
                {/* Delete */}
                {/* <MdOutlineDelete className="text-red-600 text-center text-[20px]"/> */}
                {/* </th> */}
              </tr>
            </thead>
            <tbody className="text-black font-gilroy-medium">
              {/* {lease.map((data, index) => ( */}
              <tr className="py-10 border-b-2 border-gray">
                {/* <td className="px-3 py-4">1</td> */}

                <td className="px-3 py-4">Lease</td>
                <td className="px-3 py-4">
                  {lease.firstName + " " + lease.lastName}
                </td>
                <td className="px-3 py-4">{lease.startDate}</td>
                <td className="px-3 py-4">{lease.endDate}</td>
                <td className="px-3 py-4">&#36; {lease.monthlyRent}</td>
                <td className="px-3 py-4 ">
                  <a
                    className="flex justify-center"
                    href={lease.leasePdfUrl}
                    target="_blank"
                    download
                  >
                    <MdFileDownload className="text-green-900 text-center text-[20px]" />
                  </a>
                </td>
                {/* <td className="relative flex justify-center px-3 py-4">
                  <MdOutlineDelete className="text-red-600 text-[20px]" />
                </td> */}
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TenantDocuments;
