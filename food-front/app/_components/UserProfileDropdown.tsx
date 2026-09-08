"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Clock, LogOut, Mail, MapPin, Phone, LayoutDashboard } from "lucide-react";

interface UserProfileModalProps {
  isLoggedIn?: boolean;
  userData?: {
    email?: string;
    phoneNumber?: string;
    address?: string;
    name?: string;
    role?: string;
  };
  onLogout?: () => void;
}

function getInitial(userData?: { name?: string; email?: string }) {
  const source = userData?.name?.trim() || userData?.email?.trim() || "";
  return source.charAt(0).toUpperCase() || "U";
}

export const UserProfileModal = ({
  isLoggedIn = false,
  userData,
  onLogout,
}: UserProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const initial = getInitial(userData);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          isLoggedIn
            ? "w-9 h-9 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#18181B]"
            : "object-cover bg-[#EF4444] hover:bg-[#DC2626] transition-colors justify-center w-9 h-9 items-center rounded-full flex cursor-pointer"
        }
        aria-label={isLoggedIn ? "Open profile" : "Log in"}
      >
        {isLoggedIn ? initial : <User className="w-4 h-4 text-white" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {!isLoggedIn ? (
            <div className="relative bg-white rounded-3xl p-8 max-w-[400px] w-full shadow-2xl text-center z-10 flex flex-col items-center animate-in fade-in zoom-in duration-200">
              <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center mb-5">
                <div className="w-10 h-10 rounded-full border-2 border-[#EF4444] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#EF4444]" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                You need to log in first
              </h2>
              <p className="text-gray-500 text-sm mb-7">
                Please sign in before opening your account.
              </p>

              <div className="flex flex-row gap-3 w-full">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-[#18181B] hover:bg-black text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-xl text-sm border border-gray-200 transition-colors flex items-center justify-center"
                >
                  Sign up
                </Link>
              </div>
            </div>
          ) : (
            <div className="relative bg-white rounded-3xl p-6 max-w-[380px] w-full shadow-2xl z-10 flex flex-col items-center animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-2xl font-bold mb-3">
                {initial}
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {userData?.name || "User Profile"}
              </h2>
              <p className="text-xs text-gray-400 mb-4">{userData?.email}</p>

              <div className="w-full space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-800">
                    {userData?.email || "user@example.com"}
                  </span>
                </div>
                {userData?.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{userData.phoneNumber}</span>
                  </div>
                )}
                {userData?.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{userData.address}</span>
                  </div>
                )}
              </div>

              {userData?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full mb-2 bg-[#18181B] hover:bg-black text-white font-semibold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-50 hover:bg-red-100 text-[#EF4444] font-semibold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
