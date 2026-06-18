import React, { useEffect, useState } from "react";
import { dummyProfileData } from "../assets/assets";
import {dummyEmployeeData} from "../assets/assets";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  MenuIcon,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Users,
  CalendarDays,
  Wallet,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const username = `${dummyProfileData.firstName} ${dummyProfileData.lastName}`;

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Employees",
      icon: Users,
      path: "/employees",
    },
    {
      name: "Attendance",
      icon: CalendarDays,
      path: "/attendance",
    },
    {
      name: "Payroll",
      icon: Wallet,
      path: "/payroll",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const SidebarContent = (
    <>
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <User size={25} />
          </div>

          <div>
            <h1 className="font-semibold text-sm tracking-tight">
              Employee MS
            </h1>
            <p className="text-xs text-slate-400">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-5 ">
        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl">
          <img
            src={dummyEmployeeData.firstName}
            alt={username}
            className="w-12 h-12 rounded-full object-cover border border-white/10"
          />

          <div>
            <h2 className="font-medium text-white">{username}</h2>
            <p className="text-xs text-slate-400">
              {dummyEmployeeData.position}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {/* Navigation */}
<nav className="flex-1 p-4 overflow-y-auto">
  <h2 className="mb-3 px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
    Navigation
  </h2>

  <ul className="space-y-1">
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={16} />
            <span>{item.name}</span>
          </NavLink>
        </li>
      );
    })}
  </ul>
</nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenu(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/20"
      >
        <MenuIcon size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen w-64 shrink-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border-r border-white/10">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 border-b border-white/10">
          <button
            onClick={() => setMobileMenu(false)}
            className="text-white hover:text-slate-300"
          >
            <X size={24} />
          </button>
        </div>

        {SidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;