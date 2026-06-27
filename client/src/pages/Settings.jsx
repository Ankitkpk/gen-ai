import React, { useEffect, useState } from 'react'
import { dummyProfileData } from '../assets/assets';
import { LockIcon} from "lucide-react";
import Loading from '../components/Loading';
import ProfileForm from '../components/ProfileForm';
const Settings = () => {
  const [profile,setProfile]=useState([]);
  const [loading ,setLoading]=useState(true);
  const [showPasswordModal ,setShowPasswordModal]=useState(false);

  const fetchProfile=async()=>{
    setProfile(dummyProfileData)

    setTimeout(()=>{
     setLoading(false);
    },[1000])
  }

  useEffect(()=>{
    fetchProfile();
  },[])

   if(loading) return <Loading/>
  return (
    <div className='animate-fade-in'>
      <div className=''>
       <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </div>
       {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile}/>}
       {/* password change */}

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200">
  <div className="flex items-center justify-between">
    {/* Left Section */}
    <div className="flex items-center gap-5">
      <div className="flex h-10 w-12 items-center justify-center rounded-2xl bg-indigo-100">
        <LockIcon className="h-7 w-7 text-indigo-600" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Password
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          update your account password
        </p>
      </div>
    </div>

    {/* Right Section */}
    <button
      onClick={() => setShowPasswordModal(true)}
      className="btn btn-secondary btn-sm px-6"
    >
      Change
    </button>
  </div>
</div>
    </div>
  )
}

export default Settings