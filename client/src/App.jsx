import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginLanding from './pages/LoginLanding';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Setting from './pages/Setting';
import Payslips from './pages/Payslips';
import PrintPayslip from './pages/PrintPayslip';
import LoginForm from './pages/LoginForm';

const App = () => {
  return (
    <>
      <Toaster />

    <Routes>
  <Route path="/login" element={<LoginLanding />} />

  <Route
    path="/admin"
    element={
      <LoginForm
        role="admin"
        title="Admin Portal"
        subtitle="Sign in to manage the organisation"
      />
    }
  />

  <Route
    path="/employee"
    element={
      <LoginForm
        role="employee"
        title="Employee Portal"
        subtitle="Sign in to your account"
      />
    }
  />

  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="leave" element={<Leave />} />
    <Route path="payslips" element={<Payslips />} />
    <Route path="setting" element={<Setting />} />
  </Route>

  <Route path="/print/payslip/:id" element={<PrintPayslip />} />

  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
    </>
  );
};

export default App;