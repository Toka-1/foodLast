"use client";

import { useState } from "react";
import Image from "next/image";
import { ForgotSec1 } from "./_features/ForgotSec1";
import { ForgotSec2 } from "./_features/ForgotSec2";
import { ForgotSec3 } from "./_features/ForgotSec3";
import Link from "next/link";
export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNext = (emailValue?: string) => {
    if (emailValue) setEmail(emailValue);
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex h-screen w-full">
      <div
        key={currentStep}
        className="slide-in flex flex-col items-center justify-center px-16 w-full lg:w-1/2"
      >
       <div className="w-full max-w-sm flex flex-col pl-9.5 items-start ">
          <Link href="/">
            {" "}
            <button className=" text-black border border-gray rounded-lg p-2.5 mb-8 cursor-pointer">
              {"<"}
            </button>
          </Link>

        </div>
        {currentStep === 1 && <ForgotSec1 handleNext={handleNext} />}
        {currentStep === 2 && (
          <ForgotSec2 email={email} handleNext={handleNext} />
        )}
        {currentStep === 3 && <ForgotSec3 />}
      </div>
      <div className="lg:w-1/2 relative hidden  lg:block">
        <Image
          src="./image/multiSteps.svg"
          alt="delivery rider"
          fill
          loading="eager"
          className="object-cover fill rounded-4xl p-5"
        />
      </div>
    </div>
  );
}
