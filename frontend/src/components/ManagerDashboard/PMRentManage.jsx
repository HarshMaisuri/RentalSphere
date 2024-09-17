import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { samplePaymentData } from "../../Utils/SampleData";
import LoadingSpinner from "../../assets/LoadingSpinner";
const ALL_PROPS_URL = "http://localhost:8080/api/v1/property";

export default function RentManage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [payments, setPayments] = useState([]);
  const [currPayment, setCurrPayment] = useState({});

  const statusClassMapping = {
    overdue: "text-red-800 bg-red-200",
    paid: "text-green-800 bg-green-200",
    partial: "text-yellow-800 bg-yellow-200",
    open: "text-black bg-gray-200",
  };

  const fetchAllProps = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(ALL_PROPS_URL, { headers })
      .then((res) => {
        console.log(res);
        console.log("all props from rentManage", res.data.properties);
        setProperties(res.data.properties);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handlePropClick = (propt) => {
    setSelectedProperty(propt);
    fetchAllRent();
  };

  const fetchAllRent = async () => {
    if (!selectedProperty) return;
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${ALL_LEASE_URL}${selectedProperty}`;
    await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res);
        setPayments(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handlePaymentClick = (payment) => {
    setCurrPayment(payment);
  };

  useEffect(() => {
    fetchAllProps();
  }, [auth, navigate]);

  return (
    <div>
      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-10">Rent Management</h1>
          <div className="relative">
            <label
              className="block pb-2 text-gray-12 text-[18px] font-semibold"
              htmlFor="type"
            >
              Select Property
            </label>
            <select
              name="type"
              aria-placeholder="Please Select a webhook type"
              className="cursor-pointer mt-2 appearance-none bg-gray w-full text-[16px] rounded-[4px] border-2 px-4 h-[52px] pr-8 focus:outline-none "
              onChange={(e) => handlePropClick(e.target.value)}
              value={selectedProperty}
            >
              <option className="bg-white text-black outline-none" value={0}>
                --Select Property--
              </option>
              {properties &&
                properties.length !== 0 &&
                properties?.map((propt, index) => (
                  <option
                    className="bg-white text-black outline-none"
                    value={propt.propertyId}
                    key={index}
                  >
                    {propt.propertyDescription}
                  </option>
                ))}
            </select>
            <span className="absolute top-[60%] right-[2%]">
              <IoIosArrowDown className="text-[#8D98AA] text-[20px]" />
            </span>
          </div>

          <h6 className="block pb-2 text-gray-12 text-[18px] font-semibold mt-8">
            Payment
          </h6>

          <div className="flex gap-8 justify-between">
            <div className="w-[70%] mt-4">
              <div className="w-full">
                <table className="table-auto w-full h-full">
                  <thead className="text-left text-gray-4 uppercase text-[14px] tracking-wider">
                    <tr className="border-b-2 border-gray py-10">
                      <th className="pb-5 px-3 text-center capitalize">
                        Status
                      </th>
                      <th className="pb-5 px-3 text-center">Invoice ID</th>
                      <th className="pb-5 px-3 text-center">Tenant</th>
                      <th className="pb-5 px-3 text-center">Amount</th>
                      <th className="pb-5 px-3 text-center">Date</th>
                      <th className="pb-5 px-3 text-center">Due Date</th>
                      <th className="pb-5 px-3 text-center">Category </th>
                    </tr>
                  </thead>
                  <tbody className="text-black font-gilroy-medium">
                    {samplePaymentData &&
                      samplePaymentData.map((data, index) => (
                        <tr
                          key={index}
                          className="border-b-2 border-gray py-10"
                          onClick={() => {
                            handlePaymentClick(data);
                          }}
                        >
                          <td className={`py-4 px-3 text-center capitalize`}>
                            <p
                              className={`${
                                statusClassMapping[data.status]
                              } rounded-full`}
                            >
                              {data.status}
                            </p>
                          </td>
                          <td className="py-4 px-3 text-center">
                            {data.invoiceNo}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {data.tenant}
                          </td>
                          <td className="py-4 px-3 text-center">
                            $ {data.amount}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {data.paymentDate}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {data.paymentDueDate}
                          </td>
                          <td className="py-4 px-3 text-center">{data.note}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-[30%]">
              <div className="bg-white drop-shadow-md border border-gray-300 text-center py-10">
                <h6 className="font-semibold text-[16px] text-gray-600">
                  Current balance
                </h6>
                <p className="font-bold text-[30px]">$ 2850.00</p>
              </div>

              <div className="bg-white drop-shadow-md border mt-6 border-gray-300 p-4">
                <h6 className="font-semibold text-[20px] text-gray-600">
                  Lease Information
                </h6>

                <p className="mt-4 text-[18px]">Account number</p>
                <p className="text-[16px]">FDF525252FF</p>

                <p className="mt-4 text-[18px]">Address</p>
                <p className="text-[16px]">
                  7 street line road, Boston MA 202020, United State{" "}
                </p>

                <div className="flex gap-10 items-center">
                  <div className="w-[40%]">
                    <p className="mt-4 text-[18px]">Start date</p>
                    <p className="text-[16px]">April 2023</p>
                  </div>

                  <div className="w-[40%]">
                    <p className="mt-4 text-[18px]">End date</p>
                    <p className="text-[16px]">March 2024</p>
                  </div>
                </div>

                <div className="flex gap-10 items-center">
                  <div className="w-[40%]">
                    <p className="mt-4 text-[18px]">Rent</p>
                    <p className="text-[16px]">$ 1000</p>
                  </div>

                  <div className="w-[40%]">
                    <p className="mt-4 text-[18px]">Maintenance </p>
                    <p className="text-[16px]">$ 200</p>
                  </div>
                </div>

                <div>
                  <p className="mt-4 text-[18px]">Deposite </p>
                  <p className="text-[16px]">$ 1000</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
