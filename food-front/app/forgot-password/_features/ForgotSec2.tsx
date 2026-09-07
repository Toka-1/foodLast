"use client";
interface ForgotSec2Props {
  email: string;
  handleNext: (email?: string) => void;
}
export const ForgotSec2 = ({ email, handleNext }: ForgotSec2Props) => {
  const handleResend = () => {
    // TODO: resend email logic
  };

  return (
    <div className="w-[300px] flex flex-col gap-4">
      <div>
        <h2 className="font-semibold font-sans text-[20px] text-black">
          Please verify Your Email
        </h2>
        <p className="text-[#8E8E8E] font-normal text-[14px]">
          We just sent an email to{" "}
          <span className="text-black font-medium">{email}</span>. Click the
          link in the email to verify your account.
        </p>
      </div>

      <button
        onClick={handleResend}
        className="h-11 w-full rounded-lg text-[14px] font-medium bg-[#121316] text-white cursor-pointer"
      >
        Resend email
      </button>
    </div>
  );
};