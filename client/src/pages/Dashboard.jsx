import React, { useEffect, useState } from "react";
import { dummyEmployeeDashboardData,dummyAdminDashboardData } from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
const Dashboard = () => {
  const [data, SetData] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    SetData(dummyAdminDashboardData);

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

  if (data.role === "ADMIN") {
    return <div><AdminDashboard/></div>;
  }

  return <div><EmployeeDashboard/></div>;
};

export default Dashboard;