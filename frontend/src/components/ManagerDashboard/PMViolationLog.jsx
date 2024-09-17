import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
import { sampleViolationLogData } from "../../Utils/SampleData";
import { Tooltip } from "react-tooltip";
import { IoIosArrowDown } from "react-icons/io";
import useAppContext from "../../hooks/useAppContext.jsx";
const ALL_PROPS_URL = "http://localhost:8080/api/v1/property/rented/";
const CREATE_VLOG_URL = "http://localhost:8080/api/v1/violationlog/";
const PROP_VLOGS_URL = "http://localhost:8080/api/v1/violationlog/property/";

export default function PMViolationLog() {
  const { auth } = useAuth();
  const { contProp, setContProp, setContTenant } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  // const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [announcements, setAnnouncements] = useState([]);
  const [vlogs, setVlogs] = useState([]);

  const statusClassMapping = {
    Minor: "text-black bg-yellow-300 font-semibold",
    Moderate: "text-white bg-orange-400 font-semibold",
    Severe: "text-white bg-red-500 font-semibold",
  };

  const fetchAllVLogs = async () => {
    if (!selectedProperty) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${PROP_VLOGS_URL}${selectedProperty}`;
    await axios
      .get(url, { headers })
      .then((res) => setVlogs(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const fetchAllProps = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`${ALL_PROPS_URL}${auth.email}`, { headers })
      .then((res) => {
        console.log(res);
        console.log("all props from VLogs", res.data.properties);
        setProperties(res.data.properties);
        setContTenant(res.data.properties[0].tenant);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handlePostVlogClick = () => {
    if (!selectedProperty) {
      return;
    }
    setContProp(selectedProperty);
  };

  const handlePropClick = (propt) => {
    setSelectedProperty(propt);
    fetchAllVLogs();
  };

  useEffect(() => {
    console.log("Change in selectedProperty: ", selectedProperty);
    if (selectedProperty && selectedProperty !== "") {
      setContProp(selectedProperty);
    }
    fetchAllVLogs();
  }, [selectedProperty]);

  useEffect(() => {
    console.log("Change in contProp: ", contProp);
  }, [contProp]);

  useEffect(() => {
    fetchAllProps();
  }, [auth, navigate]);

  return (
    <div>
      <div className="flex justify-between mb-10 items-center p-4">
        <h1 className="text-2xl font-bold">Violation Log</h1>
        <Link
          to="/managerdashboard/add-violationlog"
          className="btn bg-red-500 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded"
          onClick={() => {
            handlePostVlogClick;
          }}
        >
          Post Violation
        </Link>
      </div>
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
        >
          <option className="bg-white text-black outline-none" value={0}>
            --Select Property--
          </option>
          {properties &&
            properties?.map((propt, index) => (
              <option
                className="bg-white text-black outline-none"
                value={propt.propertyId}
                key={index}
              >
                {propt.propertyAddress}
              </option>
            ))}
        </select>
        <span className="absolute top-[60%] right-[2%]">
          <IoIosArrowDown className="text-[#8D98AA] text-[20px]" />
        </span>
      </div>

      <div className="mt-4">
        <div className="w-full">
          {isLoading ? (
            <div className="loadingCont flex justify-center items-center h-screen w-full">
              <LoadingSpinner />
            </div>
          ) : (
            <table className="table-auto w-full h-full">
              <thead className="text-left text-gray-4 uppercase text-[14px] tracking-wider">
                <tr className="border-b-2 border-gray py-10">
                  <th className="pb-5 px-3">Title</th>
                  <th className="pb-5 px-3">Description</th>
                  <th className="pb-5 px-3 text-center">Personal Comment </th>
                  <th className="pb-5 px-3 text-center">Monetary </th>
                  <th className="pb-5 px-3 text-center">Damage Intensity</th>
                </tr>
              </thead>

              <tbody className="text-black font-gilroy-medium">
                {/* {vlogs && vlogs.map((data, index) => ( */}
                {sampleViolationLogData &&
                  sampleViolationLogData.map((data, index) => (
                    <tr
                      key={index}
                      className={ `border-b-8  border-white py-5`}
                    >
                      <td className={`py-4 px-3 `}>{data.title}</td>
                      <td className={`py-4 px-3 `}>
                        <Tooltip
                          id={`my-tooltip-${index}`}
                          potation="center"
                          style={{ width: "300px" }}
                        />
                        {data.description.length > 30 ? (
                          <p
                            data-tooltip-id={`my-tooltip-${index}`}
                            data-tooltip-content={data.description}
                          >
                            {data.description.slice(0, 30)}...
                          </p>
                        ) : (
                          data.description
                        )}
                      </td>
                      <td className={`py-4 px-3  text-center`}>
                        <Tooltip
                          id={`my-tooltip2-${index}`}
                          potation="center"
                          style={{ width: "300px" }}
                        />
                        {data.personalComment.length > 30 ? (
                          <p
                            data-tooltip-id={`my-tooltip2-${index}`}
                            data-tooltip-content={data.personalComment}
                          >
                            {data.personalComment.slice(0, 30)}...
                          </p>
                        ) : (
                          data.personalComment
                        )}
                      </td>
                      <td className={`py-4 px-3  text-center`}>
                        ${data.monetary}
                      </td>
                      <td className={`py-4 px-3  text-center`}>
                      <p className={`${statusClassMapping[data.damageIntensity]} py-2 rounded-md`}>{data.damageIntensity}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
