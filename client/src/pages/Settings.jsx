import React, { useEffect, useState } from "react";
import { LockIcon } from "lucide-react";

import { dummyProfileData } from "../assets/assets";
import Loading from "../components/Loading";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    setProfile(dummyProfileData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading className='flex items-center justify-center  min-h-screen w-full'/>;

  return (
    <>
      <div className="animate-fade-in space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="text-slate-500">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile */}
        <div>
          <ProfileForm
            initialData={profile}
            onSuccess={fetchProfile}
          />
        </div>

        {/* Password Card */}
        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-lg">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
                <LockIcon className="h-6 w-6 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Password
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your account password.
                </p>
              </div>
            </div>

         <button
       onClick={() => setShowPasswordModal(true)}
      className="btn btn-secondary btn-sm px-6"
      >
      Change
       </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default Settings;