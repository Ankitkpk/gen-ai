import React, { useEffect, useState } from "react";
import { dummyEmployeeDashboardData } from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
const Dashboard = () => {
  const [data, SetData] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    SetData(dummyEmployeeDashboardData);

    const timer = setTimeout(() => {
      SetLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className=" flex items-center justify-center text-center ">
        <Loading/>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-slate-500 py-12">
        <h1>Failed to fetch data</h1>
      </div>
    );
  }

  if (data.role === "Admin") {
    return <div>Admin data</div>;
  }

  return <div><EmployeeDashboard/></div>;
};

export default Dashboard;