import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
// import { Heatmap } from "react-chartjs-2";

const RentCollectionComponent = () => {
  const rentData = {
    labels: ["On Time", "Late", "Past Due"],
    datasets: [
      {
        label: "Rent Collection Status",
        data: [60, 30, 10],
        background: ["# ./warning"],
        borderColor: ["# ./warning"],
        borderWidth: 1,
        hoverBackgroundColor: ["# ./warning"],
        hoverBorderColor: ["# ./warning"],
        hoverBorderWidth: 1,
      },
    ],
  };

  return <Pie data={rentData} />;
};

const AverageRentComponent = () => {
  const rentData = {
    labels: [UPDATE_DATE1, UPDATE_DATE2, UPDATE_DATE3],
    datasets: [
      {
        label: "Average Rent",
        data: [1000, 500, 300],
        backgroundColor: ["# ./info"],
        borderColor: ["# ./info"],
        borderWidth: 1,
        hoverBackgroundColor: ["# ./info"],
        hoverBorderColor: ["# ./info"],
        hoverBorderWidth: 1,
      },
    ],
  };

  return <Line data={rentData} />;
};

const RentReceivedComponent = () => {
  const rentData = {
    labels: [UPDATE_DATE1, UPDATE_DATE2, UPDATE_DATE3],
    datasets: [
      {
        label: "Rent Received",
        data: [1000, 500, 300],
        backgroundColor: ["# ./success"],
        borderColor: ["# ./success"],
        borderWidth: 1,
        hoverBackgroundColor: ["# ./success"],
        hoverBorderColor: ["# ./success"],
        hoverBorderWidth: 1,
      },
    ],
  };

  return <Bar data={rentData} />;
};

const PortfolioHeatmap = () => {
  const data = {
    labels: ["Unit 101", "Unit 202", "Unit 303", "Unit 404"],
    datasets: [
      {
        label: "Tenants",
        data: [12, 8, 5, 3],
        backgroundColor: ["# ./important"],
        radius: 0.5,
        pointRadius: 0.5,
        pointBackgroundColor: ["# ./important"],
        pointBorderColor: ["# ./important"],
        pointBorderWidth: 1,
        hoverBackgroundColor: ["# ./important"],
        hoverPointBackgroundColor: ["# ./important"],
        hoverPointBorderColor: ["# ./important"],
        hoverPointBorderWidth: 1,
      },
    ],
  };

  return <Heatmap data={data} />;
};

const BalanceOverview = () => {
  const balanceData = {
    labels: ["Unit 101", "Unit 202", "Unit 303", "Unit 404"],
    datasets: [
      {
        data: [1200, 800, 1500, 500],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return <Doughnut data={balanceData} />;
};

const ApprovalTrend = () => {
  const approvalData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Tenant Approvals",
        data: [4, 3, 5, 8],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={approvalData} />;
};

const ServiceRequestSummary = () => {
  const serviceRequestData = {
    labels: ["Plumbing", "Electrical", "Cleaning", "Maintenance"],
    datasets: [
      {
        label: "Service Requests",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return <Bar data={serviceRequestData} />;
};

export default function PMOverview2() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end mb-10">
        <button
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/managerdashboard/newproperty")}
        >
          New Property Listing
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Balance Overview */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Outstanding Balances</h3>
          <BalanceOverview />
        </div>

        {/* Approval Trend */}
        {/* <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Tenant Approval Trend</h3>
          <ApprovalTrend />
        </div> */}

        {/* Service Request Summary */}
        {/* <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Service Request Summary
          </h3>
          <ServiceRequestSummary />
        </div> */}
      </div>
    </div>
  );
}
