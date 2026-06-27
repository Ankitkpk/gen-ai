import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LoginLandingPage from './pages/LoginLandingPage';
import Layout from './pages/Layout';
import Payslips from './pages/Payslips';
import Settings from './pages/Settings';
import Leave from './pages/Leave';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import PrintPayslipe from './pages/PrintPayslipe';
import LoginForm from './components/LoginForm';
import Employee from './components/Employee';
const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<LoginLandingPage />} />
          <Route path="/login/admin" element={<LoginForm role="admin"  title="Admin Portal" subtitle="sign in to manage organisation" />} />
          <Route path="/login/employee" element={<LoginForm role="employee"  title="Employee Portal" subtitle="sign in to access the acount" />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payslipe" element={<Payslips />} />
          <Route path="setting" element={<Settings />} />
          <Route path="employees" element={<Employee/>} />
          <Route path="leave" element={<Leave />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/print/payslipe/:id" element={<PrintPayslipe />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;