import {
  openServiceRequestsData,
  outstandingBalancesData,
  tenantApprovalsData,
} from "../../Utils/SampleData.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Chart from "../chart/Chart.jsx";
import {
  Bar,
  BarChart,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import { Tooltip, CartesianGrid } from "recharts";

const chartdata = [
  {
    name: "2012",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2013",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2014",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2015",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "2016",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "2017",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "2018",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2019",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2020",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2021",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2022",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2023",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function PMOverview() {
  const navigate = useNavigate();
  // Calculate total outstanding balance
  const totalBalance = outstandingBalancesData.reduce(
    (acc, curr) => acc + curr.balance,
    0
  );
  return (
    <div>
      <div className="flex justify-end mb-10">
        <button
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/managerdashboard/newproperty");
          }}
        >
          New Property Listing
        </button>
      </div>

      <div>
        {/* <Chart/> */}

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartdata}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis dataKey="pv" />

              <Tooltip />
              <Legend />
              <Bar
                dataKey="pv"
                fill="#8884d8"
                // activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#82ca9d"
                // activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 grid-auto-rows-auto">
        {/* Outstanding Balances Card Element */}
        <div className="bg-white p-4 shadow rounded-lg mb-4 h-min">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Outstanding Balances</h3>
            {/* <button className="text-blue-600 hover:underline">View</button> */}
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to={"/managerdashboard/rentmanagement"}
            >
              View
            </Link>
          </div>
          <p className="mb-4">Total Outstanding Balance: ${totalBalance}</p>
          <ul>
            {outstandingBalancesData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{`${item.name} - ${item.unit}`}</span>
                <span>${item.balance}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outstanding Balances Card Element */}
        <div className="bg-white p-4 shadow rounded-lg mb-4 h-min">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Outstanding Balances</h3>
            <button className="text-blue-600 hover:underline">View</button>
          </div>
          <p className="mb-4">Total Outstanding Balance: ${totalBalance}</p>
          <ul>
            {outstandingBalancesData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{`${item.name} - ${item.unit}`}</span>
                <span>${item.balance}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Tenant Requests Card Element */}
        <div className="bg-white p-4 shadow rounded-lg mb-4 h-1/3 scroll-smooth overflow-scroll">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tenant Approval</h3>
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to={"/managerdashboard/tenantapprovals"}
            >
              View
            </Link>
          </div>
          <ul>
            {tenantApprovalsData.map((request, index) => (
              <li key={index} className="border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{request.tenantName}</h4>
                    <p className="text-gray-600">{request.email}</p>
                  </div>
                  <span className="text-gray-600">{request.date}</span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Unit:</span> {request.unit}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Move-in Date:</span>{" "}
                    {request.moveInDate}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Duration:</span>{" "}
                    {request.duration}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">
                      Reason for Application:
                    </span>{" "}
                    {request.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Open Service Requests Card Element */}
        <div className="bg-white p-4 shadow rounded-lg h-1/3 scroll-smooth overflow-scroll">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Open Service Requests</h3>
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to={"/managerdashboard/servicerequests"}
            >
              View
            </Link>
          </div>

          {openServiceRequestsData.map((request) => (
            <div
              key={request.id}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <h4 className="font-semibold">{request.serviceTitle}</h4>
              <p className="text-gray-600">
                <span className="font-semibold">Tenant:</span>{" "}
                {request.tenant.name} - {request.tenant.unit}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Description:</span>{" "}
                {request.serviceDescription}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span> {request.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
