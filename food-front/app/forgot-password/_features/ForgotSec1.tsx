"use client";

import { useState } from "react";
import Link from "next/link";
interface ForgotSec1Props {
  handleNext: (email?: string) => void;
}
export const ForgotSec1 = ({ handleNext }: ForgotSec1Props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isFilled = email.length > 0;

  const checkError = () => {
    let IsValid = true;
    if (email.length < 1) {
      setEmailError("Имэйл хаягаа оруулна уу.");
      IsValid = false;
    } else if (emailRegex.test(email) == false) {
      setEmailError("Invalid email. Use a format like example@email.com.");
      IsValid = false;
    } else {
      setEmailError("");
    }
    return IsValid;
  };

  const handleClick = () => {
    const validate = checkError();
    if (validate == true) {
      handleNext(email);
    }
  };

  return (
    <div className="w-[300px] flex flex-col gap-4">
      <div>
        <h2 className="font-semibold font-sans text-[20px] text-black">
          Reset your password
        </h2>
        <p className="text-[#8E8E8E] font-normal text-[14px]">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={`w-full border rounded-lg p-3 text-[14px] ${
            emailError ? "border-[#E14942]" : "border-[#CBD5E1]"
          }`}
        />
        {emailError.length > 0 && (
          <div className="text-[#E14942] font-normal text-[12px]">
            {emailError}
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={!isFilled}
        className={`h-11 w-full rounded-lg text-[14px] font-medium transition-colors ${
          isFilled
            ? "bg-[#121316] text-white cursor-pointer"
            : "bg-[#E4E4E7] text-[#A1A1AA] cursor-not-allowed"
        }`}
      >
        Send link
      </button>

      <p className="text-center text-[13px] text-[#71717A]">
        Don't have an account?{" "}
        <Link href="/signup" className="text-black underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};