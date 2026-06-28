import React, { useState } from "react";
import { User, Save, AlertCircle, CheckCircle } from "lucide-react";

const ProfileForm = ({ initialData = {}, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      // API call goes here
      // await updateProfile();

      setMessage("Profile updated successfully!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Public Profile
          </h2>
          <p className="text-sm text-slate-500">
            View and manage your profile information.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />

            <p className="text-sm text-rose-700">{error}</p>
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />

            <p className="text-sm text-emerald-700">{message}</p>
          </div>
        )}

        {/* Form */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
              type="text"
              disabled
              value={`${initialData.firstName || ""} ${
                initialData.lastName || ""
              }`}
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              disabled
              value={initialData.email || ""}
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* Position */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Position
            </label>

            <input
              type="text"
              disabled
              value={initialData.position || ""}
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio
            </label>

            <textarea
              rows={5}
              disabled
              value={initialData.bio || ""}
              placeholder="Write a brief bio..."
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 resize-none cursor-not-allowed"
            />

            <p className="mt-2 text-sm text-slate-500">
              This information will be displayed on your public profile.
            </p>
          </div>
        </div>

        {/* Footer */}
        {initialData.isDeleted ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-medium text-rose-700">
              Your account has been deactivated. You cannot update your profile.
            </p>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;