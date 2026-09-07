"use client";

import { useState } from "react";
import Image from "next/image";
import { SignUpSec1 } from "./_features/SignUpSec1";
import { SignUpSec2 } from "./_features/SignUpSec2";
import Link from "next/link";

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNext = (emailValue?: string) => {
    if (emailValue) setEmail(emailValue);
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex h-screen w-full">
      <div
        key={currentStep}
        className="slide-in flex flex-col items-center justify-center px-16 w-full lg:w-1/2"
      >
        <div className="w-full pl-9.5 max-w-sm flex flex-col items-start ">
          <Link href="/">
            <button className="text-black border border-gray rounded-lg p-2.5 mb-8 cursor-pointer">
              {"<"}
            </button>
          </Link>
        </div>
        {currentStep === 1 && <SignUpSec1 handleNext={handleNext} />}
        {/* Email-ийг SignUpSec2 руу props-оор дамжуулав */}
        {currentStep === 2 && <SignUpSec2 email={email} />}
      </div>
      <div className="lg:w-1/2 relative hidden lg:block">
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
