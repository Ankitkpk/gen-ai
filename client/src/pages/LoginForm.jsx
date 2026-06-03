import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldAlert, User } from 'lucide-react';
import  EmployeeFormLelfSide from '../components/EmployeeFormLelfSide';
const LoginForm = ({role , title}) => {
 

  return (
    <div className="w-full md:w-1/2 flex items-center min-h-screen p-6 sm:p-12 bg-slate-50">
      <EmployeeFormLelfSide/>
    </div>
  );
};

export default LoginForm;