"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Backend-ээс ирэх алдааны мэдээллийг хадгалах state
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = email.trim() && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setErrorMessage(""); // Шинээр илгээхээс өмнө хуучин алдааг цэвэрлэнэ

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend-ээс ирсэн "Email эсвэл password буруу байна" гэх мессежийг харуулна
        setErrorMessage(data.message || "Имэйл эсвэл нууц үг буруу байна.");
        toast.error(data.message || "Нэвтрэхэд алдаа гарлаа");
        return;
      }

      const userId = String(data.user?._id || data.user?.id || "");
      if (!data.token || !userId) {
        setErrorMessage("Нэвтрэхэд хэрэглэгчийн мэдээлэл дутуу ирлээ.");
        toast.error("Нэвтрэхэд алдаа гарлаа");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: userId,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        }),
      );

      toast.success("Амжилттай нэвтэрлээ");
      router.push(data.user?.role === "ADMIN" ? "/admin" : "/");
    } catch {
      setErrorMessage("Сервэртэй холбогдоход алдаа гарлаа. Дахин оролдоно уу.");
      toast.error("Нэвтрэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-[42%] lg:px-16 xl:px-24">
        <Link
          href="/"
          className="mb-10 flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50"
          aria-label="Go back"
        >
          <ChevronLeft className="size-5" />
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-[28px] font-semibold tracking-tight text-neutral-900">
            Log in
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sign in to explore your favorite dishes.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {/* Backend-ээс "Email эсвэл password буруу байна" гэж ирвэл энд харагдана */}
            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-500">
                {errorMessage}
              </div>
            )}

            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(""); // Бичиж эхлэх үед улаан анхааруулгыг арилгана
              }}
              placeholder="Enter your email address"
              className={`h-12 rounded-xl px-4 text-sm placeholder:text-neutral-400 ${
                errorMessage ? "border-red-500" : "border-neutral-200"
              }`}
            />

            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(""); // Бичиж эхлэх үед улаан анхааруулгыг арилгана
              }}
              placeholder="Enter your password"
              className={`h-12 rounded-xl px-4 text-sm placeholder:text-neutral-400 ${
                errorMessage ? "border-red-500" : "border-neutral-200"
              }`}
            />

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="mt-2 h-12 w-full rounded-xl text-sm font-medium transition disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 enabled:bg-neutral-900 enabled:text-white enabled:hover:bg-neutral-800"
            >
              {loading ? "Logging in..." : "Let's Go"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signUp"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-white p-6 lg:flex">
        <div className="relative h-full min-h-[480px] w-full max-w-2xl overflow-hidden rounded-3xl">
          <Image
            src="./image/multiSteps.svg"
            alt="Food delivery rider"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
